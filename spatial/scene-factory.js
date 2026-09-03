import { createMaterials } from './materials.js';

function makeRing(THREE, material, inner, outer, x, y, z, rotation = 0) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 64), material.clone());
  mesh.material.userData.baseOpacity = material.userData.baseOpacity;
  mesh.position.set(x, y, z);
  mesh.rotation.z = rotation;
  return mesh;
}

function createSteam(THREE, materials) {
  const group = new THREE.Group();
  const lineCount = 3;
  const pointCount = 52;
  for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
    const positions = new Float32Array(pointCount * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = (lineIndex === 1 ? materials.steamSoft : materials.steam).clone();
    material.userData.baseOpacity = lineIndex === 1 ? .26 : .42;
    const line = new THREE.Line(geometry, material);
    line.userData = {
      pointCount,
      baseX: (lineIndex - 1) * .55,
      baseZ: -1.2 - lineIndex * .18,
      phase: lineIndex * 1.9,
    };
    group.add(line);
  }
  group.position.set(1.8, .2, 0);
  return group;
}

function createRings(THREE, materials) {
  const group = new THREE.Group();
  group.add(makeRing(THREE, materials.ringBrass, 1.25, 1.29, 0, 0, -2.3, .22));
  group.add(makeRing(THREE, materials.ringGreen, .78, .81, 1.25, -.95, -1.4, -.34));
  group.add(makeRing(THREE, materials.ringClay, 1.7, 1.73, -.95, .7, -3.1, -.15));
  return group;
}

function createTable(THREE, materials) {
  const group = new THREE.Group();
  const platePositions = [[-1.45, .55, -1.7], [.15, -.4, -1.1], [1.6, .7, -2.1]];
  const plates = [];

  platePositions.forEach(([x, y, z], index) => {
    const plateGroup = new THREE.Group();
    const discMat = materials.plate.clone();
    discMat.userData.baseOpacity = .12;
    const disc = new THREE.Mesh(new THREE.CircleGeometry(.66, 64), discMat);
    const edge = makeRing(THREE, materials.plateEdge, .63, .68, 0, 0, .02, index * .12);
    plateGroup.add(disc, edge);
    plateGroup.position.set(x, y, z);
    plateGroup.rotation.z = (index - 1) * .18;
    group.add(plateGroup);
    plates.push(plateGroup);
  });

  for (let i = 0; i < 3; i += 1) {
    const mat = (i === 1 ? materials.paperDark : materials.paper).clone();
    mat.userData.baseOpacity = i === 1 ? .08 : .085;
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(.72, 1.02), mat);
    paper.position.set(-2.1 + i * 2.05, -1.5 + (i % 2) * .35, -2.9 - i * .2);
    paper.rotation.z = -.18 + i * .19;
    group.add(paper);
  }

  group.userData.plates = plates;
  return group;
}

function createHalo(THREE, materials) {
  const group = new THREE.Group();
  group.add(makeRing(THREE, materials.halo, 1.5, 1.56, -1.8, .15, -2.2, .08));
  group.add(makeRing(THREE, materials.ringGreen, 1.94, 1.97, -1.8, .15, -2.8, -.12));
  const paperMat = materials.paper.clone();
  paperMat.userData.baseOpacity = .085;
  const paper = new THREE.Mesh(new THREE.PlaneGeometry(.9, 1.2), paperMat);
  paper.position.set(-.15, -1.15, -3.1);
  paper.rotation.z = .24;
  group.add(paper);
  return group;
}

function createGalleryFrames(THREE, materials) {
  const group = new THREE.Group();
  const frames = [];
  const layout = [
    [-2.35, .65, -2.2, 1.35, 1.8, -.12],
    [-.75, -.65, -1.4, 1.1, 1.45, .11],
    [.85, .6, -2.7, 1.55, 1.08, -.07],
    [2.35, -.35, -1.8, 1.02, 1.45, .14],
  ];
  layout.forEach(([x, y, z, w, h, r]) => {
    const mat = materials.gallery.clone();
    mat.userData.baseOpacity = .075;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    plane.position.set(x, y, z);
    plane.rotation.z = r;
    group.add(plane);
    frames.push(plane);
  });
  group.userData.frames = frames;
  return group;
}

function createProof(THREE, materials) {
  const group = new THREE.Group();
  group.add(makeRing(THREE, materials.ringBrass, 1.9, 1.95, -2.25, .05, -2.8, .04));
  group.add(makeRing(THREE, materials.ringClay, 1.2, 1.23, -2.25, .05, -2.0, -.08));
  return group;
}

function createVisitPath(THREE, materials) {
  const group = new THREE.Group();
  const points = [
    [-3.2, -1.55, -2.7], [-2.1, -.6, -2.25], [-.9, -1.0, -1.8],
    [.25, -.15, -1.45], [1.45, -.5, -1.05], [2.6, .35, -.75],
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  const pathMat = materials.path.clone();
  pathMat.userData.baseOpacity = .52;
  group.add(new THREE.Line(geometry, pathMat));
  group.add(makeRing(THREE, materials.marker, .15, .24, 2.6, .35, -.72, 0));
  group.add(makeRing(THREE, materials.ringGreen, .28, .3, 2.6, .35, -.85, 0));
  return group;
}

function createParticles(THREE, materials, particleCount) {
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    positions[i * 3] = (Math.random() - .5) * 8;
    positions[i * 3 + 1] = (Math.random() - .5) * 5.5;
    positions[i * 3 + 2] = -1 - Math.random() * 4;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = materials.particles.clone();
  mat.userData.baseOpacity = .46;
  return new THREE.Points(geometry, mat);
}

export function createSceneObjects(THREE, { particleCount = 60 } = {}) {
  const materials = createMaterials(THREE);
  const root = new THREE.Group();
  const steam = createSteam(THREE, materials);
  const rings = createRings(THREE, materials);
  const table = createTable(THREE, materials);
  const halo = createHalo(THREE, materials);
  const gallery = createGalleryFrames(THREE, materials);
  const proof = createProof(THREE, materials);
  const path = createVisitPath(THREE, materials);
  const particles = createParticles(THREE, materials, particleCount);

  root.add(steam, rings, table, halo, gallery, proof, path, particles);
  return { root, steam, rings, table, halo, gallery, proof, path, particles };
}

export function updateSteam(time, steamGroup) {
  steamGroup.children.forEach((line) => {
    const { pointCount, baseX, baseZ, phase } = line.userData;
    const positions = line.geometry.attributes.position.array;
    for (let i = 0; i < pointCount; i += 1) {
      const t = i / (pointCount - 1);
      const y = -2.7 + t * 5.4;
      const taper = .12 + t * .46;
      positions[i * 3] = baseX
        + Math.sin(t * 8.5 + time * .58 + phase) * taper
        + Math.sin(t * 17 + time * .23 + phase) * .06;
      positions[i * 3 + 1] = y + Math.sin(time * .24 + phase) * .055;
      positions[i * 3 + 2] = baseZ + Math.cos(t * 7 + time * .31 + phase) * .12;
    }
    line.geometry.attributes.position.needsUpdate = true;
  });
}

export function disposeSceneObjects(root) {
  root.traverse((object) => {
    object.geometry?.dispose?.();
    if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
    else object.material?.dispose?.();
  });
}
