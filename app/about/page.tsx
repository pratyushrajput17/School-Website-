import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import AboutHero from "@/components/about/AboutHero"
import { schoolConfig } from "@/lib/school-config"

const OurStory = dynamic(() => import("@/components/about/OurStory"))
const VisionMission = dynamic(() => import("@/components/about/VisionMission"))
const CoreValues = dynamic(() => import("@/components/about/CoreValues"))
const Footer = dynamic(() => import("@/components/Footer"))

const title = 'About Us'
const description =
  "Learn about Adarsh High School — our story, vision, mission, and core values that guide us in providing quality education in Sainkheda, MP."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${schoolConfig.url}/about` },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | About Us`,
    description,
    url: `${schoolConfig.url}/about`,
    siteName: schoolConfig.metadata.siteName,
    images: [{ url: schoolConfig.metadata.ogImage, width: 1200, height: 630, alt: schoolConfig.name }],
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <OurStory />
      <VisionMission />
      <CoreValues />
      <Footer />
    </>
  )
}
