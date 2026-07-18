import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import WhyChoose from "@/components/WhyChoose"
import SchoolHighlights from "@/components/SchoolHighlights"
import { schoolConfig } from "@/lib/school-config"

const Facilities = dynamic(() => import("@/components/Facilities"))
const PrincipalMessage = dynamic(() => import("@/components/PrincipalMessage"))
const CampusGallery = dynamic(() => import("@/components/CampusGallery"))
const FinalCTA = dynamic(() => import("@/components/FinalCTA"))
const Footer = dynamic(() => import("@/components/Footer"))

export const metadata: Metadata = {
  title: schoolConfig.metadata.defaultTitle,
  description: schoolConfig.description,
  alternates: {
    canonical: schoolConfig.url,
  },
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChoose />
      <SchoolHighlights />
      <Facilities />
      <PrincipalMessage />
      <CampusGallery />
      <FinalCTA />
      <Footer />
    </>
  )
}
