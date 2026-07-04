'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, GraduationCap } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const trustItems = [
  'Limited Seats Available',
  'Merit-Based Scholarships',
  'Global Curriculum Standards',
  'Holistic Development Focus',
] as const

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary py-24 lg:py-32">
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg backdrop-blur-sm">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>

          <h2 className="mt-8 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Give Your Child
            <br />
            the Best Education?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            Admissions for the academic session {schoolConfig.admission.session} are now open.
            Secure your child&apos;s future at one of the most respected
            educational institutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              aria-label="Apply for Admission"
            >
              Apply for Admission
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              aria-label="Contact us"
            >
              Talk to Our Team
            </Link>
          </div>

          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            {trustItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
