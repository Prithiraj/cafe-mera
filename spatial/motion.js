export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function damp(current, target, lambda, delta) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

export function dampVector3(vector, target, lambda, delta) {
  vector.x = damp(vector.x, target.x, lambda, delta);
  vector.y = damp(vector.y, target.y, lambda, delta);
  vector.z = damp(vector.z, target.z, lambda, delta);
}

export function setGroupOpacity(group, opacity) {
  if (!group) return;
  group.userData.opacity = opacity;
  group.traverse((object) => {
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.filter(Boolean).forEach((material) => {
      if (material.userData?.baseOpacity == null) {
        material.userData = material.userData || {};
        material.userData.baseOpacity = material.opacity ?? 1;
      }
      material.transparent = true;
      material.opacity = material.userData.baseOpacity * opacity;
    });
  });
}
