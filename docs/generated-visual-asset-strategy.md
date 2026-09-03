# Cafe Mera — Generated Visual Asset Strategy

**Status:** Planning companion to `docs/3d-experience-deep-plan.md`.

Generated imagery is explicitly permitted as part of the spatial art direction, provided it strengthens the 3D experience without misrepresenting Cafe Mera's actual food, people, interior, location, products, or services.

The rule is:

> **Generated imagery may create atmosphere, depth, abstraction, transitions, and visual language. Real Cafe Mera imagery remains the evidence layer.**

---

## 1. Why generated imagery is useful here

The 3D experience does not need to be limited to photographs plus primitive geometry. Generated visual assets can help bridge the gap between those two worlds.

They are especially useful for:

- atmospheric depth layers
- spatial transition plates
- abstract coffee/aroma imagery
- paper and textile-like surfaces
- background environment extensions
- soft lighting/caustic textures
- masks and compositional overlays
- concept frames before implementation
- stylized photo-support layers
- 2.5D diorama components where the synthetic layer is clearly non-factual

The aim is not to make the site look AI-generated. Generated assets should be almost invisible as a category; they should simply make the final art direction feel richer and more intentional.

---

# 2. Asset truth model

Every visual asset should belong to one of four classes.

## Class A — Real / factual

Actual Cafe Mera imagery.

Examples:

- Yeshi portrait
- actual Cafe Mera interior
- actual Ful / Chechebsa / Kinche
- actual coffee or serving ware
- actual signage
- actual exterior and entrance

Use these whenever the image communicates a factual claim about the business.

## Class B — Generated atmospheric

Synthetic visual material that does not claim to depict a real Cafe Mera object or place.

Examples:

- abstract steam fields
- paper fibers
- warm light gradients
- soft shadow maps
- bokeh
- dust / aroma textures
- abstract ceramic contours
- stylized background layers

These are safe candidates for broad production use because they are decorative rather than factual.

## Class C — Generated interpretive

Synthetic imagery inspired by a real Cafe Mera concept but not presented as documentary photography.

Examples:

- an illustrated abstraction of coffee steam becoming a plate contour
- a stylized editorial collage built around a real dish photo
- a generated clay/paper environment behind a real Cafe Mera image
- a dreamlike spatial transition between menu and story

These should be visibly art-directed rather than photorealistic enough to be mistaken for the real cafe.

## Class D — Generated factual-looking

Photorealistic synthetic imagery that could reasonably be mistaken for a real Cafe Mera dish, person, room, exterior, or business feature.

Avoid this class for the production site.

Examples to avoid:

- generated photo of "Cafe Mera interior"
- generated photo of Yeshi
- generated Ful presented as the real dish
- generated storefront or hallway
- generated parking directions

If generated factual-looking imagery is used during design exploration, label it **CONCEPT ONLY — not production factual imagery**.

---

# 3. Phase-by-phase generated asset opportunities

## Phase 0 — Art direction and concept frames

This is where generation has the highest leverage.

Generate several visual concept frames for:

1. Hero photographic diorama
2. Mera Thread visual language
3. Ethiopian breakfast dimensional sequence
4. Spatial gallery wall
5. Visit / hidden-gem resolution

These concept frames can be deliberately exaggerated so we can choose the right spatial language before investing in code.

### Goal

Use generated images as **visual prototypes**, not production truth.

### Deliverables

- 3–5 hero mood frames
- 2–3 Mera Thread motif explorations
- 3 dish-sequence concept frames
- 2 gallery treatments
- 2 visit-section concepts

The chosen concepts become visual references for Three.js implementation.

---

## Phase 1 — Spatial foundation

Generation can supply lightweight texture assets for the renderer.

Possible assets:

- paper grain texture
- ceramic micro-texture
- matte plaster texture
- warm light-cookie texture
- subtle dust / particle sprite
- irregular alpha mask for steam
- soft radial shadow textures

### Design rule

These textures should be low-contrast and physically plausible. If the viewer notices the texture itself before the content, it is too strong.

### Performance rule

Prefer small, tileable or low-resolution textures where possible. Atmospheric textures should not become multi-megabyte hero assets.

