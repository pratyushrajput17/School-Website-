import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import AcademicsHero from "@/components/academics/AcademicsHero"
import { schoolConfig } from "@/lib/school-config"

const CurriculumOverview = dynamic(() => import("@/components/academics/CurriculumOverview"))
const CoCurricular = dynamic(() => import("@/components/academics/CoCurricular"))
const FinalCTA = dynamic(() => import("@/components/FinalCTA"))
const Footer = dynamic(() => import("@/components/Footer"))

const title = 'शैक्षणिक'
const description =
  "Adarsh High School में MP Board पाठ्यक्रम का परिचय — गुणवत्तापूर्ण शिक्षा, अनुभवी शिक्षक और संस्कारयुक्त वातावरण।"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${schoolConfig.url}/academics` },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | शैक्षणिक`,
    description,
    url: `${schoolConfig.url}/academics`,
    siteName: schoolConfig.metadata.siteName,
    images: [{ url: schoolConfig.metadata.ogImage, width: 1200, height: 630, alt: schoolConfig.name }],
  },
}

export default function AcademicsPage() {
  return (
    <>
      <Navbar />
      <AcademicsHero />
      <CurriculumOverview />
      <CoCurricular />
      <FinalCTA />
      <Footer />
    </>
  )
}
