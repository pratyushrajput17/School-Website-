'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'
import { staggerContainer, fadeUp } from '@/lib/animations'

const heroStats = [
  { value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`, label: 'Years' },
  { value: `${schoolConfig.stats.students.value}${schoolConfig.stats.students.suffix}`, label: 'Students' },
  { value: `${schoolConfig.stats.teachers.value}${schoolConfig.stats.teachers.suffix}`, label: 'Teachers' },
  { value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`, label: 'Board Results' },
] as const

export default function AcademicsHero() {
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
              <span className="badge-pill">Academics</span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
              variants={fadeUp}
            >
              Academic Excellence{' '}
              <span className="text-blue-600">Starts Here</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
              variants={fadeUp}
            >
              Our comprehensive curriculum blends academic rigor with innovative
              teaching methods, preparing students to excel in board examinations
              and beyond.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              variants={fadeUp}
            >
              <Link
                href="/academics#programs"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <BookOpen className="h-4 w-4" />
                Apply Now
              </Link>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-2 gap-8 border-t pt-12 sm:grid-cols-4"
              variants={fadeUp}
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
