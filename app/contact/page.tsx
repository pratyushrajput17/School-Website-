import type { Metadata } from "next"
import Link from "next/link"
import { Phone, Mail, MapPin, Navigation, ArrowRight, MessageSquare, User, Send } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { schoolConfig } from "@/lib/school-config"

const { contact } = schoolConfig

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Adarsh High School. Address, phone numbers, email, contact form, and directions on Gadarwara Road, Sainkheda, MP.",
  alternates: { canonical: `${schoolConfig.url}/contact` },
  openGraph: {
    title: `${schoolConfig.metadata.siteName} | Contact Us`,
    description: "Contact Adarsh High School for admissions, academics, and general inquiries.",
    url: `${schoolConfig.url}/contact`,
    siteName: schoolConfig.metadata.siteName,
    images: [{ url: schoolConfig.metadata.ogImage, width: 1200, height: 630, alt: schoolConfig.name }],
  },
}

const contactMethods = [
  { icon: MapPin, label: "Address", detail: "Gadarwara Road, Sainkheda,\nMadhya Pradesh 484661" },
  { icon: Phone, label: "Phone Numbers", detail: "9893652202\n9993606232\n9993794981" },
  { icon: Mail, label: "Email", detail: "adresh2111@gmail.com" },
] as const

const quickCards = [
  { title: "Call Admissions", icon: Phone, href: `tel:${contact.phone.replace(/\s/g, '')}`, detail: "+91 9893652202" },
  { title: "Call School Office", icon: Phone, href: `tel:${contact.altPhone.replace(/\s/g, '')}`, detail: "+91 9993606232" },
  { title: "Email Us", icon: Mail, href: `mailto:${contact.email}`, detail: "adresh2111@gmail.com" },
  { title: "Get Directions", icon: Navigation, href: "https://maps.google.com/?q=Gadarwara+Road+Sainkheda+Madhya+Pradesh", detail: "Open in Google Maps" },
] as const

export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
        <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />
        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="badge-pill">Get in Touch</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-deep-blue sm:text-5xl lg:text-6xl">
            Contact Adarsh High School
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            We would be happy to assist you regarding admissions, academics and general inquiries.
          </p>
        </div>
      </section>

      {/* 2. Contact Information */}
      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-pill">Contact Information</span>
            <h2 className="heading-xl mt-6">Adarsh High School</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactMethods.map((method) => (
              <div
                key={method.label}
                className="group rounded-2xl border border-deep-blue/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-light">
                  <method.icon className="h-6 w-6 text-saffron-dark" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-deep-blue">{method.label}</h3>
                <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                  {method.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Quick Contact Cards */}
      <section className="relative overflow-hidden bg-saffron-light/20 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-pill">Quick Contact</span>
            <h2 className="heading-xl mt-6">Reach Us Instantly</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center rounded-2xl border border-deep-blue/10 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-light transition-colors group-hover:bg-saffron/20">
                  <card.icon className="h-7 w-7 text-saffron-dark" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-deep-blue">{card.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{card.detail}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact Form */}
      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-pill">Send a Message</span>
            <h2 className="heading-xl mt-6">Have a Question?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Fill out the form below and we will get back to you.</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="rounded-2xl border border-deep-blue/10 bg-white p-8 shadow-sm sm:p-10">
              <div className="space-y-5">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Name" aria-label="Name" className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="tel" placeholder="Phone" aria-label="Phone" className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="email" placeholder="Email" aria-label="Email" className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 h-4 w-4 text-muted-foreground" />
                  <textarea rows={5} placeholder="Message" aria-label="Message" className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 resize-none" />
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light">
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Google Maps Placeholder */}
      <section className="relative overflow-hidden bg-saffron-light/20 py-24 lg:py-28" id="map">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-pill">Our Location</span>
            <h2 className="heading-xl mt-6">Find Us on Campus</h2>
            <p className="mt-4 text-lg text-muted-foreground">Visit us on Gadarwara Road, Sainkheda, Madhya Pradesh.</p>
          </div>
          <div className="mt-16">
            <div className="overflow-hidden rounded-2xl shadow-lg shadow-saffron/10 ring-1 ring-black/[0.02]">
              <div className="aspect-[21/9] w-full bg-gradient-to-br from-saffron/10 via-saffron-light/30 to-deep-blue/5 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <MapPin className="h-10 w-10 text-saffron-dark" />
                  <p className="text-sm font-medium text-muted-foreground">Google Maps Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-deep-blue via-deep-blue to-deep-blue/95 py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Admissions Open
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Give your child the gift of quality education with values. Enrol today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-saffron-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </Link>
              <Link
                href="https://maps.google.com/?q=Gadarwara+Road+Sainkheda+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                <MapPin className="h-4 w-4" />
                Visit Campus
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
