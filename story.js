// Lucas's Storybook — Vercel Serverless API
// Proxies Groq requests with rate limiting + abuse protection

const rateLimitStore = new Map();
const RATE_LIMIT = {
  maxPerHour: 8,
  maxPerDay: 20,
  globalDailyMax: 500
};
let globalDailyCount = 0;
let globalDayKey = new Date().toDateString();

function checkRateLimit(ip) {
  const today = new Date().toDateString();
  if (globalDayKey !== today) { globalDayKey = today; globalDailyCount = 0; }
  if (globalDailyCount >= RATE_LIMIT.globalDailyMax) return { allowed: false, reason: 'global_daily', retryAfter: 'tomorrow' };
  const now = new Date();
  const hourKey = `${ip}_${today}_${now.getHours()}`;
  const dayKey  = `${ip}_${today}`;
  const hourCount = rateLimitStore.get(hourKey) || 0;
  const dayCount  = rateLimitStore.get(dayKey)  || 0;
  if (hourCount >= RATE_LIMIT.maxPerHour) return { allowed: false, reason: 'hourly', retryAfter: '1 hour' };
  if (dayCount  >= RATE_LIMIT.maxPerDay)  return { allowed: false, reason: 'daily',  retryAfter: 'tomorrow' };
  rateLimitStore.set(hourKey, hourCount + 1);
  rateLimitStore.set(dayKey,  dayCount  + 1);
  globalDailyCount++;
  return { allowed: true };
}

function getIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || 'unknown';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limit
  const limit = checkRateLimit(getIp(req));
  if (!limit.allowed) {
    const msgs = {
      global_daily: `🌙 The storybook is very popular today! Please come back ${limit.retryAfter}!`,
      hourly: `✨ So many stories this hour! Come back in ${limit.retryAfter} for more magic.`,
      daily:  `🌟 Wow, so many stories today! Come back ${limit.retryAfter} for fresh adventures.`
    };
    return res.status(429).json({ error: msgs[limit.reason] });
  }

  // Validate
  const { messages, model, temperature, max_tokens } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  // Check API key
  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) return res.status(500).json({ error: 'Server configuration error.' });

  // Proxy to Groq
  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        messages,
        temperature: Math.min(temperature || 0.85, 1.2),
        max_tokens:  Math.min(max_tokens  || 900,  1500)
      })
    });

    if (!groqRes.ok) {
      if (groqRes.status === 429) return res.status(429).json({ error: 'The story engine is busy! Please try again in a moment ✨' });
      return res.status(502).json({ error: 'Story generation failed. Please try again!' });
    }

    const data = await groqRes.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again! 🌙' });
  }
}
