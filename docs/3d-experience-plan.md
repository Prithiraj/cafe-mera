# Cafe Mera — 3D Experience Plan

**Status:** Planning only. No implementation changes are included in this document.

## 1. Objective

Evolve the existing Cafe Mera website into an immersive, spatial experience while keeping the core business experience fast, clear, accessible, and conversion-focused.

The 3D layer must **complement real Cafe Mera photography, content, menu information, and calls to action**. It must never replace them or make ordering, directions, hours, or menu discovery harder.

The experience should feel like entering a warm cafe through layers of photography, typography, depth, steam, light, and motion — not like entering a game or a technology demo.

## 2. Creative concept — “A table with depth”

The visual idea is a modern editorial cafe website with a subtle spatial layer behind and around the real content.

Key qualities:

- warm
- tactile
- calm
- editorial
- intimate
- dimensional
- culturally grounded

The 3D language will draw from cafe objects and atmosphere rather than generic sci-fi effects:

- rising coffee-steam curves
- soft floating paper/card layers
- circular plate / cup-ring geometry
- depth between photographs
- warm directional light
- slow parallax
- restrained particles that feel like aroma / dust in sunlight

No neon grids, game HUDs, aggressive camera moves, or scroll-jacking.

## 3. Core design principle

**DOM first, WebGL second.**

Every essential business element remains normal semantic HTML:

- hero message
- real photos
- menu
- owner story
- reviews
- address
- hours
- order button
- directions
- phone

Three.js is loaded progressively after the page is usable.

If JavaScript, Three.js, WebGL, or the CDN fails, the site still works as the existing polished static site.

## 4. Experience architecture

Use **one shared Three.js renderer** for desktop/tablet rather than several independent renderers.

The renderer will sit in a non-interactive visual layer and respond to the section currently in view. A small scene controller will smoothly transition between a handful of visual states as users scroll naturally through the page.

The DOM remains above the canvas and handles all interaction.

Suggested structure:

```text
<body>
  <canvas id="spatial-canvas" aria-hidden="true"></canvas>
  <header>...</header>
  <main>
    hero
    value proposition
    menu
    Ethiopian breakfast story
    owner story
    space / gallery
    social proof
    visit
  </main>
</body>
```

The canvas uses `pointer-events: none` so it can never block navigation or CTAs.

## 5. Section-by-section 3D direction

### 5.1 Hero — “Enter Cafe Mera”

Keep the existing real Cafe Mera hero photograph as the dominant visual.

Three.js adds:

- three slow steam ribbons rising behind the hero image
- a few warm floating particles
- two or three large soft circular forms suggesting cup rings / plates
- subtle camera depth reacting to pointer movement on fine-pointer devices
- a small scroll-driven shift in depth, not a large translation

The DOM photograph stays fully visible even if Three.js never loads.

The hero should feel richer and more atmospheric, not more complicated.

### 5.2 Value proposition — “Layers of familiarity”

As the user moves into the value proposition section, the hero scene settles and the abstract circular forms widen into a quiet layered composition behind the typography.

Motion:

- forms separate by a few pixels in depth
- warm directional light shifts slightly
- no continuous fast animation

Purpose: give the transition from hero to story a physical sense of depth.

### 5.3 Menu — “The table”

Keep the menu as readable HTML.

Add an adjacent or background Three.js tabletop composition made from simple procedural geometry:

- shallow plate discs
- cup-ring circles
- small paper-menu planes
- subtle material roughness and warm highlights

The geometry is intentionally abstract. It should not pretend to be a photorealistic plate of Ful, Chechebsa, or Kinche unless Cafe Mera supplies suitable food photography or a real 3D scan/model.

Menu filtering can gently reposition or highlight the corresponding abstract plate group, but it must remain optional decoration.

### 5.4 Ethiopian breakfast story — “Three dishes, three moments”

The Ful / Chechebsa / Kinche section becomes the strongest editorial 3D sequence.

Rather than spinning food models, each dish card gets a restrained spatial marker:

- one circular plate form
- one vertical title plane
- one warm line / steam curve

As each article enters the viewport, its corresponding form becomes the most prominent in the background scene.

If approved real dish photography is later supplied, those photos can be added as textured planes without changing the architecture.

### 5.5 Owner story — “Human center”

Yeshi's real portrait remains the focal point.

Three.js should become quieter here.

Use:

- a soft halo / arc behind the portrait
- subtle floating paper layers
- slow light movement

No particles over the face and no 3D treatment that diminishes the authenticity of the portrait.

### 5.6 Space / gallery — “Spatial photo wall”

This is the best place for a more noticeable 3D interaction.

Desktop/tablet:

- the real gallery remains in HTML
- behind it, selected Cafe Mera photographs can appear as low-opacity textured planes arranged in shallow depth
- scroll creates a gentle lateral camera drift across the photo wall
- hovering a DOM gallery image can bring the corresponding background plane slightly forward

Mobile:

- no WebGL photo wall
- retain the fast stacked / snap gallery

This avoids overloading small devices while giving large screens a signature experience.

### 5.7 Social proof — “Pause the room”

The 3D motion slows almost completely during reviews.

A single large circular form can sit behind the 4.9 rating while the rest of the scene becomes calm.

Purpose: visually emphasize trust rather than spectacle.

### 5.8 Visit — “Find the hidden gem”

The final state should help the CTA feel conclusive.

Use a simple abstract 3D path:

- one line moving through 2–3 depth planes
- ending in a small location marker form
- gentle camera settle

This is **not** a fake map or invented building route.

The real address, Google Maps link, phone, hours, and directions remain normal HTML.

## 6. Interaction model

### Scroll

Use normal browser scrolling.

IntersectionObserver identifies the active section and updates a target scene state.

The renderer interpolates toward that state with damped motion.

No scroll-jacking, pinned scenes, or forced horizontal scrolling.

### Pointer

Desktop / fine pointer only:

- maximum camera offset: very small
- hover can alter depth or lighting subtly
- no object dragging

Touch devices should not depend on pointer interaction.

### Buttons and links

All order, menu, directions, phone, social, and navigation actions remain DOM controls above the canvas.

## 7. Motion language

Motion must feel slow and physical.

Recommended ranges:

- section transition: 700–1200 ms
- hover depth change: 180–280 ms
- camera drift: 1–3 px equivalent in visual perception
- continuous steam movement: slow, irregular, low amplitude

Avoid:

- spinning objects
- rapid zooms
- bounce easing
- camera fly-throughs
- particles exploding on click
- animation on every element

## 8. Three.js technical architecture

Recommended modules:

```text
script.js
spatial/
  scene-controller.js
  hero-scene.js
  menu-scene.js
  gallery-scene.js
  materials.js
  motion.js
```

For the current static GitHub Pages architecture, Three.js can be dynamically imported only after core content is ready.

Use a pinned release rather than `latest`.

Example architecture:

```js
if (supportsSpatialExperience()) {
  importThree().then(initSpatialExperience).catch(useStaticFallback);
}
```

No build system is required unless the implementation grows enough to justify one.

## 9. Procedural geometry only in phase 1

Phase 1 should avoid downloading generic 3D cafe models.

Create the visual language procedurally using:

- `CircleGeometry`
- `RingGeometry`
- `PlaneGeometry`
- `BufferGeometry`
- `Line`
- `Points`

Benefits:

- tiny asset footprint
- consistent art direction
- no licensing ambiguity
- faster loading
- less visual clutter

A later phase can introduce Cafe Mera-specific photogrammetry or 3D scans if the business wants a truly bespoke object experience.

## 10. Photography strategy

Real Cafe Mera imagery remains primary.

3D does not replace `<img>` elements for essential photos.

For textured 3D gallery planes:

- use only approved Cafe Mera-owned photography for production
- load low-resolution WebGL versions separately from responsive DOM images
- keep the existing editorial/demo-only rights warning for third-party imagery

Before commercial launch, replace any Joe Coffee / customer / third-party photo that is not explicitly licensed.

## 11. Performance budget

The 3D experience should be an enhancement, not a penalty.

Targets:

- core HTML/CSS/JS visible before Three.js import
- load Three.js after initial page usability
- no WebGL on Save-Data mode
- no WebGL on low-power / constrained conditions when detectable
- cap DPR at ~1.25–1.5
- use one renderer
- avoid real-time shadows
- avoid post-processing in phase 1
- pause renderer when page is hidden
- reduce frame work when canvas is outside useful viewport range
- no 4K WebGL textures

Suggested WebGL scene goal:

- < 20–30 draw calls in typical state
- < 2 MB of additional texture data initially
- no heavy GLTF files in phase 1

