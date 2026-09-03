# Cafe Mera — Deep 3D Experience Roadmap

**Status:** Planning only. This document supersedes the earlier high-level 3D roadmap as the working design specification for future spatial work.

**Implementation rule:** Do not proceed from one phase to the next until the previous phase has been reviewed visually and accepted.

---

# 1. North-star experience

The goal is not to make Cafe Mera look like a technology demo. The goal is to make a visitor feel that they are moving through a warm, real, distinctive cafe story while the ordering, menu, hours, directions, and photography remain immediately understandable.

The spatial experience should answer one question:

> **What can 3D communicate about Cafe Mera that a normal flat restaurant website cannot?**

The answer should be:

- the feeling of entering a real place
- the warmth and atmosphere around coffee and breakfast
- the relationship between Ethiopian dishes, familiar cafe food, and the owner story
- the sense that the cafe is a hidden place worth discovering
- depth and physicality around real Cafe Mera photography

It should **not** communicate:

- “look, this website uses Three.js”
- a fake cafe interior
- fake food
- a game-like walkthrough
- generic floating 3D shapes unrelated to the business

The site remains **Cafe Mera first, spatial technology second**.

---

# 2. Core creative idea — “The Mera Thread”

Instead of building unrelated effects for each section, the experience should have one continuous spatial motif.

A single warm line begins as **coffee steam** in the hero and changes meaning as the user moves through the page:

1. **Hero:** steam / aroma
2. **Value proposition:** a soft orbit around photography
3. **Menu:** cup and plate contours
4. **Ethiopian breakfast:** a guiding line moving between Ful, Chechebsa, and Kinche
5. **Owner story:** a quiet halo / framing arc around Yeshi
6. **Gallery:** a path through real Cafe Mera photographs
7. **Reviews:** a nearly still circle that creates visual pause
8. **Visit:** the line resolves into a subtle destination marker

This gives the site visual continuity and means that every 3D moment is part of the same story.

### Technical expression

The thread can be defined as a changing 3D spline and rendered either as a line or a low-segment tube. Each page state owns a target set of spline control points. The renderer interpolates between states rather than replacing the entire scene.

The motif should never resemble a literal map route unless a real route is being shown.

---

# 3. Experience principles

## 3.1 Real imagery before synthetic geometry

Whenever the choice is between showing a real Cafe Mera photograph and a decorative 3D object, the photograph wins.

Three.js should:

- add depth around the photograph
- create perspective
- frame it
- connect it to other content
- make it feel spatial

It should not cover it.

## 3.2 One scene, many states

Prefer one shared renderer, camera rig, light rig, motif system, and asset manager.

Avoid separate independent WebGL canvases for every section.

## 3.3 Spatial interaction should follow normal browsing

Normal vertical browser scrolling remains the navigation model.

No:

- scroll hijacking
- forced horizontal scrolling
- first-person controls
- orbit controls
- click-and-drag requirements
- camera tunnels

## 3.4 DOM remains authoritative

The following always remain semantic HTML:

- H1/H2/H3 content
- menu items
- reviews
- owner story
- address
- hours
- phone
- order button
- directions button
- gallery controls

WebGL is decorative and experiential.

## 3.5 Motion must be earned

Movement should answer one of these:

- What is entering focus?
- How are these pieces connected?
- Where should the eye move next?
- What changed in the story?

If an animation answers none of those questions, remove it.

---

# 4. Capability tiers

The spatial experience should be designed as several quality tiers rather than a binary WebGL on/off decision.

## Tier 0 — Static

Used for:

- JavaScript failure
- WebGL/WebGPU unavailable
- reduced-motion preference when appropriate

Experience:

- existing semantic site
- real images
- no continuous decorative motion

## Tier 1 — CSS spatial

Used for:

- small mobile devices
- constrained hardware
- reduced-data conditions

Experience:

- layered image cards
- restrained CSS perspective
- static thread motif
- no persistent renderer

## Tier 2 — Core Three.js

Used for most capable phones/tablets/desktops where appropriate.

Experience:

- shared renderer
- Mera Thread
- procedural plate / ring geometry
- restrained particles
- section-based camera/light states

## Tier 3 — Full spatial photography

Used on capable desktop/tablet devices.

