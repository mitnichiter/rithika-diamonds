# rithika-diamonds - Work Plan

## TL;DR (For humans)
**What you'll get:** A meticulously crafted, premium e-commerce platform for Rithika Diamonds featuring fluid "island" navigation, editorial split product pages, asymmetrical bento grids, and high-end typography (Geist Sans & Playfair Display). The entire interface will look and feel like a bespoke $150k agency build.

**Why this approach:** By stripping away heavy shadows, bright brand colors, and generic layouts in favor of "Double-Bezel" components and warm monochrome, we create an ultra-minimalist environment that forces the user's focus entirely onto the luxury diamonds.

**What it will NOT do:** No generic Bootstrap-style layouts, no default Tailwind heavy drop-shadows, no system UI colors (blue/red), and no basic linear animations. 

**Effort:** Large
**Risk:** Medium - High reliance on precise CSS and macro-whitespace constraints to achieve the premium feel.
**Decisions to sanity-check:** The pivot from the current `brandNavy/brandBlue` colors to a strict Warm Monochrome (`#FBFBFA` / `#111111`) palette with muted pastels, and the use of Geist Sans/Playfair Display to replace Inter.

Your next move: Approve the plan so the execution agent can start implementing the premium redesign.

---

> TL;DR (machine): Large, Medium risk, implements high-end-visual-design and minimalist-ui styling across all e-commerce and bespoke routes.

## Scope
### Must have
- Strict adherence to `minimalist-ui` (Warm Monochrome `#FBFBFA`/`#111111`, Playfair Display & Sans-serif, 1px solid `#EAEAEA` borders).
- Strict adherence to `high-end-visual-design` (Double-Bezel components, Fluid Island Nav, Z-Axis/Bento layouts, cubic-bezier motion).
- Implementation of Shop, Collections, Product Detail (PDP), Cart, Checkout, Bespoke, Appointments, and User Account pages using the above aesthetic.
### Must NOT have (guardrails, anti-slop, scope boundaries)
- Absolutely NO Inter, Roboto, or standard Tailwind drop shadows (`shadow-md`, etc).
- Absolutely NO edge-to-edge sticky navbars glued to the top or full-color backgrounds.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: visual-qa + Playwright checks for DOM structure.
- Evidence: .omo/evidence/task-<N>-rithika-diamonds.txt

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave. Fewer than 3 (except the final) means you under-split.

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1, 2 | None | 3-10 | Each other |
| 3, 4 | 1, 2 | 5-10 | Each other |
| 5, 6, 7 | 3, 4 | None | Each other |
| 8, 9, 10 | 3, 4 | None | Each other |

## Todos
> Implementation + Test = ONE todo. Never separate.

- [x] 1. Foundation: Tailwind configuration
  What to do / Must NOT do: Update `tailwind.config.ts`. Remove `brandNavy`/`brandBlue`. Add warm monochrome (`background: #FBFBFA`, `foreground: #111111`, `border: #EAEAEA`). Add custom cubic-bezier easing `ease-[cubic-bezier(0.32,0.72,0,1)]`. Must NOT use heavy shadows.
  Parallelization: Wave 1 | Blocked by: None | Blocks: 3-10
  References: `tailwind.config.ts`
  Acceptance criteria: Config builds without errors.
  QA scenarios: Run `npx tailwindcss -i ./src/app/globals.css -c ./tailwind.config.ts` (dry run). Evidence .omo/evidence/task-1-rithika-diamonds.txt
  Commit: Y | refactor(style): update tailwind config to warm monochrome

- [x] 2. Foundation: Typography & Globals
  What to do / Must NOT do: Update `src/app/layout.tsx` and `globals.css`. Import Geist Sans (or a system fallback sans if unavailable) and Playfair Display (Serif) via `next/font/google`. Apply them to `body`.
  Parallelization: Wave 1 | Blocked by: None | Blocks: 3-10
  References: `src/app/layout.tsx`
  Acceptance criteria: layout.tsx exports the correct Next.js fonts.
  QA scenarios: Static analysis checks font imports. Evidence .omo/evidence/task-2-rithika-diamonds.txt
  Commit: Y | feat(core): setup premium typography

- [x] 3. Components: Fluid Island Nav
  What to do / Must NOT do: Rewrite `src/components/Header.tsx` and `TopBar.tsx`. Implement a "Fluid Island Nav" (floating glass pill, `mt-6`, detached, `backdrop-blur-2xl`). Implement staggered mask reveal for mobile menu. Must NOT be an edge-to-edge sticky block.
  Parallelization: Wave 2 | Blocked by: 1, 2 | Blocks: 5-10
  References: `src/components/Header.tsx`
  Acceptance criteria: Header is a floating pill structure.
  QA scenarios: Use visual-qa to capture header state. Evidence .omo/evidence/task-3-rithika-diamonds.txt
  Commit: Y | feat(ui): implement fluid island navigation

