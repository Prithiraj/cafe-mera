const P = (...points) => points;

export const THREAD_SHAPES = {
  hero: P(
    [-1.35, -2.55, -1.9], [-1.2, -1.55, -1.65], [-1.55, -.45, -1.55],
    [-1.05, .55, -1.7], [-1.45, 1.45, -1.95], [-.9, 2.35, -2.15], [-1.2, 3.05, -2.35],
  ),
  intro: P(
    [-2.8, -.3, -2.5], [-2.05, .45, -2.15], [-1.05, .85, -1.85],
    [.1, .55, -1.7], [1.0, -.1, -1.8], [1.8, -.55, -2.1], [2.65, -.15, -2.45],
  ),
  menu: P(
    [-2.85, -.25, -2.1], [-2.0, .9, -1.75], [-.75, 1.2, -1.65],
    [.35, .55, -1.55], [1.05, -.55, -1.6], [2.0, -.95, -1.85], [2.85, -.15, -2.15],
  ),
  discovery: P(
    [-2.9, .25, -2.4], [-2.0, .55, -1.9], [-1.15, -.15, -1.45],
    [-.15, .35, -1.2], [.8, -.25, -1.35], [1.8, .55, -1.7], [2.85, .15, -2.15],
  ),
  story: P(
    [-2.55, -.7, -2.45], [-2.8, .45, -2.1], [-2.15, 1.35, -1.8],
    [-1.05, 1.55, -1.65], [-.2, .85, -1.75], [-.15, -.25, -2.0], [-.9, -1.05, -2.35],
  ),
  space: P(
    [-2.9, -.65, -2.65], [-2.0, .1, -2.2], [-1.0, .85, -1.8],
    [.15, .5, -1.55], [1.05, -.35, -1.65], [1.95, .15, -1.95], [2.9, .75, -2.35],
  ),
  gallery: P(
    [-3.15, -.85, -2.8], [-2.05, .75, -2.2], [-.95, -.4, -1.55],
    [.15, .85, -1.35], [1.05, -.55, -1.5], [2.05, .65, -1.95], [3.05, -.15, -2.5],
  ),
  proof: P(
    [-2.25, 0, -2.4], [-2.05, 1.15, -2.25], [-1.05, 1.8, -2.05],
    [.1, 1.65, -1.95], [.95, .85, -2.0], [1.15, -.25, -2.2], [.35, -1.05, -2.4],
  ),
  visit: P(
    [-3.0, -1.35, -2.7], [-2.15, -.65, -2.3], [-1.15, -.95, -1.9],
    [-.15, -.2, -1.55], [.9, -.55, -1.3], [1.85, .2, -1.05], [2.75, .55, -.85],
  ),
  final: P(
    [-2.4, -1.3, -2.4], [-1.75, -.35, -2.0], [-1.15, .55, -1.7],
    [-.4, 1.15, -1.65], [.45, .75, -1.75], [1.15, -.1, -2.0], [1.85, -1.0, -2.35],
  ),
};

export const SCENE_STATES = {
  hero: {
    tone: 'light', stageOpacity: .58, camera: [0.15, 0, 8.0], root: [1.28, .02, 0],
    thread: 'hero', threadOpacity: .95, steam: 1, hero: .92, table: .06, dishes: .04,
    story: .02, gallery: .02, proof: .01, visit: .01, particles: .52, continuous: true,
  },
  intro: {
    tone: 'light', stageOpacity: .36, camera: [-.08, 0, 8.3], root: [-.95, .02, 0],
    thread: 'intro', threadOpacity: .66, steam: .1, hero: .16, table: .05, dishes: .03,
    story: .03, gallery: .02, proof: .01, visit: .01, particles: .12, continuous: false,
  },
  menu: {
    tone: 'dark', stageOpacity: .34, camera: [.08, -.05, 8.2], root: [1.1, -.08, 0],
    thread: 'menu', threadOpacity: .74, steam: .03, hero: .02, table: .98, dishes: .08,
    story: .02, gallery: .02, proof: .01, visit: .01, particles: .1, continuous: false,
  },
  discovery: {
    tone: 'light', stageOpacity: .44, camera: [0, 0, 7.9], root: [-.55, .02, 0],
    thread: 'discovery', threadOpacity: .86, steam: .08, hero: .02, table: .14, dishes: .98,
    story: .03, gallery: .03, proof: .01, visit: .01, particles: .18, continuous: true,
  },
  story: {
    tone: 'light', stageOpacity: .34, camera: [-.08, 0, 8.35], root: [-.65, .02, 0],
    thread: 'story', threadOpacity: .62, steam: .01, hero: .02, table: .02, dishes: .06,
    story: .96, gallery: .04, proof: .02, visit: .01, particles: .035, continuous: false,
  },
  space: {
    tone: 'light', stageOpacity: .34, camera: [.08, .03, 8.45], root: [.5, .02, 0],
    thread: 'space', threadOpacity: .56, steam: .01, hero: .01, table: .02, dishes: .03,
    story: .14, gallery: .64, proof: .02, visit: .01, particles: .08, continuous: false,
  },
  proof: {
    tone: 'dark', stageOpacity: .26, camera: [-.04, 0, 8.5], root: [-.1, .02, 0],
    thread: 'proof', threadOpacity: .52, steam: 0, hero: 0, table: 0, dishes: 0,
    story: .02, gallery: .02, proof: .96, visit: .01, particles: .01, continuous: false,
  },
  gallery: {
    tone: 'light', stageOpacity: .42, camera: [0, 0, 8.05], root: [0, .02, 0],
    thread: 'gallery', threadOpacity: .78, steam: .01, hero: .01, table: .01, dishes: .02,
    story: .02, gallery: 1, proof: .02, visit: .01, particles: .1, continuous: false,
  },
  visit: {
    tone: 'light', stageOpacity: .42, camera: [.08, 0, 8.2], root: [.35, .02, 0],
    thread: 'visit', threadOpacity: .9, steam: 0, hero: 0, table: 0, dishes: 0,
    story: 0, gallery: .04, proof: .02, visit: 1, particles: .04, continuous: false,
  },
  final: {
    tone: 'dark', stageOpacity: .24, camera: [0, 0, 8.4], root: [.75, .02, 0],
    thread: 'final', threadOpacity: .58, steam: .2, hero: .02, table: .02, dishes: .02,
    story: .02, gallery: .03, proof: .02, visit: .12, particles: .08, continuous: false,
  },
};

export const GROUP_KEYS = ['hero', 'table', 'dishes', 'story', 'gallery', 'proof', 'visit', 'particles'];
