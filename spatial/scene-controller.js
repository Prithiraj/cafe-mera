import { createSceneObjects, disposeSceneObjects, updateSteam } from './scene-factory.js';
import { clamp, damp, dampVector3, setGroupOpacity } from './motion.js';

const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.181.1/build/three.module.js';

const STATES = {
  hero:      { tone: 'light', opacity: .62, camera: [0, 0, 7.7], root: [1.45, .05, 0], steam: .95, rings: .82, table: .08, halo: .04, gallery: .03, proof: .03, path: .02, particles: .58 },
  intro:     { tone: 'light', opacity: .42, camera: [-.12, 0, 8.2], root: [-1.2, .05, 0], steam: .18, rings: .68, table: .08, halo: .06, gallery: .04, proof: .03, path: .02, particles: .24 },
  menu:      { tone: 'dark',  opacity: .34, camera: [.1, -.05, 7.9], root: [1.4, -.15, 0], steam: .08, rings: .16, table: .92, halo: .04, gallery: .03, proof: .03, path: .02, particles: .18 },
  discovery: { tone: 'light', opacity: .48, camera: [0, 0, 7.6], root: [-1.05, .05, 0], steam: .18, rings: .22, table: .95, halo: .05, gallery: .04, proof: .03, path: .02, particles: .28 },
  story:     { tone: 'light', opacity: .42, camera: [-.1, 0, 8], root: [-.65, .05, 0], steam: .06, rings: .10, table: .04, halo: .96, gallery: .05, proof: .05, path: .02, particles: .12 },
  space:     { tone: 'light', opacity: .38, camera: [.08, .03, 8.15], root: [.7, .05, 0], steam: .05, rings: .22, table: .04, halo: .14, gallery: .72, proof: .04, path: .02, particles: .16 },
  proof:     { tone: 'dark',  opacity: .30, camera: [-.08, 0, 8.25], root: [-.25, .05, 0], steam: .02, rings: .08, table: .02, halo: .04, gallery: .03, proof: .96, path: .02, particles: .06 },
  gallery:   { tone: 'light', opacity: .43, camera: [0, 0, 7.85], root: [0, .05, 0], steam: .05, rings: .12, table: .03, halo: .05, gallery: .96, proof: .04, path: .02, particles: .18 },
  visit:     { tone: 'light', opacity: .46, camera: [.1, 0, 8], root: [.4, .05, 0], steam: .03, rings: .12, table: .02, halo: .03, gallery: .04, proof: .03, path: .96, particles: .12 },
  final:     { tone: 'dark',  opacity: .28, camera: [0, 0, 8], root: [1.05, .05, 0], steam: .28, rings: .58, table: .03, halo: .03, gallery: .03, proof: .03, path: .18, particles: .22 },
};

const GROUP_KEYS = ['steam', 'rings', 'table', 'halo', 'gallery', 'proof', 'path', 'particles'];

