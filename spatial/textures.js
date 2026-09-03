function makeCanvas(size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

function seededNoise(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasTexture(THREE, canvas, { color = true, repeat = false } = {}) {
  const texture = new THREE.CanvasTexture(canvas);
  if (color) texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  if (repeat) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }
  texture.needsUpdate = true;
  return texture;
}

export function createPaperTexture(THREE, size = 128) {
  const canvas = makeCanvas(size);
  const context = canvas.getContext('2d');
  const random = seededNoise(17);
  context.fillStyle = '#fff8ec';
  context.fillRect(0, 0, size, size);

  for (let i = 0; i < size * 3; i += 1) {
    const x = random() * size;
    const y = random() * size;
    const length = 4 + random() * 12;
    context.strokeStyle = `rgba(92, 70, 54, ${0.018 + random() * 0.025})`;
    context.lineWidth = 0.45 + random() * 0.55;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + length, y + (random() - 0.5) * 2.2);
    context.stroke();
  }

  return canvasTexture(THREE, canvas, { repeat: true });
}

export function createCeramicTexture(THREE, size = 128) {
  const canvas = makeCanvas(size);
  const context = canvas.getContext('2d');
  const random = seededNoise(41);
  context.fillStyle = '#efe1ca';
  context.fillRect(0, 0, size, size);

  for (let i = 0; i < size * 1.7; i += 1) {
    const x = random() * size;
    const y = random() * size;
    const radius = 0.25 + random() * 0.9;
    context.fillStyle = `rgba(92, 69, 50, ${0.025 + random() * 0.035})`;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  const gradient = context.createRadialGradient(size * 0.34, size * 0.28, 0, size * 0.5, size * 0.5, size * 0.7);
  gradient.addColorStop(0, 'rgba(255,255,255,.12)');
  gradient.addColorStop(1, 'rgba(92,69,50,.035)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  return canvasTexture(THREE, canvas, { repeat: true });
}

export function createPlasterTexture(THREE, size = 128) {
  const canvas = makeCanvas(size);
  const context = canvas.getContext('2d');
  const random = seededNoise(73);
  const image = context.createImageData(size, size);

  for (let i = 0; i < image.data.length; i += 4) {
    const n = (random() - 0.5) * 8;
    image.data[i] = 239 + n;
    image.data[i + 1] = 231 + n;
    image.data[i + 2] = 216 + n;
    image.data[i + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  return canvasTexture(THREE, canvas, { repeat: true });
}

export function createParticleSprite(THREE, size = 64) {
  const canvas = makeCanvas(size);
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,248,225,.92)');
  gradient.addColorStop(0.28, 'rgba(214,181,139,.5)');
  gradient.addColorStop(1, 'rgba(214,181,139,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return canvasTexture(THREE, canvas, { color: false });
}

export function createSoftShadowTexture(THREE, size = 128) {
  const canvas = makeCanvas(size);
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(46,33,27,.28)');
  gradient.addColorStop(0.58, 'rgba(46,33,27,.12)');
  gradient.addColorStop(1, 'rgba(46,33,27,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return canvasTexture(THREE, canvas, { color: false });
}

export function createSteamMaskTexture(THREE, size = 128) {
  const canvas = makeCanvas(size);
  const context = canvas.getContext('2d');
  const random = seededNoise(101);
  context.clearRect(0, 0, size, size);
  context.globalCompositeOperation = 'source-over';

  for (let i = 0; i < 18; i += 1) {
    const x = size * (0.32 + random() * 0.36);
    const y = size * (0.08 + random() * 0.82);
    const radius = size * (0.06 + random() * 0.14);
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(255,255,255,${0.12 + random() * 0.18})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  return canvasTexture(THREE, canvas, { color: false });
}

export function createProceduralTextures(THREE) {
  return {
    paper: createPaperTexture(THREE),
    ceramic: createCeramicTexture(THREE),
    plaster: createPlasterTexture(THREE),
    particle: createParticleSprite(THREE),
    shadow: createSoftShadowTexture(THREE),
    steamMask: createSteamMaskTexture(THREE),
  };
}

export function disposeTextures(textures) {
  Object.values(textures || {}).forEach((texture) => texture?.dispose?.());
}
