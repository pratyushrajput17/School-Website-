'use client'

import { motion, type Variants } from 'framer-motion'
import { Building2, Expand, Map, Monitor, Trophy, Orbit } from 'lucide-react'

const timeline = [
  { year: 2005, title: 'Founding Year', icon: Building2, description: 'School established with a bold vision for quality education.' },
  { year: 2010, title: 'Expansion', icon: Expand, description: 'New academic block and faculty expansion.' },
  { year: 2015, title: 'New Campus', icon: Map, description: 'Dedicated sports complex and science center.' },
  { year: 2020, title: 'Digital Learning', icon: Monitor, description: 'Smart classrooms and virtual labs introduced.' },
  { year: 2024, title: 'Achievements', icon: Trophy, description: 'National ranking and multiple academic accolades.' },
  { year: 2026, title: 'Future Vision', icon: Orbit, description: 'Global partnerships and innovation lab launch.' },
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
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function JourneyTimeline() {
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
            Our Journey
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Milestones That Define Us
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-8 right-8 top-12 hidden h-0.5 bg-blue-200 lg:block" />

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 bg-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <item.icon className="h-7 w-7 text-blue-600" />
                </div>
                <span className="mt-3 text-sm font-bold text-blue-600">
                  {item.year}
                </span>
                <h3 className="mt-1 text-base font-bold text-primary">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
