/* 1) Ilha dinâmica no topo (ideia do cult-ui): pílula com mensagens rodando → toque abre atalhos.
   2) Botão do assistente embaixo: chama atenção (balanço, anéis, balão) e vira o chat ao clicar. */
(function () {
  const B = SITE.bot;

  /* ═════ ILHA DO TOPO ═════ */
  const isl = document.createElement('div');
  isl.id = 'island'; isl.dataset.state = 'idle';
  isl.innerHTML = `
    <div class="isl-view v-idle"><span class="pulse"></span><span class="isl-t"></span></div>
    <div class="isl-view v-actions">
      <button data-act="chat"><b>🤖</b><span>Dúvidas</span></button>
      <a href="${waLink()}" target="_blank" rel="noopener"><b>💬</b><span>WhatsApp</span></a>
      <a href="${SITE.instagram}" target="_blank" rel="noopener"><b>📸</b><span>Instagram</span></a>
    </div>`;
  document.body.prepend(isl);
  const SIZES = { idle: [310, 46, 23], actions: [330, 76, 30] };
  const setIsland = s => {
    const [w, h, r] = SIZES[s];
    isl.style.setProperty('--w', `min(${w}px, calc(100vw - 24px))`);
    isl.style.setProperty('--h', h + 'px'); isl.style.setProperty('--r', r + 'px');
    isl.dataset.state = s;
  };
  setIsland('idle');
  const tk = isl.querySelector('.isl-t'); let ti = 0;
  const tick = () => { tk.classList.add('out'); setTimeout(() => { tk.textContent = SITE.ticker[ti++ % SITE.ticker.length]; tk.classList.remove('out'); }, 280); };
  tick(); setInterval(() => { if (isl.dataset.state === 'idle') tick(); }, 3600);
  isl.querySelector('.v-idle').onclick = () => setIsland('actions');
  isl.querySelector('[data-act=chat]').onclick = () => { setIsland('idle'); openBot(); };
  document.addEventListener('click', e => { if (isl.dataset.state === 'actions' && !isl.contains(e.target)) setIsland('idle'); });

  /* ═════ DOCK DO ASSISTENTE ═════ */
  const dock = document.createElement('div');
  dock.id = 'dock';
  dock.innerHTML = `
    <div class="bubble" id="bubble">${B.teaser}<i></i></div>
    <div class="halo"><div class="shell" data-open="0">
      <button class="pill" aria-label="Abrir assistente">
                <span class="av">${B.name[0]}<em class="badge">1</em></span>
        <span class="pt"><b>Tire suas dúvidas</b><small><i class="on"></i>${B.name} · online agora</small></span>
        <span class="go">→</span>
      </button>
      <div class="panel">
        <header><span class="av sm">${B.name[0]}</span><div><strong>${B.name}</strong><small><i class="on"></i>Assistente · ${SITE.brand}</small></div>
          <button class="x" aria-label="Fechar">✕</button></header>
        <div class="chat-area" id="chat-area" aria-live="polite"></div>
        <form class="chat-form" autocomplete="off"><input type="text" placeholder="Escreva sua dúvida…" aria-label="Sua dúvida"><button aria-label="Enviar">➤</button></form>
      </div>
    </div></div>
    <a class="wa-fab" href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>
    </a>`;
  document.body.appendChild(dock);

  const shell = dock.querySelector('.shell');
  const bubble = dock.querySelector('#bubble');
  const SZ = { closed: ['min(290px, calc(100vw - 96px))', '66px', '33px'], open: ['min(396px, calc(100vw - 20px))', 'min(580px, calc(100dvh - 110px))', '30px'] };
  function setShell(open) {
    const [w, h, r] = SZ[open ? 'open' : 'closed'];
    shell.style.setProperty('--w', w); shell.style.setProperty('--h', h); shell.style.setProperty('--r', r);
    shell.dataset.open = open ? '1' : '0';
    dock.classList.toggle('is-open', open);
    dock.querySelector('.halo').classList.toggle('off', open);
    bubble.classList.remove('show');
    if (open) { startChat(); dock.querySelector('.badge').style.display = 'none'; setTimeout(() => dock.querySelector('.chat-form input').focus({ preventScroll: true }), 450); }
  }
  setShell(false);
  window.openBot = () => setShell(true);
  dock.querySelector('.pill').onclick = () => setShell(true);
  dock.querySelector('.x').onclick = () => setShell(false);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setShell(false); });
  if (location.hash === '#bot') setTimeout(() => setShell(true), 600);

  /* chama atenção: balão aparece, some e volta de vez em quando; botão balança */
  let shown = 0;
  function nudge() {
    if (shell.dataset.open === '1' || shown >= 4) return;
    shown++; bubble.classList.add('show'); shell.classList.add('wiggle');
    setTimeout(() => shell.classList.remove('wiggle'), 1100);
    setTimeout(() => bubble.classList.remove('show'), 6500);
  }
  setTimeout(nudge, 3200); setInterval(nudge, 22000);
  bubble.onclick = () => setShell(true);

  /* ═════ MOTOR DO CHAT ═════ */
  const area = () => document.getElementById('chat-area');
  const flows = B.flows; let started = false;
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const scroll = () => { const a = area(); a.scrollTo({ top: a.scrollHeight, behavior: 'smooth' }); };
  const disableChips = () => dock.querySelectorAll('.chips').forEach(c => c.classList.add('off'));

  function userMsg(t) {
    const m = document.createElement('div'); m.className = 'msg user'; m.textContent = t;
    area().appendChild(m); scroll();
  }
  function botMsg(html, chips) {
    const a = area();
    const td = document.createElement('div'); td.className = 'typing'; td.innerHTML = '<i></i><i></i><i></i>';
    a.appendChild(td); scroll();
    setTimeout(() => {
      td.remove();
      const m = document.createElement('div'); m.className = 'msg bot'; m.innerHTML = html; a.appendChild(m);
      if (chips && chips.length) {
        const w = document.createElement('div'); w.className = 'chips';
        chips.forEach(c => {
          const el = c.wa ? Object.assign(document.createElement('a'), { href: waLink(c.wa), target: '_blank', rel: 'noopener', className: 'chip wa' })
                          : Object.assign(document.createElement('button'), { className: 'chip' });
          el.textContent = c.l; if (c.f) el.onclick = () => runFlow(c.f, c.l);
          w.appendChild(el);
        });
        if (chips !== flows.inicio.chips && !chips.some(c => c.f === 'inicio')) {
          const back = document.createElement('button'); back.className = 'chip back'; back.textContent = '↩ Início';
          back.onclick = () => runFlow('inicio', '↩ Início'); w.appendChild(back);
        }
        a.appendChild(w);
      }
      scroll();
    }, B.typingMs);
  }
  function runFlow(id, label) {
    const f = flows[id]; if (!f) return;
    disableChips(); if (label) userMsg(label);
    if (label && typeof gtag === 'function') gtag('event', 'chatbot', { acao: label });
    botMsg(f.msg, f.chips);
  }
  function startChat() { if (started) return; started = true; botMsg(B.welcome, flows.inicio.chips); }

  function answer(text) {
    const q = norm(text); let best = null, score = 0;
    for (const id in flows) {
      const s = (flows[id].keys || []).reduce((n, k) => n + (q.includes(norm(k)) ? 1 : 0), 0);
      if (s > score) { score = s; best = id; }
    }
    disableChips(); userMsg(text);
    if (best) botMsg(flows[best].msg, flows[best].chips);
    else botMsg(B.fallback, [{ l: '💬 Falar com a equipe', wa: text }, ...flows.inicio.chips.slice(0, 3)]);
  }
  dock.querySelector('.chat-form').addEventListener('submit', e => {
    e.preventDefault();
    const i = e.target.querySelector('input'), v = i.value.trim();
    if (v) { answer(v); i.value = ''; }
  });
})();
