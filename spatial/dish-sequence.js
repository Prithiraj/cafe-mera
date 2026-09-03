import { damp } from './motion.js';
import { createPhotoMaterial } from './materials.js';

function ring(THREE, material, inner, outer) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 64), material.clone());
  mesh.material.userData.baseOpacity = material.userData.baseOpacity;
  return mesh;
}

export function createDishSequence(THREE, materials) {
  const group = new THREE.Group();
  group.position.set(0, .02, -1.65);

  const stationColors = [0xa25f42, 0xb8734f, 0xd7c5a5];
  const stationPositions = [-2.0, 0, 2.0];
  const stations = [];

  stationPositions.forEach((x, index) => {
    const station = new THREE.Group();
    station.position.set(x, index === 1 ? -.18 : .2, -.15 - index * .08);
    station.userData.home = station.position.clone();

    const fieldMaterial = new THREE.MeshBasicMaterial({
      color: stationColors[index],
      transparent: true,
      opacity: index === 2 ? .055 : .07,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    fieldMaterial.userData.baseOpacity = fieldMaterial.opacity;
    const field = new THREE.Mesh(new THREE.CircleGeometry(1.18, 64), fieldMaterial);

    const plateMaterial = materials.ceramicSoft.clone();
    plateMaterial.userData.baseOpacity = .2;
    const plate = new THREE.Mesh(new THREE.CircleGeometry(.72, 64), plateMaterial);
    plate.position.z = .13;

    const rim = ring(THREE, materials.ceramicEdge, .68, .73);
    rim.position.z = .16;

    const paperMaterial = (index === 1 ? materials.paperGreen : materials.paper).clone();
    paperMaterial.userData.baseOpacity = index === 1 ? .065 : .09;
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(.78, 1.05), paperMaterial);
    paper.position.set(index === 1 ? .72 : -.74, -.72, -.2);
    paper.rotation.z = (index - 1) * .18;

    const shadowMaterial = materials.shadow.clone();
    shadowMaterial.userData.baseOpacity = .09;
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.8, .8), shadowMaterial);
    shadow.position.set(0, -.2, -.05);

    const photoGeometry = new THREE.PlaneGeometry(1.38, 1.04);
    const photoMaterial = createPhotoMaterial(THREE, null, .22);
    photoMaterial.visible = false;
    const photo = new THREE.Mesh(photoGeometry, photoMaterial);
    photo.position.set(0, .04, .2);
    photo.rotation.z = (index - 1) * .03;

    station.add(field, shadow, plate, rim, paper, photo);
    station.userData.photo = photo;
    group.add(station);
    stations.push(station);
  });

  let focus = 0;

  function setFocus(index) {
    focus = Math.max(0, Math.min(stations.length - 1, index));
  }

  function setPhotoTextures(textures = []) {
    textures.slice(0, stations.length).forEach((texture, index) => {
      if (!texture) return;
      const photo = stations[index].userData.photo;
      const old = photo.material;
      photo.material = createPhotoMaterial(THREE, texture, .22);
      photo.material.visible = true;
      old.dispose?.();
    });
  }

  function update(delta, time) {
    let energy = 0;
    stations.forEach((station, index) => {
      const active = index === focus;
      const home = station.userData.home;
      const targetZ = home.z + (active ? .46 : -.08);
      const targetY = home.y + (active ? .12 : 0);
      const nextZ = damp(station.position.z, targetZ, 5.4, delta);
      const nextY = damp(station.position.y, targetY, 5.4, delta);
      energy += Math.abs(station.position.z - nextZ) + Math.abs(station.position.y - nextY);
      station.position.z = nextZ;
      station.position.y = nextY;

      const scaleTarget = active ? 1.13 : .91;
      const nextScale = damp(station.scale.x, scaleTarget, 5.8, delta);
      station.scale.setScalar(nextScale);
      station.rotation.z = damp(
        station.rotation.z,
        (index - 1) * .025 + Math.sin(time * .2 + index) * .012,
        4,
        delta,
      );
    });
    return energy;
  }

  return {
    group,
    stations,
    setFocus,
    setPhotoTextures,
    update,
  };
}
