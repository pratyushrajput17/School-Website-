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

## Architecture Restructuring
- Created `config/`, `data/`, `hooks/` directories for clean separation of concerns
- Extracted constants into granular files: `config/navigation.ts`, `config/contact.ts`, `data/faq.ts`, `data/social.ts`
- Created `components/layout/` with reusable Container, Section, PageBanner components
- Added missing UI components: Chip, EmptyState, LoadingSkeleton with CardSkeleton variant
- Created `hooks/useScrollAnimation.ts` for RAF-throttled scroll state
- Removed duplicate animation code from `types/index.ts` (dead `fadeUpVariants`, `staggerVariants`)
- Richer per-page SEO metadata (OpenGraph, canonical, descriptions on all 7 pages)

## Pages Created
- **Facilities** `/facilities` — hero banner + placeholder content
- **Gallery** `/gallery` — hero banner + placeholder content

## Sitemap
- Removed `/privacy` and `/terms` entries (pages don't exist yet) to prevent 404 errors in search results

## Build
15 static routes, 0 errors, 0 warnings.

## V1 Launch Checklist
- [x] Home — all sections complete
- [x] About — 14 components complete
- [x] Academics — 13 components complete
- [x] Admissions — 11 components complete
- [x] Gallery — grid with categorized placeholder cards
- [x] Contact — 10 components complete
- [x] Facilities — 8 facility cards with icons
- [x] Navbar — links to all pages, mobile responsive
- [x] Footer — all links, social icons, contact info
- [x] SEO — per-page metadata, OG tags, sitemap, robots, structured data
- [x] Performance — dynamic imports, 15 static routes
- [x] Build — 0 errors, 0 lint warnings
- [x] Accessibility — semantic HTML, ARIA labels, keyboard nav, focus states

## Development Rules
- DO NOT commit, push, or deploy without manual approval.
- All phases require explicit "Continue" before proceeding.
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
