import { damp, dampVector3 } from './motion.js';

export function createCameraRig(THREE, scene, { fov = 42 } = {}) {
  const rig = new THREE.Group();
  const camera = new THREE.PerspectiveCamera(fov, 1, .1, 100);
  const rigTarget = new THREE.Vector3(0, 0, 8);
  const pointer = new THREE.Vector2(0, 0);
  const pointerTarget = new THREE.Vector2(0, 0);
  const lookTarget = new THREE.Vector3(0, 0, -1.8);

  rig.add(camera);
  scene.add(rig);
  rig.position.copy(rigTarget);

  function setRigTarget(values) {
    rigTarget.set(...values);
  }

  function setPointer(x, y) {
    pointerTarget.set(x, y);
  }

  function update(delta, { pointerEnabled = false } = {}) {
    dampVector3(rig.position, rigTarget, 3.8, delta);
    pointer.x = damp(pointer.x, pointerEnabled ? pointerTarget.x : 0, 4.2, delta);
    pointer.y = damp(pointer.y, pointerEnabled ? pointerTarget.y : 0, 4.2, delta);

    camera.position.x = pointer.x * .075;
    camera.position.y = pointer.y * -.055;
    camera.position.z = 0;
    camera.lookAt(lookTarget);

    return Math.abs(rig.position.x - rigTarget.x)
      + Math.abs(rig.position.y - rigTarget.y)
      + Math.abs(rig.position.z - rigTarget.z)
      + Math.abs(pointer.x - (pointerEnabled ? pointerTarget.x : 0))
      + Math.abs(pointer.y - (pointerEnabled ? pointerTarget.y : 0));
  }

  function resize(width, height) {
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  }

  return {
    rig,
    camera,
    setRigTarget,
    setPointer,
    update,
    resize,
  };
}
