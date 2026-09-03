# Cafe Mera — 3D Experience Master Plan

**Status:** Master spatial-design and implementation specification.

This document merges and supersedes the earlier deep 3D roadmap and generated visual asset strategy. It is the single source of truth for future spatial work on Cafe Mera.

The working rule is simple:

> **Cafe Mera first. Real business truth second only to usability. 3D, generated imagery, shaders, and motion exist to make those real things feel more present — never to replace or falsify them.**

---

# 1. North-star experience

The site should feel like moving through a warm, real, distinctive cafe story rather than scrolling through a collection of unrelated WebGL effects.

The spatial system should communicate things a normal flat restaurant website cannot communicate as well:

- the feeling of entering a place
- the warmth around coffee and breakfast
- the relationship between Ethiopian-rooted dishes and familiar cafe food
- the human center of the business
- a sense of depth and physicality around real Cafe Mera photography
- the feeling that Cafe Mera is a hidden place worth discovering
- when verified assets exist, practical visual help for finding the cafe

The spatial system must not communicate:

- “this website uses Three.js”
- a fake cafe interior
- fake food
- synthetic portraits presented as real
- invented directions
- game-like navigation
- generic marketplace coffee-shop assets
- random particles/rings with no narrative role

The target experience is **editorial, tactile, warm, calm, dimensional, and culturally grounded**.

---

# 2. Core creative system — The Mera Thread

The entire page should share one persistent spatial motif: **The Mera Thread**.

It begins as coffee steam in the hero and changes meaning as the user moves through the site:

1. **Hero:** steam / aroma
2. **Value proposition:** a soft orbit around photography
3. **Menu:** cup and plate contours
4. **Ethiopian breakfast:** a guide between Ful, Chechebsa, and Kinche
5. **Owner story:** a quiet framing arc around Yeshi
6. **Gallery:** a path through real Cafe Mera photography
7. **Reviews:** a nearly still circle that creates a visual pause
8. **Visit:** the line resolves into a destination-like marker
9. **Final CTA:** the motif settles rather than starting another loop

The Mera Thread is not a literal route except when verified wayfinding data is being shown.

## Technical expression

The thread is a changing 3D spline with named target shapes. The renderer interpolates between control-point sets instead of deleting/recreating separate section effects.

Preferred first production expression:

- thin `Line` or low-density tube
- warm muted brass/clay tone
- no neon emission
- soft taper/fade where appropriate
- hero may temporarily use 2–3 sibling steam curves before resolving into the single persistent thread

---

# 3. Truth model for every visual asset

Every visual used by the experience belongs to one of four classes.

## Class A — Real / factual

Actual Cafe Mera imagery or verified visual information.

Examples:

- Yeshi portrait
- actual Cafe Mera interior
- actual Ful, Chechebsa, and Kinche
- actual drinks or serving ware
- signage
- exterior
- entrance
- verified wayfinding photographs

Use Class A whenever the image communicates a factual claim about the business.

## Class B — Generated atmospheric

Synthetic material that does not claim to depict a real Cafe Mera object or place.

Examples:

- steam fields
- dust/aroma sprites
- paper fiber
- ceramic micro-texture
- light cookies
- shadow maps
- abstract ceramic contours
- bokeh
- matte plaster variation
- soft haze

These can be used broadly because they are decorative and non-factual.

## Class C — Generated interpretive

Art-directed synthetic imagery inspired by the story but clearly not documentary photography.

Examples:

- coffee steam morphing into a plate contour
- a generated clay/paper environment behind a real dish photo
- an editorial collage around real Cafe Mera photography
- a dreamlike transition field between menu and story

These must read as graphic/art-directed material rather than a fake depiction of the real cafe.

## Class D — Generated factual-looking

Photorealistic synthetic content that could be mistaken for the actual business.

Do not use this class in production for:

- Cafe Mera interiors
- Yeshi
- food served by the cafe
- storefront/exterior
- entrance/hallway
- parking or route information

If used in concept exploration, label it **CONCEPT ONLY — NOT FACTUAL PRODUCTION IMAGERY** and replace it before launch.

