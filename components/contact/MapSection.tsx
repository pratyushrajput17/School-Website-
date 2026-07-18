import Link from 'next/link'
import { MapPin, Navigation, ArrowRight } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function MapSection() {
  return (
    <section className="relative overflow-hidden bg-saffron-light/20 py-24 lg:py-28" id="map">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Our Location</span>
          <h2 className="heading-xl mt-6">
            Visit Our Campus
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Located on Gadarwara Road, Sainkheda — easily accessible from the main highway.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl shadow-lg shadow-saffron/10 ring-1 ring-black/[0.02]">
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-saffron/10 via-saffron-light/30 to-deep-blue/5" />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-deep-blue/10 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-light">
                <MapPin className="h-6 w-6 text-saffron-dark" />
              </div>

              <h3 className="mt-4 text-xl font-bold text-deep-blue">{schoolConfig.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {schoolConfig.contact.address}
              </p>

              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p>📍 Near Gadarwara Road, Sainkheda</p>
                <p>🚌 Close to Sainkheda bus stand</p>
                <p>🛣️ Easy access from NH 44</p>
              </div>

              <Link
                href="https://maps.google.com/?q=Gadarwara+Road+Sainkheda+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-deep-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
