/* =========================================================
   CONFIGURAÇÃO — altere aqui e o site inteiro é atualizado.
   Fonte: adesivo da vitrine e perfil do Instagram da loja.
   ========================================================= */
const WHATSAPP_NUMBER = '5589994118276'; // 55 + DDD + número, só dígitos
const INSTAGRAM_USER = 'pl_multimarcasoeiras';
const DEFAULT_MESSAGE = 'Olá! Vi o site da PL Multimarcas e gostaria de saber mais.';

/* ---------- Links de WhatsApp e Instagram ---------- */
const whatsappUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || DEFAULT_MESSAGE)}`;
const instagramUrl = `https://www.instagram.com/${INSTAGRAM_USER}/`;

function openInNewTab(link, url) {
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener';
}

document.querySelectorAll('[data-wa]').forEach((link) => {
  openInNewTab(link, whatsappUrl(link.dataset.waMsg));
});
document.querySelectorAll('[data-ig]').forEach((link) => openInNewTab(link, instagramUrl));
document.querySelectorAll('[data-ig-handle]').forEach((el) => {
  el.textContent = `@${INSTAGRAM_USER}`;
});
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- Menu mobile ---------- */
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const menuLabel = menuToggle.querySelector('.sr-only');

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuLabel.textContent = open ? 'Fechar menu' : 'Abrir menu';
  document.body.classList.toggle('menu-open', open);
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
    setMenu(false);
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 1080px)').addEventListener('change', () => setMenu(false));

/* ---------- Botão flutuante e borda do header após o hero ---------- */
const header = document.querySelector('[data-header]');
const floatButton = document.querySelector('[data-wa-float]');

new IntersectionObserver(([entry]) => {
  floatButton.classList.toggle('is-visible', !entry.isIntersecting);
  header.classList.toggle('is-scrolled', !entry.isIntersecting);
}, { rootMargin: '-30% 0px 0px 0px' }).observe(document.querySelector('.hero'));

/* ---------- Animação leve ao entrar na tela ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


