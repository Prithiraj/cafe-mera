const root = document.documentElement;

function prepareSpatialDom() {
  if (!document.querySelector('link[data-spatial-style]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'spatial.css';
    link.dataset.spatialStyle = '';
    document.head.append(link);
  }

  document.querySelector('.hero-aroma')?.remove();

  let stage = document.querySelector('.spatial-stage');
  if (!stage) {
    stage = document.createElement('div');
    stage.className = 'spatial-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML = '<canvas id="spatial-canvas"></canvas><div class="spatial-vignette"></div>';
    const header = document.querySelector('.site-header');
    document.body.insertBefore(stage, header || document.body.firstChild);
  }

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

  return { stage, canvas: stage.querySelector('#spatial-canvas') };
}

function hasWebGL() {
  try {
    const testCanvas = document.createElement('canvas');
    return Boolean(testCanvas.getContext('webgl2') || testCanvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function shouldEnableSpatial() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection?.saveData === true;
  const narrow = window.innerWidth < 700;
  const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory < 4;
  return !reducedMotion && !saveData && !narrow && !lowMemory && hasWebGL();
}

async function bootSpatial() {
  const { canvas, stage } = prepareSpatialDom();
  if (!canvas || !stage || !shouldEnableSpatial()) {
    root.classList.add('spatial-static');
    return;
  }

  root.classList.add('spatial-pending');
  try {
    const { initSpatialExperience } = await import('./spatial/scene-controller.js');
    await initSpatialExperience({ canvas, stage });
  } catch (error) {
    root.classList.remove('spatial-pending');
    root.classList.add('spatial-static');
    console.info('Cafe Mera spatial enhancement unavailable; using static experience.', error);
  }
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => bootSpatial(), { timeout: 1400 });
} else {
  window.setTimeout(bootSpatial, 650);
}
