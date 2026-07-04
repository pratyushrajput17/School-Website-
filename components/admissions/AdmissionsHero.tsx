'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const quickFacts = [
  { icon: CheckCircle, label: 'Admission Open', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Clock, label: 'Limited Seats', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Calendar, label: 'Apply Online', color: 'text-blue-600', bg: 'bg-blue-50' },
] as const

const heroStats = [
  { value: `${schoolConfig.stats.students.value}${schoolConfig.stats.students.suffix}`, label: 'Students' },
  { value: `${schoolConfig.stats.teachers.value}${schoolConfig.stats.teachers.suffix}`, label: 'Teachers' },
  { value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`, label: 'Years of Excellence' },
  { value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`, label: 'Board Results' },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function AdmissionsHero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-primary/[0.02] blur-3xl" />
      <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.02] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[85vh] flex-col items-center justify-center py-20 text-center lg:py-32">
          <motion.div
            className="w-full max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex justify-center gap-3">
              <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                Admissions Open
              </span>
              <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                Session {schoolConfig.admission.session}
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
              variants={itemVariants}
            >
              Begin Your Child&apos;s Journey{' '}
              <span className="text-blue-600">Towards Excellence</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
              variants={itemVariants}
            >
              Give your child the gift of a world-class education at{' '}
              {schoolConfig.name}. Where every student is nurtured to discover
              their unique potential and build a foundation for lifelong success.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#campus-visit"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MapPin className="h-4 w-4" />
                Schedule Campus Visit
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-6"
              variants={itemVariants}
            >
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-2 rounded-full border border-border/60 bg-white px-5 py-2 shadow-sm"
                >
                  <fact.icon className={`h-4 w-4 ${fact.color}`} />
                  <span className="text-sm font-semibold text-primary">{fact.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-2 gap-8 border-t pt-12 sm:grid-cols-4"
              variants={itemVariants}
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