Adds:

- real Cafe Mera photo textures in WebGL
- 2.5D photo dioramas
- spatial gallery wall
- dish-photo planes where approved
- richer materials where performance allows

## Tier 4 — Bespoke captured assets (future)

Only after Cafe Mera-specific assets are captured.

Possible additions:

- scanned Cafe Mera cup
- scanned plate or serving object
- branded signage model
- 360-degree interior image
- photogrammetry-based object or tabletop

This tier is optional and should not block the primary launch.

---

# 5. Phase 0 — Discovery, asset capture, and spatial art direction

This phase happens before writing more production Three.js code.

## Objective

Define what is uniquely Cafe Mera enough to deserve dimensional treatment.

The current implementation proves that Three.js can run on the site. It should be considered a **technical prototype**, not the final visual language.

## 5.1 Asset audit

Create an inventory of every visual asset and mark:

- owner-approved production asset
- needs permission
- demo/editorial only
- replace before commercial launch

Required categories:

- hero food / cafe photograph
- Yeshi portrait
- Ethiopian breakfast dishes
- gyro / lunch
- coffee / cup
- cafe interior
- counter / sign
- entrance / building
- exterior / parking approach

## 5.2 Photography capture wishlist

For the full experience, request a dedicated Cafe Mera shoot.

### Hero

Capture one strong wide image with visible foreground, middle ground, and background so it can become a 2.5D diorama.

Ideal characteristics:

- foreground object: cup, plate, plant, chair edge, or counter detail
- clear main subject
- visible room depth
- minimal motion blur
- no cropped people at frame edges
- horizontal and vertical versions

### Food

For Ful, Chechebsa, and Kinche capture:

- top-down
- 30–45° hero angle
- close detail
- neutral/consistent tabletop

The goal is not just a gallery; these images can later become real textured planes inside the 3D table scene.

### Owner story

Capture:

- environmental portrait of Yeshi inside the cafe
- direct portrait
- hands serving coffee / food
- owner interacting with customer or counter if permissions allow

### Location

Capture:

- building exterior
- correct entrance
- hallway / lobby cue if needed
- Cafe Mera door/sign

This allows the “hidden gem” story to become useful rather than purely decorative.

## 5.3 Optional object capture

If Cafe Mera has a distinctive:

- branded cup
- coffee vessel
- serving plate
- sign
- menu board

capture it from many angles for future photogrammetry or manual low-poly reconstruction.

Do not scan generic objects just to increase the 3D count.

## 5.4 Depth-map preparation

Select 2–4 real photos suitable for 2.5D treatment.

For each:

- create a grayscale depth map
- inspect edges around people / cups / chairs
- manually clean depth boundaries when automatic estimation is incorrect
- create optional foreground masks

The depth map is not used to invent new image content. It only controls spatial displacement of the original photograph.

## Phase 0 deliverables

- approved asset inventory
- photo shot list
- rights status matrix
- 2–4 candidate depth-map images
- one visual mood frame showing the final desired spatial tone
- agreed quality tiers

## Phase 0 gate

Do not start the hero production scene until we have selected the actual hero photograph and chosen whether the first release uses a true 2.5D image treatment or DOM-photo + background spatial framing.

---

# 6. Phase 1 — Foundation and spatial grammar

## Objective

Create the reusable spatial system before adding visual complexity.

This phase should produce very little spectacle. Its success is architectural.

## 6.1 Renderer strategy

Use a single renderer.

Production recommendation for the current site:

- retain WebGLRenderer initially for maximum predictability
- structure materials and scene code so a WebGPU/TSL experiment can happen later on a separate branch
- do not migrate the production renderer only because WebGPU is newer

## 6.2 World coordinate system

Define one stable coordinate convention:

```text
x = horizontal page composition
y = vertical visual composition
z = visual depth
```

DOM sections do not literally live in the same coordinate space as the page; instead each section declares a **scene state**.

Example:

```js
heroState = {
  camera: { x: 0.4, y: 0.1, z: 8.5 },
  thread: 'steam',
  plateGroup: 0.3,
  galleryGroup: 0,
  storyHalo: 0
}
```

State transitions should be damped rather than directly mapped 1:1 to scroll pixels.

## 6.3 Scene graph

