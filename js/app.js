/* helpers compartilhados */
function waLink(msg) {
  return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(msg || SITE.whatsappMsg);
}
/* "wa" | "wa:mensagem" | "bot" | URL  →  { bot } ou { href } */
function resolveLink(url) {
  if (url === 'bot') return { bot: true };
  if (url === 'wa') return { href: waLink() };
  if (url && url.indexOf('wa:') === 0) return { href: waLink(url.slice(3)) };
  return { href: url };
}
/* brilho que segue o mouse */
function spotlight(root) {
  (root || document).querySelectorAll('.spot').forEach(el => el.addEventListener('pointermove', e => {
    const b = el.getBoundingClientRect();
    el.style.setProperty('--mx', e.clientX - b.left + 'px');
    el.style.setProperty('--my', e.clientY - b.top + 'px');
  }));
}
/* entrada suave ao rolar */
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 70 + 'ms'; io.observe(el); });
}
