'use client'

import { motion, type Variants } from 'framer-motion'
import { Bus, MapPin, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const routes = [
  { name: 'North Route', areas: 'City Center, Mall Road, North Colony', stops: 8 },
  { name: 'South Route', areas: 'South Extension, Lake Area, Green Valley', stops: 10 },
  { name: 'East Route', areas: 'East End, Industrial Area, Riverside', stops: 7 },
  { name: 'West Route', areas: 'West Hills, University Area, New Township', stops: 9 },
] as const

const pickupPoints = [
  'Main Bus Stand',
  'City Mall',
  'Railway Station',
  'Hospital Junction',
  'University Gate',
  'Lake View Park',
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function Transportation() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
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
            Transportation
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Safe & Reliable{' '}
            <span className="text-blue-600">School Transport</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our GPS-enabled bus fleet covers all major routes with the highest
            safety standards and trained attendants.
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
            className="space-y-4 lg:col-span-2"
          >
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-bold text-primary">Bus Routes</span>
            </div>

            <div className="space-y-3">
              {routes.map((route) => (
                <div
                  key={route.name}
                  className="rounded-xl border border-border/60 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-primary">{route.name}</h4>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                      {route.stops} stops
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{route.areas}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            className="rounded-2xl border border-border/60 bg-white p-8 shadow-sm"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary">Pickup Points</h3>
                <p className="text-xs text-muted-foreground">Major pickup locations across the city</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {pickupPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-xs text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border/60 bg-white p-8 shadow-sm"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50">
                <User className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary">Transport Coordinator</h3>
                <p className="text-xs text-muted-foreground">For route inquiries and support</p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                <span className="text-xs text-muted-foreground">Name</span>
                <span className="text-sm font-semibold text-primary">Mr. Rajesh Kumar</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                <span className="text-xs text-muted-foreground">Phone</span>
                <span className="text-sm font-semibold text-primary">+91 98765 43214</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                <span className="text-xs text-muted-foreground">Email</span>
                <span className="text-sm font-semibold text-primary">transport@schoolname.edu</span>
              </div>
            </div>
            <Link
              href="#map"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              View Route Map
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