Recommended persistent groups:

```text
Scene
├── EnvironmentRig
│   ├── key light
│   ├── fill light
│   └── ambient contribution
├── MeraThread
├── AromaParticles
├── TableGroup
├── DishFocusGroup
├── StoryGroup
├── GalleryGroup
├── TrustGroup
└── VisitGroup
```

Groups remain allocated and transition opacity/position instead of being recreated on every section change.

## 6.4 Camera rig

Use a parent rig:

```text
CameraRig
└── PerspectiveCamera
```

The rig handles section transitions.

The camera itself handles tiny pointer response.

This prevents pointer motion from fighting scroll/state transitions.

## 6.5 Mera Thread system

Implement the persistent spline as a first-class component rather than a hero effect.

Each state provides target control points.

Possible modes:

- line
- tube
- dotted line
- partially transparent contour

Preferred first release:

- a thin tube or line with low geometry density
- warm brass/clay color
- no neon emission

## 6.6 Lighting grammar

The lighting should reference the actual cafe palette:

- warm key
- low-intensity cream fill
- clay/brass accent
- green-toned shadow environment where appropriate

Avoid cinematic nightclub contrast.

The site is a breakfast/lunch cafe.

## 6.7 Material grammar

Create only a few materials:

### Ceramic

For plate/cup abstractions:

- warm cream
- high roughness
- low metalness
- very subtle clearcoat only on higher tiers if useful

### Paper

For menu/photo planes:

- matte
- nearly no specular emphasis

### Brass / thread

For the Mera Thread and small accents:

- warm muted metal or colored standard material
- not mirror-like

### Glass

Use only if a real cafe object justifies it.

Transmission/refraction should never be a default decorative effect.

## 6.8 Render-on-demand strategy

The experience should not render at 60fps for the entire page just because a canvas exists.

Recommended lifecycle:

- continuous animation while hero steam is visible
- render during active section transitions
- render during pointer movement
- render during gallery interaction
- fall back to a low-frequency or paused state when visually static
- stop when page hidden

This is a major battery/performance requirement.

## 6.9 Developer debug mode

Add an optional query parameter:

```text
?spatialDebug=1
```

Debug UI can show:

- active scene state
- quality tier
- FPS
- DPR
- draw calls
- triangles
- loaded textures

Debug UI must never appear by default.

## Phase 1 acceptance

- [ ] One stable renderer.
- [ ] Scene survives resize/orientation changes.
- [ ] State controller can move between all named sections.
- [ ] Mera Thread can morph between at least three configurations.
- [ ] Pointer and scroll state do not fight each other.
- [ ] Rendering pauses when unnecessary.
- [ ] Tier 0/1 fallbacks remain intact.
- [ ] No business content depends on canvas.

## Phase 1 gate

Review only the spatial grammar: camera, thread, materials, and transitions. Do not judge food/gallery wow factor yet.

---

# 7. Phase 2 — Hero: “Enter Cafe Mera”

This phase should create the strongest first impression on the site.

## Objective

Make a real Cafe Mera image feel dimensional within the first few seconds without delaying the first meaningful paint or hiding the ordering CTA.

## Recommended concept — real-photo diorama

The hero should become a **2.5D photographic diorama** built from an actual Cafe Mera photograph.

### Visual composition

The visitor sees:

- normal DOM headline and CTAs
- a real Cafe Mera image
- subtle depth inside that image
- Mera Thread rising as coffee steam
- a soft plate/cup contour behind or around the image

The image itself should feel like it has physical layers.

## 7.1 Technique A — depth-displaced image plane

Use:

- original image texture
- grayscale depth texture
- subdivided plane geometry
- very small vertex displacement

Pointer/camera movement reveals just enough parallax to make the image feel dimensional.

Maximum effect should be restrained. The visitor should not see obvious rubber-sheet deformation.

## 7.2 Technique B — layered photo cutouts

For photographs with clean structure, split into layers:

- foreground
- subject
- background

Render each on its own plane at slightly different z values.

This can look more editorial and often avoids displacement artifacts around people or hard edges.

## 7.3 Recommended decision

Choose A or B per photo rather than forcing one technique globally.

For a portrait or hard-edged interior, layered cutouts may be more reliable.

