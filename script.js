// script.js — navigation, image interactions, reveal on scroll, contact simulation
document.addEventListener('DOMContentLoaded', () => {
  // Navigation smooth + mobile toggle
  const links = document.querySelectorAll('[data-scroll]');
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // close mobile nav
      nav.classList.remove('open');
      const top = target.getBoundingClientRect().top + window.pageYOffset - (header.offsetHeight || 0) - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Reveal on scroll for elements with .reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => obs.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('is-visible'));
  }

  // Image interactions: toggle round, lightbox, download
  const photo = document.getElementById('profile-photo');
  const toggle = document.getElementById('toggle-shape');
  const openBtn = document.getElementById('open-lightbox');
  const downloadBtn = document.getElementById('download-photo');

  // restore preference
  try {
    const saved = localStorage.getItem('profileRound');
    if (saved === '1') photo.classList.add('round');
  } catch {}

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isRound = photo.classList.toggle('round');
      try { localStorage.setItem('profileRound', isRound ? '1' : '0'); } catch {}
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbDownload = document.getElementById('lb-download');

  function openLightbox(src) {
    lbImg.src = src || photo.src;
    lbDownload.href = src || downloadBtn.href || photo.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    lbImg.src = '';
  }

  photo && photo.addEventListener('click', () => openLightbox());
  openBtn && openBtn.addEventListener('click', () => openLightbox());
  lbClose && lbClose.addEventListener('click', closeLightbox);
  lightbox && lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // set download links to photo
  downloadBtn && (downloadBtn.href = photo.src);
  lbDownload && (lbDownload.href = photo.src);

  // preload large version if present (images/profile-1600.jpg)
  const large = 'images/profile-1600.jpg';
  const preload = new Image();
  preload.src = large;
  preload.onload = () => {
    downloadBtn.href = large;
    lbDownload.href = large;
  };

  // Contact form simulated
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!email || !message) {
        alert('Merci de renseigner ton email et ton message.');
        return;
      }
      alert('Message envoyé — je te répondrai bientôt ! (simulation)');
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
