import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function HomeCTA() {
  return (
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
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-saffron-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2"
            >
              Apply for Admission
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`tel:${schoolConfig.contact.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
