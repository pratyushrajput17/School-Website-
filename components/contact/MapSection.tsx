'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Navigation, Building2, ArrowRight } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const landmarks = [
  'Opposite City Mall, Main Avenue',
  '2 km from Central Railway Station',
  'Adjacent to Greenfield Park',
  '500 m from City Hospital',
] as const



export default function MapSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32" id="map">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            Find Us
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Visit Our{' '}
            <span className="text-blue-600">Campus</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We&apos;re conveniently located in the heart of the city with easy
            access from all major routes.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-2xl shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]">
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-blue-500/10 via-slate-100 to-primary/5" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-border/60 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>

              <h3 className="mt-4 text-xl font-bold text-primary">{schoolConfig.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {schoolConfig.contact.address}
              </p>

              <div className="mt-6">
                <h4 className="flex items-center gap-2 text-sm font-bold text-primary">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  Nearby Landmarks
                </h4>
                <ul className="mt-3 space-y-2">
                  {landmarks.map((landmark) => (
                    <li key={landmark} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      {landmark}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
