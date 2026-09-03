import { damp } from './motion.js';
import { createPhotoMaterial } from './materials.js';

const LAYOUT = [
  [-2.55, .72, -2.35, 1.52, 1.15, -.10],
  [-1.1, -.72, -1.35, 1.16, 1.5, .09],
  [.15, .74, -2.75, 1.7, 1.08, -.055],
  [1.45, -.55, -1.72, 1.12, 1.48, .11],
  [2.55, .58, -2.48, 1.38, 1.06, -.08],
  [.2, -.98, -3.05, 1.82, .98, .025],
];

export function createGalleryWall(THREE, materials) {
  const group = new THREE.Group();
  group.position.set(0, .05, -1.1);

  const roomBackMaterial = materials.plaster.clone();
  roomBackMaterial.userData.baseOpacity = .065;
  const roomBack = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 4.6), roomBackMaterial);
  roomBack.position.set(0, 0, -3.5);

  const greenMaterial = materials.paperGreen.clone();
  greenMaterial.userData.baseOpacity = .055;
  const greenVolume = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 4.0), greenMaterial);
  greenVolume.position.set(2.5, -.1, -3.2);
  greenVolume.rotation.z = -.035;

  const clayMaterial = materials.accentClay.clone();
  clayMaterial.userData.baseOpacity = .045;
  const clayPlane = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1.6), clayMaterial);
  clayPlane.position.set(-.5, -1.55, -3.05);
  clayPlane.rotation.z = .025;

  const frames = LAYOUT.map(([x, y, z, width, height, rotation], index) => {
    const fallback = materials.galleryFallback.clone();
    fallback.userData.baseOpacity = .11;
    fallback.userData.opacityMultiplier = 1;
    const frame = new THREE.Mesh(new THREE.PlaneGeometry(width, height), fallback);
    frame.position.set(x, y, z);
    frame.rotation.z = rotation;
    frame.userData.home = new THREE.Vector3(x, y, z);
    frame.userData.index = index;
    group.add(frame);
    return frame;
  });

  group.add(roomBack, greenVolume, clayPlane);

  let focus = -1;

  function setTextures(textures = []) {
    textures.slice(0, frames.length).forEach((texture, index) => {
      if (!texture) return;
      const frame = frames[index];
      const old = frame.material;
      frame.material = createPhotoMaterial(THREE, texture, .22);
      frame.material.userData.opacityMultiplier = 1;
      old.dispose?.();
    });
  }

  function setInteriorTexture(texture) {
    if (!texture || !frames[2]) return;
    const frame = frames[2];
    const old = frame.material;
    frame.material = createPhotoMaterial(THREE, texture, .25);
    frame.material.userData.opacityMultiplier = 1;
    old.dispose?.();
  }

  function setFocus(index) {
    focus = Number.isFinite(index) ? index : -1;
  }

  function update(delta, pointerX = 0) {
    let energy = 0;
    frames.forEach((frame, index) => {
      const home = frame.userData.home;
      const active = index === focus;
      const targetZ = home.z + (active ? .58 : 0);
      const targetScale = active ? 1.12 : 1;
      const nextZ = damp(frame.position.z, targetZ, 5.4, delta);
      const nextScale = damp(frame.scale.x, targetScale, 5.8, delta);
      energy += Math.abs(frame.position.z - nextZ) + Math.abs(frame.scale.x - nextScale);
      frame.position.z = nextZ;
      frame.scale.setScalar(nextScale);
      frame.material.userData.opacityMultiplier = focus < 0 || active ? 1 : .48;
    });

    group.rotation.y = damp(group.rotation.y, pointerX * .035, 3.6, delta);
    group.position.x = damp(group.position.x, pointerX * .08, 3.6, delta);
    return energy;
  }

  return {
    group,
    frames,
    setTextures,
    setInteriorTexture,
    setFocus,
    update,
  };
}
