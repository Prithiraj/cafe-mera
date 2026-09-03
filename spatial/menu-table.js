import { damp } from './motion.js';

function ring(THREE, material, inner, outer) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 64), material.clone());
  mesh.material.userData.baseOpacity = material.userData.baseOpacity;
  return mesh;
}

export function createMenuTable(THREE, materials) {
  const group = new THREE.Group();
  group.position.set(.15, -.05, -1.55);

  const surfaceMaterial = materials.plaster.clone();
  surfaceMaterial.userData.baseOpacity = .09;
  const surface = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 3.8), surfaceMaterial);
  surface.position.set(.4, -.25, -1.1);
  surface.rotation.z = -.025;

  const shadowMaterial = materials.shadow.clone();
  shadowMaterial.userData.baseOpacity = .1;
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 2.6), shadowMaterial);
  shadow.position.set(.15, -.65, -.95);
  shadow.scale.y = .58;

  const plates = [];
  const platePositions = [
    [-1.65, .45, -.2],
    [.05, -.38, .08],
    [1.72, .55, -.35],
  ];

  platePositions.forEach(([x, y, z], index) => {
    const plate = new THREE.Group();
    const discMaterial = materials.ceramic.clone();
    discMaterial.userData.baseOpacity = .22;
    const disc = new THREE.Mesh(new THREE.CircleGeometry(.72, 64), discMaterial);
    const rim = ring(THREE, materials.ceramicEdge, .68, .73);
    const contactMaterial = materials.shadow.clone();
    contactMaterial.userData.baseOpacity = .1;
    const contact = new THREE.Mesh(new THREE.PlaneGeometry(1.65, .75), contactMaterial);
    contact.position.z = -.08;
    contact.position.y = -.18;

    plate.add(contact, disc, rim);
    plate.position.set(x, y, z);
    plate.rotation.z = (index - 1) * .16;
    plate.userData.home = new THREE.Vector3(x, y, z);
    group.add(plate);
    plates.push(plate);
  });

  const cup = new THREE.Group();
  const cupOuter = ring(THREE, materials.ceramicEdge, .43, .48);
  const cupInnerMaterial = materials.accentGreen.clone();
  cupInnerMaterial.userData.baseOpacity = .12;
  const cupInner = new THREE.Mesh(new THREE.CircleGeometry(.39, 48), cupInnerMaterial);
  cup.add(cupInner, cupOuter);
  cup.position.set(2.45, -1.15, -.1);

  const papers = [];
  for (let index = 0; index < 3; index += 1) {
    const material = (index === 1 ? materials.paperGreen : materials.paper).clone();
    material.userData.baseOpacity = index === 1 ? .07 : .11;
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(.82, 1.18), material);
    paper.position.set(-2.35 + index * 2.2, -1.25 + (index % 2) * .22, -.7 - index * .08);
    paper.userData.homeY = paper.position.y;
    paper.rotation.z = -.16 + index * .15;
    papers.push(paper);
    group.add(paper);
  }

  group.add(surface, shadow, cup);

  let focus = 0;
  let mode = 'all';

  function setFocus(index, nextMode = mode) {
    focus = Math.max(0, Math.min(2, index));
    mode = nextMode;
  }

  function update(delta, time) {
    let energy = 0;
    plates.forEach((plate, index) => {
      const active = index === focus;
      const scaleTarget = active ? 1.16 : .93;
      const nextScale = damp(plate.scale.x, scaleTarget, 6, delta);
      energy += Math.abs(plate.scale.x - nextScale);
      plate.scale.setScalar(nextScale);

      const home = plate.userData.home;
      const lift = active ? .24 : 0;
      const targetZ = home.z + lift;
      const nextZ = damp(plate.position.z, targetZ, 5.2, delta);
      energy += Math.abs(plate.position.z - nextZ);
      plate.position.z = nextZ;
      plate.rotation.z = damp(
        plate.rotation.z,
        (index - 1) * .16 + Math.sin(time * .25 + index) * .025,
        4,
        delta,
      );
    });

    const drinkMode = mode === 'drinks';
    const cupScale = damp(cup.scale.x, drinkMode ? 1.18 : .96, 5.2, delta);
    energy += Math.abs(cup.scale.x - cupScale);
    cup.scale.setScalar(cupScale);
    cup.rotation.z = damp(cup.rotation.z, drinkMode ? .08 : -.04, 4, delta);

    papers.forEach((paper, index) => {
      paper.position.y = paper.userData.homeY + Math.sin(time * .13 + index) * .018;
    });

    return energy;
  }

  return {
    group,
    plates,
    setFocus,
    update,
  };
}
