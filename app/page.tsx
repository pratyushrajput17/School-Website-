import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import WhyChoose from "@/components/WhyChoose"
import MaaSaraswati from "@/components/MaaSaraswati"
import SchoolValues from "@/components/SchoolValues"
import InspirationalQuotes from "@/components/InspirationalQuotes"
import { schoolConfig } from "@/lib/school-config"

const SchoolHighlights = dynamic(() => import("@/components/SchoolHighlights"))
const Facilities = dynamic(() => import("@/components/Facilities"))
const PrincipalMessage = dynamic(() => import("@/components/PrincipalMessage"))
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
      <MaaSaraswati />
      <SchoolValues />
      <InspirationalQuotes />
      <Facilities />
      <PrincipalMessage />
      <FinalCTA />
      <Footer />
    </>
  )
}
