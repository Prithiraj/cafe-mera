(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);

  const heroSection = document.querySelector('[data-fold-section="hero"]');
  const heroStage = document.querySelector('[data-hero-stage]');
  const heroPhoto = heroStage?.querySelector('.hero-reveal-photo img');
  const heroLeft = heroStage?.querySelector('.fold-leaf-left');
  const heroRight = heroStage?.querySelector('.fold-leaf-right');
  const heroSeam = heroStage?.querySelector('.fold-seam');
  const heroEdge = heroStage?.querySelector('.fold-edge-light');
  const menuSection = document.querySelector('[data-fold-section="menu"]');
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
    const leftX = -22 * p;
    const rightX = 22 * p;
    heroPhoto && (heroPhoto.style.transform = `scale(${(1.035 - p * .018).toFixed(4)})`);
    heroLeft && (heroLeft.style.transform = `translate3d(${leftX.toFixed(2)}%,0,${(46 * p).toFixed(2)}px) rotateY(${(-18 * p).toFixed(2)}deg) rotateZ(${(-1.5 * p).toFixed(2)}deg)`);
    heroRight && (heroRight.style.transform = `translate3d(${rightX.toFixed(2)}%,0,${(34 * p).toFixed(2)}px) rotateY(${(18 * p).toFixed(2)}deg) rotateZ(${(1.5 * p).toFixed(2)}deg)`);
    if (heroSeam) {
      heroSeam.style.transform = `translateX(${(-8 * p).toFixed(2)}px) rotate(7deg)`;
      heroSeam.style.opacity = String(1 - p * .62);
    }
    if (heroEdge) heroEdge.style.opacity = String(p * .8);
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
        sheet.style.transform = `translate3d(0,0,${(folioFan * 22).toFixed(1)}px) rotateY(${(-8 * (1 - folioFan)).toFixed(2)}deg)`;
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
      activeSheet = (activeSheet + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      renderFolio();
      tabs[activeSheet].focus();
    });
  });

  function updateFolio(progress) {
    folioFan = reducedMotion ? 1 : ease(progress);
    renderFolio();
  }

  const galleryPanels = [...document.querySelectorAll('.gallery-panel')];
  function updateGallery(progress) {
    const p = reducedMotion ? 1 : ease(progress);
    if (galleryRig) galleryRig.dataset.open = p > .55 ? 'true' : 'false';
    const transforms = [
      `rotateY(${(48 + (8 - 48) * p).toFixed(2)}deg) translateZ(${(18 * p).toFixed(1)}px)`,
      `translateZ(${(34 * p).toFixed(1)}px) rotateX(${(-4 + 4 * p).toFixed(2)}deg)`,
      `rotateY(${(-52 + 43 * p).toFixed(2)}deg) translateZ(${(24 * p).toFixed(1)}px)`,
    ];
    galleryPanels.forEach((panel, index) => {
      if (!panel.classList.contains('is-focus') && window.innerWidth > 650) panel.style.transform = transforms[index];
    });
  }

  galleryPanels.forEach((panel, index) => {
    const focusTransforms = [
      'rotateY(1deg) translateZ(74px)',
      'translateZ(86px) rotateX(0deg)',
      'rotateY(-1deg) translateZ(74px)',
    ];
    const activate = () => {
      panel.classList.add('is-focus');
      if (window.innerWidth > 650) panel.style.transform = focusTransforms[index];
    };
    const deactivate = () => {
      panel.classList.remove('is-focus');
      updateGallery(sectionProgress(gallerySection, .78, .88));
    };
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
