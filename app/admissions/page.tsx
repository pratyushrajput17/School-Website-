import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import AdmissionsHero from "@/components/admissions/AdmissionsHero"
import { schoolConfig } from "@/lib/school-config"

const AdmissionJourney = dynamic(() => import("@/components/admissions/AdmissionJourney"))
const Documents = dynamic(() => import("@/components/admissions/Documents"))
const FinalCTA = dynamic(() => import("@/components/FinalCTA"))
const Footer = dynamic(() => import("@/components/Footer"))

const title = 'Admissions'
const description =
  "Secure your child's place at Adarsh High School. Simple admission process, required documents, and all information for the upcoming session."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${schoolConfig.url}/admissions` },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | Admissions`,
    description,
    url: `${schoolConfig.url}/admissions`,
    siteName: schoolConfig.metadata.siteName,
    images: [{ url: schoolConfig.metadata.ogImage, width: 1200, height: 630, alt: schoolConfig.name }],
  },
}

export default function AdmissionsPage() {
  return (
    <>
      <Navbar />
      <AdmissionsHero />
      <AdmissionJourney />
      <Documents />
      <FinalCTA />
      <Footer />
    </>
  )
}
