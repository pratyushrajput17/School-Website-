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

## Key Components
- Navbar: Home, About, Academics, Admissions, Facilities, Gallery, Contact (responsive)
- Footer: Address, 3 phones, email, quick links, social icons
- Home: Hero, SchoolValues (Hindi), ParentTrust (6 cards), WhyChoose (6+Future Growth), PrincipalMessage, SchoolDayTimeline, Academics overview, SchoolStats, HomeCTA (Get in Touch + Call Now)
- About: 10+ components with authentic content
- Academics: Curriculum, Co-Curricular, Teaching methodology, etc.
- Admissions: Journey, Eligibility, Documents, Fee, FAQs, FinalCTA
- Facilities: 8 facility cards with icons + dedicated /facilities page
- Gallery: 5 categories (Campus Life, Classroom, Academic, Cultural, Annual Functions)
- Contact: 6 inline sections (Hero, Info, Quick Cards, Form, Map, CTA)

## Removed Dead Code
- AcademicPrograms.tsx, contact/*.tsx (4 files), ui/cta-section.tsx, ui/faq.tsx
- section-header.tsx restored (still imported by OurStory, CoCurricular, CurriculumOverview)

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
