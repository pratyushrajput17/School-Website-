import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import ContactHero from "@/components/contact/ContactHero"
import { schoolConfig } from "@/lib/school-config"

const ContactInfo = dynamic(() => import("@/components/contact/ContactInfo"))
const OfficeHours = dynamic(() => import("@/components/contact/OfficeHours"))
const ContactForm = dynamic(() => import("@/components/contact/ContactForm"))
const MapSection = dynamic(() => import("@/components/contact/MapSection"))
const Departments = dynamic(() => import("@/components/contact/Departments"))
const Transportation = dynamic(() => import("@/components/contact/Transportation"))
const EmergencyInfo = dynamic(() => import("@/components/contact/EmergencyInfo"))
const FAQ = dynamic(() => import("@/components/contact/FAQ"))
const FinalCTA = dynamic(() => import("@/components/contact/FinalCTA"))
const Footer = dynamic(() => import("@/components/Footer"))

const title = 'Contact Us'
const description =
  "Get in touch with our school. Find contact information, office hours, department details, transport routes, and emergency contacts. Schedule your campus visit today."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${schoolConfig.url}/contact`,
  },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | Contact Us`,
    description,
    url: `${schoolConfig.url}/contact`,
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
    title: `${schoolConfig.metadata.siteName} | Contact Us`,
    description,
    images: [schoolConfig.metadata.ogImage],
    site: schoolConfig.metadata.twitterHandle,
    creator: schoolConfig.metadata.twitterHandle,
  },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactHero />
      <ContactInfo />
      <OfficeHours />
      <ContactForm />
      <MapSection />
      <Departments />
      <Transportation />
      <EmergencyInfo />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