---

# 4. Experience principles

## 4.1 Real imagery before decorative geometry

If a real Cafe Mera photograph can do the job, the photograph wins.

3D should add:

- depth
- perspective
- framing
- continuity
- focus
- spatial relationships

It should not cover the real asset or compete with it.

## 4.2 One scene, many states

Prefer one shared renderer, one camera rig, one lighting grammar, one Mera Thread system, and persistent section groups.

Avoid independent WebGL canvases per section.

## 4.3 DOM is authoritative

These always remain semantic HTML:

- headings
- menu items
- reviews
- owner story
- address
- hours
- phone
- ordering
- directions
- gallery controls

WebGL is supplementary.

## 4.4 Normal browser scrolling remains navigation

No:

- scroll hijacking
- forced horizontal scrolling
- first-person controls
- orbit controls
- click-and-drag requirements
- camera tunnels
- game UI

## 4.5 Motion must be earned

Every motion should answer one of four questions:

- what is entering focus?
- how are these things connected?
- where should the eye move next?
- what changed in the story?

If it answers none of these, remove it.

## 4.6 Fewer, more meaningful 3D elements

The finished experience should contain fewer generic objects than the current technical prototype.

Question every:

- particle
- ring
- floating plane
- camera drift
- plate abstraction

Keep it only if it supports the Mera Thread or a specific business story.

---

# 5. Capability and quality tiers

The site should not make a binary WebGL on/off decision. It should choose a quality tier.

## Tier 0 — Static

Used for:

- JavaScript failure
- WebGL unavailable
- explicit `?spatial=off`
- reduced-motion where motion cannot be removed cleanly

Experience:

- semantic website
- real images
- no continuous decorative motion

## Tier 1 — CSS spatial

Used for:

- small mobile devices
- constrained hardware
- Save-Data
- forced `?spatial=tier1`

Experience:

- layered image cards
- restrained CSS perspective
- static/near-static thread motif
- no persistent renderer

## Tier 2 — Core Three.js

For capable tablets/desktops.

Includes:

- shared renderer
- Mera Thread
- generated ceramic/paper/light textures
- abstract menu table
- dish stations
- restrained particles
- section-based camera/light states

Does not require real photo textures in WebGL.

## Tier 3 — Full spatial photography

For capable devices where texture budget allows.

Adds:

- real Cafe Mera photo textures
- hero photo echo/diorama layers
- spatial gallery wall
- real dish-photo planes when approved assets exist
- richer generated texture support

## Tier 4 — Bespoke captured assets

Future only.

Possible additions:

- scanned Cafe Mera cup
- serving plate
- real sign
- coffee vessel actually used by Cafe Mera
- 360-degree interior capture
- photogrammetry object/tabletop

Tier 4 is optional and must never block the useful site.

---

# 6. Phase 0 — Asset discovery, art direction, and generated concept strategy

## Objective

Define what is uniquely Cafe Mera enough to deserve dimensional treatment before adding more complexity.

The current rings/particles are considered a **technical prototype baseline**, not the final visual language.

## Real assets required / preferred

Create an asset register for:

- hero cafe/food photograph
- Yeshi portrait
- Ful
- Chechebsa
- Kinche
- gyro/lunch
- coffee/cup
- interior
- counter/sign
- building exterior
- entrance
- hallway/lobby cue if relevant
- parking approach if the business confirms it

Each asset receives a rights status:

- real-approved
- real-needs-rights
- demo-third-party
- replace-before-launch

## Dedicated photography wishlist

### Hero

Capture one wide image with visible foreground, middle ground, and background.

Ideal:

- foreground cup/plate/plant/chair edge/counter detail
- strong main subject
- visible room depth
- minimal motion blur
- uncluttered frame edges
- horizontal and vertical versions

### Ethiopian breakfast

For Ful, Chechebsa, Kinche:

- top-down
- 30–45° hero angle
- detail shot
- matched tabletop
- consistent lighting and camera height

The matched setup enables a much stronger spatial “three plates on one table” experience later.

### Owner story