For a food/table scene with organic depth, depth displacement may work better.

## 7.4 Steam behavior

The Mera Thread starts as three related steam curves.

Motion:

- slow
- asymmetrical
- slight horizontal drift
- no looping pattern that is immediately obvious

The steam should partially disappear behind the photographic composition so it feels integrated rather than pasted on top.

## 7.5 Optional hero object

Only if a real Cafe Mera object is captured:

- cup
- plate
- sign

place one low-poly/scan-derived object near the photo plane.

Do not add a generic downloaded coffee cup.

## 7.6 Pointer behavior

Fine-pointer devices only.

Maximum response:

- camera yaw/pitch equivalent: roughly 1–2°
- photo depth movement: subtle
- thread movement: smaller than camera movement

The hero should not wobble under the cursor.

## 7.7 Scroll exit

As the hero leaves:

- camera settles
- photo depth decreases
- steam curves merge into one persistent Mera Thread
- thread leads toward the next section

This transition is the first proof that the 3D is telling one continuous story.

## Mobile

Preferred mobile behavior:

- real hero image remains normal DOM content
- no depth-displacement shader
- use static layered perspective or a very low-cost transform
- optional lightweight steam only if device tier allows

## Hero performance budget

- 1–2 photo textures maximum
- texture width typically <= 1600px desktop
- no realtime shadows
- no full-screen post-processing
- no more than a few persistent objects

## Hero acceptance

- [ ] Real photo is clearly the hero.
- [ ] 3D is visible but not the first thing the visitor consciously identifies.
- [ ] Order/Menu CTAs remain visually stronger than decorative objects.
- [ ] Image does not visibly warp around hard edges.
- [ ] First meaningful content appears before Three.js finishes loading.
- [ ] Transition into the next state feels intentional.

## Hero gate

Do not proceed to menu/story states until the hero establishes the correct level of restraint.

---

# 8. Phase 3 — Section states and spatial storytelling

This phase turns the site from a 3D hero into a 3D narrative.

It should be built as four distinct sub-phases and reviewed separately.

---

## Phase 3A — Value proposition: “Familiar + discovery”

### Purpose

Bridge the hero to the food story without another major spectacle.

### 3D opportunity

The Mera Thread flattens from steam into two or three broad arcs.

Those arcs can visually represent the duality of the menu:

- familiar cafe food
- Ethiopian-rooted discovery

They overlap rather than split into opposing sides.

### Geometry

- 2–3 arcs
- shallow depth
- large scale
- low opacity

### Motion

Nearly still.

This section should let the eye rest after the hero.

### Acceptance

The section must read perfectly even if the viewer ignores the background animation.

---

## Phase 3B — Menu: “The table”

### Purpose

Make the menu feel physical without turning it into a novelty menu interface.

### Recommended concept

Create one abstract tabletop composition behind/adjacent to the HTML menu.

Components:

- table plane or implied surface
- three plate/cup rings
- one paper plane
- Mera Thread acting as a contour around the active group

### Menu filters

The existing DOM tabs remain the only control.

When a filter changes:

- Ethiopian breakfast -> three plate forms become more visible
- Cafe breakfast -> one broad plate + cup contour
- Lunch -> elongated composition / plate + wrap-like abstract form only if it remains abstract
- Drinks -> cup ring / steam emphasis

No fake food meshes.

### Real-photo opportunity

Once owner-approved dish photos are available, the active menu state can bring a real image plane forward.

Example:

```text
HTML: Ful
3D: real Ful photograph on a shallow plate-shaped frame
```

The photograph is the content; the 3D plate is the frame.

### Interaction

No separate 3D controls.

DOM hover/focus can subtly highlight the associated 3D plate, but keyboard focus must produce the same response as pointer hover.

### Acceptance

- [ ] Filtering remains instant.
- [ ] 3D never obstructs item names/descriptions.
- [ ] Menu remains fully useful if canvas is disabled.
- [ ] No dish is visually represented by invented geometry pretending to be food.

---

## Phase 3C — Ethiopian breakfast: “Three dishes, three moments”

This should be the second strongest 3D sequence after the hero.

### Purpose

Use spatial storytelling to make unfamiliar dish names easier to explore.

### Recommended scene

