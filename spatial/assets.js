export function getSpatialPhotoSources() {
  const imageUrl = (element) => element?.currentSrc || element?.src || null;
  const hero = imageUrl(document.querySelector('.hero-visual img'));
  const story = imageUrl(document.querySelector('.portrait-card img'));
  const interior = imageUrl(document.querySelector('.space-photo img'));
  const gallery = [...document.querySelectorAll('.gallery-grid img')]
    .map(imageUrl)
    .filter(Boolean);

  return {
    hero,
    story,
    interior,
    gallery: [...new Set(gallery)],
  };
}

export function createAssetManager(THREE) {
  const cache = new Map();
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');

  function loadTexture(url) {
    if (!url) return Promise.resolve(null);
    if (cache.has(url)) return cache.get(url);

    const promise = new Promise((resolve) => {
      loader.load(
        url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = true;
          texture.anisotropy = 2;
          resolve(texture);
        },
        undefined,
        () => resolve(null),
      );
    });

    cache.set(url, promise);
    return promise;
  }

  async function loadPhotoSet(sources, quality) {
    if (!quality.photoTextures) {
      return { hero: null, story: null, interior: null, gallery: [] };
    }

    const heroPromise = loadTexture(sources.hero);
    const storyPromise = loadTexture(sources.story);
    const interiorPromise = loadTexture(sources.interior);
    const galleryPromises = sources.gallery.slice(0, 6).map(loadTexture);

    const [hero, story, interior, gallery] = await Promise.all([
      heroPromise,
      storyPromise,
      interiorPromise,
      Promise.all(galleryPromises),
    ]);

    return {
      hero,
      story,
      interior,
      gallery: gallery.filter(Boolean),
    };
  }

  async function dispose() {
    const promises = [...cache.values()];
    const textures = await Promise.all(promises);
    textures.filter(Boolean).forEach((texture) => texture.dispose?.());
    cache.clear();
  }

  return {
    loadTexture,
    loadPhotoSet,
    dispose,
  };
}