Capture:

- environmental portrait
- direct portrait
- hands serving coffee/food
- owner behind counter
- customer interaction only with permission

### Location

Capture:

- exterior
- correct entrance
- hallway/lobby cue
- Cafe Mera door/sign

These assets enable real photographic wayfinding.

## Generated assets allowed in Phase 0

Generation has highest leverage as concept exploration.

Create concept directions for:

- hero photographic diorama
- Mera Thread appearance
- breakfast dish sequence
- gallery room
- Visit resolution

Generated concept frames may be exaggerated because their job is to define art direction, not production truth.

## Production-generated texture wishlist

Low-resolution generated assets that can be used as renderer inputs:

- paper grain
- ceramic micro-texture
- matte plaster
- light cookie
- soft dust sprite
- irregular steam alpha
- radial/contact shadow texture
- paper-edge mask

These should be subtle enough that the viewer notices the scene, not the texture.

## Depth-map preparation

For 2–4 real photographs:

- derive grayscale depth map from the real photo
- manually inspect people, cups, chairs, hard edges
- clean obvious boundary errors
- create foreground mask if needed

Depth maps control displacement only; they do not invent pictorial content.

## Phase 0 deliverables

- asset register
- rights matrix
- photo shot list
- generated concept references
- texture list
- 2–4 depth-map candidates
- selected visual tone
- agreed quality tiers

## Phase 0 gate

Before a true photo-diorama scene goes to production, select the actual hero photo and choose either:

- depth-displaced image plane
- layered cutouts
- DOM photo + spatial frame/echo

---

# 7. Phase 1 — Spatial foundation and grammar

## Objective

Build the reusable spatial system before spectacle.

## Real assets required

None beyond current site imagery.

## Generated assets allowed

- procedural paper texture
- procedural ceramic micro-texture
- generated/CanvasTexture particle sprite
- light cookie
- soft shadow texture

## Architecture

Recommended persistent scene graph:

```text
Scene
├── EnvironmentRig
│   ├── key light
│   ├── fill light
│   └── ambient contribution
├── MeraThread
├── AromaParticles
├── HeroDiorama
├── MenuTable
├── DishSequence
├── StoryScene
├── GalleryWall
├── TrustScene
└── VisitScene
```

Objects remain allocated and transition opacity/position instead of being recreated on section changes.

## Camera rig

Use:

```text
CameraRig
└── PerspectiveCamera
```

- rig handles scene-state transitions
- camera child handles tiny pointer response

Pointer motion must never fight state motion.

## World convention

```text
x = horizontal composition
y = vertical composition
z = visual depth
```

DOM sections do not share literal coordinates with WebGL. Each declares a target scene state.

## Mera Thread component

Implement the thread as a first-class component with named target shapes.

Required shapes:

- steam
- intro orbit
- menu/table orbit
- dish journey
- story halo
- gallery route
- review circle
- visit resolution

The thread should morph by damped interpolation of control points.

## Material grammar

### Ceramic

- warm cream
- high roughness
- low metalness
- optional tiny clearcoat only at high tier

### Paper

- matte
- slight generated fiber/edge noise

### Brass / thread

- muted warm metal or colored standard material
- never mirror-like

### Glass

Use only for a verified real object.

## Lighting grammar

- warm key
- cream fill
- clay/brass accent
- subtle green-shadow influence where appropriate
- no nightclub contrast

## Render scheduling

Do not render at 60fps for the entire visit.

Continuous rendering is justified only for:

- hero steam
- active section transition
- pointer movement
- dish focus transition
- gallery interaction
- thread morph

Otherwise render on demand and pause.

Always pause when document is hidden.

## Feature flags

Development flags:

```text
?spatial=off
?spatial=tier1
?spatial=tier2
?spatial=tier3
?spatialDebug=1
```

## Debug mode

Optional debug overlay displays:

- active state
- tier
- DPR
- FPS
- draw calls
- triangles
- textures
- current interactive focus

Never show by default.

## Phase 1 performance budget