Three spatial stations:

```text
FUL        CHECHEBSA        KINCHE
 ○              ○              ○
```

Each station includes:

- real dish photo when available
- plate contour
- subtle steam/thread segment
- one depth layer behind the text

As the corresponding DOM card enters the focus zone:

- its station comes forward
- other stations recede slightly
- thread connects current -> next

### Important constraint

Do not infer ingredients beyond confirmed menu descriptions.

### Strongest future opportunity

Capture each dish under the same camera angle and table surface.

Then the three images can transition almost like physical plates moving along the same table. This would feel highly specific to Cafe Mera and far stronger than procedural shapes alone.

### Scroll behavior

Do not pin the viewport.

Use normal section scrolling with an observer or normalized local section progress.

### Mobile

Show the real dish photo with a static circular depth frame. No persistent three-station scene required.

### Acceptance

The sequence should increase curiosity about Ful/Chechebsa/Kinche rather than distract from the descriptions.

---

## Phase 3D — Owner story: “Human center”

### Purpose

The 3D should become quiet when the story becomes personal.

### Recommended concept

Use a real Yeshi portrait as a shallow 2.5D portrait plane or layered cutout.

Behind it:

- Mera Thread forms one incomplete halo
- soft paper planes echo menu/story pages
- particles almost disappear

### Depth treatment

If depth map quality is strong:

- separate face/body minimally from background
- keep facial geometry effectively flat
- do not distort the face

Alternative:

- keep the portrait entirely DOM-based
- only use spatial framing behind it

### Interaction

None required.

The section should feel calm and respectful.

### Acceptance

If the 3D effect draws more attention than Yeshi’s face/story, reduce it.

---

## Phase 3E — Reviews: “Pause the room”

### Purpose

Create trust and visual rest.

### Scene

- Mera Thread becomes a near-circle
- plate/table objects recede
- particle count approaches zero
- camera stops drifting

The 4.9 rating becomes the visual focal point in DOM.

### Acceptance

This section should feel more still than the sections before and after it.

---

# 9. Phase 4 — Spatial gallery: “Inside Cafe Mera”

This is the largest 3D opportunity after the hero.

## Objective

Turn actual Cafe Mera photography into a sense of place without inventing a virtual building.

## Recommended concept — editorial photo room

Use 4–7 real Cafe Mera images as image planes arranged in shallow 3D space.

Not a literal room.

Think of it as an editorial wall floating through depth:

```text
             [interior]
   [food]                    [Yeshi]
             [coffee]
       [counter]       [sign]
```

The normal HTML gallery stays above/alongside it.

## 9.1 Image planes

Each approved image gets:

- low-resolution WebGL texture
- high-quality responsive DOM equivalent
- known aspect ratio
- slight z offset

Do not upload the same full-resolution 4K image to GPU.

## 9.2 Depth choreography

As the user moves through the gallery:

- camera shifts laterally a small amount
- closest plane moves gently relative to distant planes
- Mera Thread passes behind some photos and in front of others

This creates occlusion/depth without a fake environment.

## 9.3 DOM -> WebGL synchronization

Hover/focus/click on a gallery item:

- corresponding plane moves toward camera
- neighboring planes reduce opacity slightly

Keyboard focus must produce the same spatial emphasis as hover.

The DOM item remains the clickable/accessibility target.

## 9.4 Optional interior diorama

If a strong wide interior photo is available:

- convert it to a 2.5D depth plane
- position smaller gallery images around it
- use it as the visual anchor of the gallery

## 9.5 Optional 360 capture

A later phase could use a real 360-degree Cafe Mera panorama.

That would support a short “look around” experience, but it should be opt-in and separate from normal scrolling.

Do not fake a 360 view from normal photographs.

## Gallery performance budget

- 4–7 GPU textures maximum at once
- compressed web-sized textures
- lazy-load textures shortly before gallery viewport
- dispose textures after long navigation away only if memory pressure warrants it
- no complex shadows

## Gallery acceptance

- [ ] All imagery is real Cafe Mera imagery with confirmed rights.
- [ ] DOM gallery remains complete.
- [ ] Spatial view materially increases sense of place.
- [ ] It does not feel like floating cards from a SaaS template.
- [ ] Mobile receives a deliberately simpler gallery.
- [ ] GPU texture memory remains controlled.

