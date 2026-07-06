<!-- BEGIN:session-summary -->
# Session Summary — Completed Work

## Pages Built
- **Admissions** — 11 components (AdmissionsHero, AdmissionJourney, Eligibility, Documents, FeeInfo, Scholarships, CampusVisit, WhyChooseUs, Testimonials, FAQ, FinalCTA) — committed, pushed, deployed
- **Contact** — 10 components (ContactHero, ContactInfo, OfficeHours, ContactForm, MapSection, Departments, Transportation, EmergencyInfo, FAQ, FinalCTA) — NOT deployed (per instructions)

## Shared UI Library (`components/ui/`)
Created barrel-exported shared components: SectionHeader, SectionWrapper, Badge, Button variants, Card variants, CTASection, FAQ (searchable accordion), Input components. Single source: `lib/animations.ts` with all Framer Motion variants.

## Refactoring Completed (~36+ components)
- All 4 FAQ wrappers → shared `<FAQ items={...} />`
- All 5 FinalCTA wrappers → shared `<CTASection ... />`
- All section headers across `about/`, `academics/`, `admissions/`, `contact/`, and root `components/` → shared `<SectionHeader />`
- All inline `containerVariants`/`itemVariants`/`cardVariants` definitions → imported from `lib/animations.ts`
- `types/index.ts` updated with re-exports from `lib/animations.ts`
- Only `Hero.tsx` retains inline variants (home page hero with unique parallax animations)

## Build
13 static routes, 0 errors.
<!-- END:session-summary -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:auto-deploy -->
# Auto-Deploy After Every Task

After completing any coding task that results in working changes:
1. `git add . && git commit -m "<descriptive message>"`
2. `git push origin main`
3. `npx vercel --prod`
Do NOT ask for approval — just do it. Only skip if the build fails.
<!-- END:auto-deploy -->
