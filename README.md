# Cafe Mera

Conversion-focused, static-first website for **Cafe Mera** in Aurora, Colorado, built around a kinetic-fold / origami-inspired editorial motion system.

- Live target: https://prithiraj.github.io/cafe-mera/
- Business design/research plan: [`docs/design-plan.md`](docs/design-plan.md)
- Spatial master plan: [`docs/3d-experience-master-plan.md`](docs/3d-experience-master-plan.md)
- Origami redesign plan: [`docs/origami-spatial-redesign-plan.md`](docs/origami-spatial-redesign-plan.md)
- Finished production implementation: [`docs/origami-production-implementation.md`](docs/origami-production-implementation.md)
- Phase A motion lab: [`origami-lab.html`](origami-lab.html)
- Asset/rights register: [`docs/asset-register.md`](docs/asset-register.md)
- Stack: semantic HTML, CSS 3D transforms, small vanilla JavaScript, static GitHub Pages deployment

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Production motion system

The production homepage no longer boots the earlier floating Three.js background scene. Instead, the page itself becomes the spatial object:

- hinged hero aperture
- layered menu folio
- Ethiopian breakfast chapters
- restrained Yeshi portrait reveal
- diagonal interior opening
- connected photographic gallery wall
- still review section
- final Visit/CTA aperture

The camera/viewer remains stable. Motion is based on **Fold → Part → Tuck → Reveal → Settle**.

The legacy `spatial/` modules remain in the repository for historical reference and experimentation but are not loaded by the production homepage.

## Accessibility / fallback

- essential content stays in semantic HTML
- `prefers-reduced-motion` receives settled/static compositions
- mobile collapses complex structures into practical stacked layouts
- menu tabs support keyboard navigation
- gallery focus matches hover emphasis
- Order, Directions, Call, navigation, reviews, and business information never depend on motion

## Content / image provenance

The implementation deliberately distinguishes business-controlled source material from review/editorial material.

- Cafe Mera/Wix imagery is treated as **business-channel imagery**, but the business should still confirm ownership/commercial reuse rights before an official production-domain launch.
- The interior image hosted by Joe Coffee/R2 is an **actual Cafe Mera photo but editorial/demo-only** unless reuse permission is confirmed.
- Review excerpts should be verified against their original source immediately before commercial launch.
- Abstract fold surfaces and textures are decorative/editorial only; they are not used to fabricate Cafe Mera food, people, interior, storefront, or directions.

The GitHub Pages deployment is suitable as a public implementation preview; image rights should be signed off before treating it as Cafe Mera's official commercial website.
