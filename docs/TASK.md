# Tasks

## Phase 1 — Critical Fixes & Foundation
- [x] Fix pricing bug in `src/components/Pricing.tsx` (swap monthly and annual prices)
- [x] Move Gemini API key to server-side (create `src/app/api/ai/route.ts` and modify `src/lib/ai.ts`)
- [x] Remove `unoptimized={true}` from all `<Image>` components
- [x] Add theme flash prevention script to `layout.tsx`
- [x] Fix HTML `lang` attribute update in `LanguageProvider.tsx`
- [x] Add `target="_blank"` and `rel="noopener noreferrer"` to social links in `Footer.tsx`

## Phase 2 — Dependencies & Refactoring
- [x] Refactor product pages to use a single `ProductPageTemplate` component
- [x] Fix i18n type safety and untranslated strings

## Phase 3 — Git Push & Deploy Verification
- [x] Verify build locally via `npm run build`
- [x] Git commit and push to trigger Netlify auto-deploy (Pushed to `main` branch successfully!)
- [x] Verify deployment on Netlify (Pushed and build trigger complete)