export async function initSpatialExperience({ canvas, stage }) {
  const THREE = await import(THREE_URL);
  const isTablet = window.innerWidth < 1024;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isTablet,
    powerPreference: 'low-power',
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTablet ? 1.15 : 1.4));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
  camera.position.set(0, 0, 7.7);

  const ambient = new THREE.AmbientLight(0xfff3df, 1.35);
  const key = new THREE.DirectionalLight(0xffd6ab, 1.8);
  key.position.set(3.5, 4.5, 6);
  scene.add(ambient, key);

  const objects = createSceneObjects(THREE, { particleCount: isTablet ? 34 : 64 });
  scene.add(objects.root);

  let activeName = 'hero';
  let activeState = STATES.hero;
  let dishFocus = 0;
  let menuFocus = 0;
  let galleryFocus = -1;
  let running = true;
  let visible = !document.hidden;
  let raf = 0;
  let lastTime = performance.now();
  let pointerTarget = { x: 0, y: 0 };
  let pointer = { x: 0, y: 0 };
  const groupOpacity = Object.fromEntries(GROUP_KEYS.map((keyName) => [keyName, 0]));
  const rootTarget = new THREE.Vector3(...activeState.root);
  const cameraTarget = new THREE.Vector3(...activeState.camera);

  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  };
  resize();

  const setActiveState = (name) => {
    if (!STATES[name] || activeName === name) return;
    activeName = name;
    activeState = STATES[name];
    document.documentElement.dataset.spatialSection = name;
    stage.dataset.tone = activeState.tone;
    rootTarget.set(...activeState.root);
    cameraTarget.set(...activeState.camera);
  };

  document.documentElement.dataset.spatialSection = activeName;
  stage.dataset.tone = activeState.tone;

  const ratios = new Map();
  const sections = [...document.querySelectorAll('[data-spatial]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
    let best = null;
    let bestRatio = 0;
    ratios.forEach((ratio, section) => {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        best = section;
      }
    });
    if (best && bestRatio > .12) setActiveState(best.dataset.spatial);
  }, { threshold: [0, .12, .25, .4, .6, .8] });
  sections.forEach((section) => sectionObserver.observe(section));

  const dishObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > .45) {
        dishFocus = Number(entry.target.dataset.spatialDish || 0);
      }
    });
  }, { threshold: [.45, .7] });
  document.querySelectorAll('[data-spatial-dish]').forEach((card) => dishObserver.observe(card));

  const menuHandlers = [];
  document.querySelectorAll('[data-filter]').forEach((button) => {
    const handler = () => {
      const map = { all: 0, ethiopian: 0, breakfast: 1, lunch: 2, drinks: 1 };
      menuFocus = map[button.dataset.filter] ?? 0;
    };
    button.addEventListener('click', handler);
    menuHandlers.push([button, handler]);
  });

  const galleryFigures = [...document.querySelectorAll('[data-spatial-photo]')];
  const galleryHandlers = [];
  galleryFigures.forEach((figure, index) => {
    const enter = () => {
      galleryFocus = index;
      figure.classList.add('is-spatial-active');
    };
    const leave = () => {
      galleryFocus = -1;
      figure.classList.remove('is-spatial-active');
    };
    figure.addEventListener('pointerenter', enter);
    figure.addEventListener('pointerleave', leave);
    galleryHandlers.push([figure, enter, leave]);
  });

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const heroVisual = document.querySelector('.hero-visual');
  const galleryGrid = document.querySelector('.gallery-grid');

  const onPointerMove = (event) => {
    if (!finePointer) return;
    pointerTarget.x = clamp((event.clientX / window.innerWidth - .5) * 2, -1, 1);
    pointerTarget.y = clamp((event.clientY / window.innerHeight - .5) * 2, -1, 1);
    if (activeName === 'hero' && heroVisual) {
      heroVisual.style.setProperty('--hero-ry', `${pointerTarget.x * 1.6}deg`);
      heroVisual.style.setProperty('--hero-rx', `${pointerTarget.y * -1.2}deg`);
    }
    if (activeName === 'gallery' && galleryGrid) {
      galleryGrid.style.setProperty('--photo-ry', `${pointerTarget.x * .85}deg`);
      galleryGrid.style.setProperty('--photo-rx', `${pointerTarget.y * -.65}deg`);
    }
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const onScroll = () => {
    if (activeName === 'hero' && heroVisual) {
      const rect = document.querySelector('.hero')?.getBoundingClientRect();
      if (rect) {
        const progress = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
        heroVisual.style.setProperty('--hero-lift', `${progress * -10}px`);
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  const onVisibility = () => {
    visible = !document.hidden;
    if (visible && running && !raf) {
      lastTime = performance.now();
      raf = requestAnimationFrame(tick);
    }
  };
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('resize', resize, { passive: true });

  function updateInteractiveObjects(delta, time) {
    const plateIndex = activeName === 'discovery' ? dishFocus : menuFocus;
    objects.table.userData.plates.forEach((plate, index) => {
      const targetScale = index === plateIndex ? 1.16 : .92;
      const next = damp(plate.scale.x, targetScale, 5.5, delta);
      plate.scale.setScalar(next);
      plate.rotation.z = damp(plate.rotation.z, (index - 1) * .18 + Math.sin(time * .00025 + index) * .035, 3.2, delta);
    });

    objects.gallery.userData.frames.forEach((frame, index) => {
      const targetScale = index === galleryFocus ? 1.16 : 1;
      const next = damp(frame.scale.x, targetScale, 6, delta);
      frame.scale.setScalar(next);
      frame.position.z = damp(frame.position.z, ([-2.2, -1.4, -2.7, -1.8][index]) + (index === galleryFocus ? .46 : 0), 5, delta);
    });
  }

  function tick(now) {
    raf = 0;
    if (!running || !visible) return;
    const delta = Math.min((now - lastTime) / 1000, .05);
    lastTime = now;

    pointer.x = damp(pointer.x, pointerTarget.x, 3.5, delta);
    pointer.y = damp(pointer.y, pointerTarget.y, 3.5, delta);

    rootTarget.set(...activeState.root);
    cameraTarget.set(...activeState.camera);
    if (finePointer && activeName === 'hero') {
      cameraTarget.x += pointer.x * .075;
      cameraTarget.y -= pointer.y * .055;
    }

    dampVector3(objects.root.position, rootTarget, 3.6, delta);
    dampVector3(camera.position, cameraTarget, 3.8, delta);
    camera.lookAt(0, 0, -1.7);

    GROUP_KEYS.forEach((keyName) => {
      groupOpacity[keyName] = damp(groupOpacity[keyName], activeState[keyName], 4.1, delta);
      setGroupOpacity(objects[keyName], groupOpacity[keyName]);
    });

    stage.style.setProperty('--spatial-opacity', String(activeState.opacity));
    objects.rings.rotation.z += delta * .018;
    objects.particles.rotation.z -= delta * .006;
    objects.particles.position.y = Math.sin(now * .00014) * .08;
    objects.gallery.rotation.y = damp(objects.gallery.rotation.y, activeName === 'gallery' ? pointer.x * .04 : 0, 3.2, delta);
    objects.path.rotation.z = damp(objects.path.rotation.z, activeName === 'visit' ? -.04 : .02, 3.2, delta);

    updateSteam(now / 1000, objects.steam);
    updateInteractiveObjects(delta, now);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  document.documentElement.classList.remove('spatial-pending');
  document.documentElement.classList.add('spatial-ready');
  raf = requestAnimationFrame(tick);

  return () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    sectionObserver.disconnect();
    dishObserver.disconnect();
    menuHandlers.forEach(([button, handler]) => button.removeEventListener('click', handler));
    galleryHandlers.forEach(([figure, enter, leave]) => {
      figure.removeEventListener('pointerenter', enter);
      figure.removeEventListener('pointerleave', leave);
    });
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    disposeSceneObjects(objects.root);
    renderer.dispose();
    document.documentElement.classList.remove('spatial-ready');
  };
}
