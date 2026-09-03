# Cafe Mera — Origami Spatial Redesign Plan

**Status:** Planning only. Do not implement from this document until the direction is approved.

**Intent:** Replace the current floating-object spatial treatment with a refined, futuristic **kinetic-origami interface** in which the page itself folds, slides, reveals, and recomposes around real Cafe Mera photography and content.

The target is **stunning, classy, warm, and slightly futuristic** — never cold-tech, game-like, or visually confusing.

---

# 1. Why the current 3D direction feels wrong

The present prototype relies on independent spatial objects, rings, particles, photo planes, and background forms. Technically these prove the rendering stack works, but visually they can feel like decorations floating behind the page rather than one coherent experience.

That creates three problems:

1. **The 3D does not explain the page structure.** It appears alongside content instead of becoming the way content is revealed.
2. **Images can feel detached or bug-like.** When photographs float in unrelated depth they look misplaced rather than intentional.
3. **The viewer has no spatial grammar to learn.** Every section introduces another treatment rather than repeating a clear physical logic.

The redesign should remove most decorative 3D and make the **interface itself** spatial.

---

# 2. North-star concept — “Kinetic Fold”

Imagine the website as a beautifully engineered editorial object made from large folded surfaces.

As the user scrolls, these surfaces:

- part like architectural panels
- fold along restrained hinges
- overlap like layered paper
- reveal photographs underneath
- slide past each other on shallow depth tracks
- close behind the viewer so the next composition feels intentional

This is **not literal origami paper** and not literal sliding doors.

The inspiration is closer to:

- kinetic architecture
- precision-folded editorial packaging
- Japanese paper engineering
- museum exhibition panels
- luxury product reveal systems
- quiet futuristic interfaces

The page should feel **architectural rather than object-filled**.

---

# 3. Core principle — move the planes, not the viewer

The camera should remain mostly stable.

The current system uses depth and scene objects to make the viewer feel as if they are moving through a 3D environment. The new system should reverse that relationship:

> **The viewer stays oriented while the interface unfolds around them.**

This is the most important design change.

### Preferred movement hierarchy

1. **Primary:** large interface planes open / close / slide.
2. **Secondary:** real Cafe Mera photos gain slight depth as they are revealed.
3. **Tertiary:** typography and CTAs settle into the revealed space.
4. **Ambient:** tiny material/light changes only.

Avoid continuous decorative animation unless it supports a fold/reveal.

---

# 4. Spatial grammar

The whole site should use a small vocabulary of repeatable moves.

## 4.1 Fold

A large plane rotates 6–22 degrees around one edge.

Use for:

- opening a section
- revealing a photo
- transitioning from text to story

A fold should never rotate 90° like a novelty card unless the specific composition requires it.

## 4.2 Part

Two panels move away from a center seam.

This is the closest analogy to “sliding doors,” but it should remain abstract and elegant.

Use for:

- hero reveal
- gallery reveal
- major section transitions

The panels can also rotate slightly as they part so the action feels like precision-folded architecture rather than flat rectangles sliding sideways.

## 4.3 Overlap

One surface slides over another with a shallow z-offset.

Use for:

- menu categories
- review cards
- photography sequences

## 4.4 Tuck

A panel moves partially behind another and disappears.

Use for:

- ending sections
- returning visual focus to photography
- closing visual chapters

## 4.5 Aperture

A folded composition creates a temporary window through which a real photograph becomes visible.

Use for:

- real food imagery
- Yeshi portrait
- interior imagery

## 4.6 Settle

After every transition, movement stops.

This is essential to the classy feeling.

The website should spend most of its time **still**, with movement occurring mainly around intentional transitions.

---

# 5. The visual object: folded surfaces

Instead of rings, particles, floating cards, and unrelated primitives, the central spatial objects are a small number of **large planes**.

They can be implemented as:

- subdivided Three.js planes
- very shallow extruded planes where edge thickness matters
- DOM panels with CSS 3D transforms for lower tiers
- clip-path / masks when 3D is not necessary

### Surface types

## Cream paper

Warm off-white, slightly textured, soft matte finish.

Represents the editorial / human side of Cafe Mera.

## Cafe green

Deep muted green derived from the cafe interior.

Acts as architectural structure and visual anchor.

## Clay

Warm reddish-brown used sparingly for hinge edges, CTA reveals, and food transitions.

## Brass line

A very thin metallic/warm accent defining folds or seams.

Not glowing. Not neon.

## Photography plane

Always real Cafe Mera imagery when depicting the business.

The photograph should sit **inside** the folded system, not float independently in empty 3D space.

---

# 6. Futuristic without becoming cold

