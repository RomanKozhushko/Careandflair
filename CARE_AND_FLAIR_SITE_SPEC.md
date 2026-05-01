# Care & Flair Site Spec

## Phase 1.3 Visual Proof Layer

Visual proof is a core conversion mechanism for Care & Flair. The site must show property transformation clearly, quickly and credibly, using locally managed content from `src/data` JSON files.

### Before/After Draggable Slider

- Provide a reusable `BeforeAfterSlider` component.
- Slider must use a vertical draggable divider.
- Desktop mouse dragging must be supported.
- Mobile touch dragging must be supported.
- The slider must show clear `Before` and `After` labels.
- The slider must avoid layout shift by reserving a stable visual area.
- If either image is missing, show a branded visual fallback instead of an empty/grey block.

### Before/After Carousel

- Provide a reusable `BeforeAfterCarousel` component.
- Carousel content must come from `src/data/before-after.json`.
- Carousel cards must use transformation data fields, not hardcoded public content.
- Carousel cards must link users toward quote intent using CTA data from each visual item.

### Dedicated `/before-after` Page

The site must include a dedicated `/before-after` page with:

- Hero section explaining transformation proof.
- Category filters driven by available JSON categories.
- Featured transformation section.
- Gallery grid of visible visual proof cards.
- CTA: `Get Quote for Similar Result`.

### TriptychGallery Requirements

- Triptych-style visual proof may be used on the homepage or campaign sections.
- Triptych content must come from JSON-managed media fields.
- Cards should communicate property reset categories such as interior reset, wet-area recovery and kerb appeal.
- Missing media must use branded fallback visuals.

### Admin-Managed Media Fields

Before/after gallery data must support fields suitable for a later admin UI:

- `id`
- `title`
- `slug`
- `category`
- `serviceType`
- `propertyType`
- `location`
- `beforeImage`
- `afterImage`
- `beforeAlt`
- `afterAlt`
- `problem`
- `solution`
- `result`
- `featured`
- `visible`
- `showOnHomepage`
- `order`
- `ctaLabel`
- `ctaPreset`

### Visual Fallback Behaviour

- Never render empty grey placeholders for public visual areas.
- Missing images must render a branded Care & Flair fallback block.
- Fallbacks must preserve the intended card dimensions and layout.
- Components should accept optional image fields safely.

### CTA Mapping from Visual Cards

- Visual cards must route users to quote intent.
- Use each visual item’s `ctaPreset` to build `/quote?preset=slug` or `/quote?upgrade=slug` links.
- Use exact slug mapping from JSON data.
- Do not add quote builder logic in this phase.
