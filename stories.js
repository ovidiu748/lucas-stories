// ── STORY JOURNAL & CONTINUATION SYSTEM ──

const JOURNAL_KEY = 'bedtime_journal_v1';
const MAX_STORIES = 5;

// ── SAVE story to journal ──
function saveToJournal(name, theme, storyData) {
  const journal = getJournal();
  const entry = {
    id: Date.now(),
    date: new Date().toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'}),
    name,
    theme,
    title: storyData.title,
    summary: storyData.pages[0] ? storyData.pages[0].slice(0, 180) + '...' : '',
    lastPage: storyData.pages[storyData.pages.length - 1] || '',
    fullText: storyData.pages.join('\n\n')
  };
  journal.unshift(entry);
  if (journal.length > MAX_STORIES) journal.pop();
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(journal));
  updateJournalBadge();
  showContinueBanner(entry);
}

function getJournal() {
  try { return JSON.parse(localStorage.getItem(JOURNAL_KEY)) || []; }
  catch { return []; }
}

function updateJournalBadge() {
  const count = getJournal().length;
  const badge = document.getElementById('journalBadge');
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'inline-block' : 'none'; }
}

// ── SHOW "Continue the Adventure" banner after story ──
function showContinueBanner(entry) {
  const banner = document.getElementById('continueBanner');
  if (!banner) return;
  document.getElementById('continueTitle').textContent = entry.title;
  banner.style.display = 'block';
}

// ── BUILD continuation prompt ──
function buildContinuationPrompt(name, theme, mood, length, prevEntry) {
  const pages = length === 'long' ? 5 : 3;
  const wpg = length === 'long' ? 75 : 95;
  let mid = '';
  for (let i = 2; i < pages; i++) mid += 'PAGE ' + i + ':\n[story continues ~' + wpg + ' words]\n\n';
  const recap = prevEntry.lastPage.slice(0, 300);
  return 'Write a children\'s bedtime storybook CONTINUATION for a 5-year-old named ' + name + '.\n\nPREVIOUS STORY ENDED:\n"' + recap + '"\n\nThis new story is Episode ' + (getJournal().length + 1) + ' continuing that adventure.\nTheme: ' + theme + '\nMood: ' + mood + '\nTotal pages: exactly ' + pages + '\n\nFORMAT — follow exactly:\nTITLE: [new episode title referencing the continuing adventure]\n\nPAGE 1:\n[brief warm recap in 1 sentence, then new adventure begins ~' + wpg + ' words]\n\n' + mid + 'PAGE ' + pages + ':\n[peaceful ending — ' + name + ' drifting to sleep, hinting at next adventure ~' + wpg + ' words]\n\nRules:\n- ' + name + ' is the brave hero throughout\n- Reference characters or places from the previous story\n- Simple loving language for age 5\n- No scary moments — wholesome, magical, sweet\n- End with a gentle cliffhanger hint for tomorrow\n- NEVER include violence, fear, or adult themes';
}

// ── JOURNAL SCREEN ──
function showJournal() {
  const journal = getJournal();
  const screen = document.getElementById('journalScreen');
  const list = document.getElementById('journalList');
  list.innerHTML = '';

  if (journal.length === 0) {
    list.innerHTML = '<div style="text-align:center;color:#8892b0;padding:40px 20px;"><div style="font-size:3em;margin-bottom:12px;">📚</div><div style="font-family:\'Fredoka One\',cursive;font-size:1.2em;color:#FFD700;">No stories yet!</div><div style="margin-top:8px;font-size:.9em;">Create your first story and it will appear here ✨</div></div>';
  } else {
    journal.forEach((entry, idx) => {
      const card = document.createElement('div');
      card.className = 'journal-card';
      card.innerHTML =
        '<div class="journal-ep">Episode ' + (journal.length - idx) + ' · ' + entry.date + '</div>' +
        '<div class="journal-title">' + entry.title + '</div>' +
        '<div class="journal-summary">' + entry.summary + '</div>' +
        '<div class="journal-actions">' +
        '<button class="btn-c" onclick="rereadStory(' + idx + ')">📖 Read Again</button>' +
        (idx === 0 ? '<button class="btn-c prime" onclick="continueFromJournal()">✨ Continue Adventure</button>' : '') +
        '</div>';
      list.appendChild(card);
    });
  }

  hideAllScreens();
  screen.style.display = 'block';
  window.scrollTo({top:0, behavior:'smooth'});
}