## Gallery gate

Review the gallery as a standalone experience before integrating the final transitions into Visit.

---

# 10. Phase 5 — Visit / discoverability: “Find the hidden gem”

## Objective

Make 3D improve a real business problem: finding the cafe.

This is where the spatial system can become practical, not merely atmospheric.

## Level 1 — abstract resolution

If no verified entrance imagery/instructions are available:

- Mera Thread travels through 2–3 depth planes
- resolves into a small marker-like form
- Visit DOM content remains primary

Do not represent the abstract path as a real map.

## Level 2 — real photographic wayfinding

If Cafe Mera provides confirmed entrance directions and photographs:

Create a sequence using real images:

1. building exterior
2. correct entrance
3. lobby/hallway cue
4. Cafe Mera sign/door

The images can be spatially arranged along a shallow z path.

The user scrolls normally while the spatial system visually connects the real wayfinding images.

This would turn the “hidden gem” issue into a signature conversion feature.

## Level 3 — verified floor/entrance diagram

Only if a correct diagram/floor plan is supplied or permission exists to create one from verified measurements.

Could add a simplified 3D/2.5D route.

Do not infer hallways, doors, parking, or building geometry from review prose.

## Visit interaction

DOM actions remain obvious:

- Get Directions
- Call
- Order

The spatial layer should funnel attention toward those buttons rather than compete with them.

## Acceptance

- [ ] No invented route geometry.
- [ ] Visitor can still get directions immediately.
- [ ] If photographic wayfinding is used, each image is verified and current.
- [ ] Final camera state feels like arrival rather than another animation loop.

---

# 11. Phase 6 — Polish: material, light, motion, and continuity

This phase is not “add more effects.”

It is where the whole experience is made coherent.

## 11.1 Motion curve library

Define a small motion vocabulary:

### Settle

For camera transitions:

- slow damping
- no overshoot

### Lift

For image/plate focus:

- short z movement
- ~200–300 ms perceived response

### Drift

For steam/particles:

- slow irregular continuous motion

### Resolve

For final Visit transition:

- movement decelerates to stillness

Avoid generic bounce/spring motion unless physically justified.

## 11.2 Material hierarchy

Most objects should use inexpensive standard/basic materials.

Reserve advanced physical material properties for one or two meaningful surfaces.

Potentially:

- slight clearcoat on a ceramic cup
- controlled transmission on an actual glass object

Do not use glassmorphism as a 3D material theme.

## 11.3 Shadows

Preferred:

- baked soft shadow textures
- simple contact ellipses
- ambient darkening

Avoid multiple realtime shadow-casting lights.

## 11.4 Post-processing

Default: none.

Consider one restrained high-tier effect only if the site clearly benefits after the core scene is complete.

Candidates:

- extremely subtle depth-of-field in a dedicated gallery moment
- gentle vignette built in CSS rather than renderer

Avoid bloom-heavy styling.

## 11.5 Color management

Photo colors must remain natural.

The 3D scene should adapt to Cafe Mera’s photography rather than forcing every image into a dramatic grade.

## 11.6 Scene transitions

Every section transition should be evaluated as a pair:

- Hero -> Intro
- Intro -> Menu
- Menu -> Ethiopian breakfast
- Breakfast -> Yeshi
- Yeshi -> Space/Gallery
- Gallery -> Reviews
- Reviews -> Visit

The question is not “is each scene attractive?”

It is “does one scene transform naturally into the next?”

## Acceptance

- [ ] No section feels visually disconnected.
- [ ] Mera Thread remains recognizable without becoming repetitive.
- [ ] Motion intensity has clear peaks and rests.
- [ ] Photography color/clarity remains intact.
- [ ] 3D has no noticeable theme drift into luxury-tech or gaming aesthetics.

---

# 12. Phase 7 — Accessibility, performance, and production QA

This phase is a release blocker.

## 12.1 Accessibility

### Reduced motion

When `prefers-reduced-motion: reduce`:

- disable continuous steam
- disable camera drift
- disable pointer parallax
- show static real photography
- retain static spatial composition only when it does not imply motion

### Keyboard

All meaningful interactions remain DOM-based.

