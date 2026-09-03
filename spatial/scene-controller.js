import { createAssetManager, getSpatialPhotoSources } from './assets.js';
import { createCameraRig } from './camera-rig.js';
import { createDishSequence } from './dish-sequence.js';
import { createSpatialDebug } from './debug.js';
import { createGalleryWall } from './gallery-wall.js';
import { createMaterials } from './materials.js';
import { createMenuTable } from './menu-table.js';
import { createMeraThread } from './mera-thread.js';
import { clamp, damp, dampVector3, distance3, disposeObject3D, setGroupOpacity } from './motion.js';
import { createPhotoDiorama } from './photo-diorama.js';
import { GROUP_KEYS, SCENE_STATES, THREAD_SHAPES } from './scene-states.js';
import { createStoryScene } from './story-scene.js';
import { createProceduralTextures, disposeTextures } from './textures.js';
import { createTrustScene } from './trust-scene.js';
import { createVisitScene } from './visit-scene.js';

const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.181.1/build/three.module.js';

function createParticles(THREE, material, count) {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - .5) * 8.4;
    positions[index * 3 + 1] = (Math.random() - .5) * 5.6;
    positions[index * 3 + 2] = -1 - Math.random() * 4.2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(geometry, material.clone());
  points.material.userData.baseOpacity = material.userData.baseOpacity;
  return points;
}

