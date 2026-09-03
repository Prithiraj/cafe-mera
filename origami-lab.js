(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);

  const heroSection = document.querySelector('[data-fold-section="hero"]');
  const heroStage = document.querySelector('[data-hero-stage]');
  const menuSection = document.querySelector('[data-fold-section="menu"]');
  const folio = document.querySelector('[data-folio]');
  const gallerySection = document.querySelector('[data-fold-section="gallery"]');
  const galleryRig = document.querySelector('[data-gallery-rig]');

  function sectionProgress(section, start = .82, span = .9) {
    if (!section) return 1;
    const rect = section.getBoundingClientRect();
    const viewport = Math.max(window.innerHeight, 1);
    return clamp((viewport * start - rect.top) / (viewport * span));
  }

  function updateHero(progress) {
    if (!heroStage) return;
    const p = reducedMotion ? 1 : ease(progress);
    heroStage.style.setProperty('--hero-p', p.toFixed(4));
    heroStage.style.setProperty('--hero-photo-scale', String(1.035 - p * .018));
    heroStage.style.setProperty('--hero-left-x', `${(-22 * p).toFixed(2)}%`);
    heroStage.style.setProperty('--hero-left-z', `${(46 * p).toFixed(2)}px`);
    heroStage.style.setProperty('--hero-left-ry', `${(-18 * p).toFixed(2)}deg`);
    heroStage.style.setProperty('--hero-left-rz', `${(-1.5 * p).toFixed(2)}deg`);
    heroStage.style.setProperty('--hero-right-x', `${(22 * p).toFixed(2)}%`);
    heroStage.style.setProperty('--hero-right-z', `${(34 * p).toFixed(2)}px`);
    heroStage.style.setProperty('--hero-right-ry', `${(18 * p).toFixed(2)}deg`);
    heroStage.style.setProperty('--hero-right-rz', `${(1.5 * p).toFixed(2)}deg`);
    heroStage.style.setProperty('--seam-x', `${(-8 * p).toFixed(2)}px`);
    heroStage.style.setProperty('--seam-opacity', String(1 - p * .62));
    heroStage.style.setProperty('--edge-opacity', String(p * .8));
  }

  const tabs = [...document.querySelectorAll('[data-folio-tab]')];
  const sheets = [...document.querySelectorAll('[data-folio-sheet]')];
  let activeSheet = 0;
  let folioFan = 0;

  function renderFolio() {
    sheets.forEach((sheet, index) => {
      const distance = index - activeSheet;
      sheet.dataset.distance = String(Math.abs(distance));
      if (distance < 0) {
        sheet.dataset.state = 'before';
        const depth = 90 + Math.abs(distance) * 24;
        sheet.style.transform = `translate3d(${-10 - Math.abs(distance) * 2}%,0,-${depth}px) rotateY(${-78 - Math.abs(distance) * 3}deg)`;
        sheet.style.opacity = String(Math.max(.08, .2 - Math.abs(distance) * .045));
        sheet.style.filter = 'brightness(.88) saturate(.72)';
      } else if (distance === 0) {
        sheet.dataset.state = 'active';
        const z = folioFan * 22;
        const ry = -8 * (1 - folioFan);
        sheet.style.transform = `translate3d(0,0,${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg)`;
        sheet.style.opacity = '1';
        sheet.style.filter = 'none';
      } else {
        sheet.dataset.state = 'after';
        const tx = 6 + folioFan * 2 + distance * 2.2;
        const z = -34 - folioFan * 20 - distance * 34;
        const ry = 10 + folioFan * 4 + distance * 2.5;
        sheet.style.transform = `translate3d(${tx.toFixed(2)}%,0,${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg)`;
        sheet.style.opacity = String(Math.max(.18, .66 - distance * .15));
        sheet.style.filter = 'saturate(.78)';
      }
    });

    tabs.forEach((tab, index) => {
      tab.setAttribute('aria-selected', String(index === activeSheet));
      tab.tabIndex = index === activeSheet ? 0 : -1;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activeSheet = index;
      renderFolio();
    });
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      activeSheet = (activeSheet + direction + tabs.length) % tabs.length;
      renderFolio();
      tabs[activeSheet].focus();
    });
  });

  function updateFolio(progress) {
    folioFan = reducedMotion ? 1 : ease(progress);
    folio?.style.setProperty('--fan', folioFan.toFixed(4));
    renderFolio();
  }

  function updateGallery(progress) {
    if (!galleryRig) return;
    const p = reducedMotion ? 1 : ease(progress);
    galleryRig.style.setProperty('--gallery-p', p.toFixed(4));
    galleryRig.style.setProperty('--gallery-a-ry', `${(48 + (8 - 48) * p).toFixed(2)}deg`);
    galleryRig.style.setProperty('--gallery-a-z', `${(18 * p).toFixed(1)}px`);
    galleryRig.style.setProperty('--gallery-b-z', `${(34 * p).toFixed(1)}px`);
    galleryRig.style.setProperty('--gallery-b-rx', `${(-4 + 4 * p).toFixed(2)}deg`);
    galleryRig.style.setProperty('--gallery-c-ry', `${(-52 + 43 * p).toFixed(2)}deg`);
    galleryRig.style.setProperty('--gallery-c-z', `${(24 * p).toFixed(1)}px`);
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

  let raf = 0;
  function update() {
    raf = 0;
    updateHero(sectionProgress(heroSection, .88, .9));
    updateFolio(sectionProgress(menuSection, .78, .8));
    updateGallery(sectionProgress(gallerySection, .78, .88));
  }
  function schedule() {
    if (!raf) raf = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  renderFolio();
  update();
})();
