# Cafe Mera — Research-backed website plan

**Implementation status:** approved and implemented from this plan.  
**Business:** Cafe Mera, 3190 S Vaughn Way Ste 110, Aurora, CO 80014.  
**Primary conversion actions:** Order online, get directions, view menu, call.

## 1. Evidence baseline

Evidence used for implementation is limited to current public business data and owner-controlled Cafe Mera channels.

- Current Google business profile: Cafe / Coffee shop / Ethiopian restaurant; 4.9/5 from 88 reviews; typical spend $10–20; Mon–Fri 7am–4pm; phone +1 720-592-0785; 3190 S Vaughn Way Ste 110, Aurora, CO 80014.
- Current Cafe Mera website publishes coffee, breakfast and lunch items including avocado toast, breakfast sandwich, Greek toast, scrambled eggs, traditional Ethiopian breakfast, chechebsa, ful, kinche, Mera burger, turkey club, gyro wrap, chicken kabob wrap, Mediterranean salad, Caesar salad, penne pasta, quinoa bowl, tuna salad sandwich and panini.
- Cafe Mera's Linktree describes the business as locally owned and "proudly serving scratch-made Ethiopian and Greek cuisine."
- Existing Cafe Mera Wix content identifies Yeshi as owner/operator, an Ethiopia native and long-time Colorado resident with 25+ years in hospitality.
- Existing Cafe Mera contact content lists cafemeradenver@gmail.com and states catering is available; customers should contact the cafe for details.
- Customer feedback consistently highlights hospitality, coffee/chai, gyro, Ethiopian breakfast, generous portions and the cafe's calm/clean interior.
- A current visitor review describes the cafe as first-floor inside an office building, straight back from the main entrance and just beyond the elevators on the left.

**Known conflict:** the older Wix contact page still says 7am–5pm, while the current Google profile and newer restaurant listings say 7am–4pm. The implementation uses the current Google profile's 7am–4pm hours.

## 2. Audience

1. Nearby weekday workers, students, residents and visitors looking for breakfast, coffee or lunch.
2. Customers specifically seeking Ethiopian flavors, food or coffee.
3. First-time diners who want approachable choices alongside less familiar dishes.
4. Returning customers who primarily need menu, order, directions, hours or phone.

The first screen must answer: **What is this place? What should I order? How do I find it?**

## 3. Conversion goals

Priority order:

1. **Order online** — linked to Cafe Mera's Google ordering flow.
2. **Get directions** — unusually important because the business sits inside an office building.
3. **View menu** — featured menu on-page plus link to Cafe Mera's current full menu.
4. **Call** — persistent mobile action.
5. Instagram / email / catering inquiry.

Mobile includes a persistent Order / Directions / Call rail.

## 4. Creative direction

**Concept:** *Warmly hidden. Worth finding.*

The site should feel warm, editorial, tactile and contemporary rather than like a generic cafe template. The identity comes from actual Cafe Mera photography, food language, Yeshi's story, strong serif typography and a restrained palette drawn from the interior.

Avoid stock-coffee cliches, faux cultural motifs, card overload, glassmorphism, scroll hijacking and generic “artisan” claims.

## 5. Color system

- Roasted Coffee `#2e211b` — primary ink / dark field.
- Warm Parchment `#f4eee3` — primary background.
- Cream `#fffaf2` — elevated surfaces.
- Cafe Green `#415343` — derived from the visible green interior feature wall.
- Clay `#a25f42` — primary CTA / editorial accent.
- Muted Brass `#b79b67` — secondary highlight.

Colors are implemented as CSS custom properties and used with WCAG contrast in mind.

## 6. Typography

- **Newsreader** — display/editorial serif for hero and section headings.
- **Manrope** — functional sans for navigation, buttons and body copy.

Both load from Google Fonts with system fallbacks. No font files are stored in the repository.

## 7. Image strategy

Real Cafe Mera photography is visually primary.

### Business-channel images

The site references actual images published on Cafe Mera's existing Wix site:

