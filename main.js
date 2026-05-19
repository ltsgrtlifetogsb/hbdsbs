/* =============================================
   SANU BIRTHDAY — main.js
   ============================================= */

// ── PHOTOS CONFIG ──────────────────────────────
// 1. Put your images inside the /images/ folder
// 2. Uncomment and edit lines below with your filenames + captions
const photos = [
  // { src: 'images/photo1.jpg', caption: 'त्यो पल, जब तिमी मेरो जिन्दगीमा आयौ र मेरो संसार पुरै बदलियो।' },
  // { src: 'images/photo2.jpg', caption: 'तिम्रो यो सुन्दर हाँसो नै मेरो जिन्दगीको सबैभन्दा ठूलो उज्यालो हो।' },
  // { src: 'images/photo3.jpg', caption: 'कति धेरै उतारचढाव आए, तर तिम्रो मुटुले मेरो हात कहिल्यै छोडेन।' },
  // { src: 'images/photo4.jpg', caption: 'हरेक क्षण तिमीसँग बिताउनु मेरो सबैभन्दा ठूलो खुसी हो।' },
];

// ── HEARTS CONFIG ──────────────────────────────
const HEARTS = ['💕','💗','💖','💓','🌸','✨','💝','🌺'];

// ── SPLASH → MAIN ──────────────────────────────
function enterSite() {
  const splash = document.getElementById('splash');
  const main   = document.getElementById('mainSite');

  splash.classList.add('fade-out');

  setTimeout(() => {
    splash.style.display = 'none';
    main.classList.remove('hidden');
    document.body.style.overflow = 'auto';

    tryAutoplay();
    launchConfetti();
    startBgHearts();
    initReveal();
    loadGallery();
  }, 820);
}

// ── MUSIC ──────────────────────────────────────
const audio    = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon= document.getElementById('musicIcon');
let   playing  = false;

function tryAutoplay() {
  audio.volume = 0.45;
  audio.play()
    .then(() => { playing = true; musicBtn.classList.add('playing'); })
    .catch(() => {
      // Blocked by browser — show play button
      musicIcon.textContent = '▶️';
    });
}

function toggleMusic() {
  if (playing) {
    audio.pause();
    playing = false;
    musicIcon.textContent = '▶️';
    musicBtn.classList.remove('playing');
  } else {
    audio.play();
    playing = true;
    musicIcon.textContent = '🎵';
    musicBtn.classList.add('playing');
  }
}

// ── CONFETTI ───────────────────────────────────
const COLORS = ['#ff6b9d','#ffb6c1','#ff4d7e','#f9a825','#ff8fb1','#ffffff','#e91e8c','#ffdf00'];

function launchConfetti() {
  const wrap = document.getElementById('confetti');
  const count = 55;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size = Math.random() * 8 + 5;
      el.style.cssText = `
        left:${Math.random()*100}%;
        width:${size}px; height:${size}px;
        background:${COLORS[Math.floor(Math.random()*COLORS.length)]};
        border-radius:${Math.random() > .5 ? '50%' : '3px'};
        animation-duration:${Math.random()*2.5+2.2}s;
        animation-delay:${Math.random()*0.8}s;
      `;
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }, i * 45);
  }

  // Repeat every 9s
  setTimeout(launchConfetti, 9000);
}

// ── FLOATING HEARTS ────────────────────────────
function spawnHeart(container, small) {
  const el = document.createElement('div');
  el.className = 'heart';
  el.textContent = HEARTS[Math.floor(Math.random()*HEARTS.length)];
  el.style.cssText = `
    left:${Math.random()*100}%;
    font-size:${small ? (Math.random()*.8+.7) : (Math.random()*1.2+.9)}rem;
    animation-duration:${Math.random()*5+8}s;
    animation-delay:${Math.random()*2}s;
  `;
  container.appendChild(el);
  setTimeout(() => el.remove(), 14000);
}

function startBgHearts() {
  const container = document.getElementById('bgHearts');
  for (let i = 0; i < 5; i++) setTimeout(() => spawnHeart(container,false), i*400);
  setInterval(() => spawnHeart(container,false), 1800);
}

// Splash hearts (runs before enter)
(function initSplashHearts() {
  const c = document.getElementById('splashHearts');
  spawnHeart(c,true); spawnHeart(c,true);
  setInterval(() => spawnHeart(c,true), 2200);
})();

// ── GALLERY ────────────────────────────────────
function loadGallery() {
  if (photos.length === 0) return; // Keep HTML placeholders

  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';

  photos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'photo-card';

    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.caption;
    img.loading = 'lazy';
    img.onclick = () => openLightbox(p.src, p.caption);

    const cap = document.createElement('p');
    cap.className = 'photo-caption';
    cap.textContent = `"${p.caption}"`;

    card.appendChild(img);
    card.appendChild(cap);
    grid.appendChild(card);
  });
}

// ── LIGHTBOX ───────────────────────────────────
function openLightbox(src, caption) {
  document.getElementById('lbImg').src = src;
  document.getElementById('lbCaption').textContent = caption || '';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = 'auto';
}

// ── SCROLL REVEAL ──────────────────────────────
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
  targets.forEach(el => obs.observe(el));
}

// ── INIT ───────────────────────────────────────
window.addEventListener('load', () => {
  // Pre-cache audio so it's ready instantly
  audio.load();
});
