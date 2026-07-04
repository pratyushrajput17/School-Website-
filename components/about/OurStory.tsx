'use client'

import { motion, type Variants } from 'framer-motion'
import { BookOpen, Heart, TrendingUp, Globe } from 'lucide-react'

const milestones = [
  { year: 2005, title: 'Foundation', description: 'School established with 120 students and a vision to redefine education.' },
  { year: 2010, title: 'Academic Excellence', description: 'First batch achieved 100% board results, setting a benchmark for quality.' },
  { year: 2015, title: 'Campus Expansion', description: 'State-of-the-art science labs, library, and sports complex inaugurated.' },
  { year: 2020, title: 'Digital Transformation', description: 'Smart classrooms and blended learning models adopted across all grades.' },
  { year: 2024, title: 'National Recognition', description: 'Ranked among top schools nationally for academic excellence and innovation.' },
  { year: 2026, title: 'Global Reach', description: 'International collaborations, exchange programs, and global curriculum integration.' },
] as const

const journeyHighlights = [
  { icon: BookOpen, label: 'Why We Started', detail: 'Founded to bridge the gap between traditional education and 21st-century learning needs.' },
  { icon: Heart, label: 'Our Mission', detail: 'To nurture confident, compassionate, and capable leaders who contribute meaningfully to society.' },
  { icon: TrendingUp, label: 'Our Growth', detail: 'From 120 students to 2,500+ learners, our campus has expanded sevenfold since inception.' },
  { icon: Globe, label: 'Where We Stand', detail: 'Recognised as one of the top schools nationally, with 100% board results and global partnerships.' },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function OurStory() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            The School Story
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            From Vision to{' '}
            <span className="text-blue-600">Reality</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            What began as a bold vision to transform education has grown into one of
            the most respected learning institutions in the region.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="space-y-6">
              {journeyHighlights.map((item, index) => (
                <div
                  key={item.label}
                  className="group flex gap-4 rounded-2xl border border-border/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{item.label}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="space-y-10">
              {milestones.map((milestone) => (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className="relative pl-10 before:absolute before:left-[11px] before:top-2 before:h-full before:w-px before:bg-blue-200 last:before:hidden"
                >
                  <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-500 bg-white">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-sm font-semibold text-blue-600">
                    {milestone.year}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-primary">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