The futurism should come from **precision, choreography, geometry, and material behavior** — not from common sci-fi visual language.

Avoid:

- neon
- holograms
- glassmorphism everywhere
- chromatic aberration
- particle clouds
- wireframe grids
- HUD elements
- glowing edges
- sci-fi sounds
- blue-purple gradients

Use instead:

- impossible-clean folds
- precise seams
- soft directional light
- shallow dimensionality
- hidden/revealed surfaces
- elegant asymmetry
- disciplined typography
- subtle reflective edge behavior

The result should feel like a beautiful object designed five years ahead, not a futuristic video game.

---

# 7. Scroll choreography model

Normal browser scrolling remains untouched.

Each major section has three states:

1. **Approach** — previous composition begins closing.
2. **Reveal** — panels unfold/part to expose the next content.
3. **Rest** — composition becomes nearly static for reading/interacting.

Do not continuously map every scroll pixel to every object.

Prefer smooth interpolation around defined transition zones.

### Example

```text
scroll
 ↓
previous section rest
 ↓
closing fold begins
 ↓
center seam appears
 ↓
two panels part + rotate 8°
 ↓
real photo is revealed
 ↓
text settles
 ↓
all motion stops
```

The user should always understand what is happening spatially.

---

# 8. Section-by-section redesign

# 8.1 Hero — “The first opening”

The hero establishes the full spatial grammar.

### Initial state

The page opens with a composed surface, not an empty WebGL background.

Suggested arrangement:

```text
┌───────────────────────────────────┐
│ text surface │ center seam │ fold │
│              │             │      │
│ headline     │             │      │
│ CTA          │             │      │
└───────────────────────────────────┘
```

A subtle seam implies that the composition can open.

### Reveal

As the user first scrolls:

- right-side plane pivots back ~10–14°
- image plane underneath becomes visible
- second panel slides slightly outward
- hero real photo appears as the “inside” of the fold
- typography remains stable rather than flying away

### Photo depth

Only slight depth treatment:

- image itself stays planar
- optional 2–3 layer parallax inside photo frame
- no obvious displacement warp

### Atmosphere

A single thin Mera line can trace the panel seam.

No floating rings.

No particle field.

### Goal

The first thought should be:

> “This website opens beautifully.”

Not:

> “There is a Three.js scene behind the website.”

---

# 8.2 Value proposition — “The fold becomes a spread”

Hero panels settle into a broad editorial spread.

One large cream plane and one shallow green plane overlap like an architectural book spread.

The copy sits in the calm negative space.

Transition should be quiet.

No new 3D object is introduced.

---

# 8.3 Menu — “Layered menu folio”

This should no longer look like a virtual tabletop.

Instead, imagine a set of premium menu sheets that slide and fold over one another.

### Structure

- one large base plane
- 3–4 category sheets
- active category sheet moves forward
- inactive sheets tuck behind
- thin edge lighting defines depth

The HTML menu remains readable above/in coordination with the visual sheets.

### Filter interaction

When a user changes category:

1. current sheet slides 20–40px equivalent and folds slightly away
2. next sheet emerges from behind
3. category label remains stable
4. menu rows update normally

This creates a tangible interaction without fake dishes.

### Food photography

When approved photography exists, one image can appear as an inset aperture within the active sheet.

---

# 8.4 Ethiopian breakfast — “Three folded portraits”

Ful, Chechebsa, and Kinche should become three elegant visual chapters.

Not three floating stations.

### Composition

Each dish is represented by a large folded panel pair:

```text
[ description panel ]  /fold/  [ real dish image ]
```

As each dish enters focus:

- previous image panel closes/tucks
- next pair unfolds
- Mera seam travels to the next hinge

The three chapters feel related because they use the same folding mechanism.

### Current asset limitation

Until real dish photography is available:

- keep the photographic aperture empty/abstract
- use cream/clay generated material treatment
- never generate photorealistic fake food

### Future visual peak

With matched real dish photos, this can become the strongest sequence on the site.

---

# 8.5 Yeshi story — “Unfold to the human center”

This section should stop feeling technological.

A single folded panel opens like a protected inner page and reveals Yeshi’s real portrait.

The fold acts as a framing device rather than decoration.

### Motion

- one controlled opening
- no parallax on face
- no particles
- no looping animation

### Visual feel

Quiet, warm, intimate.

This is the emotional center of the experience.

---

# 8.6 Space / interior — “Architectural reveal”

A large horizontal fold opens into the real Cafe Mera interior photograph.

This is one place where the sliding-door analogy can be strongest.

Two panels part diagonally rather than horizontally.

One panel moves left/back.
One panel moves right/front slightly.

The interior photo becomes the space between them.

