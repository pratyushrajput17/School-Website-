import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import AboutHero from "@/components/about/AboutHero"
import { schoolConfig } from "@/lib/school-config"

const OurStory = dynamic(() => import("@/components/about/OurStory"))
const VisionMission = dynamic(() => import("@/components/about/VisionMission"))
const CoreValues = dynamic(() => import("@/components/about/CoreValues"))
const JourneyTimeline = dynamic(() => import("@/components/about/JourneyTimeline"))
const Leadership = dynamic(() => import("@/components/about/Leadership"))
const Achievements = dynamic(() => import("@/components/about/Achievements"))
const Infrastructure = dynamic(() => import("@/components/about/Infrastructure"))
const FacultyExcellence = dynamic(() => import("@/components/about/FacultyExcellence"))
const CampusLife = dynamic(() => import("@/components/about/CampusLife"))
const TrustSection = dynamic(() => import("@/components/about/TrustSection"))
const Recognition = dynamic(() => import("@/components/about/Recognition"))
const FAQ = dynamic(() => import("@/components/about/FAQ"))
const FinalCTA = dynamic(() => import("@/components/about/FinalCTA"))
const Footer = dynamic(() => import("@/components/Footer"))

const title = 'About Us'
const description =
  "Discover our school's rich history, vision, and commitment to excellence in education. Learn about our leadership, faculty, and vibrant campus life."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${schoolConfig.url}/about`,
  },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | About Us`,
    description,
    url: `${schoolConfig.url}/about`,
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
    title: `${schoolConfig.metadata.siteName} | About Us`,
    description,
    images: [schoolConfig.metadata.ogImage],
    site: schoolConfig.metadata.twitterHandle,
    creator: schoolConfig.metadata.twitterHandle,
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
      <JourneyTimeline />
      <Leadership />
      <Achievements />
      <Infrastructure />
      <FacultyExcellence />
      <CampusLife />
      <TrustSection />
      <Recognition />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
