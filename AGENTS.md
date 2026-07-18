<!-- BEGIN:session-summary -->
# Session Summary — Complete

## Live URL
https://school-website-xi-rust.vercel.app

## Pages (7)
- Home, About, Academics, Admissions, Facilities, Gallery, Contact

## Content State
- ~80% English, ~15% Hindi (SchoolValues section), ~5% Sanskrit (shlokas)
- All content follows AGENTS.md content rules — no fake claims, no corporate buzzwords
- Only confirmed facilities listed (Classrooms, Library, Computer Lab, Science Lab, CCTV, Transport, Green Campus, Smart Lab Coming Soon)
- School info verified: Adarsh High School, Gadarwara Road, Sainkheda, MP 484661, MP Board, English Medium, 900+ students, 40+ teachers, Ph: 9893652202 / 9993606232 / 9993794981, Email: adresh2111@gmail.com

## Homepage Flow (8 sections)
Hero → SchoolValues (Hindi) → ParentTrust (8 cards) → SchoolDayTimeline → Facilities → PrincipalMessage → InspirationalQuotes → HomeCTA
- Removed WhyChoose (merged into ParentTrust — 8 cards now include CCTV, transport, green campus, academic growth)
- Removed SchoolHighlights (stats already in Hero)
- MaaSaraswati moved to About page (goddess of knowledge — fits academics context)

## All Pages (7)
- **Home**: Hero, SchoolValues, ParentTrust, SchoolDayTimeline, Facilities, PrincipalMessage, InspirationalQuotes, HomeCTA
- **About**: AboutHero, OurStory, VisionMission, MaaSaraswati, SchoolValues, Footer
- **Academics**: AcademicsHero, CurriculumOverview, CoCurricular, FinalCTA, Footer
- **Admissions**: AdmissionsHero, AdmissionJourney, Documents, FinalCTA, Footer
- **Facilities**: 8 cards with icons + Coming Soon badge (Smart Lab) + dedicated page
- **Gallery**: 5 categories, gradient photo-style cards (no numbered placeholders)
- **Contact**: Hero, Contact Info, Quick Cards, ContactForm (client comp, with submit handler), Embedded Google Maps iframe, Final CTA

## Removed Dead Code
- WhyChoose.tsx, SchoolHighlights.tsx, AcademicPrograms.tsx, contact/*.tsx (4 files), ui/cta-section.tsx, ui/faq.tsx
- hooks/useScrollAnimation.ts, lib/utils.ts, types/index.ts
- Empty config/, data/ directories
- Unused import (schoolConfig) in Facilities.tsx

## Production Polish Applied
- Duplicate sections consolidated (no repetitive content)
- All obvious placeholders replaced: Gallery uses styled cards with category labels, Principal shows GraduationCap silhouette instead of generic User icon, Maps section has real Google embed
- Contact form has working submit handler (client component)
- Social links retained as decorative (# hrefs — no fake social accounts)
- ParentTrust expanded to 8 cards covering all trust factors (education, discipline, teachers, safety, transport, campus, academic growth, cultural/sports)

## Build
15 static routes, 0 errors. Auto-deployed on every change.

## Design System
- Colors: Deep Blue (#1B3A5C), Saffron (#FF9933), White
- Tailwind v4, Framer Motion 12.42.2, Lucide React icons
- No gradients/flashy elements; clean, trustworthy school aesthetic

## Development Rules
- Auto-deploy after every task (git add/commit/push, vercel --prod)
- Content rules enforced; no exaggeration or fake claims
- Next.js 16.2.10 docs in node_modules/next/dist/docs/
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

<!-- BEGIN:content-rules -->
# Content Rules — Authenticity & Trust

## NEVER use these phrases:
- World Class
- International Standard
- Global Excellence
- State of the Art
- Industry Leading
- Revolutionary
- AI Powered Education
- Future Ready Ecosystem
- Premium Luxury Campus

## Do NOT:
- Exaggerate or make unrealistic claims
- Claim features that are not confirmed to exist
- Use corporate buzzwords or startup language
- Make the school sound like a business

## DO focus on:
- Discipline
- Personal Attention
- Experienced Teachers
- Character Development
- Academic Growth
- Student Wellbeing
- Cultural Values
- Sports and Activities
- Community Trust

## Tone:
- Honest, authentic, and grounded
- Reflects a genuine Indian school serving its community
- Parents should trust the content because it feels real, not because it sounds impressive
- Value-based (Education + Character + Discipline), not hype-based
<!-- END:content-rules -->