---

# 4. Hero opportunities

The hero can combine **real photography + generated spatial atmosphere**.

## 4.1 Generated environment extension

A real Cafe Mera hero photo can sit inside a broader generated editorial environment.

Example composition:

```text
synthetic warm-paper / clay field
        ↓
abstract ceramic ring
        ↓
REAL Cafe Mera hero photo
        ↓
procedural/generated steam layer
        ↓
DOM headline + Order CTA
```

The generated environment does not pretend to extend the real cafe architecture. It functions like editorial set design.

## 4.2 Generated foreground occluders

Create soft abstract foreground shapes such as:

- ceramic arcs
- paper cutouts
- translucent steam forms
- plant-like blurred silhouettes

These can move at slightly different z-depths to strengthen the parallax effect around the real photo.

Do not generate a fake foreground table, chair, cup, or dish and imply it belongs to Cafe Mera.

## 4.3 Generated steam textures

Instead of purely geometric Three.js lines, combine the procedural Mera Thread with generated alpha textures that have organic edges.

Potential treatment:

- line/tube supplies spatial shape
- transparent generated texture supplies softness
- shader controls fade/taper

This can make the steam feel less mathematically perfect.

---

# 5. Menu / table opportunities

Generated imagery can make the abstract 3D table richer without generating fake food.

## Allowed

- abstract ceramic plate textures
- paper menu textures
- soft table-surface materials
- editorial shadows
- typographic or graphical food-category marks
- stylized ingredient-color fields that are not literal ingredient claims

## Avoid

- generated dish photography in the menu
- generated ingredients not verified in the dish
- photorealistic synthetic food placed next to real item names

Real menu photography always wins when the site needs to show what customers receive.

---

# 6. Ethiopian breakfast sequence

This section can become one of the richest hybrid real/generated experiences.

## Preferred future composition

For each dish:

```text
REAL dish photograph
    +
generated atmospheric halo / paper field
    +
3D plate geometry
    +
Mera Thread
    +
subtle generated steam / spice-like abstract particles
```

The generated layer supports the dish; it does not create the dish.

## Possible visual identities

### Ful

- earthy warm field
- rounded ceramic geometry
- slow concentrated motion

### Chechebsa

- warmer clay/berbere-toned abstraction
- more angular torn-paper contours
- slightly livelier thread shape

### Kinche

- pale grain-like texture field
- soft concentric geometry
- quieter movement

These color/motion associations are art-direction concepts only and should be checked against the real dish photography before production.

---

# 7. Owner story opportunities

Generated imagery should be especially restrained around Yeshi.

Good uses:

- abstract paper halo
- softly generated window-light texture
- subtle warm background extension
- nonliteral coffee-steam arc
- editorial collage edge behind the real portrait

Do not:

- alter Yeshi's face/body
- synthesize a replacement portrait
- add invented business context
- create fake interactions with customers

The emotional power here should come from the real portrait.

---

# 8. Spatial gallery opportunities

Generated assets can help make the gallery feel like a designed environment rather than floating rectangles.

Possible additions:

- abstract wall/surface backdrop
- generated paper edges behind photos
- low-contrast plaster/paint fields inspired by the actual cafe palette
- shadow and light textures
- background atmosphere between planes

The actual gallery frames should still contain real Cafe Mera photography.

### Strong idea

Build a **generated editorial room** rather than a fake Cafe Mera room.

This could be a minimal spatial set made from:

- cream wall plane
- green volume
- clay floor plane
- brass thread
- real Cafe Mera photos suspended within it

Because the environment is clearly graphic/editorial, it does not claim to depict the physical cafe.

---

# 9. Visit / location opportunities

Generation is useful here only for the abstract layer.

Allowed:

- destination glow
- abstract route thread
- editorial building-frame shapes
- generated paper/card backdrop

Not allowed as factual production content:

- synthetic building exterior
- synthetic hallway
- synthetic entrance
- synthetic parking map

The actual wayfinding sequence should use real photographs and verified map/directions information.

---

# 10. Generated depth and parallax support assets

Generation can also help create non-photographic depth layers for 2.5D scenes.

