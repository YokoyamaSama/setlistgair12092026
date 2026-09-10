(() => {
  'use strict';
  const data = window.GAIR_DATA, music = window.GAIR_MUSIC, app = document.getElementById('app');
  const STORE = 'gair.setlist.v1:' + location.pathname.replace(/index\.html$/, '');
  let saved = { songs: {}, size: 18, notation: 'letters' }, storageOK = true, wakeLock = null;
  try {
    let old=null;
    try { old=JSON.parse(localStorage.getItem(STORE) || 'null'); } catch { /* Recover a damaged saved value. */ }
    if (old && typeof old === 'object') {
      if (old.songs && typeof old.songs === 'object') for (const song of data.songs) {
        if (music.ALL_KEYS.includes(old.songs[song.id])) saved.songs[song.id] = old.songs[song.id];
      }
      if (Number.isFinite(old.size)) saved.size = Math.max(16, Math.min(24, old.size));
      if (old.notation === 'solfege') saved.notation = 'solfege';
    }
    localStorage.setItem(STORE, JSON.stringify(saved));
  } catch { storageOK = false; }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const targetKey = song => saved.songs[song.id] || song.key;
  const show = c => music.display(c, saved.notation);
  const verse = id => {
    const v = data.verses[id];
    return v ? `<blockquote class="verse"><p>“${esc(v.text)}”</p><cite><a href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">${esc(v.ref)} · RVR1960</a></cite></blockquote>` : '';
  };
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(saved)); storageOK = true; }
    catch { storageOK = false; }
    updateStatus();
  }
  function updateStatus() {
    const el = document.getElementById('save-status');
    if (el) { el.textContent = storageOK ? 'Tono guardado en este dispositivo.' : 'El navegador no permite guardar. Este cambio durará mientras la página esté abierta.'; el.classList.toggle('error', !storageOK); }
  }
  function home() {
    document.title = 'Setlist · Alabanza GAIR';
    app.innerHTML = `<div class="home"><header class="home-header"><p class="brand">Alabanza GAIR</p><h1>Cantamos de<br>su <em>gracia.</em></h1><p class="date muted">${esc(data.edition)}</p>${verse('grace')}</header><nav aria-label="Canciones de la setlist"><ol class="song-list">${data.songs.map((song,i) => `<li class="song-row ${song.featured?'featured':''}"><a href="#${song.id}"><span class="song-num">${String(i+1).padStart(2,'0')}</span><span><span class="song-title">${esc(song.title)}</span><span class="artist">${esc(song.artist)}</span></span><span><span class="song-key">${show(targetKey(song))}</span><span class="arrow" aria-hidden="true">›</span></span></a></li>`).join('')}</ol></nav><footer class="home-foot">${verse('love')}<p class="small" id="offline-status">${location.protocol==='file:'?'Abre también esta carpeta en GitHub Pages para disponer de la copia sin conexión.':'Los tonos se guardan automáticamente en este navegador.'}</p><details><summary>Cómo usar la setlist</summary><p class="small">Abre una canción y cambia su tono con − / + o el selector. Cada canción recuerda su propio tono. Los acordes permanecen unidos a sus palabras al cambiar el tamaño de letra. “Original” recupera el tono del archivo que compartiste.</p><p class="small">El guardado pertenece a este navegador y esta dirección. Se puede perder al borrar los datos del sitio o al salir del modo privado. <a href="LEEME.md">Guía y fuentes</a>.</p></details><p class="footer-brand">Su gracia nos reúne.</p></footer></div>`;
    if(!storageOK)document.getElementById('offline-status').textContent='Este navegador no permite guardar los tonos. Los cambios durarán mientras la página esté abierta.';
  }
  // Anchor each chord to a character in the original lyric, then group pieces by
  // whole words. A word and all of its chord anchors always wrap together.
  function renderLine(line, song) {
    const trans = c => esc(show(music.transposeChord(c, song.key, targetKey(song))));
    if (line.instrumental || !line.text.trim()) return `<div class="instrumental" aria-label="Instrumental">${line.chords.map(c => `<span class="chord" data-original="${esc(c.symbol)}">${trans(c.symbol)}</span>`).join('<span class="bar" aria-hidden="true">·</span>')}</div>`;
    const text = line.text, words = [...text.matchAll(/\S+/g)], anchors = new Map(), trailing = [];
    for (const c of line.chords) {
      let at = c.at;
      while (at < text.length && /\s/.test(text[at])) at++;
      if (at >= text.length) { trailing.push(c); continue; }
      if (!anchors.has(at)) anchors.set(at, []);
      anchors.get(at).push(c);
    }
    const hasChords = line.chords.length > 0;
    let html = words.map(word => {
      const start = word.index, end = start + word[0].length;
      const cuts = [start, ...[...anchors.keys()].filter(i => i > start && i < end).sort((a,b)=>a-b), end];
      return `<span class="word">${cuts.slice(0,-1).map((at,j) => {
        const cs = anchors.get(at) || [];
        return `<span class="piece">${hasChords?`<span class="chord">${cs.map(c=>`<span data-original="${esc(c.symbol)}">${trans(c.symbol)}</span>`).join(' ')}</span>`:''}<span class="lyric">${esc(text.slice(at,cuts[j+1]))}</span></span>`;
      }).join('')}</span>`;
    }).join('');
    html += trailing.map(c=>`<span class="word"><span class="piece"><span class="chord" data-original="${esc(c.symbol)}">${trans(c.symbol)}</span><span class="lyric">&nbsp;</span></span></span>`).join('');
    return `<div class="lyric-line ${hasChords?'':'plain'}">${html}</div>`;
  }
  function renderScore(song) {
    document.getElementById('score').innerHTML = song.sections.map((sec,i) => `<section class="song-section" id="section-${i}"><h2>${esc(sec.label)}</h2>${sec.lines.map(line=>renderLine(line,song)).join('')}${verse(sec.verse)}</section>`).join('');
  }
  function reader(song) {
    const index = data.songs.indexOf(song);
    document.title = `${song.title} · Alabanza GAIR`;
    app.innerHTML = `<article class="reader ${song.featured?'featured':''}"><nav class="reader-nav" aria-label="Navegación"><a class="back" href="#">← Setlist</a><span class="number">${String(index+1).padStart(2,'0')} / 05</span></nav><header class="song-head"><h1>${esc(song.title)}</h1><p class="artist">${esc(song.artist)}</p><p class="transpose-label">Tono de la canción · Original ${music.display(song.key,'letters')}</p><div class="transpose"><button class="step" id="down" aria-label="Bajar un semitono">−</button><select class="key-select" id="key" aria-label="Tono de esta canción">${music.ALL_KEYS.map(k=>`<option value="${k}" ${k===targetKey(song)?'selected':''}>${show(k)}</option>`).join('')}</select><button class="step" id="up" aria-label="Subir un semitono">+</button><button class="original" id="original">Original</button></div><p id="save-status" class="save-status" aria-live="polite"></p></header><details class="settings"><summary>Opciones de lectura</summary><div class="settings-body"><label>Tamaño de letra<span class="size-buttons"><button id="smaller" aria-label="Reducir letra">A−</button><output id="size">${saved.size}</output><button id="bigger" aria-label="Aumentar letra">A+</button></span></label><label>Nombre de notas<select id="notation"><option value="letters" ${saved.notation==='letters'?'selected':''}>C · D · E</option><option value="solfege" ${saved.notation==='solfege'?'selected':''}>Do · Re · Mi</option></select></label><button id="awake" class="screen-awake" aria-pressed="false">Mantener pantalla encendida</button><p id="awake-status" class="small"></p><p class="small">♯ = sostenido · ♭ = bemol. Las opciones enarmónicas del selector conservan su escritura musical. Las letras pequeñas después de un acorde son parte de su nombre.</p></div></details><div class="section-jump"><label for="section-select">Ir a una parte</label><select id="section-select"><option value="">Elegir…</option>${song.sections.map((s,i)=>`<option value="${i}">${i+1}. ${esc(s.label)}</option>`).join('')}</select></div><div class="score" id="score"></div><div class="source">${verse(song.verse)}<p>Versión del archivo compartido · Tono base ${music.display(song.key)}<br><a href="${esc(song.source)}" target="_blank" rel="noopener noreferrer">Fuente de letra y acordes ↗</a></p></div><nav class="bottom-nav" aria-label="Continuar en la setlist">${index?`<a href="#${data.songs[index-1].id}">← ${esc(data.songs[index-1].title)}</a>`:'<a href="#">← Setlist</a>'}${index<4?`<a href="#${data.songs[index+1].id}">${esc(data.songs[index+1].title)} →</a>`:'<a href="#">Volver a la setlist →</a>'}</nav></article>`;
    renderScore(song); updateStatus();
    const changeKey = key => { saved.songs[song.id]=key;document.getElementById('key').value=key;renderScore(song);save(); };
    document.getElementById('down').onclick = () => changeKey(music.stepKey(targetKey(song),-1));
    document.getElementById('up').onclick = () => changeKey(music.stepKey(targetKey(song),1));
    document.getElementById('key').onchange = e => changeKey(e.target.value);
    document.getElementById('original').onclick = () => changeKey(song.key);
    function size(by) { saved.size=Math.max(16,Math.min(24,saved.size+by));document.documentElement.style.setProperty('--reading',saved.size+'px');document.getElementById('size').value=saved.size;save(); }
    document.getElementById('smaller').onclick = () => size(-1);
    document.getElementById('bigger').onclick = () => size(1);
    document.getElementById('notation').onchange = e => { saved.notation=e.target.value;renderScore(song);document.querySelectorAll('#key option').forEach(o=>o.textContent=show(o.value));save(); };
    document.getElementById('section-select').onchange = e => { if(e.target.value!=='') document.getElementById('section-'+e.target.value).scrollIntoView({block:'start'}); };
    document.getElementById('awake').onclick = toggleWakeLock;
    updateWakeButton();
  }
  function updateWakeButton() {
    const btn=document.getElementById('awake');if(btn){btn.setAttribute('aria-pressed',String(!!wakeLock));btn.textContent=wakeLock?'Pantalla encendida · Desactivar':'Mantener pantalla encendida';}
  }
  async function toggleWakeLock() {
    const status=document.getElementById('awake-status');
    if(wakeLock){await wakeLock.release();wakeLock=null;updateWakeButton();return;}
    try { if(!navigator.wakeLock) throw new Error(); wakeLock=await navigator.wakeLock.request('screen');wakeLock.addEventListener('release',()=>{wakeLock=null;updateWakeButton();});status.textContent='Activa mientras esta página permanezca visible.';updateWakeButton(); }
    catch {status.textContent='Este navegador no pudo mantener la pantalla encendida. Puedes ajustar el bloqueo automático del dispositivo.';}
  }
  function route() {
    const song=data.songs.find(s=>s.id===location.hash.slice(1));
    document.documentElement.style.setProperty('--reading',saved.size+'px');
    song?reader(song):home();window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',route);route();
  if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('./sw.js').then(async registration=>{
      await navigator.serviceWorker.ready;
      const status=document.getElementById('offline-status');
      if(status)status.textContent='Disponible sin conexión después de esta primera carga. Tus tonos se guardan en este dispositivo.';
    }).catch(()=>{const status=document.getElementById('offline-status');if(status)status.textContent='Los tonos se guardan; la copia sin conexión no está disponible en este navegador.';});
  }
})();
