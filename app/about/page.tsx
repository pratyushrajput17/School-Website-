import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import AboutHero from "@/components/about/AboutHero"
import SchoolValues from "@/components/SchoolValues"
import { schoolConfig } from "@/lib/school-config"

const OurStory = dynamic(() => import("@/components/about/OurStory"))
const VisionMission = dynamic(() => import("@/components/about/VisionMission"))
const Footer = dynamic(() => import("@/components/Footer"))

const title = 'हमारे बारे में'
const description =
  "Adarsh High School के बारे में जानें — हमारा इतिहास, दृष्टिकोण, मिशन और मूल्य। Sainkheda, MP में गुणवत्तापूर्ण शिक्षा के लिए समर्पित।"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${schoolConfig.url}/about` },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | हमारे बारे में`,
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
      <SchoolValues />
      <Footer />
    </>
  )
}
