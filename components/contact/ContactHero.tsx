'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function ContactHero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
      <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
      <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center lg:py-28">
          <div className="mx-auto max-w-3xl">
            <span className="badge-pill">Get in Touch</span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-deep-blue sm:text-5xl lg:text-6xl">
              We&apos;d Love to <span className="text-saffron">Hear From You</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Whether you have a question about admissions, academics, or want to
              schedule a campus visit — our team is here to help.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`tel:${schoolConfig.contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
              >
                <Phone className="h-4 w-4" />
                {schoolConfig.contact.phone}
              </Link>
              <Link
                href={`mailto:${schoolConfig.contact.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-deep-blue/20 bg-white px-7 py-3.5 text-sm font-semibold text-deep-blue shadow-sm transition-all duration-300 hover:bg-saffron-light"
              >
                <Mail className="h-4 w-4" />
                Send an Email
              </Link>
              <Link
                href="#map"
                className="inline-flex items-center gap-2 rounded-full border border-deep-blue/20 bg-white px-7 py-3.5 text-sm font-semibold text-deep-blue shadow-sm transition-all duration-300 hover:bg-saffron-light"
              >
                <MapPin className="h-4 w-4" />
                Our Location
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