function hideAllScreens() {
  document.getElementById('setupScreen').style.display = 'none';
  document.getElementById('loadScreen').classList.remove('show');
  document.getElementById('bookScreen').classList.remove('show');
  const js = document.getElementById('journalScreen');
  if (js) js.style.display = 'none';
}

function closeJournal() {
  document.getElementById('journalScreen').style.display = 'none';
  document.getElementById('setupScreen').style.display = 'block';
  window.scrollTo({top:0, behavior:'smooth'});
}

function rereadStory(idx) {
  const journal = getJournal();
  const entry = journal[idx];
  if (!entry) return;
  document.getElementById('journalScreen').style.display = 'none';
  document.getElementById('bookScreen').classList.add('show');
  document.getElementById('bookTitle').textContent = entry.title;
  document.getElementById('bookSub').textContent = 'A magical story for ' + entry.name + ' · ' + entry.date + ' ✨';
  const container = document.getElementById('pages');
  container.innerHTML = '';
  const pages = entry.fullText.split('\n\n').filter(p => p.trim());
  pages.forEach((text, i) => {
    const isTitle = i === 0, isEnd = i === pages.length - 1;
    const pType = isTitle ? 'title' : isEnd ? 'end' : 'story';
    const page = document.createElement('div');
    page.className = 'page ' + (isTitle ? 'title-page' : isEnd ? 'end-page' : 'story-page');
    const illusDiv = document.createElement('div');
    illusDiv.className = 'page-illus';
    illusDiv.innerHTML = buildScene(entry.theme, pType);
    const badge = document.createElement('div');
    badge.className = 'page-num-badge';
    badge.textContent = isTitle ? '📖' : 'Page ' + i;
    illusDiv.appendChild(badge);
    if (isTitle) {
      const ov = document.createElement('div');
      ov.className = 'title-overlay';
      ov.innerHTML = '<h2>' + entry.title + '</h2><p>A bedtime story for ' + entry.name + ' ✨</p>';
      illusDiv.appendChild(ov);
    }
    page.appendChild(illusDiv);
    const body = document.createElement('div');
    body.className = 'page-body';
    body.innerHTML = '<div class="page-chapter">' + (isTitle ? '✨ Once upon a time...' : isEnd ? '🌙 The End...' : '📖 Page ' + i) + '</div><div class="page-text' + (isEnd ? ' italic' : '') + '">' + text + '</div>';
    page.appendChild(body);
    container.appendChild(page);
  });
  window.scrollTo({top:0, behavior:'smooth'});
}

function continueFromJournal() {
  const journal = getJournal();
  if (!journal.length) return;
  window._continueEntry = journal[0];
  document.getElementById('journalScreen').style.display = 'none';
  document.getElementById('setupScreen').style.display = 'block';
  // Show continuation notice
  const warn = document.getElementById('warn');
  warn.className = 'warning show';
  warn.style.background = 'rgba(56,239,125,.1)';
  warn.style.borderColor = 'rgba(56,239,125,.3)';
  warn.style.color = '#38ef7d';
  warn.innerHTML = '✨ <strong>Continuing the adventure!</strong> The next story will pick up where "' + journal[0].title + '" left off 🌙';
  window.scrollTo({top:0, behavior:'smooth'});
}

// ── INIT on page load ──
document.addEventListener('DOMContentLoaded', () => {
  updateJournalBadge();
});
