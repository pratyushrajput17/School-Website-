import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import ContactHero from "@/components/contact/ContactHero"
import { schoolConfig } from "@/lib/school-config"

const ContactInfo = dynamic(() => import("@/components/contact/ContactInfo"))
const ContactForm = dynamic(() => import("@/components/contact/ContactForm"))
const MapSection = dynamic(() => import("@/components/contact/MapSection"))
const Footer = dynamic(() => import("@/components/Footer"))

const title = 'Contact Us'
const description =
  "Get in touch with Adarsh High School. Find our address, phone numbers, email, and send us an inquiry. Located on Gadarwara Road, Sainkheda, MP."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${schoolConfig.url}/contact` },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | Contact Us`,
    description,
    url: `${schoolConfig.url}/contact`,
    siteName: schoolConfig.metadata.siteName,
    images: [{ url: schoolConfig.metadata.ogImage, width: 1200, height: 630, alt: schoolConfig.name }],
  },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
      <Footer />
    </>
  )
}
