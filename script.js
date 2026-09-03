const root = document.documentElement;
const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);

if (year) year.textContent = new Date().getFullYear();

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      navToggle.focus();
    }
  });
}

function sectionProgress(section, start = 0.82, span = 0.9) {
  if (!section) return 1;
  const rect = section.getBoundingClientRect();
  const viewport = Math.max(window.innerHeight, 1);
  return clamp((viewport * start - rect.top) / (viewport * span));
}

const heroSection = document.querySelector('[data-motion="hero"]');
const heroFold = document.querySelector('[data-hero-fold]');
const introSection = document.querySelector('[data-motion="intro"]');
const introFrame = document.querySelector('.intro-frame');
const storySection = document.querySelector('[data-motion="story"]');
const storyAperture = document.querySelector('[data-story-aperture]');
const spaceSection = document.querySelector('[data-motion="space"]');
const spaceAperture = document.querySelector('[data-space-aperture]');
const gallerySection = document.querySelector('[data-motion="gallery"]');
const galleryWall = document.querySelector('[data-gallery-wall]');
const visitSection = document.querySelector('[data-motion="visit"]');
const visitAperture = document.querySelector('[data-visit-aperture]');

function setHero(progress) {
  if (!heroFold) return;
  const p = reducedMotion ? 1 : ease(progress);
  heroFold.style.setProperty('--hero-photo-scale', String(1.03 - p * 0.018));
  heroFold.style.setProperty('--hero-left-x', `${(-21 * p).toFixed(2)}%`);
  heroFold.style.setProperty('--hero-left-z', `${(44 * p).toFixed(1)}px`);
  heroFold.style.setProperty('--hero-left-ry', `${(-17 * p).toFixed(2)}deg`);
  heroFold.style.setProperty('--hero-left-rz', `${(-1.2 * p).toFixed(2)}deg`);
  heroFold.style.setProperty('--hero-right-x', `${(21 * p).toFixed(2)}%`);
  heroFold.style.setProperty('--hero-right-z', `${(36 * p).toFixed(1)}px`);
  heroFold.style.setProperty('--hero-right-ry', `${(17 * p).toFixed(2)}deg`);
  heroFold.style.setProperty('--hero-right-rz', `${(1.2 * p).toFixed(2)}deg`);
  heroFold.style.setProperty('--seam-opacity', String(1 - p * 0.7));
  heroFold.style.setProperty('--edge-opacity', String(p * 0.72));
}

function setIntro(progress) {
  if (!introFrame) return;
  const p = reducedMotion ? 1 : ease(progress);
  introFrame.style.setProperty('--intro-left-x', `${(-34 * p).toFixed(2)}%`);
  introFrame.style.setProperty('--intro-left-ry', `${(-12 * p).toFixed(2)}deg`);
  introFrame.style.setProperty('--intro-right-x', `${(36 * p).toFixed(2)}%`);
  introFrame.style.setProperty('--intro-right-ry', `${(12 * p).toFixed(2)}deg`);
}

function setStory(progress) {
  if (!storyAperture) return;
  const p = reducedMotion ? 1 : ease(progress);
  storyAperture.style.setProperty('--story-left-x', `${(-24 * p).toFixed(2)}%`);
  storyAperture.style.setProperty('--story-left-ry', `${(-14 * p).toFixed(2)}deg`);
  storyAperture.style.setProperty('--story-right-x', `${(24 * p).toFixed(2)}%`);
  storyAperture.style.setProperty('--story-right-ry', `${(14 * p).toFixed(2)}deg`);
}

function setSpace(progress) {
  if (!spaceAperture) return;
  const p = reducedMotion ? 1 : ease(progress);
  spaceAperture.style.setProperty('--space-left-x', `${(-28 * p).toFixed(2)}%`);
  spaceAperture.style.setProperty('--space-left-ry', `${(-15 * p).toFixed(2)}deg`);
  spaceAperture.style.setProperty('--space-right-x', `${(28 * p).toFixed(2)}%`);
  spaceAperture.style.setProperty('--space-right-ry', `${(15 * p).toFixed(2)}deg`);
}

function setGallery(progress) {
  if (!galleryWall) return;
  const p = reducedMotion ? 1 : ease(progress);
  galleryWall.style.setProperty('--gallery-a-ry', `${(48 + (7 - 48) * p).toFixed(2)}deg`);
  galleryWall.style.setProperty('--gallery-a-z', `${(18 * p).toFixed(1)}px`);
  galleryWall.style.setProperty('--gallery-b-z', `${(34 * p).toFixed(1)}px`);
  galleryWall.style.setProperty('--gallery-b-rx', `${(-4 + 4 * p).toFixed(2)}deg`);
  galleryWall.style.setProperty('--gallery-c-ry', `${(-52 + 43 * p).toFixed(2)}deg`);
  galleryWall.style.setProperty('--gallery-c-z', `${(24 * p).toFixed(1)}px`);
}

