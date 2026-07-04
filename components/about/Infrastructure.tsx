'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Building2, Library, FlaskConical, Dumbbell, Monitor, Bus } from 'lucide-react'
import Link from 'next/link'

const facilities = [
  {
    icon: Building2,
    title: 'Modern Campus',
    description: 'Spread across 15 acres of lush green campus, our school provides an inspiring environment that blends nature with modern architecture.',
    features: ['Wi-Fi enabled campus', 'Rainwater harvesting', 'Solar-powered buildings', 'Landscaped gardens'],
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Library,
    title: 'Library & Media Center',
    description: 'A vast repository of knowledge with over 20,000 books, digital resources, and quiet study spaces designed for research and exploration.',
    features: ['20,000+ books & journals', 'Digital library access', 'Quiet reading zones', 'Research assistance'],
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: FlaskConical,
    title: 'Science Laboratories',
    description: 'Fully equipped Physics, Chemistry, and Biology labs with modern apparatus and safety standards for hands-on experimental learning.',
    features: ['Physics lab with modern equipment', 'Chemistry lab with safety systems', 'Biology lab with microscopes', 'Junior science lab'],
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Dumbbell,
    title: 'Sports Complex',
    description: 'A sprawling sports facility with indoor and outdoor arenas for athletics, team sports, and individual fitness development.',
    features: ['Olympic-size swimming pool', 'Basketball & tennis courts', 'Indoor badminton hall', 'Football field & track'],
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Monitor,
    title: 'Computer Laboratories',
    description: 'Modern computer labs equipped with the latest hardware and software to prepare students for a technology-driven world.',
    features: ['80+ workstations', 'High-performance systems', 'Coding & robotics kits', '3D printing lab'],
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Bus,
    title: 'Transport',
    description: 'A reliable fleet of GPS-tracked buses with trained drivers and attendants ensuring safe and comfortable daily commutes.',
    features: ['GPS-tracked buses', 'Female attendants on every route', 'Regular safety inspections', 'Doorstep pickup & drop'],
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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

export default function Infrastructure() {
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
            Infrastructure
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            World-Class Facilities
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our campus is designed to inspire learning, creativity, and holistic
            growth at every turn.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 space-y-16 lg:space-y-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              variants={itemVariants}
              className={`grid items-center gap-8 lg:gap-16 ${
                index % 2 === 0 ? 'lg:grid-cols-[1fr_1.2fr]' : 'lg:grid-cols-[1.2fr_1fr]'
              }`}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]">
                    <div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-500/10 via-transparent to-primary/5" />
                  </div>
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${facility.bg}`}>
                      <facility.icon className={`h-6 w-6 ${facility.color}`} />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-primary">
                      {facility.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {facility.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {facility.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${facility.color.replace('text-', 'bg-').replace('600', '500')}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/facilities"
                      className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Explore {facility.title}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="lg:order-2">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]">
                      <div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-500/10 via-transparent to-primary/5" />
                    </div>
                  </div>
                  <div className="lg:order-1">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${facility.bg}`}>
                      <facility.icon className={`h-6 w-6 ${facility.color}`} />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-primary">
                      {facility.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {facility.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {facility.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${facility.color.replace('text-', 'bg-').replace('600', '500')}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/facilities"
                      className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Explore {facility.title}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
