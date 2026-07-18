import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import SchoolAtAGlance from "@/components/SchoolAtAGlance"
import SchoolValues from "@/components/SchoolValues"
import ParentTrust from "@/components/ParentTrust"
import SchoolDayTimeline from "@/components/SchoolDayTimeline"
import InspirationalQuotes from "@/components/InspirationalQuotes"
import HomeCTA from "@/components/HomeCTA"
import { schoolConfig } from "@/lib/school-config"
import dynamic from "next/dynamic"

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
      <SchoolAtAGlance />
      <SchoolValues />
      <ParentTrust />
      <SchoolDayTimeline />
      <Facilities />
      <PrincipalMessage />
      <InspirationalQuotes />
      <HomeCTA />
    </>
  )
}
