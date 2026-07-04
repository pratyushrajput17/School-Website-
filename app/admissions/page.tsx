import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import AdmissionsHero from "@/components/admissions/AdmissionsHero"
import { schoolConfig } from "@/lib/school-config"

const AdmissionJourney = dynamic(() => import("@/components/admissions/AdmissionJourney"))
const Eligibility = dynamic(() => import("@/components/admissions/Eligibility"))
const Documents = dynamic(() => import("@/components/admissions/Documents"))
const FeeInfo = dynamic(() => import("@/components/admissions/FeeInfo"))
const Scholarships = dynamic(() => import("@/components/admissions/Scholarships"))
const CampusVisit = dynamic(() => import("@/components/admissions/CampusVisit"))
const WhyChooseUs = dynamic(() => import("@/components/admissions/WhyChooseUs"))
const FAQ = dynamic(() => import("@/components/admissions/FAQ"))
const Testimonials = dynamic(() => import("@/components/admissions/Testimonials"))
const FinalCTA = dynamic(() => import("@/components/admissions/FinalCTA"))
const Footer = dynamic(() => import("@/components/Footer"))

const title = 'Admissions'
const description =
  "Begin your child's journey towards excellence at our school. Explore the admission process, eligibility, fee structure, scholarships, and book a campus visit."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${schoolConfig.url}/admissions`,
  },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | Admissions`,
    description,
    url: `${schoolConfig.url}/admissions`,
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
    title: `${schoolConfig.metadata.siteName} | Admissions`,
    description,
    images: [schoolConfig.metadata.ogImage],
    site: schoolConfig.metadata.twitterHandle,
    creator: schoolConfig.metadata.twitterHandle,
  },
}

export default function AdmissionsPage() {
  return (
    <>
      <Navbar />
      <AdmissionsHero />
      <AdmissionJourney />
      <Eligibility />
      <Documents />
      <FeeInfo />
      <Scholarships />
      <CampusVisit />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