export async function initSpatialExperience({ canvas, stage, quality, capabilities }) {
  const THREE = await import(THREE_URL);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: quality.antialias,
    powerPreference: 'low-power',
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality.dpr));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const cameraRig = createCameraRig(THREE, scene, { fov: 42 });
  const proceduralTextures = createProceduralTextures(THREE);
  const materials = createMaterials(THREE, proceduralTextures);
  const assetManager = createAssetManager(THREE);
  const sources = getSpatialPhotoSources();

  const ambient = new THREE.AmbientLight(0xfff4e2, 1.15);
  const key = new THREE.DirectionalLight(0xffd7ad, 1.45);
  key.position.set(3.8, 4.8, 6.2);
  const fill = new THREE.DirectionalLight(0xdfe9dc, .45);
  fill.position.set(-4, -1, 3.5);
  scene.add(ambient, key, fill);

  const root = new THREE.Group();
  scene.add(root);

  const thread = createMeraThread(THREE, materials, THREAD_SHAPES.hero);
  const hero = createPhotoDiorama(THREE, materials);
  const table = createMenuTable(THREE, materials);
  const dishes = createDishSequence(THREE, materials);
  const story = createStoryScene(THREE, materials);
  const gallery = createGalleryWall(THREE, materials);
  const proof = createTrustScene(THREE, materials);
  const visit = createVisitScene(THREE, materials);
  const particles = createParticles(THREE, materials.particles, quality.particles);

  root.add(
    thread.group,
    hero.group,
    table.group,
    dishes.group,
    story.group,
    gallery.group,
    proof.group,
    visit.group,
    particles,
  );

  const objects = {
    hero: hero.group,
    table: table.group,
    dishes: dishes.group,
    story: story.group,
    gallery: gallery.group,
    proof: proof.group,
    visit: visit.group,
    particles,
  };

  let activeName = 'hero';
  let activeState = SCENE_STATES.hero;
  let menuFocus = 0;
  let dishFocus = 0;
  let galleryFocus = -1;
  let visible = !document.hidden;
  let running = true;
  let raf = 0;
  let renderUntil = performance.now() + 1500;
  let lastTime = performance.now();
  let stageOpacity = 0;
  const pointerTarget = { x: 0, y: 0 };
  const pointer = { x: 0, y: 0 };
  const rootTarget = new THREE.Vector3(...activeState.root);
  const groupOpacity = Object.fromEntries(GROUP_KEYS.map((key) => [key, 0]));
  const debug = createSpatialDebug({ enabled: quality.debug, renderer, quality });

  function invalidate(duration = 800) {
    renderUntil = Math.max(renderUntil, performance.now() + duration);
    if (visible && running && !raf) {
      lastTime = performance.now();
      raf = requestAnimationFrame(tick);
    }
  }

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality.dpr));
    renderer.setSize(width, height, false);
    cameraRig.resize(width, height);
    invalidate(650);
  }
  resize();

  function setActiveState(name) {
    const next = SCENE_STATES[name];
    if (!next || activeName === name) return;
    activeName = name;
    activeState = next;
    rootTarget.set(...next.root);
    cameraRig.setRigTarget(next.camera);
    thread.setTarget(THREAD_SHAPES[next.thread], { steam: next.steam });
    document.documentElement.dataset.spatialSection = name;
    stage.dataset.tone = next.tone;
    invalidate(1500);
  }

  document.documentElement.dataset.spatialSection = activeName;
  stage.dataset.tone = activeState.tone;
  cameraRig.setRigTarget(activeState.camera);
  thread.setTarget(THREAD_SHAPES[activeState.thread], { steam: activeState.steam });

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
    if (best && bestRatio > .11) setActiveState(best.dataset.spatial);
  }, { threshold: [0, .11, .2, .35, .5, .7, .85] });
  sections.forEach((section) => sectionObserver.observe(section));

  const dishObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > .4) {
        dishFocus = Number(entry.target.dataset.spatialDish || 0);
        dishes.setFocus(dishFocus);
        invalidate(900);
      }
    });
  }, { threshold: [.4, .62, .8] });
  document.querySelectorAll('[data-spatial-dish]').forEach((card) => dishObserver.observe(card));

  const menuHandlers = [];
  const menuMap = { all: 0, ethiopian: 0, breakfast: 1, lunch: 2, drinks: 1 };
  document.querySelectorAll('[data-filter]').forEach((button) => {
    const handler = () => {
      const mode = button.dataset.filter || 'all';
      menuFocus = menuMap[mode] ?? 0;
      table.setFocus(menuFocus, mode);
      invalidate(850);
    };
    button.addEventListener('click', handler);
    button.addEventListener('focus', handler);
    menuHandlers.push([button, handler]);
  });

  const galleryHandlers = [];
  const galleryFigures = [...document.querySelectorAll('[data-spatial-photo]')];
  galleryFigures.forEach((figure, index) => {
    const enter = () => {
      galleryFocus = index;
      gallery.setFocus(index);
      figure.classList.add('is-spatial-active');
      invalidate(850);
    };
    const leave = () => {
      galleryFocus = -1;
      gallery.setFocus(-1);
      figure.classList.remove('is-spatial-active');
      invalidate(650);
    };
    figure.addEventListener('pointerenter', enter);
    figure.addEventListener('pointerleave', leave);
    figure.addEventListener('focusin', enter);
    figure.addEventListener('focusout', leave);
    galleryHandlers.push([figure, enter, leave]);
  });

  const heroVisual = document.querySelector('.hero-visual');
  const galleryGrid = document.querySelector('.gallery-grid');

  function onPointerMove(event) {
    if (!capabilities.finePointer) return;
    pointerTarget.x = clamp((event.clientX / window.innerWidth - .5) * 2, -1, 1);
    pointerTarget.y = clamp((event.clientY / window.innerHeight - .5) * 2, -1, 1);
    cameraRig.setPointer(pointerTarget.x, pointerTarget.y);

    if (activeName === 'hero' && heroVisual) {
      heroVisual.style.setProperty('--hero-ry', `${pointerTarget.x * 1.45}deg`);
      heroVisual.style.setProperty('--hero-rx', `${pointerTarget.y * -1.05}deg`);
    }
    if (activeName === 'gallery' && galleryGrid) {
      galleryGrid.style.setProperty('--photo-ry', `${pointerTarget.x * .72}deg`);
      galleryGrid.style.setProperty('--photo-rx', `${pointerTarget.y * -.52}deg`);
    }
    invalidate(520);
  }

  function onPointerLeave() {
    pointerTarget.x = 0;
    pointerTarget.y = 0;
    cameraRig.setPointer(0, 0);
    if (heroVisual) {
      heroVisual.style.setProperty('--hero-ry', '0deg');
      heroVisual.style.setProperty('--hero-rx', '0deg');
    }
    if (galleryGrid) {
      galleryGrid.style.setProperty('--photo-ry', '0deg');
      galleryGrid.style.setProperty('--photo-rx', '0deg');
    }
    invalidate(650);
  }

  function onScroll() {
    if (activeName === 'hero' && heroVisual) {
      const rect = document.querySelector('.hero')?.getBoundingClientRect();
      if (rect) {
        const progress = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
        heroVisual.style.setProperty('--hero-lift', `${progress * -9}px`);
      }
    }
    invalidate(180);
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onPointerLeave, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', resize, { passive: true });

  function onVisibility() {
    visible = !document.hidden;
    if (visible) invalidate(500);
    else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }
  document.addEventListener('visibilitychange', onVisibility);

  function onContextLost(event) {
    event.preventDefault();
    running = false;
    document.documentElement.classList.remove('spatial-ready');
    document.documentElement.classList.add('spatial-static');
  }
  canvas.addEventListener('webglcontextlost', onContextLost, false);

  async function loadHeroTexture() {
    if (!quality.photoTextures || !sources.hero) return;
    const texture = await assetManager.loadTexture(sources.hero);
    if (texture && running) {
      hero.setTexture(texture);
      invalidate(900);
    }
  }
  loadHeroTexture();

  let galleryLoaded = false;
  const gallerySection = document.querySelector('.gallery') || document.querySelector('.space-section');
  const galleryLoadObserver = gallerySection && quality.photoTextures
    ? new IntersectionObserver(async (entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting) || galleryLoaded) return;
        galleryLoaded = true;
        observer.disconnect();
        const [interiorTexture, galleryTextures] = await Promise.all([
          assetManager.loadTexture(sources.interior),
          Promise.all(sources.gallery.slice(0, 6).map((url) => assetManager.loadTexture(url))),
        ]);
        if (!running) return;
        if (interiorTexture) gallery.setInteriorTexture(interiorTexture);
        gallery.setTextures(galleryTextures.filter(Boolean));
        invalidate(1000);
      }, { rootMargin: '1100px 0px' })
    : null;
  if (galleryLoadObserver && gallerySection) galleryLoadObserver.observe(gallerySection);

  function updateParticles(delta, now) {
    particles.rotation.z -= delta * .0035;
    particles.position.y = Math.sin(now * .00012) * .055;
  }

  function tick(now) {
    raf = 0;
    if (!running || !visible) return;

    const delta = Math.min((now - lastTime) / 1000, .05);
    lastTime = now;
    const time = now / 1000;
    let energy = 0;

    pointer.x = damp(pointer.x, pointerTarget.x, 4.2, delta);
    pointer.y = damp(pointer.y, pointerTarget.y, 4.2, delta);

    energy += distance3(root.position, rootTarget);
    dampVector3(root.position, rootTarget, 3.5, delta);
    energy += cameraRig.update(delta, { pointerEnabled: capabilities.finePointer && activeName === 'hero' });

    energy += thread.update(delta, time, activeState.threadOpacity);
    hero.update(delta, time, pointer, activeState.hero);
    energy += table.update(delta, time);
    energy += dishes.update(delta, time);
    story.update(delta, time, activeState.story);
    energy += gallery.update(delta, activeName === 'gallery' ? pointer.x : 0);
    visit.update(delta, time, activeState.visit);
    updateParticles(delta, now);

    GROUP_KEYS.forEach((key) => {
      const previous = groupOpacity[key];
      groupOpacity[key] = damp(previous, activeState[key], 4.2, delta);
      energy += Math.abs(groupOpacity[key] - activeState[key]);
      setGroupOpacity(objects[key], groupOpacity[key]);
    });

    stageOpacity = damp(stageOpacity, activeState.stageOpacity, 4.2, delta);
    stage.style.setProperty('--spatial-opacity', stageOpacity.toFixed(3));

    renderer.render(scene, cameraRig.camera);
    const continuous = activeState.continuous;
    const needsMore = continuous || energy > .005 || now < renderUntil;
    debug.update(now, {
      section: activeName,
      focus: activeName === 'gallery' ? galleryFocus : activeName === 'discovery' ? dishFocus : menuFocus,
      rendering: needsMore,
    });

    if (needsMore) raf = requestAnimationFrame(tick);
  }

  document.documentElement.classList.remove('spatial-pending');
  document.documentElement.classList.add('spatial-ready');
  invalidate(1600);

  return async () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    sectionObserver.disconnect();
    dishObserver.disconnect();
    galleryLoadObserver?.disconnect?.();
    menuHandlers.forEach(([button, handler]) => {
      button.removeEventListener('click', handler);
      button.removeEventListener('focus', handler);
    });
    galleryHandlers.forEach(([figure, enter, leave]) => {
      figure.removeEventListener('pointerenter', enter);
      figure.removeEventListener('pointerleave', leave);
      figure.removeEventListener('focusin', enter);
      figure.removeEventListener('focusout', leave);
    });
    window.removeEventListener('pointermove', onPointerMove);
    document.documentElement.removeEventListener('mouseleave', onPointerLeave);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    debug.destroy();
    disposeObject3D(root);
    disposeTextures(proceduralTextures);
    await assetManager.dispose();
    renderer.dispose();
    document.documentElement.classList.remove('spatial-ready');
  };
}