- one renderer
- DPR cap by tier
- no post-processing
- no realtime shadows
- no GLTF
- low-poly procedural geometry
- small generated textures

## Phase 1 acceptance gate

- one stable renderer
- no layout shifts on boot
- state controller reaches all sections
- Mera Thread morphs through multiple named shapes
- resize/orientation safe
- pointer/state motion independent
- event-driven rendering works
- Tier 0/1 unaffected
- no business content depends on WebGL

---

# 8. Phase 2 — Hero: “Enter Cafe Mera”

## Objective

Make a real Cafe Mera photograph feel spatial in the first seconds without delaying the headline or Order CTA.

## Real assets

Required now:

- current real Cafe Mera hero image

Preferred later:

- dedicated hero photo with stronger foreground/midground/background separation

## Generated assets allowed

- paper/clay environment extension
- ceramic arcs
- blurred plant-like silhouette
- organic steam alpha texture
- light/shadow texture
- soft foreground haze

Do not generate a fake cafe table, cup, interior, dish, or person and imply it belongs to Cafe Mera.

## Preferred composition

```text
synthetic editorial depth field
        ↓
abstract ceramic contour
        ↓
REAL Cafe Mera hero photo
        ↓
Mera Thread / steam
        ↓
DOM headline + Order/Menu CTAs
```

## Technique A — depth-displaced photo plane

Use when the photo has soft/organic depth.

- original real texture
- grayscale depth texture
- subdivided plane
- tiny vertex displacement

Avoid rubber-sheet deformation.

## Technique B — layered cutouts

Use when the image has hard edges or people.

- background plane
- subject plane
- foreground plane

Small z separation only.

## Technique C — DOM photo + WebGL photo echo

Use when production rights/CORS/depth assets are incomplete.

The real DOM image stays primary while a low-opacity real-photo texture/echo sits behind it in WebGL.

This is the safest current implementation strategy.

## Steam behavior

Hero starts with 2–3 related steam curves.

- slow
- asymmetrical
- organic
- gentle lateral drift
- partially occluded by photo composition where possible

On hero exit, sibling steam curves converge into the single Mera Thread.

## Pointer interaction

Fine pointer only.

- camera response equivalent around 1–2° max
- image depth movement smaller than pointer movement
- no wobble

## Mobile fallback

- normal real DOM hero image
- static layered perspective
- optional extremely lightweight steam only at suitable tier
- no depth-displacement shader

## Performance budget

- 1–2 hero photo textures max
- image width typically <= 1600px for GPU copy
- no realtime shadows
- no fullscreen post-processing

## Hero gate

- real photo is clearly primary
- CTA hierarchy remains stronger than decoration
- first useful content loads before Three.js
- photo is not visibly warped
- hero-to-intro transformation demonstrates continuity

---

# 9. Phase 3A — Value proposition: “Familiar + discovery”

## Objective

Create visual rest after the hero and express the menu’s dual accessibility: familiar cafe food and Ethiopian-rooted discovery.

## Real assets

None required.

## Generated assets allowed

- low-contrast paper/light field
- subtle ceramic contour

## 3D technique

- Mera Thread flattens from steam into 2–3 broad arcs
- shallow depth
- low opacity
- nearly still

The arcs overlap rather than becoming two opposing halves.

## Mobile fallback

Static CSS arcs only.

## Acceptance gate

If a visitor ignores the background entirely, the section still reads perfectly.

---

# 10. Phase 3B — Menu: “The table”

## Objective

Make the menu feel physical without turning menu navigation into a 3D interface.

## Real assets

Current HTML menu remains authoritative.

Optional later:

- approved dish photography
- real menu/paper textures if supplied

## Generated assets allowed

- ceramic surface texture
- matte paper texture
- table material
- editorial contact shadows
- nonliteral category color fields

Never use generated dish photography in the menu.

## 3D technique

Build one abstract tabletop composition:

- implied table plane
- three ceramic plate forms
- cup ring
- 1–3 paper/menu planes
- Mera Thread contour

## DOM synchronization

Existing filter buttons remain the only control.

Filter responses:

- Ethiopian breakfast → three plate stations
- Cafe breakfast → broad plate + cup
- Lunch → elongated table composition
- Drinks → cup/steam emphasis

DOM hover/focus may highlight the associated 3D station.

Keyboard focus must equal pointer hover.

## Mobile fallback

No persistent table scene. Use small static depth cues around menu category heading only.

## Performance budget

- procedural geometry
- no image textures required at Tier 2
- small generated ceramic/paper textures

## Acceptance gate

- filtering remains immediate
- names/descriptions unobstructed
- canvas disabled still gives full menu
- abstract shapes never pretend to be food

---

# 11. Phase 3C — Ethiopian breakfast: “Three dishes, three moments”

## Objective

Make Ful, Chechebsa, and Kinche easier and more inviting to explore spatially.

This is the second strongest 3D moment after the hero.

## Real assets

Ideal:

- matched real Ful photo
- matched real Chechebsa photo
- matched real Kinche photo

If unavailable, use abstract stations only.

## Generated assets allowed

For each station:

- atmospheric halo
- paper field
- ceramic plate texture
- abstract steam
- nonliteral particle field

Do not generate the dish itself.

Possible art-direction identities:

### Ful

- earthy warm field
- rounded geometry
- concentrated slow motion

### Chechebsa

- warmer clay field
- more angular paper contours
- slightly livelier thread

### Kinche

- pale grain-like abstract texture
- concentric geometry
- quieter motion

These are art-direction associations, not ingredient claims.

## 3D technique

Three stations share one table-space composition.

Each contains:

- plate contour
- atmospheric depth layer
- Mera Thread segment
- real photo plane when approved image exists

As corresponding DOM article enters focus:

- current station lifts forward
- others recede
- thread links current → next

No viewport pinning.

## Mobile fallback

One static circular/ceramic depth frame per dish. Real image stays DOM-based.

## Performance budget

Tier 2:

- no dish textures
- procedural stations only

Tier 3:

- maximum three optimized real dish textures resident

## Acceptance gate

Spatial treatment must increase curiosity rather than delay or obscure dish descriptions.

---

# 12. Phase 3D — Owner story: “Human center”

## Objective

When the story becomes personal, the 3D becomes quieter.

## Real assets

- real Yeshi portrait only

## Generated assets allowed

- abstract paper halo
- soft window-light texture
- background extension
- steam arc
- editorial paper edge

Never:

- alter Yeshi’s face/body
- synthesize a replacement portrait
- invent interactions or context

## 3D technique

Preferred:

- real portrait remains DOM image
- Mera Thread becomes incomplete halo behind it
- a few matte paper planes
- particles approach zero

Optional only if depth map is excellent:

- shallow portrait depth separation
- face stays effectively flat

## Interaction

None required.

## Acceptance gate

If the 3D attracts more attention than Yeshi’s face/story, reduce it.

---

# 13. Phase 3E — Reviews: “Pause the room”

## Objective

Create trust and visual rest.

## Real assets

- rating and review text remain DOM

## Generated assets allowed

Minimal only:

- soft circular shadow/light field

## 3D technique

- Mera Thread becomes a near-circle
- table/gallery groups recede
- particles almost disappear
- camera stops drifting

## Acceptance gate

Reviews should feel more still than the sections before and after.

---

# 14. Phase 4 — Spatial gallery: “Inside Cafe Mera”

## Objective

Use actual Cafe Mera photography to create a sense of place without inventing a virtual building.

## Real assets

Use 4–7 approved Cafe Mera photos.

Current implementation may use existing business images already present on the site, while rights status remains documented.

## Generated assets allowed

- abstract editorial room surfaces
- cream wall plane
- green volume
- clay floor plane
- paper edges
- shadow/light texture
- atmospheric haze

The environment must read as a graphic set, not as the real Cafe Mera room.

## Recommended concept — editorial photo room

Real images float at shallow depth inside an abstract spatial set.

Example:

```text
             [interior]
   [food]                    [Yeshi]
             [coffee]
       [counter]       [sign]
```

## Image planes

Each photo gets:

