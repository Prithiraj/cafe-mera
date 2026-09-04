# Cafe Mera

Conversion-focused, static-first website for **Cafe Mera** in Aurora, Colorado.

- Live target: https://prithiraj.github.io/cafe-mera/
- Design/research plan: [`docs/design-plan.md`](docs/design-plan.md)
- Stack: semantic HTML, CSS, small vanilla ES module, optional Three.js progressive enhancement
- Deployment: GitHub Pages via `.github/workflows/pages.yml`

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Content / image provenance

The implementation deliberately distinguishes business-controlled source material from review/editorial material.

- `IMG_4489.jpg`, `IMG_4401.JPG`, and the Yeshi portrait (`IMG_4409.JPG`) are referenced from Cafe Mera's existing Wix site. They are treated as **business-channel images**, but the business should still confirm it owns or has commercial reuse rights before a production-domain launch.
- The interior image hosted by Joe Coffee is an **actual Cafe Mera photo but editorial/demo-only**. Replace it with an owner-supplied/licensed original before commercial launch unless reuse permission is confirmed.
- Review excerpts are short excerpts from public Google reviews surfaced by current restaurant listings. Verify the source review and attribution immediately before commercial launch.

The GitHub Pages deployment is therefore suitable as a public implementation preview; image rights should be signed off before treating it as Cafe Mera's official commercial website.
