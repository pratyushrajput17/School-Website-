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
const AcademicPrograms = dynamic(() => import("@/components/AcademicPrograms"))
const AdmissionProcess = dynamic(() => import("@/components/AdmissionProcess"))
const Testimonials = dynamic(() => import("@/components/Testimonials"))
const NewsEvents = dynamic(() => import("@/components/NewsEvents"))
const FAQ = dynamic(() => import("@/components/FAQ"))
const BookVisit = dynamic(() => import("@/components/BookVisit"))
const Contact = dynamic(() => import("@/components/Contact"))
const FinalCTA = dynamic(() => import("@/components/FinalCTA"))
const Footer = dynamic(() => import("@/components/Footer"))

export const metadata: Metadata = {
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
      <AcademicPrograms />
      <AdmissionProcess />
      <Testimonials />
      <NewsEvents />
      <FAQ />
      <BookVisit />
      <Contact />
      <FinalCTA />
      <Footer />
    </>
  )
}
