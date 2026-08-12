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
import nextDynamic from "next/dynamic"

const PrincipalMessage = nextDynamic(() => import("@/components/PrincipalMessage"))

export const metadata: Metadata = {
  title: { absolute: schoolConfig.metadata.defaultTitle },
  description: schoolConfig.description,
  alternates: {
    canonical: schoolConfig.url,
  },
  openGraph: {
    type: "website",
    title: schoolConfig.metadata.defaultTitle,
    description: schoolConfig.description,
    url: schoolConfig.url,
    siteName: schoolConfig.metadata.siteName,
    images: [{ url: schoolConfig.metadata.ogImage, width: 1200, height: 630, alt: schoolConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: schoolConfig.metadata.defaultTitle,
    description: schoolConfig.description,
  },
}

export const dynamic = "force-dynamic";

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
