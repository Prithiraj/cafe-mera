export function createMaterials(THREE) {
  const mesh = (color, opacity, roughness = .88) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity,
      roughness,
      metalness: .02,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    material.userData.baseOpacity = opacity;
    return material;
  };

  const line = (color, opacity) => {
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
    });
    material.userData.baseOpacity = opacity;
    return material;
  };

  const points = new THREE.PointsMaterial({
    color: 0xb79b67,
    size: .042,
    transparent: true,
    opacity: .46,
    sizeAttenuation: true,
    depthWrite: false,
  });
  points.userData.baseOpacity = .46;

  return {
    steam: line(0xb79b67, .42),
    steamSoft: line(0xa25f42, .26),
    ringBrass: mesh(0xb79b67, .18),
    ringClay: mesh(0xa25f42, .13),
    ringGreen: mesh(0x415343, .12),
    plate: mesh(0xf1e4cf, .12),
    plateEdge: mesh(0xb79b67, .16),
    paper: mesh(0xfffaf2, .085, .96),
    paperDark: mesh(0x415343, .08, .96),
    halo: mesh(0xb79b67, .16),
    path: line(0xa25f42, .52),
    marker: mesh(0xb79b67, .26),
    gallery: mesh(0xfffaf2, .075, .94),
    particles: points,
  };
}
