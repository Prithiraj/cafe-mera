function canCreateWebGLContext() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true })
      || canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true });
    const supported = Boolean(context);
    context?.getExtension?.('WEBGL_lose_context')?.loseContext?.();
    return supported;
  } catch {
    return false;
  }
}

export function readSpatialFlags() {
  const params = new URLSearchParams(window.location.search);
  const spatial = (params.get('spatial') || '').toLowerCase();
  const forcedTier = spatial === 'tier1' ? 1
    : spatial === 'tier2' ? 2
      : spatial === 'tier3' ? 3
        : null;

  return {
    disabled: spatial === 'off',
    forcedTier,
    debug: params.get('spatialDebug') === '1',
  };
}

export function detectCapabilities() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const saveData = navigator.connection?.saveData === true;
  const deviceMemory = typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory : null;
  const hardwareConcurrency = typeof navigator.hardwareConcurrency === 'number'
    ? navigator.hardwareConcurrency
    : null;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const webgl = canCreateWebGLContext();

  return {
    reducedMotion,
    finePointer,
    coarsePointer,
    saveData,
    deviceMemory,
    hardwareConcurrency,
    width,
    height,
    webgl,
    narrow: width < 700,
    tablet: width >= 700 && width < 1024,
    desktop: width >= 1024,
  };
}
