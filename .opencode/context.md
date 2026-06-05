# Project Context

## Environment
- Language: TypeScript / React
- Runtime: Node.js (v25.2.1)
- Build: next build
- Test: tsc --noEmit (Typescript validation)
- Package Manager: npm (11.6.2)

## Project Type
- [x] Application (Next.js App Router Front-End)
- [ ] Library/Package
- [ ] Microservice
- [ ] Monorepo

## Structure
- Source Mockups: `D:/rithika/htmls_mockups/ai_studio_code (1) - (15).html`
- Source: `src/`
- App Router: `src/app/`
- Context/State: `src/context/`

## Conventions
- Naming: camelCase for variables/functions, PascalCase for React components
- Imports: Absolute with alias `@/*` or relative
- Color Theme: Pure Blue and White (Strictly NO Golden/Yellow colors; substitute all `--accent-gold` highlights with a luxurious brand-blue `--accent-blue` e.g., `#0f52ba` or `#1d4ed8` or `#2563eb`)
- State: Fully functional and reactive. Unified global `AppContext` to connect Cart, Wishlist, Orders, Custom Bespoke Requests, Addresses, and Notifications so that every element actually works in real-time.

## Notes
- Standalone CSS in each mockup page will be isolated either in a scoped stylesheet or injected into the component, preventing page style collisions.
- Common header, footer, top bar, and typography are integrated into the main `layout.tsx` and styled in `globals.css`.
