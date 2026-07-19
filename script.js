const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
const themeToggle = document.querySelector('#theme-toggle');
const themeLabel = themeToggle?.querySelector('.theme-label');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const themeColor = document.querySelector('meta[name="theme-color"]');

const updateThemeControl = () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  if (themeLabel) themeLabel.textContent = isDark ? 'Light' : 'Dark';
  if (themeIcon) themeIcon.textContent = isDark ? '☀' : '☾';
  themeToggle?.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeColor?.setAttribute('content', isDark ? '#0d171e' : '#fffdf8');
};

updateThemeControl();

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  try { localStorage.setItem('portfolio-theme', nextTheme); } catch (_) { /* Preferences may be unavailable. */ }
  updateThemeControl();
});

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.transform = `translate(${event.clientX - 180}px, ${event.clientY - 180}px)`;
}, { passive: true });

document.querySelector('#year').textContent = new Date().getFullYear();
