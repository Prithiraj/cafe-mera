# Cafe Mera — Spatial Asset Register

This register supports `docs/3d-experience-master-plan.md`.

## Current factual/business imagery

| Asset | Current use | Class | Rights status for commercial production | Spatial use |
| --- | --- | --- | --- | --- |
| Cafe Mera hero image referenced in `index.html` from the existing Cafe Mera Wix media host | Hero | A — real/factual | **Needs explicit owner reuse confirmation** | DOM hero; Tier 3 may load a low-opacity WebGL echo if CORS permits |
| Yeshi portrait referenced from the existing Cafe Mera Wix media host | Owner story | A — real/factual | **Needs explicit owner reuse confirmation** | Remains DOM-first; 3D frames/halo only |
| Cafe interior image referenced from the Joe Coffee/R2 source | Space section | A — real/factual | **Demo/editorial only unless licensed/confirmed** | DOM image; Tier 3 gallery load may use it only as the current demo asset |
| Existing gallery images referenced in `index.html` | Gallery | A — real/factual | Verify individually before commercial launch | DOM gallery; Tier 3 attempts low-resolution WebGL texture loading |

## Generated production assets

The current master implementation generates these **at runtime** with CanvasTexture; no generated bitmap files are stored in the repository.

| Asset | Class | Purpose | Factual claim? |
| --- | --- | --- | --- |
| Paper fiber texture | B — generated atmospheric | Menu/story/gallery matte surfaces | No |
| Ceramic micro-texture | B — generated atmospheric | Abstract plate/cup geometry | No |
| Plaster texture | B — generated atmospheric | Editorial gallery/table surfaces | No |
| Particle sprite | B — generated atmospheric | Aroma/dust field | No |
| Soft contact-shadow texture | B — generated atmospheric | Depth/contact cues | No |
| Steam/haze alpha texture | B — generated atmospheric | Organic haze and depth | No |

## Generated concept-only policy

No Class D factual-looking generated imagery is currently used in production.

If future concept exploration produces photorealistic synthetic food, interiors, people, storefronts, or wayfinding imagery, it must be labeled **CONCEPT ONLY — NOT FACTUAL PRODUCTION IMAGERY** and must not ship as a representation of Cafe Mera.

## Missing high-value real assets

The following remain the highest-priority capture requests:

1. Dedicated hero photograph with strong foreground/midground/background depth.
2. Matched Ful, Chechebsa, and Kinche photographs.
3. Owner-approved wide interior photograph.
4. Building exterior and correct entrance photographs.
5. Hallway/lobby cue and Cafe Mera door/sign photographs for verified wayfinding.
6. Distinctive Cafe Mera cup/serving object if future photogrammetry is desired.
