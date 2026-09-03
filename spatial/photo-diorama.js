import { damp } from './motion.js';
import { createPhotoMaterial } from './materials.js';

function ring(THREE, material, inner, outer) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 72), material.clone());
  mesh.material.userData.baseOpacity = material.userData.baseOpacity;
  return mesh;
}

export function createPhotoDiorama(THREE, materials) {
  const group = new THREE.Group();
  group.position.set(1.45, .08, -1.65);

  const shadowMaterial = materials.shadow.clone();
  shadowMaterial.userData.baseOpacity = .14;
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.7, 3.6), shadowMaterial);
  shadow.position.set(.12, -.28, -.9);
  shadow.scale.y = .72;

  const paperMaterial = materials.paper.clone();
  paperMaterial.userData.baseOpacity = .1;
  const paper = new THREE.Mesh(new THREE.PlaneGeometry(4.15, 3.15), paperMaterial);
  paper.position.set(-.12, -.04, -.72);
  paper.rotation.z = -.035;

  const greenMaterial = materials.paperGreen.clone();
  greenMaterial.userData.baseOpacity = .09;
  const greenPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.15, 2.8), greenMaterial);
  greenPlane.position.set(1.6, -.15, -.82);
  greenPlane.rotation.z = .08;

  const ceramicArc = ring(THREE, materials.accentBrass, 1.65, 1.69);
  ceramicArc.position.set(-1.55, .9, -.58);
  ceramicArc.rotation.z = -.25;

  const photoGroup = new THREE.Group();
  const photoGeometry = new THREE.PlaneGeometry(4.0, 3.0);
  const photoLayers = [];
  const layerSettings = [
    { z: -.46, x: -.05, y: .02, opacity: .11, scale: 1.02, rotation: -.018 },
    { z: -.3, x: .07, y: -.025, opacity: .075, scale: .995, rotation: .012 },
    { z: -.14, x: .15, y: .045, opacity: .045, scale: .97, rotation: .025 },
  ];

  layerSettings.forEach((setting) => {
    const material = createPhotoMaterial(THREE, null, setting.opacity);
    material.visible = false;
    const plane = new THREE.Mesh(photoGeometry.clone(), material);
    plane.position.set(setting.x, setting.y, setting.z);
    plane.rotation.z = setting.rotation;
    plane.scale.setScalar(setting.scale);
    plane.userData.base = setting;
    photoGroup.add(plane);
    photoLayers.push(plane);
  });

  const hazeMaterial = materials.haze.clone();
  hazeMaterial.userData.baseOpacity = .08;
  const haze = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.5), hazeMaterial);
  haze.position.set(-1.45, .35, -.04);
  haze.rotation.z = -.12;

  group.add(shadow, paper, greenPlane, ceramicArc, photoGroup, haze);

  function setTexture(texture) {
    if (!texture) return false;
    photoLayers.forEach((plane, index) => {
      const old = plane.material;
      const opacity = layerSettings[index].opacity;
      plane.material = createPhotoMaterial(THREE, texture, opacity);
      plane.material.visible = true;
      old.dispose?.();
    });
    return true;
  }

  function update(delta, time, pointer, amount = 1) {
    const active = Math.max(0, Math.min(1, amount));
    group.rotation.y = damp(group.rotation.y, pointer.x * .018 * active, 3.8, delta);
    group.rotation.x = damp(group.rotation.x, pointer.y * -.012 * active, 3.8, delta);
    ceramicArc.rotation.z += delta * .012 * active;
    haze.position.y = .35 + Math.sin(time * .18) * .055;

    photoLayers.forEach((plane, index) => {
      const setting = layerSettings[index];
      const depth = (index + 1) * .018;
      plane.position.x = setting.x + pointer.x * depth * active;
      plane.position.y = setting.y - pointer.y * depth * .7 * active;
    });
  }

  function dispose() {
    group.traverse((object) => {
      object.geometry?.dispose?.();
      if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
      else object.material?.dispose?.();
    });
  }

  return {
    group,
    setTexture,
    update,
    dispose,
  };
}