## 12. Responsive behavior

### Desktop ≥ 1024px

Full spatial experience:

- shared WebGL canvas
- section state transitions
- pointer parallax
- spatial photo wall

### Tablet 700–1023px

Reduced version:

- canvas enabled
- fewer particles
- simpler gallery state
- no pointer-dependent interaction

### Mobile < 700px

Use a deliberately simplified experience:

- real photos remain primary
- optionally keep only the lightweight hero aroma effect
- disable the persistent spatial photo wall
- no continuous complex scene

The mobile experience must never feel like a compromised desktop WebGL demo.

## 13. Reduced motion and accessibility

When `prefers-reduced-motion: reduce` is enabled:

- no continuous animation
- no pointer parallax
- no scene interpolation
- render either a static decorative frame or no WebGL at all

The site remains fully usable with:

- keyboard only
- JavaScript disabled
- WebGL disabled
- Three.js import failure

Canvas is always `aria-hidden="true"` because it carries no essential information.

## 14. Static / failure fallback

The current site is already the fallback.

Implementation rule:

**Never hide essential DOM content because a 3D scene is expected to appear.**

If the renderer fails:

- photographs still load
- menu still works
- review content still appears
- navigation still works
- order / directions / call actions still work

## 15. Implementation phases

### Phase 1 — Foundation

- preserve current site
- add shared spatial canvas
- build scene controller
- add capability checks
- add reduced-motion / save-data guards
- add renderer lifecycle and resize handling

### Phase 2 — Hero atmosphere

- rebuild current aroma treatment into the shared renderer
- add procedural steam curves
- add rings / plate forms
- add very restrained pointer parallax

### Phase 3 — Section states

- intro state
- menu/table state
- Ethiopian breakfast state
- owner/story state
- review state
- visit state

### Phase 4 — Spatial gallery

- texture approved real photos onto shallow 3D planes
- synchronize hover / scroll state with DOM gallery
- mobile-disable the heavy version

### Phase 5 — Polish

- tune easing
- tune color / lighting
- confirm scene never competes with copy
- test Safari / Chrome / Firefox
- test mobile battery / thermals
- test WebGL failure

### Phase 6 — Accessibility / performance QA

- reduced motion
- keyboard flow
- 320px layout
- Lighthouse / Core Web Vitals
- Save-Data behavior
- page visibility pause

## 16. File changes expected

Likely changes:

```text
index.html
styles.css
script.js
spatial/scene-controller.js
spatial/scene-factory.js
spatial/materials.js
spatial/motion.js
docs/3d-experience-plan.md
```

Potentially no new image assets are required for the first 3D pass.

## 17. Acceptance criteria

The 3D version is successful only if:

- [ ] Real Cafe Mera photography remains visually dominant.
- [ ] The hero feels more dimensional within the first few seconds.
- [ ] The 3D layer communicates warmth / cafe atmosphere rather than technology.
- [ ] Menu readability is unchanged or improved.
- [ ] Order, directions, and phone CTAs remain immediately obvious.
- [ ] No scroll-jacking is introduced.
- [ ] The page works completely without WebGL.
- [ ] Reduced-motion mode contains no continuous decorative animation.
- [ ] Mobile remains fast and practical.
- [ ] Three.js uses one renderer and a restrained draw-call budget.
- [ ] Real photo textures are used only when rights are confirmed.
- [ ] 3D motion never covers faces, menu text, address, reviews, or CTA labels.
- [ ] GitHub Pages deployment remains static and reliable.

## 18. Recommended first release

The first production-quality 3D release should focus on four signature moments only:

1. **Hero:** steam + plate-ring depth + subtle pointer camera.
2. **Ethiopian breakfast:** section-driven procedural plate composition.
3. **Gallery:** shallow spatial photo wall using approved real images.
4. **Visit:** a calm abstract path that visually resolves at the location CTA.

This is enough to make the site feel distinctly spatial without turning the entire website into a WebGL showcase.

## 19. What not to build

Do not build:

- a virtual cafe walkthrough using invented architecture
- fake 3D food models
- a first-person navigation mode
- an interactive game
- scroll-controlled camera tunnels
- persistent sound
- autoplay video backgrounds
- 3D effects that obscure the actual Cafe Mera photos
- fake maps / location geometry

The experience should still feel like **Cafe Mera first, Three.js second**.