- [x] 4. Components: Editorial Footer
  What to do / Must NOT do: Rewrite `src/components/Footer.tsx`. Use extreme macro-whitespace (`py-32`) and editorial serif typography. Remove any solid colored backgrounds.
  Parallelization: Wave 2 | Blocked by: 1, 2 | Blocks: 5-10
  References: `src/components/Footer.tsx`
  Acceptance criteria: Footer uses py-32 and minimal borders.
  QA scenarios: Playwright DOM check. Evidence .omo/evidence/task-4-rithika-diamonds.txt
  Commit: Y | feat(ui): implement minimalist footer

- [x] 5. Pages: Landing Page (Home)
  What to do / Must NOT do: Rewrite `src/app/page.tsx`. Implement "Z-Axis Cascade" or "Soft Structuralism" design. Massive serif hero headings, scroll-entry animations (`translateY(12px)`).
  Parallelization: Wave 3 | Blocked by: 3, 4 | Blocks: None
  References: `src/app/page.tsx`
  Acceptance criteria: Homepage renders without errors with extreme padding.
  QA scenarios: visual-qa check of homepage. Evidence .omo/evidence/task-5-rithika-diamonds.txt
  Commit: Y | feat(pages): premium landing page

- [x] 6. Pages: Shop & Collections
  What to do / Must NOT do: Rewrite `src/app/shop/page.tsx` and `src/app/collections/page.tsx`. Use "Asymmetrical Bento" grid for products. Cards must use "Double-Bezel" (1px solid #EAEAEA outer, inner highlight).
  Parallelization: Wave 3 | Blocked by: 3, 4 | Blocks: None
  References: `src/app/shop/page.tsx`
  Acceptance criteria: Double-bezel classes present on product cards.
  QA scenarios: Playwright DOM check for nested rings/borders. Evidence .omo/evidence/task-6-rithika-diamonds.txt
  Commit: Y | feat(pages): shop bento grid

- [x] 7. Pages: Product Detail Page (PDP)
  What to do / Must NOT do: Rewrite `src/app/product/[id]/page.tsx`. Use "The Editorial Split" (`w-1/2` massive typography left, sticky interactive right). CTA uses nested button architecture and magnetic physics classes.
  Parallelization: Wave 3 | Blocked by: 3, 4 | Blocks: None
  References: `src/app/product/[id]/page.tsx`
  Acceptance criteria: Editorial split layout classes present.
  QA scenarios: visual-qa or structural DOM check. Evidence .omo/evidence/task-7-rithika-diamonds.txt
  Commit: Y | feat(pages): editorial split PDP

- [x] 8. Pages: Bespoke & Appointments
  What to do / Must NOT do: Rewrite `src/app/bespoke/page.tsx` and `src/app/appointment/page.tsx`. Apply Keystroke Micro-UIs for forms (sharp borders, off-white inputs, no heavy shadows).
  Parallelization: Wave 4 | Blocked by: 3, 4 | Blocks: None
  References: `src/app/bespoke/page.tsx`
  Acceptance criteria: Form inputs lack shadow-md and use 1px borders.
  QA scenarios: Form structure analysis. Evidence .omo/evidence/task-8-rithika-diamonds.txt
  Commit: Y | feat(pages): bespoke forms

- [x] 9. Pages: Cart & Checkout
  What to do / Must NOT do: Rewrite `src/app/cart/page.tsx` and `src/app/checkout/page.tsx`. Stark, minimalist linear flow. No background colors inside checkout blocks, only 1px dividers.
  Parallelization: Wave 4 | Blocked by: 3, 4 | Blocks: None
  References: `src/app/checkout/page.tsx`
  Acceptance criteria: Minimalist linear layout applied.
  QA scenarios: Build check. Evidence .omo/evidence/task-9-rithika-diamonds.txt
  Commit: Y | feat(pages): minimalist checkout flow

- [x] 10. Pages: User Dashboard
  What to do / Must NOT do: Rewrite `src/app/orders/page.tsx`, `src/app/address-book/page.tsx`, `src/app/wishlist/page.tsx`. Wrap in bento side-nav. Use pale pastel tags (`#FBF3DB`, etc.) for order status badges.
  Parallelization: Wave 4 | Blocked by: 3, 4 | Blocks: None
  References: `src/app/orders/page.tsx`
  Acceptance criteria: Pastel background classes present.
  QA scenarios: DOM check for muted pastels. Evidence .omo/evidence/task-10-rithika-diamonds.txt
  Commit: Y | feat(pages): user dashboard

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [x] F1. Plan compliance audit
- [x] F2. Code quality review
- [x] F3. Real manual QA (visual-qa)
- [x] F4. Scope fidelity

## Commit strategy
Atomic commits per component/page mapped to exact todos.

## Success criteria
A running Next.js application that perfectly mirrors the minimalist-ui and high-end-visual-design constraints, eliminating all heavy drop-shadows and generic patterns.
