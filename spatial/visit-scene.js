import { damp } from './motion.js';

function ring(THREE, material, inner, outer) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 64), material.clone());
  mesh.material.userData.baseOpacity = material.userData.baseOpacity;
  return mesh;
}

export function createVisitScene(THREE, materials) {
  const group = new THREE.Group();
  group.position.set(.5, .02, -1.35);

  const planes = [];
  const settings = [
    [-1.65, -.85, -1.8, .9, 1.2, -.12],
    [.05, -.2, -1.35, 1.02, 1.38, .07],
    [1.62, .55, -.92, .86, 1.12, -.06],
  ];

  settings.forEach(([x, y, z, width, height, rotation], index) => {
    const material = (index === 1 ? materials.paperGreen : materials.paper).clone();
    material.userData.baseOpacity = index === 1 ? .06 : .085;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
    plane.position.set(x, y, z);
    plane.rotation.z = rotation;
    plane.userData.homeY = y;
    planes.push(plane);
    group.add(plane);
  });

  const markerOuter = ring(THREE, materials.marker, .18, .26);
  const markerInner = ring(THREE, materials.accentGreen, .3, .325);
  markerOuter.position.set(2.55, .72, -.45);
  markerInner.position.copy(markerOuter.position);
  markerInner.position.z -= .08;

  const glowMaterial = materials.haze.clone();
  glowMaterial.userData.baseOpacity = .07;
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), glowMaterial);
  glow.position.set(2.55, .72, -.65);

  group.add(glow, markerInner, markerOuter);

  function update(delta, time, amount = 1) {
    markerOuter.rotation.z += delta * .035 * amount;
    markerInner.rotation.z -= delta * .018 * amount;
    const targetScale = .98 + Math.sin(time * .36) * .02 * amount;
    const next = damp(glow.scale.x, targetScale, 3.8, delta);
    glow.scale.setScalar(next);

    planes.forEach((plane, index) => {
      plane.position.y = plane.userData.homeY + Math.sin(time * .12 + index) * .018 * amount;
    });
  }

  return { group, update };
}