Possible supporting assets:

- foreground haze
- translucent paper plane
- background color field
- soft masked light
- abstract cup-ring silhouettes
- steam silhouettes

These can be separated into planes and positioned at different z-depths.

For **real photographs**, depth maps should ideally be derived from the real photo rather than generated as new pictorial content.

---

# 11. Materials that can benefit from generated textures

## Ceramic

Generate subtle handmade ceramic imperfections:

- speckle
- micro roughness
- faint glazing variation

Use as roughness/color support rather than obvious surface art.

## Paper

Generate:

- warm fiber
- slight edge noise
- print grain

Useful for menu planes and collage frames.

## Plaster / wall

Generate restrained warm wall variation matching the actual cafe palette.

## Steam

Generate grayscale/alpha organic masks rather than full-color assets.

## Light

Generate soft cookies/gobos for directional light rather than expensive realtime complexity.

---

# 12. Generated imagery + shaders

Generated images become more valuable when treated as shader inputs rather than flat pictures.

Potential uses:

- alpha mask
- roughness map
- displacement mask
- noise lookup
- light cookie
- particle sprite
- paper-edge mask

This makes the final experience feel native to 3D rather than like AI art pasted into WebGL.

---

# 13. Concept-generation workflow

For each major scene:

### Step 1 — Start with truth

Select the real Cafe Mera asset or business fact the scene needs to communicate.

### Step 2 — Define the spatial job

Examples:

- create depth
- guide attention
- transition between sections
- create emotional warmth
- explain relationship

### Step 3 — Generate 2–5 deliberately different art-direction frames

Explore dimensions such as:

- editorial vs photographic
- quiet vs immersive
- paper vs ceramic
- abstract vs tactile
- shallow vs deep spatial composition

### Step 4 — Choose one direction

Do not average every concept together.

### Step 5 — Decompose the winning frame

Identify:

- what should remain a real DOM image
- what should become a WebGL texture
- what should become procedural geometry
- what should be CSS
- what should be generated texture

### Step 6 — Build the minimum 3D prototype

Reproduce the visual idea with the fewest moving parts.

### Step 7 — Replace concept-only imagery

Before production, remove any generated factual-looking placeholders and replace them with real approved assets.

---

# 14. Asset labeling inside the repository

Recommended metadata categories:

```text
assets/
  real-approved/
  real-needs-rights/
  generated-production/
  generated-concept-only/
  demo-third-party/
```

Generated production assets should include a simple source note in `docs/asset-register.md` describing:

- purpose
- where it appears
- whether it represents anything factual
- generation/edit history when material
- production approval status

---

# 15. Acceptance criteria for generated imagery

Generated visual assets are successful only if:

- [ ] They make the spatial experience stronger than geometry alone.
- [ ] They do not look like generic AI artwork.
- [ ] Real food photographs remain the factual depiction of dishes.
- [ ] Real Cafe Mera photos remain the factual depiction of the cafe.
- [ ] Yeshi is represented only with real approved photography.
- [ ] Location/wayfinding remains based on real images and verified data.
- [ ] Generated assets are optimized for web use.
- [ ] Synthetic elements have a clear spatial or storytelling purpose.
- [ ] Concept-only factual-looking imagery is clearly identified and replaced before commercial production.
- [ ] Cultural visual motifs are not invented or used decoratively without confidence in their meaning.

---

# 16. Recommended immediate use

Generation should be used **before more 3D coding** to create visual targets for the next phases.

The recommended next deliverable is a small visual exploration pack:

1. **Three hero concepts**
   - real-photo diorama + ceramic forms
   - real-photo diorama + paper collage
   - real-photo diorama + atmospheric steam/light

2. **Three Ethiopian breakfast concepts**
   - plate stations
   - editorial dish portals
   - connected table journey

3. **Two gallery concepts**
   - shallow floating photo wall
   - abstract editorial room containing real photographs

4. **Two Visit concepts**
   - Mera Thread destination
   - real-photo wayfinding sequence framed by spatial graphics

After choosing these visual directions, the Three.js implementation can be much more deliberate and substantially less generic.