- `IMG_4489.jpg` — primary hero / gallery image.
- `IMG_4401.JPG` — story/gallery image.
- `IMG_4409.JPG` — Yeshi owner portrait.

These are preferable to stock photography, but ownership/reuse permission should still be confirmed before an official commercial-domain launch.

### Demo/editorial image requiring replacement or permission

- Interior photograph currently hosted on Joe Coffee. It is an actual Cafe Mera interior photo, but is **demo/editorial-only** until Cafe Mera supplies the original or reuse permission is confirmed.

### Production preference

Before official commercial launch, request owner-supplied originals for: hero, Ethiopian breakfast, gyro, coffee, interior wide, counter detail, owner/team and building entrance.

## 8. Information architecture

Single-page architecture is appropriate for the current business scope.

1. Header / primary actions
2. Hero
3. Quick business facts
4. Value proposition
5. Featured menu
6. Ethiopian breakfast discovery
7. Yeshi / story
8. Interior / atmosphere
9. Social proof
10. Gallery
11. Visit / how to find / hours / contact / catering
12. Final CTA
13. Footer

## 9. Section-by-section layout

### Header
Text-based Cafe Mera mark; Menu, Our Story, Gallery, Visit; strong Order Online button. Compact mobile navigation with Escape-to-close behavior.

### Hero
Two-column editorial composition with a large real Cafe Mera photo, “A weekday cafe with Ethiopian roots” positioning, Order / Menu actions and current 4.9 / 88-review proof.

### Value proposition
Large serif statement: familiar cafe favorites can sit alongside Ethiopian breakfast. The copy emphasizes discovery without making unfamiliar cuisine feel intimidating.

### Featured menu
Accessible, filterable HTML menu featuring evidence-backed dishes and descriptions. Prices are intentionally omitted because multiple owner/third-party pages show conflicting or changing values. The site links to Cafe Mera's current full menu for current pricing.

### Ethiopian discovery
Editorial cards for Ful, Chechebsa and Kinche. No generic stock imagery; typography carries the section until owner-supplied dish photography is available.

### Story
Actual Yeshi portrait with owner-controlled facts: owner/operator, Ethiopia native, long-time Colorado resident, 25+ years in hospitality.

### Space
Large actual Cafe Mera interior photo, paired with evidence-backed customer motivations: clean, spacious, welcoming, art and plants.

### Social proof
Current 4.9 / 88 Google review metric plus only short real review excerpts. No fake avatars or invented testimonials.

### Gallery
Asymmetric responsive layout combining business-channel images and the clearly documented demo-only interior image.

### Visit
Address, current hours, phone, email, directions CTA, visitor wayfinding tip and evidence-backed catering note.

### Final CTA
High-contrast close: Order Online + Get Directions.

## 10. Three.js / animation plan

Three.js is used only as **progressive enhancement**, never as content replacement.

- A small point-field “aroma” layer sits behind/around the hero photography.
- Three.js is dynamically imported only after page load and only on larger screens.
- It is skipped for `prefers-reduced-motion`, Data Saver, small screens or import/WebGL failure.
- Real photography, layout and all actions remain complete without JavaScript/WebGL.

Other motion is limited to one-time intersection reveals, a compact sticky header and subtle photo hover scale.

## 11. Responsive behavior

Mobile-first behavior:
- 320px+ supported.
- Hero stacks into photo + content without text over complex imagery.
- Touch targets are approximately 44px or larger.
- Menu filter pills horizontally scroll if needed.
- Persistent mobile Order / Directions / Call rail.
- Editorial gallery simplifies without relying on hover.
- Desktop uses asymmetric layouts but readable copy widths remain constrained.

## 12. Accessibility