If DOM focus triggers a spatial highlight, it must be supplementary.

### Screen readers

Canvas remains `aria-hidden="true"`.

No content is announced from 3D.

## 12.2 Performance strategy

### Load order

1. HTML
2. critical CSS
3. hero DOM image
4. core interaction JS
5. only after core usability -> spatial bootstrap
6. only near relevant viewport -> gallery/dish textures

### DPR

Quality tiers define DPR cap.

Example:

- high desktop: 1.5 max
- normal desktop/tablet: 1.25
- constrained: 1.0 or no persistent WebGL

### Texture budget

Set an explicit per-section budget.

Example target:

- hero: 1–2 textures
- food sequence: max 3 resident dish textures
- gallery: 4–7 optimized textures

### Geometry

Procedural geometry remains low-poly.

The Mera Thread should use enough segments to look smooth but not hundreds of unnecessary radial segments.

### Render scheduling

Prefer event-driven/demand rendering outside continuous hero animation.

### Memory

Dispose temporary textures/materials when replaced if they will not be reused.

## 12.3 Quality downgrade order

When performance is poor, remove features in this order:

1. advanced material properties
2. particles
3. high DPR
4. gallery texture count
5. 2.5D displacement
6. persistent renderer

Never downgrade business content.

## 12.4 Test matrix

Minimum:

- current Chrome desktop
- current Safari macOS
- current Firefox desktop
- iPhone Safari
- Android Chrome
- low-power laptop
- reduced-motion
- Save-Data or simulated constrained network
- JavaScript disabled
- WebGL unavailable

## 12.5 Performance acceptance targets

The exact metrics should be measured on the production build, but goals include:

- spatial JS does not block LCP
- hero photo remains visible before renderer boot
- no large layout shift from canvas initialization
- no sustained high CPU/GPU usage while reading static sections
- smooth interaction at selected quality tier

---

# 13. Phase 8 — Optional bespoke 3D objects / photogrammetry

This is an enhancement after the photo-based experience succeeds.

## Best candidates

A bespoke 3D asset is worthwhile only if it is recognizably Cafe Mera.

Potential candidates:

- Cafe Mera branded cup
- distinctive serving plate
- real counter sign
- Ethiopian coffee vessel only if it is genuinely used by Cafe Mera and the story is confirmed

## Capture principles

- diffuse lighting
- many overlapping angles
- clean object separation
- preserve real texture
- simplify final mesh for web

## Web asset targets

For one hero object:

- optimized GLB
- Draco/Meshopt only if build tooling justifies it
- compressed textures
- conservative polygon count

## Avoid

- downloading generic marketplace cafe objects
- photorealistic food models unrelated to actual dishes
- adding objects merely because they are technically impressive

---

# 14. Renderer roadmap: WebGL now, WebGPU experiment later

The production plan should not require WebGPU.

Three.js currently positions WebGPURenderer as its next-generation renderer with WebGPU plus a WebGL 2 fallback, but it remains a moving/experimental area compared with the long-established WebGLRenderer workflow.

Recommendation:

### Production

Continue with WebGLRenderer for the first complete spatial release.

### Experimental branch

After the experience is visually stable:

- prototype Mera Thread + materials with WebGPURenderer/TSL
- compare startup cost
- compare battery/thermal behavior
- compare Safari/Chrome behavior
- migrate only if there is a concrete gain

Do not combine a renderer migration with the first deep visual redesign.

---

# 15. Proposed file architecture

The current spatial code should evolve toward clearer responsibilities.