- optimized WebGL texture
- high-quality DOM equivalent
- known aspect ratio
- slight z offset

Do not send full 4K source images to GPU.

## Depth choreography

- small lateral camera movement
- foreground plane shifts more than background
- Mera Thread passes in front/behind planes
- subtle occlusion creates depth

## DOM synchronization

Hover, keyboard focus, or click on a gallery item:

- associated WebGL plane lifts forward
- neighboring planes dim slightly

DOM remains accessibility/click target.

## Optional wide-interior diorama

If a strong wide interior photo exists:

- make it the anchor plane
- add shallow depth treatment
- arrange smaller photos around it

## Future optional 360

Only use a real 360 panorama. Do not synthesize a 360 reconstruction from unrelated normal photos.

## Mobile fallback

Normal responsive gallery with modest CSS depth only.

## Performance budget

- 4–7 GPU textures maximum at once
- lazy-load shortly before gallery
- lower-resolution WebGL copies
- no complex shadows

## Gallery gate

- all factual photo content is real
- DOM gallery complete
- spatial version materially improves sense of place
- does not resemble generic floating SaaS cards
- texture memory controlled

---

# 15. Phase 5 — Visit / discoverability: “Find the hidden gem”

## Objective

Use spatial design to improve a real business problem: physical discoverability.

## Level 1 — abstract resolution (available now)

If no verified entrance imagery exists:

- Mera Thread moves through 2–3 editorial planes
- settles at a marker-like form
- real address/phone/hours/Maps CTA remain primary

Never present the abstract line as a factual route.

## Level 2 — real photographic wayfinding

When verified photographs exist, create a sequence:

1. building exterior
2. correct entrance
3. lobby/hallway cue
4. Cafe Mera door/sign

Arrange these real images along a shallow z path.

## Level 3 — verified floor/entrance diagram

Only if a correct floor plan/diagram is supplied or created from verified measurements.

Do not infer hallways, parking, or doors from review prose.

## Generated assets allowed

- destination glow
- abstract thread/path
- editorial frame planes
- paper backdrop

Not allowed as factual production content:

- synthetic exterior
- synthetic hallway
- synthetic entrance
- synthetic map

## Acceptance gate

- no invented route geometry
- Directions remains one-tap obvious
- final state feels like arrival

---

# 16. Phase 6 — Polish: material, light, motion, continuity

This phase is not “add more effects.”

## Motion vocabulary

### Settle

Camera transitions.

- slow damping
- no overshoot

### Lift

Focus state.

- short z movement
- 200–300ms perceived response

### Drift

Steam/particles.

- slow irregular motion

### Resolve

Final Visit transition.

- decelerates toward stillness

Avoid bounce/spring motion unless physically justified.

## Material hierarchy

Most geometry uses standard/basic materials.

Advanced physical properties are reserved for real meaningful objects.

Possible future uses:

- slight clearcoat on actual ceramic cup
- controlled transmission on actual glass

Do not make glassmorphism the theme.

## Shadows

Prefer:

- generated/baked contact shadows
- simple soft ellipses
- ambient darkening

Avoid multiple realtime shadow-casting lights.

## Post-processing

Default: none.

Possible high-tier exception after the scene is complete:

- extremely subtle depth of field in gallery

Prefer CSS vignette to a postprocessing stack.

## Transition review pairs

Review every transition as a pair:

- Hero → Intro
- Intro → Menu
- Menu → Ethiopian breakfast
- Breakfast → Yeshi
- Yeshi → Space/Gallery
- Gallery → Reviews
- Reviews → Visit

The question is not just “is this scene attractive?” but “does it transform naturally into the next?”

---

# 17. Phase 7 — Accessibility, performance, and production QA

This is a release blocker.

## Accessibility

### Reduced motion

- disable continuous steam
- disable camera drift
- disable pointer parallax
- show static real photos
- static spatial composition only where useful

### Keyboard

All controls remain DOM controls.

Spatial highlights triggered by focus are supplementary.

### Screen readers

Canvas remains `aria-hidden="true"`.

No essential information exists only in WebGL.

