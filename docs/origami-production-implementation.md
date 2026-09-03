# Cafe Mera — Kinetic Fold Production Implementation

**Status:** Implemented on the production homepage.

This document records the completed integration of the origami / kinetic-fold design language into the actual Cafe Mera website.

## What changed

The previous floating spatial treatment has been removed from the production composition. The homepage no longer boots `spatial.js` or references `spatial.css`.

The finished experience now treats the page itself as the dimensional object.

### Hero

- asymmetric hinged leaves
- brass seam
- real Cafe Mera photograph revealed behind the leaves
- stable viewer perspective
- scroll-driven opening with no camera drift

### Value proposition

- broad architectural planes open away from the content
- text remains normal semantic HTML
- fold movement is quiet and secondary

### Menu

- four-sheet folio: Ethiopian, Breakfast, Lunch, Coffee
- the existing menu content remains readable HTML
- tabs control which sheet becomes active
- keyboard arrows, Home, and End navigate the folio
- inactive sheets remain visual layers but are hidden from assistive technology

### Ethiopian breakfast

- Ful, Chechebsa, and Kinche are presented as three connected chapters
- each chapter uses a hinged material plane rather than fake food imagery
- the most visible chapter becomes spatially active
- no ingredients beyond the verified descriptions are invented

### Owner story

- Yeshi's real portrait is revealed through a restrained two-panel aperture
- no facial distortion or generated portrait imagery
- movement becomes quieter in this section

### Cafe space

- real Cafe Mera interior imagery is revealed by diagonally parting architectural planes
- the motion is intentionally suggestive of sliding architecture without literally mimicking doors

### Reviews

- the spatial system nearly disappears
- the 4.9 rating and review excerpts become the dominant elements
- this section is intentionally still

### Gallery

- real Cafe Mera imagery is presented as one connected hinged wall
- images are not independent floating cards
- focus/hover gently flattens the selected panel
- mobile collapses the wall into a normal stacked gallery

### Visit

- the final composition opens around the address and conversion actions
- Order, Directions, and Call remain ordinary DOM links
- motion resolves into a settled final state instead of looping

## Motion vocabulary

The production motion system uses a small vocabulary:

- **Fold** — rotate around a structural edge
- **Part** — opposing surfaces create an aperture
- **Tuck** — menu sheets move behind the active layer
- **Reveal** — real photography appears behind surfaces
- **Settle** — motion decelerates and stops

The camera/viewer remains stable throughout.

## Removed from the previous production design

- floating rings
- particles
- abstract background objects
- persistent camera drift
- detached image planes
- decorative WebGL plate forms
- global Three.js background scene

The legacy spatial files remain in the repository for historical reference but are not loaded by the production homepage.

## Accessibility

- semantic HTML remains authoritative
- no essential information exists only in transformed surfaces
- `prefers-reduced-motion` receives a settled/static composition
- mobile uses simplified transforms and normal stacked content
- menu tabs are keyboard navigable
- gallery panels are focusable and receive the same emphasis as hover
- Order, Directions, Call, navigation, and menu content remain standard controls/content

## Production imagery

The site still includes business-channel imagery from Cafe Mera's existing Wix presence and one real interior image from a third-party/editorial source. Commercial reuse rights should be confirmed before treating this preview as Cafe Mera's official production-domain website.

## Validation

The repository workflow checks:

- JavaScript syntax
- local legacy module integrity
- required origami lab assets
- required production fold landmarks
- production homepage does not reference `spatial.css`
- production script does not boot `spatial.js`

## Review route

The earlier isolated motion lab remains available at:

`/origami-lab.html`

The root page `/` is now the complete production integration.
