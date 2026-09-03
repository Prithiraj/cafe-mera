import { damp } from './motion.js';

function ring(THREE, material, inner, outer) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 72), material.clone());
  mesh.material.userData.baseOpacity = material.userData.baseOpacity;
  return mesh;
}

export function createStoryScene(THREE, materials) {
  const group = new THREE.Group();
  group.position.set(-1.45, .05, -1.75);

  const halo = ring(THREE, materials.accentBrass, 1.48, 1.53);
  halo.position.set(-.35, .1, -.18);
  halo.rotation.z = .08;

  const haloOuter = ring(THREE, materials.accentGreen, 1.82, 1.85);
  haloOuter.position.set(-.35, .1, -.58);
  haloOuter.rotation.z = -.12;

  const paperMaterial = materials.paper.clone();
  paperMaterial.userData.baseOpacity = .095;
  const paper = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.38), paperMaterial);
  paper.position.set(1.25, -1.15, -.7);
  paper.rotation.z = .22;

  const lightMaterial = materials.haze.clone();
  lightMaterial.userData.baseOpacity = .055;
  const light = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 3.1), lightMaterial);
  light.position.set(.35, .45, -.82);
  light.rotation.z = -.18;

  group.add(haloOuter, paper, halo, light);

  function update(delta, time, amount = 1) {
    halo.rotation.z = damp(halo.rotation.z, .08 + Math.sin(time * .08) * .012 * amount, 3, delta);
    haloOuter.rotation.z = damp(haloOuter.rotation.z, -.12 + Math.cos(time * .07) * .008 * amount, 3, delta);
    paper.position.y = -1.15 + Math.sin(time * .11) * .025 * amount;
  }

  return { group, update };
}
