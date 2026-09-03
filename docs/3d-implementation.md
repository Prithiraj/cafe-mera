# Cafe Mera — 3D Experience Implementation Notes

> **Prototype baseline:** The implementation described here is the current technical proof-of-concept, not the final spatial design. Future 3D work should follow `docs/3d-experience-deep-plan.md` phase by phase, with visual review between phases.

**Implementation status:** Implemented as a progressive enhancement on top of the existing static site.

## What changed

The 3D release follows the original `docs/3d-experience-plan.md` and keeps Cafe Mera's real photography, content, menu, reviews, contact information, and calls to action as normal HTML.

The spatial layer adds:

- one shared fixed Three.js renderer on desktop/tablet
- procedural steam ribbons and aroma particles in the hero
- cup/plate ring geometry that changes state by section
- an abstract tabletop state for the menu
- dish-focused plate emphasis for Ful, Chechebsa, and Kinche
- a quiet halo treatment behind the owner story
- a shallow spatial gallery backdrop plus CSS 3D depth on the real gallery images
- a calm trust/rating state in the review section
- an abstract path that resolves in the Visit section
- subtle real-photo perspective on the hero

No fake food models, invented maps, scroll-jacking, sound, or first-person navigation were added.

## Architecture

```text
index.html
  ├─ script.js                 existing DOM interactions
  ├─ spatial.js                capability checks + lazy boot
  └─ spatial/
      ├─ scene-controller.js   shared renderer + section state machine
      ├─ scene-factory.js      procedural geometry
      ├─ materials.js          warm Cafe Mera materials
      └─ motion.js             damping / opacity helpers
```

`spatial.css` supplies the fixed visual layer, real-photo depth, and the mobile/static visual fallback.

## Progressive enhancement rules

Three.js is not loaded when any of these apply:

- viewport is below 700px
- `prefers-reduced-motion: reduce`
- Save-Data is enabled
- reported device memory is below 4 GB
- WebGL is unavailable

If Three.js or the CDN fails, the original site remains fully usable.

## Performance choices

- single renderer
- pinned Three.js version (`0.181.1`)
- DPR capped at 1.4 desktop / 1.15 tablet
- no post-processing
- no realtime shadows
- no GLTF models
- no WebGL image textures in this phase
- renderer pauses when the document is hidden
- tablet particle count is reduced
- all essential photography stays in optimized DOM images

## Real-photo 3D treatment

The real hero and gallery photographs remain `<img>` elements. On capable devices they receive restrained CSS perspective/depth coordinated with the WebGL scene. This avoids duplicating large photo textures in GPU memory while making the actual Cafe Mera imagery part of the spatial experience.

## Accessibility

- the canvas is `aria-hidden="true"`
- all controls remain semantic DOM controls
- pointer events are disabled on the spatial layer
- reduced-motion users receive no continuous 3D animation
- mobile receives a static lightweight depth cue
- no essential information exists only in WebGL

## Validation checklist

- [x] Real business photos remain dominant.
- [x] One shared renderer is used.
- [x] Menu remains readable HTML.
- [x] Order / directions / phone controls remain DOM controls.
- [x] No scroll-jacking.
- [x] Static failure mode retained.
- [x] Reduced-motion disables continuous WebGL.
- [x] Mobile avoids the full persistent scene.
- [x] No generic 3D cafe models or licensing-dependent assets added.
- [x] Visit scene is abstract, not an invented map.
