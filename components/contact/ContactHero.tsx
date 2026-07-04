'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

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

export default function ContactHero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-primary/[0.02] blur-3xl" />
      <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.02] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[80vh] flex-col items-center justify-center py-20 text-center lg:py-32">
          <motion.div
            className="w-full max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                Contact Us
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
              variants={itemVariants}
            >
              We&apos;d Love to{' '}
              <span className="text-blue-600">Hear From You</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
              variants={itemVariants}
            >
              Whether you have a question about admissions, academics, or campus
              life — our team is here to help. Reach out and let&apos;s start a
              conversation.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </Link>
              <Link
                href="mailto:info@schoolname.edu"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </Link>
              <Link
                href="#map"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MapPin className="h-4 w-4" />
                Directions
              </Link>
            </motion.div>

            <motion.div
              className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]"
              variants={itemVariants}
            >
              <div className="aspect-[21/9] w-full bg-gradient-to-br from-blue-500/10 via-transparent to-primary/5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
