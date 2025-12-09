// script.js — image interactions: toggle shape, lightbox, load/error handling, download
document.addEventListener('DOMContentLoaded', () => {
  const photo = document.getElementById('mainPhoto');
  const toggle = document.getElementById('toggle-shape');
  const openBtn = document.getElementById('open-lightbox');
  const downloadBtn = document.getElementById('download-btn');

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbDownload = document.getElementById('lb-download');

  // Image error handling: if image fails to load, show a visible message
  photo.addEventListener('error', () => {
    console.error('Image introuvable:', photo.src);
    const notice = document.createElement('div');
    notice.textContent = 'Image introuvable — vérifie le fichier et le chemin (ex: images/profile-800.jpg).';
    notice.style.color = '#991b1b';
    notice.style.fontWeight = '700';
    notice.style.marginTop = '10px';
    photo.parentElement.appendChild(notice);
    photo.style.display = 'none';
  });

  // restore / save rounded preference
  try {
    const saved = localStorage.getItem('photoRound');
    if (saved === '1') photo.classList.add('round');
  } catch (e) { /* ignore */ }

  toggle.addEventListener('click', () => {
    const isRound = photo.classList.toggle('round');
    try { localStorage.setItem('photoRound', isRound ? '1' : '0'); } catch (e) {}
  });

  // Lightbox open/close
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

  // open by clicking image or button
  photo.addEventListener('click', () => openLightbox());
  openBtn.addEventListener('click', () => openLightbox());

  // close handlers
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // set download links to image
  downloadBtn.href = photo.src;
  lbDownload.href = photo.src;

  // optional: preload larger image if available (images/profile-1600.jpg)
  const large = 'images/profile-1600.jpg';
  const preload = new Image();
  preload.src = large;
  preload.onload = () => {
    downloadBtn.href = large;
    lbDownload.href = large;
  };

  // Simple contact form handling (client-side)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!email || !message) {
        alert('Merci de renseigner ton email et ton message.');
        return;
      }
      alert('Message simulé envoyé — merci !');
      contactForm.reset();
    });
  }
});
