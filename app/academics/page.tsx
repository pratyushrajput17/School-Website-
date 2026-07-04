import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import AcademicsHero from "@/components/academics/AcademicsHero"
import { schoolConfig } from "@/lib/school-config"

const LearningPhilosophy = dynamic(() => import("@/components/academics/LearningPhilosophy"))
const AcademicPrograms = dynamic(() => import("@/components/academics/AcademicPrograms"))
const CurriculumOverview = dynamic(() => import("@/components/academics/CurriculumOverview"))
const SubjectAreas = dynamic(() => import("@/components/academics/SubjectAreas"))
const SmartLearning = dynamic(() => import("@/components/academics/SmartLearning"))
const Laboratories = dynamic(() => import("@/components/academics/Laboratories"))
const CoCurricular = dynamic(() => import("@/components/academics/CoCurricular"))
const AssessmentMethodology = dynamic(() => import("@/components/academics/AssessmentMethodology"))
const FacultyPreview = dynamic(() => import("@/components/academics/FacultyPreview"))
const StudentAchievements = dynamic(() => import("@/components/academics/StudentAchievements"))
const FAQ = dynamic(() => import("@/components/academics/FAQ"))
const FinalCTA = dynamic(() => import("@/components/academics/FinalCTA"))
const Footer = dynamic(() => import("@/components/Footer"))

const title = 'Academics'
const description =
  "Explore our comprehensive academic programs, curriculum, and learning philosophy designed to nurture excellence and holistic development."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${schoolConfig.url}/academics`,
  },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | Academics`,
    description,
    url: `${schoolConfig.url}/academics`,
    siteName: schoolConfig.metadata.siteName,
    images: [
      {
        url: schoolConfig.metadata.ogImage,
        width: 1200,
        height: 630,
        alt: schoolConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${schoolConfig.metadata.siteName} | Academics`,
    description,
    images: [schoolConfig.metadata.ogImage],
    site: schoolConfig.metadata.twitterHandle,
    creator: schoolConfig.metadata.twitterHandle,
  },
}

export default function AcademicsPage() {
  return (
    <>
      <Navbar />
      <AcademicsHero />
      <LearningPhilosophy />
      <AcademicPrograms />
      <CurriculumOverview />
      <SubjectAreas />
      <SmartLearning />
      <Laboratories />
      <CoCurricular />
      <AssessmentMethodology />
      <FacultyPreview />
      <StudentAchievements />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
