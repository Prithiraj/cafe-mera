function ring(THREE, material, inner, outer) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 72), material.clone());
  mesh.material.userData.baseOpacity = material.userData.baseOpacity;
  return mesh;
}

export function createTrustScene(THREE, materials) {
  const group = new THREE.Group();
  group.position.set(-1.65, .02, -1.85);

  const large = ring(THREE, materials.accentBrass, 1.75, 1.79);
  large.position.z = -.35;

  const small = ring(THREE, materials.accentClay, 1.08, 1.105);
  small.position.z = -.12;
  small.rotation.z = -.06;

  const glowMaterial = materials.haze.clone();
  glowMaterial.userData.baseOpacity = .035;
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), glowMaterial);
  glow.position.z = -.65;

  group.add(glow, large, small);
  return { group };
}
