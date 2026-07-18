<!-- BEGIN:session-summary -->
# Session Summary — Complete

## Live URL
https://school-website-xi-rust.vercel.app

## Objective
Production-ready Adarsh High School website with full Admin CMS backend. Admin manages Notices, Events, Gallery (Cloudinary), and Achievers without touching code.

## Stack
- Next.js 16.2.10, App Router, React 19, TypeScript 5, Tailwind v4
- Prisma 7.8 (adapter-pg), PostgreSQL, bcrypt, JWT, HttpOnly cookies
- Cloudinary SDK (gallery + achiever photos), Framer Motion, Lucide React
- Design: Deep Blue (#1B3A5C) + Saffron (#FF9933) + White

## School Info
Adarsh High School, Gadarwara Road, Sainkheda, MP 484661, MP Board, English Medium, Nursery–Class 10, 900+ students, 40+ teachers, Ph: 9893652202 / 9993606232 / 9993794981, Email: adresh2111@gmail.com

## Content Rules
All AGENTS.md content rules enforced — no exaggeration, buzzwords, or fake claims.
Only confirmed facilities: Classrooms, Library, Computer Lab, Science Lab, CCTV, Transport, Green Campus, Smart Lab (Coming Soon).

## Homepage Flow (9 sections)
Hero → SchoolAtAGlance → ParentTrust (8 cards) → SchoolValues (Hindi) → PrincipalMessage → AcademicAchievers (DB) → EventPreview (DB) → NoticePreview/GalleryPreview (DB) → HomeCTA

## All Public Pages (11)
- **Home**: Hero, SchoolAtAGlance, ParentTrust, SchoolValues, PrincipalMessage, AcademicAchievers, EventPreview, NoticePreview, GalleryPreview, HomeCTA
- **About**: AboutHero, OurStory, VisionMission, MaaSaraswati, SchoolValues
- **Academics**: AcademicsHero, CurriculumOverview, CoCurricular, FinalCTA
- **Admissions**: AdmissionsHero, AdmissionJourney, Documents, FinalCTA
- **Facilities**: 8 cards with icons + Coming Soon (Smart Lab)
- **Gallery**: Category-grouped grid fetching from DB
- **Events**: Events list fetching from DB
- **Notices**: Notices list fetching from DB
- **Contact**: Hero, Contact Info, Quick Cards, ContactForm, Google Maps, Final CTA
- **/login**: Admin login page

## Backend — 6 CMS Modules (Complete)
| Module | Model | Admin Pages | API Routes | Public Integration |
|--------|-------|-------------|------------|-------------------|
| **Auth** | Admin | login, dashboard, logout | POST /login, POST /logout, GET /me | Proxy protects /admin/* |
| **Students** | Student | list+search+class+section filter, create, edit, CSV export | GET/POST /api/students, GET/PUT/DELETE /api/students/[id], GET /api/students/export | Admin-only |
| **Notices** | Notice | list+search/filter, create, edit | GET/POST /api/notices, GET/PUT/DELETE /api/notices/[id] | /notices page + homepage NoticePreview |
| **Events** | Event | list+search/filter, create, edit | GET/POST /api/events, GET/PUT/DELETE /api/events/[id] | /events page + homepage EventPreview |
| **Gallery** | Gallery | grid+thumbnails+search/filter, create (drag/click upload), edit (replace) | GET/POST /api/gallery, GET/PUT/DELETE /api/gallery/[id] | /gallery page + homepage GalleryPreview |
| **Achievers** | Achiever | list+search/filter+year, create (photo), edit (replace) | GET/POST /api/achievers, GET/PUT/DELETE /api/achievers/[id] | AcademicAchievers section on homepage |

## Prisma Schema (5 models)
Admin, Notice, Event, Gallery, Achiever — all in `prisma/schema.prisma`
Prisma 7: datasource config in `prisma.config.ts` (defineConfig), client uses PrismaPg adapter

## Key Files
- `lib/auth.ts`: JWT+bcrypt+cookies
- `lib/prisma.ts`: Singleton with PrismaPg adapter
- `lib/cloudinary.ts`: uploadImage (gallery 1200×900), uploadPhoto (achievers 400×500), deleteImage, getPublicIdFromUrl
- `lib/api-auth.ts`: getAdminFromRequest / requireAdmin
- `lib/notices.ts`, `lib/events.ts`, `lib/gallery.ts`, `lib/achievers.ts`: Shared DB CRUD per module
- `proxy.ts`: Next.js 16 proxy protecting `/admin/*`
- `prisma/seed.ts`: Seeds 6 notices + 8 events

## Build
39 routes, 0 errors. Auto-deployed on every change from main branch.

## Blocked
- PostgreSQL `DATABASE_URL` and `JWT_SECRET` not set as Vercel env vars — DB API routes will fail at runtime until provisioned
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` not set on Vercel — image uploads fail until configured
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