The effect should resemble a gallery installation opening, not an automatic door.

---

# 8.7 Reviews — “Close the mechanism”

The folds simplify into one calm, nearly flat surface.

The site intentionally stops moving.

The 4.9 rating and quotes dominate.

This creates contrast: the futuristic mechanics become almost invisible when trust content needs attention.

---

# 8.8 Gallery — “Origami wall”

The current floating-image approach should be removed.

Instead, photos belong to one connected folding wall.

### Desktop composition

Imagine 4 photographic panels sharing edges:

```text
    / photo /
--- hinge --------
 photo | photo
------ hinge -----
       photo /
```

The wall can slowly reconfigure as the user enters the section.

Individual photos should not float independently.

### Interaction

Focus/hover on one image:

- adjacent fold angles flatten slightly
- chosen image faces viewer more directly
- neighboring panels remain physically connected

This makes it feel like one sculpture rather than four cards.

### Mobile

No complex fold wall.

Use a simple editorial stack with clip-path fold corners and short reveal transitions.

---

# 8.9 Visit — “Final opening / arrival”

The final spatial chapter should feel like arrival.

Two large surfaces slowly open to reveal the location/contact card.

The Mera seam resolves into a thin line underneath the address/CTA.

Once open, everything stops.

No route animation unless real verified wayfinding imagery becomes available.

### Future real-wayfinding version

Real entrance images could later be revealed sequentially behind folding panels:

```text
building → entrance → hallway → Cafe Mera door
```

That would preserve the origami language while solving a real customer problem.

---

# 9. The Mera line — redefined

The Mera Thread should become much more restrained.

Its new role:

**It is the seam / hinge line of the folded architecture.**

This is far more coherent than using it as an independent floating spline.

It appears as:

- hero seam
- fold edge
- menu sheet edge
- dish-panel hinge
- gallery wall fold
- final underline/destination seam

It does not need to be continuously visible.

Sometimes the seam disappears completely.

---

# 10. Generated imagery strategy for this direction

Generated assets are still useful, but they should support **materials and architectural set design**, not create more objects.

Best generated assets:

- premium warm paper texture
- ceramic-matte texture
- folded-edge shadow maps
- soft light cookies
- subtle brushed brass edge texture
- abstract clay/plaster surfaces
- fold-line masks
- ambient paper grain

Potential concept-only generation:

- mood frames of the hero opening system
- menu folio states
- Ethiopian breakfast fold compositions
- gallery folding wall

Avoid generating:

- fake Cafe Mera food
- fake interior
- fake customers
- fake entrance/location imagery

---

# 11. Three.js / DOM division of responsibility

A large part of this new system may not need to be WebGL.

That is a feature, not a limitation.

### Use CSS/DOM for

- typography
- menu sheets
- simple folds
- buttons
- content panels
- low-tier/mobile transitions

### Use Three.js for

- complex connected fold surfaces
- true perspective / occlusion
- photographic fold wall
- high-tier hero composition
- controlled depth lighting
- material edge behavior

The user should never be able to tell which layer is DOM and which layer is WebGL.

---

# 12. Geometry model

Use a very small number of meshes.

Most scenes should have 2–6 visible planes.

Each plane has:

- origin hinge
- current rotation
- target rotation
- current x/y/z offset
- material
- optional image texture

Avoid primitive decoration entirely unless it is a structural edge/seam.

### Fold angle ranges

- subtle: 4–8°
- standard: 8–16°
- strong reveal: 16–26°

Anything beyond ~30° should be rare.

The elegance comes from restraint.

---

# 13. Lighting

Lighting is crucial because folds need readable form without looking theatrical.

### Lighting model

- broad warm key from upper-left
- soft neutral fill
- low-intensity green/cream environment bounce
- restrained contact shadows at fold intersections

No dramatic hard spotlights.

No colored sci-fi lights.

The shadows should make the page feel physical but still bright enough for a daytime cafe.

---

# 14. Motion system

Use four motion verbs only:

## Open

Panel rotates and shifts outward.

## Close

Reverse of open.

## Slide

Panel moves shallowly along its own surface plane.

## Settle

Movement decelerates and stops completely.

### Timing

- micro slide: 220–320ms
- panel fold: 550–900ms
- major section reveal: 700–1200ms
- rest state: indefinite

No bouncing.
No elastic spring overshoot.
No endless drifting.

Use ease curves resembling precision mechanical movement with soft damping.

---

# 15. Scroll model

Do not use hard scroll-jacking.

But the page can have **transition zones**.

Each major transition uses local section progress approximately like:

