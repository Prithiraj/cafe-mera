import { detectCapabilities, readSpatialFlags } from './spatial/capabilities.js';
import { selectQuality } from './spatial/quality.js';

const root = document.documentElement;

function prepareSpatialDom(quality) {
  if (!document.querySelector('link[data-spatial-style]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'spatial.css';
    link.dataset.spatialStyle = '';
    document.head.append(link);
  }

  document.querySelector('.hero-aroma')?.remove();

  const sectionMap = [
    ['.hero', 'hero'], ['.intro', 'intro'], ['.menu-section', 'menu'],
    ['.discovery', 'discovery'], ['.story', 'story'], ['.space-section', 'space'],
    ['.proof', 'proof'], ['.gallery', 'gallery'], ['.visit', 'visit'],
    ['.final-cta', 'final'],
  ];
  sectionMap.forEach(([selector, name]) => {
    document.querySelector(selector)?.setAttribute('data-spatial', name);
  });

  document.querySelectorAll('.discovery-card').forEach((card, index) => {
    card.dataset.spatialDish = String(index);
  });
  document.querySelectorAll('.gallery-grid figure').forEach((figure, index) => {
    figure.dataset.spatialPhoto = String(index);
  });

  const heroImage = document.querySelector('.hero-visual img');
  if (heroImage?.currentSrc || heroImage?.src) {
    document.querySelector('.hero-visual')?.style.setProperty(
      '--hero-photo',
      `url("${heroImage.currentSrc || heroImage.src}")`,
    );
  }

  let stage = document.querySelector('.spatial-stage');
  if (quality.renderer && !stage) {
    stage = document.createElement('div');
    stage.className = 'spatial-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML = '<canvas id="spatial-canvas"></canvas><div class="spatial-vignette"></div>';
    const header = document.querySelector('.site-header');
    document.body.insertBefore(stage, header || document.body.firstChild);
  }

  return { stage, canvas: stage?.querySelector('#spatial-canvas') || null };
}

async function bootSpatial() {
  const flags = readSpatialFlags();
  const capabilities = detectCapabilities();
  const quality = selectQuality(capabilities, flags);

  root.dataset.spatialTier = String(quality.tier);
  root.dataset.spatialQuality = quality.name;
  root.classList.add(`spatial-tier-${quality.tier}`);

  const { canvas, stage } = prepareSpatialDom(quality);

  if (!quality.renderer || !canvas || !stage) {
    root.classList.add(quality.tier === 0 ? 'spatial-static' : 'spatial-css');
    return;
  }

  root.classList.add('spatial-pending');
  try {
    const { initSpatialExperience } = await import('./spatial/scene-controller.js');
    await initSpatialExperience({ canvas, stage, quality, capabilities });
  } catch (error) {
    root.classList.remove('spatial-pending');
    root.classList.add('spatial-static');
    console.info('Cafe Mera spatial enhancement unavailable; using static experience.', error);
  }
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => bootSpatial(), { timeout: 1200 });
} else {
  window.setTimeout(bootSpatial, 520);
}
