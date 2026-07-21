import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import SchoolAtAGlance from "@/components/SchoolAtAGlance"
import ParentTrust from "@/components/ParentTrust"
import SchoolValues from "@/components/SchoolValues"
import AcademicAchievers from "@/components/AcademicAchievers"
import EventPreview from "@/components/EventPreview"
import NoticePreview from "@/components/NoticePreview"
import GalleryPreview from "@/components/GalleryPreview"
import HomeCTA from "@/components/HomeCTA"
import { schoolConfig } from "@/lib/school-config"
import dynamic from "next/dynamic"

const PrincipalMessage = dynamic(() => import("@/components/PrincipalMessage"))

export const metadata: Metadata = {
  title: schoolConfig.metadata.defaultTitle,
  description: schoolConfig.description,
  alternates: {
    canonical: schoolConfig.url,
  },
}

export const revalidate = 30;

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SchoolAtAGlance />
      <ParentTrust />
      <SchoolValues />
      <PrincipalMessage />
      <AcademicAchievers />
      <EventPreview />
      <NoticePreview />
      <GalleryPreview />
      <HomeCTA />
    </>
  )
}
