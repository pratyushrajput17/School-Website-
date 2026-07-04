'use client'

import { motion, type Variants } from 'framer-motion'

const milestones = [
  { year: 2005, title: 'Foundation', description: 'School established with 120 students and a vision to redefine education.' },
  { year: 2010, title: 'Academic Excellence', description: 'First batch achieved 100% board results, setting a benchmark for quality.' },
  { year: 2015, title: 'Campus Expansion', description: 'State-of-the-art science labs, library, and sports complex inaugurated.' },
  { year: 2020, title: 'Digital Transformation', description: 'Smart classrooms and blended learning models adopted across all grades.' },
  { year: 2024, title: 'National Recognition', description: 'Ranked among top schools nationally for academic excellence and innovation.' },
  { year: 2026, title: 'Global Reach', description: 'International collaborations, exchange programs, and global curriculum integration.' },
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
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="sticky top-24">
              <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                Our Story
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
                A Journey of{' '}
                <span className="text-blue-600">Excellence</span> and Growth
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                What began as a small institution with a big dream has grown into one
                of the most respected educational destinations. Our story is written
                by the countless bright minds we&apos;ve nurtured and the futures
                we&apos;ve helped shape.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]">
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-blue-500/10 via-transparent to-primary/5" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
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