```text
0.00–0.20  previous composition remains stable
0.20–0.45  previous panels begin closing
0.45–0.70  new panels open
0.70–1.00  new composition rests
```

This creates choreography without making scrolling feel controlled by the website.

The exact ranges should be tuned visually, not treated as fixed constants.

---

# 16. Responsive strategy

## Desktop

Full kinetic origami system.

- real perspective folds
- connected surfaces
- photographic apertures
- shallow lighting

## Tablet

Simplified folds.

- fewer simultaneously moving surfaces
- lower fold angles
- no continuous 3D rendering after settle

## Mobile

Do not shrink desktop 3D.

Use a distinct 2D/2.5D interpretation:

- clip-path corners
- cards reveal from behind other cards
- vertical panel slides
- tiny rotateY / rotateX where safe
- real photos full width

The mobile experience should still clearly inherit the origami language.

---

# 17. Reduced motion

Reduced-motion mode should preserve the **folded composition** without performing the fold.

Show final rest states directly.

No continuous interpolation.
No pointer parallax.
No animated panel opening.

The user still sees the elegant layered architecture as a static layout.

---

# 18. What should be removed from the current implementation

The next implementation should aggressively remove elements that belong to the previous visual direction.

Remove or disable by default:

- floating rings
- floating particle fields
- independent gallery planes
- background objects not physically connected to content
- generic plate primitives that look like decorations
- persistent camera drift
- unnecessary hero photo duplication
- any image treatment that looks detached from the DOM image

Keep only reusable infrastructure:

- capability/quality tiers
- shared renderer lifecycle
- demand rendering
- scene-state system
- asset loading
- accessibility fallback
- debug mode

The new visual language should be built almost from scratch on top of that infrastructure.

---

# 19. Implementation phases

## Phase A — Visual prototype only

Build three isolated transition prototypes before touching the full site:

1. Hero two-panel opening.
2. Menu sheet fold/replace.
3. Gallery connected fold wall.

Use placeholder neutral surfaces plus one real Cafe Mera photo.

### Gate

Approve the physical language before integrating any section.

---

## Phase B — Hero + global fold system

Implement:

- hinge abstraction
- panel component
- seam/Mera line
- hero choreography
- rest states
- responsive fallback

### Gate

Hero must already feel futuristic + warm + premium without any other section finished.

---

## Phase C — Menu + Ethiopian breakfast

Implement:

- layered menu folio
- category transitions
- three dish chapter folds

No new decorative 3D.

---

## Phase D — Human + interior

Implement:

- Yeshi reveal
- interior architectural reveal

This phase validates whether the system can become quiet/emotional rather than constantly mechanical.

---

## Phase E — Gallery + Reviews

Implement:

- connected origami wall
- image focus behavior
- transition into still review surface

---

## Phase F — Visit + final continuity

Implement:

- arrival reveal
- final CTA composition
- future-ready wayfinding aperture system

---

## Phase G — Polish / QA

Tune:

- fold angles
- transitions
- seam alignment
- lighting
- material texture strength
- frame pacing
- accessibility
- mobile
- reduced motion

Remove anything that does not feel necessary.

---

# 20. Prototype acceptance criteria

The redesign should not proceed past Phase A unless all of these are true:

- [ ] The interface feels like one kinetic object, not separate effects.
- [ ] The user always understands which content is being revealed.
- [ ] Photography looks intentionally framed, never like a floating bug.
- [ ] Motion is mostly transitional, not continuous.
- [ ] The camera remains stable enough that the page is easy to read.
- [ ] The futuristic character comes from precision and geometry, not sci-fi decoration.
- [ ] Cafe Mera still feels warm, human, and approachable.
- [ ] Order/Menu/Directions remain more visually important than the mechanics.
- [ ] The experience remains attractive when completely still.

---

# 21. Final target experience

A visitor lands on a calm, beautifully composed surface. A barely visible seam suggests depth.

As they scroll, the page opens — not with a dramatic camera move, but with two precise surfaces parting and folding just enough to reveal a real Cafe Mera photograph inside.

The next section does not introduce new floating graphics. Instead, the same surfaces flatten, overlap, and become the menu folio. Menu categories emerge from behind one another like precision-cut sheets.

The Ethiopian breakfast story unfolds one dish at a time. Each chapter opens a new photographic aperture. Yeshi’s story then simplifies the system to a single warm fold around her real portrait.

The interior section opens architecturally. The gallery becomes one connected folding wall of real photographs, not a collection of independent cards. Then the entire mechanism quiets for reviews.

Finally, two broad surfaces open and settle around the address, Order, Call, and Directions actions. The visual system stops moving.

The site should feel like **a warm cafe expressed through futuristic paper architecture**.

That is the new design target.