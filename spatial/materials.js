export function createMaterials(THREE, textures = {}) {
  const mesh = (color, opacity, roughness = .88, options = {}) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity,
      roughness,
      metalness: options.metalness ?? .02,
      depthWrite: false,
      side: THREE.DoubleSide,
      map: options.map || null,
      alphaMap: options.alphaMap || null,
      alphaTest: options.alphaTest || 0,
    });
    material.userData.baseOpacity = opacity;
    return material;
  };

  const basic = (color, opacity, options = {}) => {
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
      map: options.map || null,
      alphaMap: options.alphaMap || null,
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
    color: 0xd6b58b,
    map: textures.particle || null,
    size: .095,
    transparent: true,
    opacity: .46,
    sizeAttenuation: true,
    depthWrite: false,
    alphaTest: .015,
  });
  points.userData.baseOpacity = .46;

  return {
    thread: line(0xb79b67, .66),
    threadSoft: line(0xa25f42, .22),
    accentClay: mesh(0xa25f42, .16),
    accentGreen: mesh(0x415343, .13),
    accentBrass: mesh(0xb79b67, .18, .72, { metalness: .12 }),
    ceramic: mesh(0xf0e3cf, .3, .92, { map: textures.ceramic }),
    ceramicSoft: mesh(0xf7ecdc, .15, .96, { map: textures.ceramic }),
    ceramicEdge: mesh(0xb79b67, .24, .78, { metalness: .06 }),
    paper: mesh(0xfffaf2, .2, .98, { map: textures.paper }),
    paperGreen: mesh(0x415343, .12, .98, { map: textures.paper }),
    plaster: mesh(0xeee3d1, .12, 1, { map: textures.plaster }),
    shadow: basic(0x2e211b, .18, { alphaMap: textures.shadow }),
    haze: basic(0xfff5df, .1, { alphaMap: textures.steamMask }),
    galleryFallback: mesh(0xfffaf2, .15, .98, { map: textures.paper }),
    marker: mesh(0xb79b67, .3, .72, { metalness: .08 }),
    particles: points,
  };
}

export function createPhotoMaterial(THREE, texture, opacity = .24) {
  const material = new THREE.MeshBasicMaterial({
    map: texture || null,
    color: texture ? 0xffffff : 0xf3e7d6,
    transparent: true,
    opacity,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: true,
  });
  material.userData.baseOpacity = opacity;
  return material;
}
