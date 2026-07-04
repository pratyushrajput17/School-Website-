'use client'

import { motion, type Variants } from 'framer-motion'
import { Eye, Target } from 'lucide-react'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            Our Purpose
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            What Drives Us Forward
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-10 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-md lg:p-12"
          >
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl transition-all duration-500 group-hover:bg-blue-500/10" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <Eye className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-primary">Our Vision</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                To be a globally respected educational institution that nurtures
                compassionate leaders, innovative thinkers, and responsible global
                citizens who contribute meaningfully to society.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Global perspective in education',
                  'Holistic student development',
                  'Continuous innovation in teaching',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-10 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-md lg:p-12"
          >
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/5 blur-2xl transition-all duration-500 group-hover:bg-accent/10" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <Target className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-primary">Our Mission</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                To provide an inspiring, inclusive, and future-ready learning
                environment that empowers every student to discover their potential
                and excel academically, socially, and emotionally.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Academic excellence through innovative teaching',
                  'Character building and value-based education',
                  'Preparing students for a dynamic world',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
