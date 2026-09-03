# Cafe Mera

Conversion-focused, static-first website for **Cafe Mera** in Aurora, Colorado, with a progressive spatial/Three.js experience.

- Live target: https://prithiraj.github.io/cafe-mera/
- Business design/research plan: [`docs/design-plan.md`](docs/design-plan.md)
- Spatial master plan: [`docs/3d-experience-master-plan.md`](docs/3d-experience-master-plan.md)
- Spatial implementation notes: [`docs/3d-implementation.md`](docs/3d-implementation.md)
- Asset/rights register: [`docs/asset-register.md`](docs/asset-register.md)
- Stack: semantic HTML, CSS, vanilla ES modules, optional Three.js progressive enhancement
- Deployment: GitHub Pages via `.github/workflows/pages.yml`

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Spatial development flags

Useful local/query flags:

```text
?spatial=off
?spatial=tier1
?spatial=tier2
?spatial=tier3
?spatialDebug=1
```

The spatial layer is never required for ordering, menu access, directions, phone, reviews, or business information.

## Content / image provenance

The implementation deliberately distinguishes business-controlled source material from review/editorial material.

- Cafe Mera/Wix imagery is treated as **business-channel imagery**, but the business should still confirm ownership/commercial reuse rights before an official production-domain launch.
- The interior image hosted by Joe Coffee/R2 is an **actual Cafe Mera photo but editorial/demo-only** unless reuse permission is confirmed.
- Review excerpts should be verified against their original source immediately before commercial launch.
- Generated spatial textures are atmospheric/procedural only; they are not used to fabricate Cafe Mera food, people, interior, storefront, or directions.

The GitHub Pages deployment is suitable as a public implementation preview; image rights should be signed off before treating it as Cafe Mera's official commercial website.
