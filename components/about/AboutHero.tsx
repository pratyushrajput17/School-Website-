'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'
import { staggerContainer, fadeUp } from '@/lib/animations'

const heroStats = [
  { value: `${schoolConfig.stats.students.value}${schoolConfig.stats.students.suffix}`, label: 'Students' },
  { value: `${schoolConfig.stats.teachers.value}${schoolConfig.stats.teachers.suffix}`, label: 'Teachers' },
  { value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`, label: 'Years' },
  { value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`, label: 'Board Results' },
] as const

export default function AboutHero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-primary/[0.02] blur-3xl" />
      <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.02] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[85vh] flex-col items-center justify-center py-20 text-center lg:py-32">
          <motion.div
            className="w-full max-w-4xl"
            variants={staggerContainer(0.15)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="badge-pill">About Our School</span>
            </motion.div>

            <motion.h1
              className="mt-6 heading-xl text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
              variants={fadeUp}
            >
              Empowering Minds.{' '}
              <span className="text-blue-600">Inspiring Futures.</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
              variants={fadeUp}
            >
              {schoolConfig.name} is a premier MP Board-affiliated institution
              dedicated to academic excellence, character development, and
              holistic growth. Since {schoolConfig.establishedYear}, we have
              nurtured young minds with a focus on strong fundamentals, practical
              learning, and values-based education.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              variants={fadeUp}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                About Our School
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MapPin className="h-4 w-4" />
                Admissions
              </Link>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-2 gap-8 border-t pt-12 sm:grid-cols-4"
              variants={fadeUp}
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
