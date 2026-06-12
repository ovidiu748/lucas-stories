// ── PILL SELECTION ──
document.getElementById('heroName').addEventListener('input', function() {
  this.value = this.value.replace(/[^a-zA-Z\s'-]/g, '').slice(0, 30);
});
document.querySelectorAll('.pill').forEach(p => {
  p.addEventListener('click', () => {
    document.querySelectorAll('.pill[data-group="' + p.dataset.group + '"]').forEach(x => x.classList.remove('selected'));
    p.classList.add('selected');
  });
});
const sel = g => { const e = document.querySelector('.pill[data-group="' + g + '"].selected'); return e ? e.dataset.value : null; };

// ── SCENES ──
const SCENES = {
  football:  {sky:'sky-football', gnd:'gnd-green',  skyE:['☀️','⛅','🌤️','☁️'],  mid:['🌳','🌲','🌳','🌲'], hero:'🧒', props:['⚽','🥅'], sup:['🧑','👦'], sparks:['#FFD700','#FFF','#38ef7d','#87CEEB']},
  trains:    {sky:'sky-adventure',gnd:'gnd-green',  skyE:['🌤️','☁️','🌈','⭐'],  mid:['🌳','🏔️','🌲','🌉'], hero:'🧒', props:['🚂','🎫'], sup:['🚃','🧑'], sparks:['#FF6B35','#FFD700','#FFF','#87CEEB']},
  unicorns:  {sky:'sky-fairies',  gnd:'gnd-pink',   skyE:['🌈','✨','💫','🌸'],  mid:['🌈','🌺','🌷','💐'], hero:'🧒', props:['🦄','🌈'], sup:['🧚','🦋'], sparks:['#ff9a9e','#DA22FF','#FFD700','#FFF']},
  cooking:   {sky:'sky-circus',   gnd:'gnd-sand',   skyE:['✨','⭐','🌟','💫'],  mid:['🍰','🌟','🎂','✨'], hero:'🧒', props:['🍳','👨🍳'], sup:['🧑🍳','🐱'], sparks:['#f7ca18','#FF6B35','#FFF','#38ef7d']},
  ballet:    {sky:'sky-fairies',  gnd:'gnd-pink',   skyE:['✨','🌟','💫','🌸'],  mid:['🎭','✨','🌷','⭐'], hero:'🧒', props:['🩰','🌹'], sup:['🧚','🦢'], sparks:['#ff9a9e','#fad0c4','#FFF','#DA22FF']},
  robots:    {sky:'sky-games',    gnd:'gnd-pixel',  skyE:['⭐','💡','🌟','✨'],  mid:['🤖','💡','⚙️','🔧'], hero:'🧒', props:['🤖','⚙️'], sup:['🦾','🛸'], sparks:['#4776E6','#00FF88','#FFD700','#FFF']},
  jungle:    {sky:'sky-dinos',    gnd:'gnd-jungle', skyE:['🌤️','🦋','🌿','🌺'], mid:['🌴','🌿','🌳','🍃'], hero:'🧒', props:['🌺','🦜'], sup:['🐒','🦜'], sparks:['#56ab2f','#a8e063','#FFD700','#FFF']},
  rugby:     {sky:'sky-rugby',    gnd:'gnd-green',  skyE:['⛅','☀️','🌈','🌤️'],  mid:['🌿','🌳','🌿','🌳'], hero:'🧒', props:['🏉','🏆'], sup:['🧑','👦'], sparks:['#FFD700','#FFA500','#FFF','#a8e063']},
  books:     {sky:'sky-books',    gnd:'gnd-dark',   skyE:['🌙','⭐','💫','✨'],   mid:['📚','🕯️','📚','🪄'], hero:'🧒', props:['📖','✨'], sup:['🦉','🐱'], sparks:['#DA22FF','#9733EE','#FFD700','#fff']},
  adventure: {sky:'sky-adventure',gnd:'gnd-jungle', skyE:['🌅','🦋','🌟','🌸'],  mid:['🌳','🌴','🌳','🌴'], hero:'🧒', props:['🗺️','💎'], sup:['🦊','🐰'], sparks:['#f953c6','#FFD700','#38ef7d','#FFF']},
  space:     {sky:'sky-space',    gnd:'gnd-space',  skyE:['⭐','🌟','💫','🌙'],   mid:['🪐','⭐','🌌','✨'], hero:'🧒', props:['🚀','🌍'], sup:['👽','🤖'], sparks:['#4776E6','#8E54E9','#FFD700','#fff']},
  dinos:     {sky:'sky-dinos',    gnd:'gnd-jungle', skyE:['☀️','🌤️','🦋','🌿'], mid:['🌴','🌿','🌴','🌿'], hero:'🧒', props:['🦕','🥚'], sup:['🦖','🦕'], sparks:['#56ab2f','#FFD700','#a8e063','#FFF']},
  ocean:     {sky:'sky-ocean',    gnd:'gnd-ocean',  skyE:['🐬','🐋','🦈','🐙'],  mid:['🪸','🌊','🪸','🐠'], hero:'🧒', props:['🧜','🐚'], sup:['🐟','🦀'], sparks:['#43e8d8','#1a6fe0','#FFF','#87CEEB']},
  superhero: {sky:'sky-superhero',gnd:'gnd-city',   skyE:['⭐','💥','🌙','✨'],   mid:['🏙️','⚡','🏙️','💫'],hero:'🧒', props:['⚡','🦸'], sup:['🦸','🦹'], sparks:['#c0392b','#f7ca18','#FFF','#4776E6']},
  castle:    {sky:'sky-castle',   gnd:'gnd-stone',  skyE:['🌙','⭐','🌟','🏰'],  mid:['🏰','🌲','🏰','🌲'], hero:'🧒', props:['⚔️','🐉'], sup:['🧙','🤴'], sparks:['#e0b85a','#7b4f12','#FFF','#9b59b6']},
  circus:    {sky:'sky-circus',   gnd:'gnd-sand',   skyE:['🌟','✨','🎪','⭐'],   mid:['🎪','🎡','🎪','🎠'], hero:'🧒', props:['🎩','🎭'], sup:['🤹','🐘'], sparks:['#e52d27','#f7ca18','#FFF','#ff9a9e']},
  fairies:   {sky:'sky-fairies',  gnd:'gnd-pink',   skyE:['🌸','✨','🌺','💫'],   mid:['🌺','🌸','🌷','🌻'], hero:'🧒', props:['🧚','🌈'], sup:['🦋','🐝'], sparks:['#ff9a9e','#fad0c4','#DA22FF','#FFF']},
  forest:    {sky:'sky-forest',   gnd:'gnd-moss',   skyE:['🌙','🍄','✨','🦋'],   mid:['🌲','🍄','🌳','🌿'], hero:'🧒', props:['🍄','🔮'], sup:['🦊','🦉'], sparks:['#71b280','#134e5e','#FFD700','#FFF']},
  pirates:   {sky:'sky-pirates',  gnd:'gnd-deck',   skyE:['🌊','⭐','🌙','🦜'],   mid:['⚓','🌊','🌊','🌊'], hero:'🧒', props:['🗺️','💰'], sup:['🦜','🐙'], sparks:['#4286f4','#FFD700','#FFF','#373b44']},
  games:     {sky:'sky-games',    gnd:'gnd-pixel',  skyE:['⭐','💎','🌟','✨'],   mid:['🕹️','⭐','💎','🌟'], hero:'🧒', props:['🎮','👾'], sup:['👾','🤖'], sparks:['#6a11cb','#2575fc','#FFD700','#FFF']},
  safari:    {sky:'sky-safari',   gnd:'gnd-savanna',skyE:['☀️','🌤️','🦅','☀️'], mid:['🌴','🌾','🌴','🌾'], hero:'🧒', props:['🦒','🐘'], sup:['🦁','🦓'], sparks:['#f4a623','#e8804a','#FFD700','#FFF']},
  seasons:   {sky:'sky-seasons',  gnd:'gnd-snow',   skyE:['❄️','⛄','🌨️','✨'],  mid:['🌲','⛄','🌲','❄️'], hero:'🧒', props:['❄️','🌈'], sup:['🦊','🐿️'],sparks:['#89f7fe','#66a6ff','#FFF','#b8ecff']},
};

function buildScene(theme, pageType) {
  const s = SCENES[theme] || SCENES.adventure;
  const isEnd = pageType === 'end';
  const skyC = isEnd ? 'sky-night' : s.sky;
  const gndC = isEnd ? 'gnd-night' : s.gnd;
  const skyE = isEnd ? ['🌙','⭐','💫','🌟'] : s.skyE;
  const midE = isEnd ? ['🌙','✨','💤','🌟'] : s.mid;
  const heroE = isEnd ? '🧒💤' : s.hero;
  const propsE = isEnd ? ['🌙','💤'] : s.props;
  let h = '<div class="scene ' + skyC + '">';
  skyE.forEach((e,i) => { h += '<div class="s-sky-obj k'+(i+1)+'">'+e+'</div>'; });
  midE.forEach((e,i) => { h += '<div class="s-mid m'+(i+1)+'">'+e+'</div>'; });
  h += '<div class="s-ground ' + gndC + '"></div>';
  propsE.forEach((e,i) => { h += '<div class="s-prop p'+(i+1)+'">'+e+'</div>'; });
  if (pageType !== 'title') s.sup.forEach((e,i) => { h += '<div class="s-support c'+(i+1)+'">'+e+'</div>'; });
  h += '<div class="s-hero">'+heroE+'</div>';
  for (let i=0;i<18;i++) {
    const c=s.sparks[i%s.sparks.length], sz=(5+Math.random()*7).toFixed(1);
    h += '<div class="s-spark" style="left:'+(Math.random()*92).toFixed(1)+'%;top:'+(Math.random()*80).toFixed(1)+'%;width:'+sz+'px;height:'+sz+'px;background:'+c+';animation-delay:'+(Math.random()*2.5).toFixed(2)+'s;animation-duration:'+(1.4+Math.random()*1.8).toFixed(2)+'s;"></div>';
  }
  return h + '</div>';
}

// ── IMAGE PROMPTS ──
const IMG_PROMPTS = {
  football: ['cute child playing football sunny green pitch golden light storybook watercolour','child scoring amazing football goal crowd cheering storybook art','brave little football hero with trophy magical stadium storybook','child sleeping dreaming football moonlight soft illustration'],
  rugby:    ['cute child in rugby kit green field sunny storybook watercolour','child scoring rugby try teammates cheering magical field children book art','brave little rugby hero with trophy storybook warm colours','child sleeping dreaming rugby moonlight soft illustration'],
  books:    ['cute child in magical glowing library books floating enchanted purple light storybook','child stepping inside magical book world fantasy glowing watercolour','brave child finding treasure inside enchanted books sparkles storybook','child sleeping surrounded glowing storybooks moonlight cosy illustration'],
  adventure:['cute child explorer with map enchanted forest friendly animals golden sunset storybook','child meeting friendly fox rabbit magical forest storybook vivid','brave child finding magical hidden treasure enchanted land sparkles','child sleeping under stars magical forest moonlight cosy illustration'],
  space:    ['cute child astronaut tiny rocket colourful galaxy friendly planets storybook','child floating space meeting friendly alien colourful nebula illustration','brave little astronaut discovering magical space treasure stars storybook','child sleeping rocket ship among stars moonlight cosy peaceful'],
  dinos:    ['cute child with friendly smiling dinosaur lush jungle bright storybook watercolour','child riding friendly dinosaur magical prehistoric forest flowers storybook','brave child dinosaur friends finding magical egg jungle adventure','child sleeping cuddled small friendly dinosaur moonlight cosy jungle'],
  ocean:    ['cute child swimming with friendly dolphins colourful coral reef underwater storybook','child meeting smiling mermaid magical underwater kingdom sparkles illustration','brave child discovering sunken treasure chest friendly fish ocean storybook','child sleeping in cosy seashell moonlight soft waves gentle illustration'],
  superhero:['cute child wearing superhero cape flying over glittering city night storybook','child superhero saving friendly kitten from tall tree magical illustration','brave young superhero defeating silly villain with kindness children storybook','child superhero sleeping cosy bed cape glowing stars moonlight illustration'],
  castle:   ['cute child in shining armour friendly castle courtyard storybook watercolour','child knight befriending small friendly dragon magical castle tower illustration','brave child finding enchanted sword magical kingdom sparkles children storybook','child knight sleeping cosy castle room moonlight soft candles illustration'],
  circus:   ['cute child in circus tent friendly acrobats colourful lights storybook watercolour','child performing magic trick friendly audience sparkles circus illustration','brave child with friendly elephant magical circus ring confetti storybook','child sleeping in cosy circus caravan moonlight stars twinkling illustration'],
  fairies:  ['cute child dancing with friendly fairies enchanted flower garden storybook','child discovering tiny fairy village inside mushroom ring magical illustration','brave child and fairy friends finding rainbow treasure magical garden storybook','child sleeping in flower meadow moonlight fairies glowing soft warm illustration'],
  forest:   ['cute child meeting friendly talking fox enchanted forest storybook watercolour','child discovering magical glowing mushroom village forest creatures illustration','brave child and woodland friends solving magical mystery enchanted forest','child sleeping under giant oak tree moonlight forest animals watching soft'],
  pirates:  ['cute child captain sailing friendly pirate ship sunny ocean storybook','child pirate discovering treasure island friendly parrot map illustration','brave child pirate crew finding magical golden treasure chest storybook','child pirate sleeping hammock below deck moonlight waves gentle illustration'],
  games:    ['cute child jumping into magical video game world colourful pixels storybook','child hero collecting golden coins friendly game characters magical illustration','brave child defeating silly game boss with kindness sparkles storybook','child sleeping cosy bed magical game world glowing screen moonlight'],
  safari:   ['cute child riding friendly giraffe sunny golden savanna storybook watercolour','child meeting smiling lion family waterhole magical africa illustration','brave child helping friendly elephant baby magical savanna sparkles storybook','child sleeping under acacia tree moonlight friendly animals gathered illustration'],
  seasons:  ['cute child playing in magical sparkling snow friendly snowman winter storybook','child discovering spring fairy garden flowers blooming magical illustration','brave child surfing golden autumn leaves friendly squirrels storybook','child sleeping cosy fireplace winter moonlight snowflakes falling soft illustration'],
  trains:   ['cute child waving from magical steam train colourful countryside storybook','child exploring mountain tunnels on magical rainbow train adventure illustration','brave child conductor discovering hidden treasure at secret station storybook','child sleeping cosy train cabin moonlight passing stars soft illustration'],
  unicorns: ['cute child riding magical unicorn rainbow meadow sparkles storybook watercolour','child and unicorn friend flying over rainbow waterfall magical kingdom illustration','brave child and unicorn finding enchanted crystal caves sparkles storybook','child sleeping cuddled fluffy unicorn moonlight rainbow glow soft illustration'],
  cooking:  ['cute child in magical kitchen making rainbow cupcakes sparkles storybook','child discovering enchanted cookbook magical ingredients come to life illustration','brave child chef winning magical baking contest with friendly animals storybook','child sleeping dreaming of magical sweet treats moonlight kitchen cosy illustration'],
  ballet:   ['cute child in tutu dancing on magical stage sparkling lights storybook','child performing beautiful ballet with friendly fairy audience magical theatre illustration','brave child dancer finding enchanted ballet shoes sparkles dance show storybook','child sleeping in ballet shoes dreaming of dancing moonlight soft illustration'],
  robots:   ['cute child building friendly robot magical workshop sparkling lights storybook','child and robot friend exploring magical technology city adventure illustration','brave child and robot solving mystery with kindness sparkles storybook','child sleeping cuddled glowing friendly robot moonlight soft bedroom illustration'],
  jungle:   ['cute child swinging with friendly monkeys colourful jungle storybook watercolour','child meeting wise parrot magical waterfall hidden jungle temple illustration','brave child and jungle animal friends discovering golden treasure storybook','child sleeping in cosy jungle treehouse moonlight fireflies glowing soft illustration'],
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function generateImage(theme, pageIdx) {
  const prompts = IMG_PROMPTS[theme] || IMG_PROMPTS.adventure;
  const prompt = (prompts[Math.min(pageIdx, prompts.length-1)] || prompts[0]) + ', children storybook illustration, no text, watercolour style, warm colours, beautiful, safe for children, high quality, detailed';
  try {
    const url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt) + '?width=768&height=432&seed=' + Math.floor(Math.random()*999999) + '&nologo=true&enhance=true&model=flux';
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    if (blob.size < 1000) return null;
    return URL.createObjectURL(blob);
  } catch { return null; }
}

// ── STORY PROMPTS ──
const THEME_MAP = {
  football:'football — goals, teamwork, the beautiful game',rugby:'rugby — scrums, tries, being brave on the field',
  books:'magical books that come to life with wonder and spells',adventure:'grand adventure in an enchanted land with treasure and friendship',
  space:'outer space — rockets, friendly planets, and curious aliens',dinos:'friendly funny dinosaurs in a prehistoric jungle',
  ocean:'ocean adventures — mermaids, dolphins, colourful coral reefs',superhero:'superheroes — flying through the sky, saving the day with kindness',
  castle:'castles and knights — brave quests, friendly dragons, magical kingdoms',circus:'circus and magic — acrobats, magicians, performing animals',
  fairies:'fairies and pixies — tiny magical worlds, enchanted gardens, rainbow dust',forest:'enchanted forest — talking animals, woodland spirits, magical mushroom villages',
  pirates:'friendly pirates — treasure maps, sailing ships, discovering magical islands',games:'jumping inside a magical video game — collecting coins, defeating silly villains',
  safari:'African safari — friendly lions, giraffes and elephants on the golden savanna',seasons:'seasons and nature — magical snow days, spring flowers, autumn leaves',
  trains:'magical steam trains — racing through tunnels, mountains and secret stations',unicorns:'unicorns and rainbows — magical meadows, sparkles and enchanted crystals',
  cooking:'magical cooking — enchanted recipes, friendly animals, and delicious adventures',ballet:'ballet and dance — magical stages, sparkling tutus, and graceful fairies',
  robots:'friendly robots — magical inventions, glowing cities, and clever little helpers',jungle:'wild jungle adventure — friendly monkeys, colourful parrots, hidden temples',
};
const MOOD_MAP = {
  exciting:'exciting and action-packed, ending peacefully',funny:'funny and silly with jokes a 5-year-old will love',
  calm:'calm, warm and soothing — perfect for drifting to sleep',magical:'full of wonder, sparkles and magical surprises',
};

const LANG_MAP = {
  en: { name:'English',    locale:'en-GB', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in ENGLISH ONLY. Every word of the TITLE and every PAGE must be in English. No other language allowed.' },
  fr: { name:'French',     locale:'fr-FR', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in FRENCH ONLY (langue francaise). Every word of the TITLE and every PAGE must be in French. Use natural, beautiful, poetic French as found in classic French childrens books. No other language allowed.' },
  es: { name:'Spanish',    locale:'es-ES', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in SPANISH ONLY (idioma espanol). Every word of the TITLE and every PAGE must be in Spanish. Use natural, warm, poetic Spanish as found in classic Spanish childrens books. No other language allowed.' },
  pt: { name:'Portuguese', locale:'pt-BR', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in BRAZILIAN PORTUGUESE ONLY (lingua portuguesa). Every word of the TITLE and every PAGE must be in Portuguese. Use natural, warm, poetic Portuguese as found in classic Brazilian childrens books. No other language allowed.' },
  de: { name:'German',     locale:'de-DE', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in GERMAN ONLY (deutsche Sprache). Every word of the TITLE and every PAGE must be in German. Use natural, warm, poetic German as found in classic German childrens books. No other language allowed.' },
  it: { name:'Italian',    locale:'it-IT', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in ITALIAN ONLY (lingua italiana). Every word of the TITLE and every PAGE must be in Italian. Use natural, warm, poetic Italian as found in classic Italian childrens books. No other language allowed.' },
  nl: { name:'Dutch',      locale:'nl-NL', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in DUTCH ONLY (Nederlandse taal). Every word of the TITLE and every PAGE must be in Dutch. Use natural, warm, poetic Dutch as found in classic Dutch childrens books. No other language allowed.' },
  pl: { name:'Polish',     locale:'pl-PL', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in POLISH ONLY (jezyk polski). Every word of the TITLE and every PAGE must be in Polish. Use natural, warm, poetic Polish as found in classic Polish childrens books. No other language allowed.' },
  ar: { name:'Arabic',     locale:'ar-SA', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in ARABIC ONLY (al-lugha al-arabiyya). Every word of the TITLE and every PAGE must be in Arabic script. Use natural, warm, poetic Modern Standard Arabic suitable for children. No other language allowed.' },
  zh: { name:'Chinese',    locale:'zh-CN', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in SIMPLIFIED CHINESE ONLY (Zhongwen). Every word of the TITLE and every PAGE must be in Chinese characters. Use natural, warm, poetic Mandarin Chinese as found in classic Chinese childrens books. No other language allowed.' },
  ro: { name:'Romanian',   locale:'ro-RO', instruction:'CRITICAL INSTRUCTION: You MUST write the ENTIRE story in ROMANIAN ONLY (limba romana). Every single word — TITLE and all PAGES — must be in Romanian. No English or other language allowed.\n\nROMANIAN GRAMMAR RULES — follow strictly:\n1. PRONOUN CASES: Use correct Romanian relative pronouns — "caruia ii placea" (NOT "care ii placea"), "careia ii apartinea" (NOT "care ii apartinea"). Always match pronoun case to function.\n2. CONJUNCTIONS: NEVER repeat "si" more than once per sentence. Instead vary with: "iar" (to contrast/continue), "in timp ce" (while), "de asemenea" (also), "totodata" (at the same time), "apoi" (then), "insa" (but), "asadar" (so). Use a comma or full stop instead of "si" where possible.\n3. NO COMMA before "si" when joining two parts of the same type.\n4. VERB AGREEMENT: Verbs must agree in person, number and gender with their subject.\n5. STYLE: Write like a beloved Romanian author writing for children — warm, lyrical, flowing. NOT like a translation from English. Use natural Romanian word order and expressions.\n6. AVOID: Repetitive sentence structures, repetitive vocabulary, awkward calques from English.' },
};


function buildPrompt(name, theme, mood, length, lang) {
  const pages = length === 'long' ? 5 : 3;
  const wpg = length === 'long' ? 75 : 95;
  let mid = '';
  for (let i=2; i<pages; i++) mid += 'PAGE '+i+':\n[story continues ~'+wpg+' words]\n\n';
  const langInstr = (LANG_MAP[lang] || LANG_MAP.en).instruction;
  return langInstr+'\n\nWrite a beautiful bedtime storybook for a 5-year-old named '+name+'.\nTheme: '+(THEME_MAP[theme]||theme)+'\nMood: '+(MOOD_MAP[mood]||mood)+'\nPages: exactly '+pages+'\n\nFORMAT:\nTITLE: [title]\n\nPAGE 1:\n[opening ~'+wpg+' words]\n\n'+mid+'PAGE '+pages+':\n[peaceful ending, '+name+' drifts to sleep ~'+wpg+' words]\n\nRules: '+name+' is the hero. Simple language for age 5. No scary content. Each PAGE is one paragraph. Make '+name+' feel loved.';
}

function buildContinuationPrompt(name, theme, mood, length, prevEntry, lang) {
  const pages = length === 'long' ? 5 : 3;
  const wpg = length === 'long' ? 75 : 95;
  let mid = '';
  for (let i=2; i<pages; i++) mid += 'PAGE '+i+':\n[story continues ~'+wpg+' words]\n\n';
  const langInstr = (LANG_MAP[lang] || LANG_MAP.en).instruction;
  return langInstr+'\n\nWrite a CONTINUATION bedtime storybook for a 5-year-old named '+name+'.\n\nPREVIOUS STORY ENDED:\n"'+prevEntry.lastPage.slice(0,300)+'"\n\nThis is Episode '+(getJournal().length+1)+' continuing that adventure.\nTheme: '+theme+'\nMood: '+(MOOD_MAP[mood]||mood)+'\nPages: exactly '+pages+'\n\nFORMAT:\nTITLE: [new episode title]\n\nPAGE 1:\n[1 sentence warm recap, then new adventure ~'+wpg+' words]\n\n'+mid+'PAGE '+pages+':\n[peaceful ending, '+name+' drifts to sleep, hint at next adventure ~'+wpg+' words]\n\nRules: Reference characters from before. Simple language for age 5. No scary content. End with gentle cliffhanger hint for tomorrow.';
}

function parseStory(raw) {
  let title = 'Bedtime Storybook ✨', pages = [], cur = null;
  for (const line of raw.split('\n')) {
    const tM = line.match(/^TITLE:\s*(.+)/i);
    if (tM) { title = tM[1].trim(); continue; }
    const pM = line.match(/^PAGE\s*\d+\s*:/i);
    if (pM) { if (cur !== null) pages.push(cur.trim()); cur = ''; continue; }
    if (cur !== null) cur += line + '\n';
  }
  if (cur?.trim()) pages.push(cur.trim());
  return { title, pages };
}

function renderBook(storyData, theme, name, imgUrls) {
  document.getElementById('bookTitle').textContent = storyData.title;
  document.getElementById('bookSub').textContent = 'A magical story for ' + name + ' ✨';
  const container = document.getElementById('pages');
  container.innerHTML = '';
  storyData.pages.forEach((text, i) => {
    const isTitle = i === 0, isEnd = i === storyData.pages.length - 1;
    const pType = isTitle ? 'title' : isEnd ? 'end' : 'story';
    const page = document.createElement('div');
    page.className = 'page ' + (isTitle ? 'title-page' : isEnd ? 'end-page' : 'story-page');
    const illusDiv = document.createElement('div');
    illusDiv.className = 'page-illus';
    if (imgUrls && imgUrls[i]) {
      const img = document.createElement('img');
      img.src = imgUrls[i];
      img.alt = 'Illustration ' + (i+1);
      img.onerror = () => { illusDiv.innerHTML = buildScene(theme, pType); };
      illusDiv.appendChild(img);
    } else {
      illusDiv.innerHTML = buildScene(theme, pType);
    }
    const badge = document.createElement('div');
    badge.className = 'page-num-badge';
    badge.textContent = isTitle ? '📖' : 'Page ' + i;
    illusDiv.appendChild(badge);
    if (isTitle) {
      const ov = document.createElement('div');
      ov.className = 'title-overlay';
      ov.innerHTML = '<h2>' + storyData.title + '</h2><p>A bedtime story for ' + name + ' ✨</p>';
      illusDiv.appendChild(ov);
    }
    page.appendChild(illusDiv);
    const body = document.createElement('div');
    body.className = 'page-body';
    body.innerHTML = '<div class="page-chapter">' + (isTitle ? '✨ Once upon a time...' : isEnd ? '🌙 The End...' : '📖 Page ' + i) + '</div><div class="page-text' + (isEnd ? ' italic' : '') + '">' + text + '</div>';
    page.appendChild(body);
    container.appendChild(page);
  });
}

function setProgress(pct) { document.getElementById('progFill').style.width = pct + '%'; }

let lastStory = null;
let lastTheme = 'football';
let lastName = 'Lucas';
let lastLang = 'en';

async function generate(isContinuation) {
  const name = document.getElementById('heroName').value.trim().replace(/[^a-zA-Z\s'-]/g,'').trim() || 'Lucas';
  const theme = sel('theme') || 'football';
  const mood = sel('mood') || 'exciting';
  const len = sel('len') || 'short';
  const lang = sel('lang') || 'en';
  lastName = name; lastTheme = theme; lastLang = lang;
  const warn = document.getElementById('warn');
  warn.className = 'warning'; warn.style = '';
  document.getElementById('setupScreen').style.display = 'none';
  document.getElementById('bookScreen').classList.remove('show');
  document.getElementById('loadScreen').classList.add('show');
  document.getElementById('btnGo').disabled = true;
  setProgress(5);
  const continueEntry = window._continueEntry || null;
  window._continueEntry = null;
  try {
    document.getElementById('loadTitle').textContent = continueEntry ? '✨ Continuing the adventure...' : '✍️ Writing the story...';
    document.getElementById('loadSub').innerHTML = 'The story fairies are weaving magic! ✨';
    setProgress(15);
    const prompt = continueEntry ? buildContinuationPrompt(name, theme, mood, len, continueEntry, lang) : buildPrompt(name, theme, mood, len, lang);
    const res = await fetch('/api/story', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'llama-3.3-70b-versatile',
        messages:[
          {role:'system', content:"You are a magical children's storybook author with native fluency in all world languages. Write warm, imaginative bedtime stories for young children aged 3-7. Always follow the exact page format. Never include violence, fear, or adult themes. When writing in a specific language, you write as a NATIVE author of that language - not a translator. Your grammar, idioms and style are always natural and correct for that language."},
          {role:'user', content: prompt}
        ],
        temperature:0.85, max_tokens: len==='long' ? 1400 : 900
      })
    });
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.error||'HTTP '+res.status); }
    const data = await res.json();
    const storyData = parseStory(data.choices[0].message.content.trim());
    lastStory = storyData;
    setProgress(40);
    document.getElementById('loadTitle').textContent = '🎨 Painting the illustrations...';
    const imgUrls = [];
    for (let i=0; i<storyData.pages.length; i++) {
      setProgress(Math.round(40+(i/storyData.pages.length)*55));
      document.getElementById('loadSub').innerHTML = '🖌️ Painting illustration '+(i+1)+' of '+storyData.pages.length+'... ✨';
      imgUrls.push(await generateImage(theme, i));
    }
    setProgress(98);
    renderBook(storyData, theme, name, imgUrls);
    saveToJournal(name, theme, storyData);
    document.getElementById('loadScreen').classList.remove('show');
    document.getElementById('bookScreen').classList.add('show');
    document.getElementById('btnGo').disabled = false;
    setProgress(100);
    window.scrollTo({top:0, behavior:'smooth'});
  } catch(err) {
    document.getElementById('loadScreen').classList.remove('show');
    document.getElementById('setupScreen').style.display = 'block';
    document.getElementById('btnGo').disabled = false;
    setProgress(0);
    warn.className = 'warning show';
    warn.innerHTML = '😔 <strong>Oops!</strong> ' + err.message + '<br/><small>Please try again ✨</small>';
  }
}

function continueStory() {
  const journal = getJournal();
  if (!journal.length) { newStory(); return; }
  window._continueEntry = journal[0];
  document.getElementById('bookScreen').classList.remove('show');
  document.getElementById('setupScreen').style.display = 'block';
  generate();
}

function backSetup() {
  document.getElementById('bookScreen').classList.remove('show');
  document.getElementById('setupScreen').style.display = 'block';
  window.scrollTo({top:0, behavior:'smooth'});
}
function newStory() { backSetup(); }

function readBook() {
  if (!lastStory) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(lastStory.title + '. ' + lastStory.pages.join(' ... '));
  utt.rate = .82; utt.pitch = 1.05; utt.volume = 1;
  const langConf = LANG_MAP[lastLang] || LANG_MAP.en;
  utt.lang = langConf.locale;
  const voices = window.speechSynthesis.getVoices();
  const pref = voices.find(v => v.lang.startsWith(langConf.locale.split('-')[0]) && v.name.includes('Google'))
            || voices.find(v => v.lang.startsWith(langConf.locale.split('-')[0]))
            || voices.find(v => v.name.includes('Google UK') || v.name.includes('Daniel') || v.lang==='en-GB');
  if (pref) utt.voice = pref;
  window.speechSynthesis.speak(utt);
}
function stopReading() { window.speechSynthesis.cancel(); }
window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();

// ── SHARE STORY ──
async function shareStory() {
  if (!lastStory) return;
  const title = lastStory.title;
  const text = '🌙 Tonight\'s bedtime story: "' + title + '" — a magical AI-generated story for ' + lastName + ' ✨\n\nCreate your own free story at: https://lucas-stories.vercel.app';
  if (navigator.share) {
    try {
      await navigator.share({ title: '✨ ' + title, text });
    } catch(e) { if (e.name !== 'AbortError') fallbackCopyShare(text); }
  } else {
    fallbackCopyShare(text);
  }
}
function fallbackCopyShare(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      const btn = document.querySelector('[onclick="shareStory()"]');
      const orig = btn.textContent;
      btn.textContent = '✅ Copied!';
      setTimeout(() => btn.textContent = orig, 2000);
    })
    .catch(() => alert('Share this story:\n\nhttps://lucas-stories.vercel.app'));
}

// ── PRINT / SAVE AS PDF ──
function printStory() {
  if (!lastStory) return;
  const heroName = lastName || 'Our Hero';
  const storyTitle = lastStory.title;
  const pages = lastStory.pages;
  const date = new Date().toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});

  const printContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>${storyTitle}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&family=Fredoka+One&family=Lora:ital,wght@0,400;1,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Nunito', sans-serif; background: #fff; color: #1a1a2e; padding: 40px; max-width: 700px; margin: 0 auto; }
  .print-header { text-align: center; padding: 30px 20px 24px; background: linear-gradient(135deg, #302b63, #0f0c29); color: #fff; border-radius: 18px; margin-bottom: 32px; }
  .print-header .moon { font-size: 3em; display: block; margin-bottom: 10px; }
  .print-header h1 { font-family: 'Fredoka One', cursive; font-size: 2em; color: #FFD700; line-height: 1.2; }
  .print-header p { color: rgba(255,255,255,.65); margin-top: 6px; font-size: .9em; }
  .print-page { border: 2px solid #e8d9f0; border-radius: 16px; padding: 24px 28px; margin-bottom: 22px; page-break-inside: avoid; }
  .print-page:first-of-type { background: linear-gradient(135deg, #fdf6ff, #f0e8ff); border-color: #c9a0dc; }
  .page-label { font-size: .7em; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #9b59b6; margin-bottom: 8px; }
  .page-text { font-family: 'Lora', serif; font-size: 1.05em; line-height: 1.9; color: #2c2c4a; }
  .page-text.italic { font-style: italic; color: #5a4a7a; }
  .print-footer { text-align: center; padding: 20px; color: #9b8ab0; font-size: .8em; margin-top: 12px; border-top: 1px solid #e8d9f0; }
  @media print {
    body { padding: 20px; }
    .print-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .print-page:first-of-type { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="print-header">
  <span class="moon">🌙</span>
  <h1>${storyTitle}</h1>
  <p>A magical bedtime story for ${heroName} · ${date} ✨</p>
</div>
${pages.map((p, i) => {
  const isFirst = i === 0, isLast = i === pages.length - 1;
  const label = isFirst ? '✨ Once upon a time...' : isLast ? '🌙 The End...' : '📖 Page ' + i;
  return '<div class="print-page"><div class="page-label">' + label + '</div><div class="page-text' + (isLast ? ' italic' : '') + '">' + p + '</div></div>';
}).join('')}
<div class="print-footer">Made with ❤️ by Bedtime Storybook · lucas-stories.vercel.app · Sweet dreams 🌙</div>
</body></html>`;

  const w = window.open('', '_blank', 'width=750,height=900');
  w.document.write(printContent);
  w.document.close();
  w.onload = () => { w.focus(); w.print(); };
}

function copyBook() {
  if (!lastStory) return;
  const txt = lastStory.title + '\n\n' + lastStory.pages.map((p,i)=>'Page '+(i+1)+':\n'+p).join('\n\n');
  navigator.clipboard.writeText(txt).then(()=>alert('Story copied! 📋')).catch(()=>alert('Select text manually to copy.'));
}

// ── PWA ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(()=>{}); });
}
let deferredPrompt = null;
const banner = document.getElementById('installBanner');
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); deferredPrompt = e;
  setTimeout(() => { if (deferredPrompt) banner.classList.add('show'); }, 3000);
});
document.getElementById('installBtn').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt(); await deferredPrompt.userChoice;
  deferredPrompt = null; banner.classList.remove('show');
});
document.getElementById('dismissInstall').addEventListener('click', () => banner.classList.remove('show'));
window.addEventListener('appinstalled', () => { banner.classList.remove('show'); deferredPrompt = null; });