```text
spatial/
  boot.js
  capabilities.js
  quality.js
  assets.js
  scene-controller.js
  scene-states.js
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

## Why split this way

The important separation is between:

- **what the scene means** (`scene-states.js`)
- **how objects are built** (`menu-table.js`, `gallery-wall.js`)
- **how motion behaves** (`motion.js`)
- **what hardware is allowed to run** (`quality.js`)

This prevents one large controller from turning into a collection of section-specific conditionals.

---

# 16. Scene-state model

Use a declarative state map.

Illustrative only:

```js
const states = {
  hero: {
    camera: [0.5, 0.1, 8.2],
    threadShape: 'steam',
    aroma: 1,
    table: 0.1,
    story: 0,
    gallery: 0,
    visit: 0
  },
  menu: {
    camera: [-0.8, 0.2, 9],
    threadShape: 'tableOrbit',
    aroma: 0.15,
    table: 1,
    story: 0,
    gallery: 0,
    visit: 0
  }
};
```

Objects read target values from the active state.

They should not query scroll position independently.

This keeps choreography consistent.

---

# 17. DOM/WebGL synchronization model

The page needs a small bridge layer.

## DOM emits semantic events

Examples:

```text
section:enter(menu)
menu:filter(ethiopian)
dish:focus(ful)
gallery:focus(interior)
section:enter(visit)
```

## Spatial layer responds

It does not own the business interaction.

This allows:

- keyboard parity
- simple testing
- feature-flagging
- easy removal of 3D without rewriting UI logic

---

# 18. Feature flags and experimentation

Add simple URL/session-independent feature flags for development:

```text
?spatial=off
?spatial=tier1
?spatial=tier2
?spatial=tier3
?spatialDebug=1
```

This enables direct comparison of:

- static site
- current prototype
- new hero
- full photo textures

No user-facing toggle is necessary unless performance feedback suggests one.

---

# 19. Measurement plan

3D is only valuable if it improves or preserves business outcomes.

Track when analytics are eventually configured:

## Primary conversion

- Order Online clicks
- Directions clicks
- Call clicks
- Menu views

## Experience indicators

- hero -> menu scroll continuation
- Ethiopian breakfast section reach
- gallery interactions
- Visit section reach

## Guardrail metrics

- bounce rate
- LCP
- INP
- CLS
- JS errors

The spatial design fails if engagement rises but Order/Directions usage decreases materially.

---

# 20. Phase review process

Each phase should be implemented behind a staging branch and reviewed before promotion.

Recommended branch sequence:

```text
spatial/phase-1-foundation
spatial/phase-2-hero
spatial/phase-3-menu-story
spatial/phase-4-gallery
spatial/phase-5-visit
spatial/phase-6-polish
spatial/phase-7-qa
```

For each phase:

1. implement only that phase
2. deploy preview/staging if available
3. review desktop
4. review mobile fallback
5. check reduced motion
6. check performance
7. approve visual direction
8. merge/promote

Do not implement the entire roadmap in one batch.

---

# 21. Recommended order of investment

If time/budget is limited, spend effort in this order:

## 1. Hero photo diorama

Highest first-impression value.

## 2. Real dish-photo sequence

Most Cafe-Mera-specific storytelling opportunity.

## 3. Spatial gallery

Strongest sense-of-place opportunity.

## 4. Photographic wayfinding

Potentially highest practical business value because the cafe is difficult to discover physically.

## 5. Bespoke scanned object

High craft value, lower conversion impact.

## 6. Advanced shaders/materials

Lowest priority unless needed by a real captured object.

---

# 22. What should be removed from the current prototype if it does not earn its place

The current prototype includes generic rings/particles as proof-of-concept geometry.

During the redesign, remove or reduce any element that remains generic once real photography takes over.

Specifically question:

- every floating particle
- every ring
- every abstract plate
- every persistent camera movement

Keep only geometry that now participates in the Mera Thread or supports a specific section story.

The finished experience should contain **fewer, more meaningful 3D elements** than a typical WebGL showcase.

---

# 23. Final target experience

A visitor arrives and sees a real Cafe Mera photograph with subtle physical depth. Steam rises naturally and becomes a warm line that quietly guides the page.

As they reach the menu, that same line settles around a physical table-like composition. The Ethiopian breakfast section brings real Ful, Chechebsa, and Kinche photography into depth one dish at a time. The movement becomes quieter around Yeshi, where the portrait and story become the center of the page.

The gallery then opens the site spatially: real Cafe Mera photography sits at different depths, giving a sense of the cafe without pretending to be a virtual reconstruction. Reviews slow the motion almost to stillness. Finally, the Mera Thread resolves at the Visit section, ideally connecting real entrance photographs so the “hidden gem” becomes easier to find.

At every point:

- the site remains readable
- the photos remain real
- the food remains real
- the owner remains real
- the location remains real
- the 3D exists to make those real things feel more present

That is the target spatial identity for Cafe Mera.
