import { damp } from './motion.js';

function makeLine(THREE, pointCount, material) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(pointCount * 3);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const line = new THREE.Line(geometry, material.clone());
  line.material.userData.baseOpacity = material.userData.baseOpacity ?? material.opacity;
  return line;
}

function copyPoints(THREE, points) {
  return points.map(([x, y, z]) => new THREE.Vector3(x, y, z));
}

export function createMeraThread(THREE, materials, initialPoints) {
  const group = new THREE.Group();
  const samples = 88;
  const main = makeLine(THREE, samples, materials.thread);
  const vaporA = makeLine(THREE, samples, materials.threadSoft);
  const vaporB = makeLine(THREE, samples, materials.threadSoft);
  group.add(main, vaporA, vaporB);

  const current = copyPoints(THREE, initialPoints);
  let target = copyPoints(THREE, initialPoints);
  let heroSteam = 1;
  let heroSteamTarget = 1;
  let groupOpacity = 1;

  function setTarget(points, { steam = 0 } = {}) {
    target = copyPoints(THREE, points);
    heroSteamTarget = steam;
  }

  function writeCurve(line, curve, time, sibling = 0) {
    const array = line.geometry.attributes.position.array;
    const points = curve.getPoints(samples - 1);
    for (let i = 0; i < points.length; i += 1) {
      const t = i / Math.max(points.length - 1, 1);
      const wobble = sibling === 0 ? 0 : Math.sin(t * 10 + time * .42 + sibling * 1.6) * (.035 + t * .06) * heroSteam;
      const side = sibling === 0 ? 0 : sibling * (.12 + t * .12) * heroSteam;
      array[i * 3] = points[i].x + side + wobble;
      array[i * 3 + 1] = points[i].y + (sibling === 0 ? 0 : Math.sin(t * 7 + time * .28 + sibling) * .045 * heroSteam);
      array[i * 3 + 2] = points[i].z - Math.abs(sibling) * .08 * heroSteam;
    }
    line.geometry.attributes.position.needsUpdate = true;
  }

  function update(delta, time, opacity = 1) {
    let energy = 0;
    for (let i = 0; i < current.length; i += 1) {
      const point = current[i];
      const targetPoint = target[i] || target[target.length - 1];
      const nx = damp(point.x, targetPoint.x, 3.2, delta);
      const ny = damp(point.y, targetPoint.y, 3.2, delta);
      const nz = damp(point.z, targetPoint.z, 3.2, delta);
      energy += Math.abs(point.x - nx) + Math.abs(point.y - ny) + Math.abs(point.z - nz);
      point.set(nx, ny, nz);
    }

    heroSteam = damp(heroSteam, heroSteamTarget, 3.8, delta);
    groupOpacity = damp(groupOpacity, opacity, 4.2, delta);

    const curve = new THREE.CatmullRomCurve3(current, false, 'catmullrom', .45);
    writeCurve(main, curve, time, 0);
    writeCurve(vaporA, curve, time, -1);
    writeCurve(vaporB, curve, time, 1);

    main.material.opacity = main.material.userData.baseOpacity * groupOpacity;
    const siblingOpacity = groupOpacity * heroSteam;
    vaporA.material.opacity = vaporA.material.userData.baseOpacity * siblingOpacity;
    vaporB.material.opacity = vaporB.material.userData.baseOpacity * siblingOpacity;

    return energy + Math.abs(heroSteam - heroSteamTarget) + Math.abs(groupOpacity - opacity);
  }

  function dispose() {
    [main, vaporA, vaporB].forEach((line) => {
      line.geometry.dispose();
      line.material.dispose();
    });
  }

  return {
    group,
    setTarget,
    update,
    dispose,
  };
}