function setVisit(progress) {
  if (!visitAperture) return;
  const p = reducedMotion ? 1 : ease(progress);
  visitAperture.style.setProperty('--visit-left-x', `${(-42 * p).toFixed(2)}%`);
  visitAperture.style.setProperty('--visit-left-ry', `${(-17 * p).toFixed(2)}deg`);
  visitAperture.style.setProperty('--visit-right-x', `${(42 * p).toFixed(2)}%`);
  visitAperture.style.setProperty('--visit-right-ry', `${(17 * p).toFixed(2)}deg`);
}

let raf = 0;
function updateMotion() {
  raf = 0;
  setHero(sectionProgress(heroSection, 0.9, 0.95));
  setIntro(sectionProgress(introSection, 0.8, 0.82));
  setStory(sectionProgress(storySection, 0.78, 0.8));
  setSpace(sectionProgress(spaceSection, 0.78, 0.88));
  setGallery(sectionProgress(gallerySection, 0.8, 0.9));
  setVisit(sectionProgress(visitSection, 0.84, 0.9));
}
function scheduleMotion() {
  if (!raf) raf = requestAnimationFrame(updateMotion);
}
window.addEventListener('scroll', scheduleMotion, { passive: true });
window.addEventListener('resize', scheduleMotion, { passive: true });

const folio = document.querySelector('[data-menu-folio]');
const tabs = [...document.querySelectorAll('[data-folio-tab]')];
const sheets = [...document.querySelectorAll('[data-folio-sheet]')];
let activeSheet = 0;

function renderFolio() {
  sheets.forEach((sheet, index) => {
    const distance = index - activeSheet;
    sheet.setAttribute('aria-hidden', String(distance !== 0));
    if (distance < 0) {
      sheet.dataset.state = 'before';
      const depth = 92 + Math.abs(distance) * 24;
      sheet.style.transform = `translate3d(${-10 - Math.abs(distance) * 2}%,0,-${depth}px) rotateY(${-78 - Math.abs(distance) * 3}deg)`;
      sheet.style.opacity = String(Math.max(0.06, 0.18 - Math.abs(distance) * 0.04));
      sheet.style.filter = 'brightness(.88) saturate(.72)';
    } else if (distance === 0) {
      sheet.dataset.state = 'active';
      sheet.style.transform = 'translate3d(0,0,22px) rotateY(-1deg)';
      sheet.style.opacity = '1';
      sheet.style.filter = 'none';
    } else {
      sheet.dataset.state = 'after';
      const tx = 6 + distance * 2.2;
      const z = -34 - distance * 36;
      const ry = 10 + distance * 2.8;
      sheet.style.transform = `translate3d(${tx.toFixed(1)}%,0,${z}px) rotateY(${ry.toFixed(1)}deg)`;
      sheet.style.opacity = String(Math.max(0.18, 0.68 - distance * 0.15));
      sheet.style.filter = 'saturate(.8)';
    }
  });
  tabs.forEach((tab, index) => {
    const selected = index === activeSheet;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    activeSheet = index;
    renderFolio();
  });
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') activeSheet = 0;
    else if (event.key === 'End') activeSheet = tabs.length - 1;
    else {
      const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
      activeSheet = (activeSheet + (forward ? 1 : -1) + tabs.length) % tabs.length;
    }
    renderFolio();
    tabs[activeSheet].focus();
  });
});
if (folio) renderFolio();

const chapters = [...document.querySelectorAll('[data-dish-chapter]')];
if ('IntersectionObserver' in window && !reducedMotion) {
  const chapterRatios = new Map();
  const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => chapterRatios.set(entry.target, entry.intersectionRatio));
    let best = chapters[0];
    let bestRatio = 0;
    chapterRatios.forEach((ratio, chapter) => {
      if (ratio > bestRatio) { bestRatio = ratio; best = chapter; }
    });
    chapters.forEach((chapter) => chapter.classList.toggle('is-active', chapter === best));
  }, { threshold: [0.2,0.35,0.5,0.7] });
  chapters.forEach((chapter) => chapterObserver.observe(chapter));
} else {
  chapters.forEach((chapter) => chapter.classList.add('is-active'));
}

const galleryPanels = [...document.querySelectorAll('.gallery-panel')];
galleryPanels.forEach((panel) => {
  const activate = () => panel.classList.add('is-focus');
  const deactivate = () => panel.classList.remove('is-focus');
  panel.addEventListener('pointerenter', activate);
  panel.addEventListener('pointerleave', deactivate);
  panel.addEventListener('focus', activate);
  panel.addEventListener('blur', deactivate);
});

root.classList.add('motion-ready');
updateMotion();
