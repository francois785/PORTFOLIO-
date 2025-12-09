/* script.js
 - Navigation smooth-scroll + active link (scrollspy)
 - Mobile nav toggle
 - Settings panel (dark mode + avatar shape) saved in localStorage
 - Reveal animations
 - Contact form simulated (toast)
*/

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  const links = Array.from(document.querySelectorAll('[data-scroll]'));
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const settingsBtn = document.getElementById('open-settings');
  const settingsPanel = document.getElementById('settings-panel');
  const closeSettings = document.getElementById('close-settings');
  const prefDark = document.getElementById('pref-dark');
  const prefAvatar = document.getElementById('pref-avatar-round');
  const prefReset = document.getElementById('pref-reset');
  const profilePhoto = document.querySelector('.profile-photo');
  const themeToggle = document.getElementById('theme-toggle');

  // --- Utility: toast ---
  function toast(text, opts = {}) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = text;
    Object.assign(t.style, {
      position: 'fixed', right: '18px', bottom: '18px',
      padding: '10px 14px', borderRadius: '10px', background: opts.error ? '#fee2e2' : 'var(--accent)',
      color: opts.error ? '#7a1515' : '#fff', boxShadow: '0 10px 30px rgba(2,6,23,0.12)', zIndex: 200
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
    setTimeout(() => t.remove(), opts.duration || 2600);
  }

  // --- Mobile nav toggle ---
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // --- Smooth scroll for links ---
  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // close mobile nav
      nav.classList.remove('open');
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // --- ScrollSpy with IntersectionObserver ---
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
        }
      });
    }, { root: null, threshold: 0.28 });
    sections.forEach(s => obs.observe(s));
  }

  // --- Reveal on scroll ---
  if ('IntersectionObserver' in window && reveals.length) {
    const rObs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => rObs.observe(r));
  } else {
    reveals.forEach(r => r.classList.remove('reveal'));
  }

  // --- Settings panel open/close ---
  settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.add('open');
    settingsPanel.setAttribute('aria-hidden', 'false');
  });
  closeSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('open');
    settingsPanel.setAttribute('aria-hidden', 'true');
  });

  // Clicking outside closes settings
  document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
      settingsPanel.classList.remove('open');
      settingsPanel.setAttribute('aria-hidden', 'true');
    }
  });

  // --- Preferences (localStorage) ---
  const PREF_KEY = 'portfolio_prefs_v1';
  const defaultPrefs = { dark: false, avatarRound: true };

  function loadPrefs() {
    try {
      const raw = localStorage.getItem(PREF_KEY);
      return raw ? JSON.parse(raw) : defaultPrefs;
    } catch {
      return defaultPrefs;
    }
  }

  function savePrefs(prefs) {
    try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch {}
  }

  function applyPrefs(prefs) {
    // dark mode
    if (prefs.dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    prefDark.checked = !!prefs.dark;
    themeToggle.setAttribute('aria-pressed', !!prefs.dark);

    // avatar shape
    if (prefs.avatarRound) profilePhoto.classList.add('round');
    else profilePhoto.classList.remove('round');
    prefAvatar.checked = !!prefs.avatarRound;
  }

  // init
  let prefs = loadPrefs();
  applyPrefs(prefs);

  // toggles
  prefDark.addEventListener('change', (e) => {
    prefs.dark = e.target.checked;
    savePrefs(prefs);
    applyPrefs(prefs);
    toast(prefs.dark ? 'Mode sombre activé' : 'Mode clair activé');
  });

  prefAvatar.addEventListener('change', (e) => {
    prefs.avatarRound = e.target.checked;
    savePrefs(prefs);
    applyPrefs(prefs);
    toast(prefs.avatarRound ? 'Avatar rond activé' : 'Avatar carré activé');
  });

  prefReset.addEventListener('click', () => {
    prefs = defaultPrefs;
    savePrefs(prefs);
    applyPrefs(prefs);
    toast('Préférences réinitialisées');
  });

  themeToggle.addEventListener('click', () => {
    prefs.dark = !prefs.dark;
    savePrefs(prefs);
    applyPrefs(prefs);
  });

  // --- Contact form simulation ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('#email').value.trim();
      const msg = form.querySelector('#message').value.trim();
      if (!email || !msg) {
        toast('Merci de compléter l\'email et le message', { error: true });
        return;
      }
      // simulate send
      toast('Message envoyé — merci !');
      form.reset();
      // scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- accessibility: close mobile nav on resize ---
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) nav.classList.remove('open');
  });

  // keyboard: Esc closes panels
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.classList.remove('open');
      settingsPanel.classList.remove('open');
    }
  });

});
