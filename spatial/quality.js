const QUALITY = {
  0: {
    tier: 0,
    name: 'static',
    renderer: false,
    photoTextures: false,
    particles: 0,
    dpr: 1,
    antialias: false,
  },
  1: {
    tier: 1,
    name: 'css-spatial',
    renderer: false,
    photoTextures: false,
    particles: 0,
    dpr: 1,
    antialias: false,
  },
  2: {
    tier: 2,
    name: 'core-three',
    renderer: true,
    photoTextures: false,
    particles: 34,
    dpr: 1.22,
    antialias: false,
  },
  3: {
    tier: 3,
    name: 'spatial-photography',
    renderer: true,
    photoTextures: true,
    particles: 54,
    dpr: 1.42,
    antialias: true,
  },
};

function automaticTier(capabilities) {
  if (capabilities.reducedMotion) return 1;
  if (!capabilities.webgl) return 1;
  if (capabilities.saveData) return 1;
  if (capabilities.narrow) return 1;

  if (capabilities.deviceMemory != null && capabilities.deviceMemory < 4) return 1;
  if (capabilities.hardwareConcurrency != null && capabilities.hardwareConcurrency <= 2) return 1;

  const strongMemory = capabilities.deviceMemory == null || capabilities.deviceMemory >= 8;
  const strongCpu = capabilities.hardwareConcurrency == null || capabilities.hardwareConcurrency >= 6;
  const wideEnough = capabilities.width >= 1100;

  if (strongMemory && strongCpu && wideEnough) return 3;
  return 2;
}

export function selectQuality(capabilities, flags) {
  if (flags.disabled) return { ...QUALITY[0], forced: true };

  let tier = flags.forcedTier ?? automaticTier(capabilities);
  if (tier >= 2 && !capabilities.webgl) tier = 1;
  if (tier >= 2 && capabilities.reducedMotion) tier = 1;

  return {
    ...QUALITY[tier],
    forced: flags.forcedTier != null,
    debug: flags.debug,
  };
}

export function getQualityDefinition(tier) {
  return QUALITY[tier] || QUALITY[0];
}
