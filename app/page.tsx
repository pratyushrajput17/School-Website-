import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import WhyChoose from "@/components/WhyChoose"
import MaaSaraswati from "@/components/MaaSaraswati"
import SchoolValues from "@/components/SchoolValues"
import ParentTrust from "@/components/ParentTrust"
import SchoolDayTimeline from "@/components/SchoolDayTimeline"
import InspirationalQuotes from "@/components/InspirationalQuotes"
import HomeCTA from "@/components/HomeCTA"
import { schoolConfig } from "@/lib/school-config"
import dynamic from "next/dynamic"

const SchoolHighlights = dynamic(() => import("@/components/SchoolHighlights"))
const Facilities = dynamic(() => import("@/components/Facilities"))
const PrincipalMessage = dynamic(() => import("@/components/PrincipalMessage"))

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
      <ParentTrust />
      <SchoolDayTimeline />
      <InspirationalQuotes />
      <Facilities />
      <PrincipalMessage />
      <HomeCTA />
    </>
  )
}