Target: WCAG 2.2 AA.
- Semantic `header`, `nav`, `main`, `section`, `article`, `address`, `footer`.
- Single H1 and logical heading hierarchy.
- Skip link.
- Keyboard-reachable interactive controls.
- Visible `:focus-visible` states.
- Mobile nav Escape handling and correct `aria-expanded`.
- Menu filters use real buttons and `aria-pressed`.
- Meaningful alt text; decorative canvas is `aria-hidden`.
- Core content remains present with JS disabled.
- `prefers-reduced-motion` disables nonessential motion and the WebGL enhancement.

## 13. Performance

Static-first deployment with no framework or build-time JS dependency.
- Critical hero image uses `fetchpriority="high"`.
- Below-fold photography uses lazy loading and async decoding.
- Remote image hosts are preconnected.
- Three.js is a delayed dynamic import, not render-blocking.
- WebGL pixel ratio is capped and power preference is low-power.
- No map iframe or live Instagram embed.
- GitHub Pages ships only the static runtime files.

## 14. SEO / local discovery

Implemented:
- Title: `Cafe Mera | Ethiopian Breakfast, Coffee & Lunch in Aurora, CO`.
- Evidence-backed meta description.
- Canonical GitHub Pages preview URL.
- Open Graph metadata.
- `CafeOrCoffeeShop` Schema.org JSON-LD with address, phone, current weekday hours, cuisine and Instagram.
- Crawlable HTML menu, address, phone and hours.
- `robots.txt` and `sitemap.xml`.

Before moving to an official custom domain, update canonical / OG / schema URLs to that domain.

## 15. Rights / licensing notes

**Preferred for production:** owner-supplied Cafe Mera originals with confirmed reuse rights.

**Currently implemented from business channels:** Wix images associated directly with Cafe Mera. These should still receive an explicit rights sign-off before commercial launch.

**Demo/editorial-only:** Joe Coffee interior image. Replace or license before commercial launch.

Do not add Google Maps, Yelp, Restaurantji, DoorDash or customer-uploaded images to production without permission.

No generic “African” patterns or symbols are used to imply Ethiopian cultural authenticity.

## 16. Implementation sequence

Completed implementation order:
1. Verify current public facts and owner-controlled content.
2. Establish semantic static page shell.
3. Build design tokens, responsive grid and typography.
4. Add real Cafe Mera business-channel photography.
5. Add featured menu and conversion actions.
6. Add Yeshi story, review proof and wayfinding.
7. Add accessibility behaviors and mobile action rail.
8. Add restrained reveal motion.
9. Add optional/delayed Three.js aroma enhancement.
10. Add SEO, local schema, robots and sitemap.
11. Add GitHub Pages Actions deployment.
12. Verify deployed workflow and public URL.

## 17. Acceptance criteria

### Brand / content
- [x] Feels specific to Cafe Mera rather than a generic cafe template.
- [x] Ethiopian roots are visible without stereotyping.
- [x] Real Cafe Mera photography is the primary visual material.
- [x] Demo/editorial imagery is documented for replacement/licensing.
- [x] No invented menu items, prices, hours, reviews or policies.
- [x] Yeshi story uses owner-controlled facts.

### Conversion
- [x] Order Online is above the fold.
- [x] Directions are prominent.
- [x] Mobile has one-tap Order / Directions / Call.
- [x] Menu and contact details are crawlable HTML.

### Accessibility / responsive
- [x] Semantic HTML and one H1.
- [x] Keyboard navigation / visible focus states.
- [x] Reduced-motion behavior.
- [x] Content functions without WebGL.
- [x] Responsive layouts down to small mobile widths.

### Performance / technical
- [x] Static-first; no application framework.
- [x] Lazy loading below the fold.
- [x] Three.js dynamically imports after load and has a static fallback.
- [x] GitHub Pages workflow included.
- [x] SEO metadata and JSON-LD included.

### Before official commercial-domain launch
- [ ] Cafe Mera owner confirms image reuse rights / supplies originals.
- [ ] Demo-only interior image is replaced or licensed.
- [ ] Owner reconfirms current hours, menu and catering availability.
- [ ] Canonical and schema URLs are switched from the GitHub Pages preview URL to the official domain.
