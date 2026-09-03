# Cafe Mera — Origami Phase A Implementation

**Status:** Implemented as an isolated motion lab. The production homepage remains unchanged.

**Prototype route:** `/origami-lab.html`

This phase implements the three motion studies defined in `docs/origami-spatial-redesign-plan.md` before any full-site redesign.

## 1. Architectural hero opening

- Uses a real Cafe Mera business-channel photograph.
- Two asymmetric connected surfaces cover the image at the beginning of the motion.
- Normal page scroll drives a restrained part/fold movement.
- The camera/viewer remains stable; the interface moves.
- A brass seam and edge light make the hinge readable without becoming a sci-fi effect.
- No particles, rings, WebGL background, or floating decorative objects.

## 2. Menu folio

- Four physical sheet states: Ethiopian, Breakfast, Lunch, Coffee.
- The menu remains normal semantic HTML.
- Tabs remain keyboard accessible and support arrow-key navigation.
- Previous sheets fold away around a shared hinge.
- Future sheets remain tucked behind the active page.
- Scroll controls the amount of fan/settle; category selection controls the active sheet.

## 3. Connected photographic wall

- Three real Cafe Mera-related photographs are joined by visible brass hinges.
- Scroll unfolds the wall from an accordion-like geometry into a restrained shallow sculpture.
- Hover or keyboard focus settles one panel toward the viewer.
- Panels never become independent floating cards.
- Mobile removes the 3D wall and keeps a simple stacked photographic experience.

## Motion vocabulary

The lab deliberately uses only:

- Fold
- Part
- Overlap
- Tuck
- Aperture
- Settle

There is no ambient movement after a composition has settled.

## Technology

The Phase A lab intentionally uses CSS 3D transforms + small vanilla JavaScript rather than Three.js.

This isolates the physical motion language without introducing renderer/camera complexity. If the language is approved, the production redesign can use the same hinge geometry in DOM/CSS where sufficient and Three.js only where connected meshes, occlusion, lighting, or complex photographic folding materially improve the result.

## Accessibility / fallback

- Semantic content remains readable without animation.
- `prefers-reduced-motion` presents the compositions in an already-open/static state.
- Menu tabs are native buttons with tab semantics and arrow-key navigation.
- Gallery panels are keyboard focusable.
- Mobile switches the gallery to a normal stacked layout.

## Photography / rights

The lab uses current Cafe Mera imagery already present in the project. Business-channel images still require final commercial-rights confirmation. The interior photo is retained as demo/editorial-only unless reuse permission is confirmed.

## Phase A review gate

Review these three questions before any full-site implementation:

1. Does the hero opening feel futuristic and architectural rather than gimmicky?
2. Does the menu folio feel clearer and more premium than the current 3D menu treatment?
3. Does the connected gallery wall feel like one designed object rather than floating cards?

If the answer is yes, the next phase should remove the current production spatial decoration and rebuild the homepage around this hinge/seam language.