## Load order

1. HTML
2. critical CSS
3. real hero DOM photo
4. core interaction JS
5. spatial bootstrap after core usability
6. gallery/dish textures near viewport

## DPR targets

- high desktop: <= 1.5
- normal desktop/tablet: <= 1.25–1.35
- constrained: 1.0 or Tier 1

## Texture budget

- hero: 1–2 textures
- dishes: max 3 resident real textures
- gallery: 4–7 optimized textures

## Downgrade order

When performance is poor, remove in this order:

1. advanced material features
2. particles
3. high DPR
4. gallery texture count
5. photo displacement
6. persistent renderer

Never downgrade business content.

## Test matrix

- current Chrome desktop
- Safari macOS
- Firefox desktop
- iPhone Safari
- Android Chrome
- low-power laptop
- reduced motion
- Save-Data/constrained network
- JavaScript disabled
- WebGL unavailable

## Performance goals

- spatial JS does not block LCP
- hero DOM image visible before renderer boot
- no large layout shift from spatial canvas
- no sustained GPU/CPU churn while reading static sections
- smooth interaction at selected quality tier

---

# 18. Phase 8 — Optional bespoke 3D objects / photogrammetry

Only after the real-photo experience succeeds.

Good candidates must be recognizably Cafe Mera:

- branded cup
- distinctive serving plate
- real counter sign
- coffee vessel genuinely used by Cafe Mera

Capture principles:

- diffuse lighting
- many overlapping angles
- clean separation
- preserve real texture
- simplify for web

Avoid:

- generic marketplace coffee objects
- unrelated photoreal food models
- adding assets only because they are impressive

---

# 19. Generated imagery and shader inputs

Generated imagery is often more useful as a renderer input than as a flat picture.

Preferred uses:

- alpha mask
- roughness map
- displacement/noise lookup
- light cookie
- particle sprite
- paper-edge mask
- contact-shadow texture

## Procedural/generated material families

### Ceramic

- tiny speckle
- micro roughness
- faint glazing variation

### Paper

- warm fiber
- edge noise
- print grain

### Plaster

- low-contrast wall variation

### Steam

- grayscale organic alpha masks

### Light

- soft cookies/gobos

Generated textures should remain low-contrast and optimized.

---

# 20. Concept-to-code workflow

For every major scene:

1. **Start with truth** — choose the real Cafe Mera asset/fact.
2. **Define the spatial job** — depth, focus, connection, warmth, orientation.
3. **Explore multiple visual directions** — editorial vs photographic, quiet vs immersive, paper vs ceramic.
4. **Choose one direction** — do not average all ideas together.
5. **Decompose the winning frame** into real DOM image, WebGL texture, procedural geometry, CSS, and generated texture.
6. **Build the minimum 3D prototype** that reproduces the visual idea.
7. **Replace concept-only factual-looking imagery** before production.

---

# 21. Asset organization

Recommended repository structure:

```text
assets/
  real-approved/
  real-needs-rights/
  generated-production/
  generated-concept-only/
  demo-third-party/
```

Maintain `docs/asset-register.md` with:

- source/type
- purpose
- page section
- factual vs atmospheric
- rights status
- production approval
- generation/edit history where material

---

# 22. Renderer roadmap

## Production

Use `WebGLRenderer` for the first complete deep spatial release.

## Experimental later

After visual behavior is stable, separately test `WebGPURenderer`/TSL for:

- startup cost
- thermal/battery behavior
- browser consistency
- material quality

Do not combine renderer migration with the first deep redesign.

---

# 23. Target file architecture

```text
spatial/
  capabilities.js
  quality.js
  assets.js
  textures.js
  scene-states.js
  scene-controller.js
  camera-rig.js
  mera-thread.js
  photo-diorama.js
  menu-table.js
  dish-sequence.js
  story-scene.js
  gallery-wall.js
  visit-scene.js
  materials.js
  motion.js
  debug.js
```

The key separation is between:

- **what the scene means** — `scene-states.js`
- **how spatial objects are built** — section modules
- **how motion behaves** — `motion.js`
- **what hardware is allowed to run** — `capabilities.js` + `quality.js`
- **what real/generated assets are available** — `assets.js`

---

# 24. DOM ↔ spatial synchronization

The DOM owns interaction and emits semantic events/state.

Examples:

```text
section:enter(menu)
menu:filter(ethiopian)
dish:focus(ful)
gallery:focus(interior)
section:enter(visit)
```

The spatial layer responds.

It never owns ordering, menu filtering, navigation, or directions.

This guarantees:

- keyboard parity
- easier testing
- feature flags
- simple 3D removal/fallback

---

# 25. Measurement plan

Once analytics exist, measure business outcomes first.

## Primary conversion

- Order Online clicks
- Directions clicks
- Call clicks
- Menu views

## Experience indicators

- hero → menu continuation
- Ethiopian breakfast reach
- gallery interactions
- Visit reach

## Guardrails

- bounce rate
- LCP
- INP
- CLS
- JS errors

The spatial design fails if visual engagement rises but Order/Directions usage materially drops.

---

# 26. Implementation sequence and gates

The ideal production process is phase-by-phase review. When implementing a consolidated pass, the same gates still apply internally.

Recommended sequence:

```text
Phase 0  asset/truth audit
Phase 1  foundation + Mera Thread + quality tiers
Phase 2  hero spatial depth
Phase 3A intro bridge
Phase 3B menu table
Phase 3C breakfast stations
Phase 3D owner story
Phase 3E review pause
Phase 4  gallery photo room
Phase 5  visit resolution
Phase 6  continuity polish
Phase 7  QA / downgrade behavior
Phase 8  bespoke captured assets later
```

Each phase review checks:

- desktop
- tablet
- mobile fallback
- reduced motion
- static/WebGL failure
- conversion hierarchy
- performance budget

---

# 27. What can be implemented now vs deferred

## Implementable now with existing site assets

- quality tiers and feature flags
- demand rendering
- debug mode
- Mera Thread morph system
- procedural/generated ceramic, paper, shadow, particle textures
- hero real-photo WebGL echo behind DOM photo
- abstract menu table synchronized with filters
- abstract Ful/Chechebsa/Kinche stations
- quiet Yeshi halo treatment
- real-photo spatial gallery using current site images where loading rights/CORS permit
- abstract Visit resolution
- improved CSS spatial mobile fallback

## Deferred until better/verified real assets exist

- true hero depth-map displacement with carefully cleaned map
- real Ful/Chechebsa/Kinche image stations
- real entrance/hallway wayfinding sequence
- verified 3D/floor route
- photogrammetry objects
- real 360 cafe view

The implementation must degrade gracefully if any remote real-photo texture cannot be loaded into WebGL.

---

# 28. Acceptance criteria for generated visual assets

- generated assets strengthen spatial depth or storytelling
- they do not look like generic AI artwork
- real food remains the factual depiction of food
- real Cafe Mera images remain the factual depiction of the cafe
- Yeshi is represented only with real approved photography
- location/wayfinding uses real verified information
- generated production assets are web optimized
- synthetic elements have a clear purpose
- cultural motifs are not invented without confidence in their meaning

---

# 29. Final target experience

A visitor arrives and sees a real Cafe Mera photograph with subtle physical depth. Organic steam rises and becomes a warm line that quietly guides the page.

That line settles into the menu’s table-space composition. The Ethiopian breakfast sequence turns three unfamiliar dish names into three distinct spatial moments. The movement becomes quiet around Yeshi so the real portrait and story become the emotional center.

The gallery opens the site spatially using real Cafe Mera photography at different depths inside an abstract editorial environment — never a fake reconstruction. Reviews slow almost to stillness. Finally, the Mera Thread resolves at the Visit section, where it can eventually connect real entrance photographs and help customers find the hidden cafe.

At every point:

- the site remains readable
- the photos remain real
- the food remains real
- the owner remains real
- the location remains real
- conversion actions stay obvious
- 3D exists to make those real things feel more present

That is the target spatial identity for Cafe Mera.
