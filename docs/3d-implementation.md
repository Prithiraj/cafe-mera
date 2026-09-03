# Cafe Mera — Spatial Implementation Notes

**Specification:** [`docs/3d-experience-master-plan.md`](./3d-experience-master-plan.md)

**Status:** Deep master-plan pass implemented for the capabilities that can be built responsibly with the current public/owner-site assets. Features that require new verified photography or captured 3D assets remain explicitly deferred.

## What changed from the technical prototype

The earlier prototype used a monolithic controller with generic rings, plates, particles, and section opacity states. That proved the WebGL integration but was not intended as the final art direction.

The master-plan implementation now introduces:

- capability detection and explicit spatial quality tiers
- development flags (`?spatial=off`, `tier1`, `tier2`, `tier3`, `?spatialDebug=1`)
- one shared WebGLRenderer
- demand-based rendering outside continuously animated moments
- a persistent morphing **Mera Thread** connecting all page states
- runtime-generated paper, ceramic, plaster, shadow, particle, and haze textures
- a real-photo hero WebGL echo/diorama at Tier 3 while the real DOM image remains primary
- an abstract physical menu table synchronized with existing menu filters
- three Ethiopian-breakfast spatial stations without fake food photography
- a deliberately quiet owner-story halo treatment
- a restrained trust/review state
- a shallow spatial gallery wall that loads real Cafe Mera/site photography when texture loading succeeds
- an abstract Visit resolution that never pretends to be a real route
- CSS-only spatial treatment for constrained/mobile tiers
- an asset register documenting real/generated/demo status

## Current architecture

```text
script.js
  └─ spatial.js
      ├─ capabilities.js
      ├─ quality.js
      └─ scene-controller.js
          ├─ assets.js
          ├─ camera-rig.js
          ├─ scene-states.js
          ├─ mera-thread.js
          ├─ photo-diorama.js
          ├─ menu-table.js
          ├─ dish-sequence.js
          ├─ story-scene.js
          ├─ trust-scene.js
          ├─ gallery-wall.js
          ├─ visit-scene.js
          ├─ textures.js
          ├─ materials.js
          ├─ motion.js
          └─ debug.js
```

## Spatial tiers

### Tier 0 — static

Used when spatial is explicitly disabled or a full fallback is required.

### Tier 1 — CSS spatial

Used for reduced motion, narrow screens, Save-Data/constrained hardware, or forced Tier 1.

No persistent WebGL renderer.

### Tier 2 — core Three.js

Procedural Mera Thread, generated textures, menu table, dish stations, story/gallery/Visit framing.

No WebGL photo textures required.

### Tier 3 — spatial photography

Adds real-photo texture loading for the hero echo and gallery wall when browser/CORS/asset availability permits.

Every texture failure falls back to procedural surfaces; the DOM photo remains present.

## Demand rendering

The renderer does not intentionally run forever in every section.

Frames continue when:

- hero or breakfast state requests continuous atmospheric motion
- a scene transition is still settling
- pointer movement changes the hero/gallery depth
- menu/dish/gallery focus changes
- the Mera Thread is morphing
- a delayed photo texture arrives

Otherwise the animation loop is allowed to stop until the next invalidation.

The loop always pauses when the page is hidden.

## Generated assets

Generated production textures are created at runtime using CanvasTexture rather than stored as large image files:

- paper
- ceramic
- plaster
- aroma/dust sprite
- contact shadow
- steam/haze alpha

These are Class B atmospheric assets under the master plan. They make no factual claim about Cafe Mera.

See [`docs/asset-register.md`](./asset-register.md).

## Real-photo strategy

The real DOM photography remains the primary factual layer.

At Tier 3 the renderer attempts to load the same current real image URLs as low-opacity spatial texture planes. If CORS or remote loading fails, the WebGL photo layer is simply omitted.

The spatial system does not hide, replace, or delay the original DOM image.

## Deferred because the required truth assets do not yet exist

These master-plan items are **not fabricated**:

- cleaned real hero depth map and true depth-displaced hero
- matched real Ful/Chechebsa/Kinche image stations
- photographic entrance/hallway wayfinding
- verified floor/entrance route
- Cafe Mera-specific photogrammetry object
- real 360-degree cafe panorama

They can be added without changing the architecture once the appropriate owner-approved assets exist.

## Accessibility and failure behavior

- canvas is decorative and `aria-hidden`
- pointer events never land on WebGL
- all business controls remain DOM controls
- reduced-motion avoids persistent WebGL
- mobile/constrained devices get a deliberate CSS spatial treatment
- WebGL context loss removes the ready state and falls back to static content
- real images, menu, reviews, hours, phone, order, and directions work independently of the spatial system

## Performance choices

- single renderer
- DPR cap by tier
- no post-processing
- no realtime shadows
- no GLTF/model downloads
- low-poly procedural geometry
- generated textures are tiny CanvasTextures
- gallery textures lazy-load near the gallery
- photo texture use is Tier 3 only
- rendering stops when no continuous/transition work is required

## Production-rights reminder

The existing Cafe Mera/Wix imagery should receive explicit owner reuse approval for a commercial final site. The current Joe Coffee/R2 interior image remains demo/editorial unless separately licensed or confirmed.
