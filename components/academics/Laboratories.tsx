'use client'

import { motion } from 'framer-motion'
import { Monitor, FlaskConical, Languages, Bot } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const labs = [
  {
    icon: Monitor,
    title: 'Computer Lab',
    description: 'Our computer laboratory is equipped with 60 high-performance workstations, providing students with access to the latest software, programming tools, and high-speed internet for comprehensive digital education.',
    features: ['60 workstations', 'Latest software suites', 'High-speed internet', 'Programming tools'],
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: FlaskConical,
    title: 'Science Lab',
    description: 'Fully equipped Physics, Chemistry, and Biology laboratories with modern apparatus, safety equipment, and specimen collections for hands-on scientific exploration.',
    features: ['Physics lab', 'Chemistry lab', 'Biology lab', 'Safety equipment'],
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Languages,
    title: 'Language Lab',
    description: 'A dedicated language laboratory with audio-visual tools, speech recognition software, and multimedia resources to develop proficiency in multiple languages.',
    features: ['Audio-visual tools', 'Speech recognition', 'Multimedia resources', '24+ language modules'],
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Bot,
    title: 'Robotics Lab',
    description: 'An innovation hub where students design, build, and program robots using cutting-edge kits, 3D printers, and microcontrollers, fostering creativity and engineering skills.',
    features: ['Robotics kits', '3D printers', 'Microcontrollers', 'AI integration'],
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
] as const

export default function Laboratories() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Laboratories"
          title="Where Theory Meets Practice"
          description="Our state-of-the-art laboratories provide students with the tools and space to explore, experiment, and innovate."
        />

        <motion.div
          className="mt-16 space-y-16 lg:space-y-24"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {labs.map((lab, index) => (
            <motion.div
              key={lab.title}
              variants={cardVariant}
              className={`grid items-center gap-8 lg:gap-16 ${
                index % 2 === 0 ? 'lg:grid-cols-[1.2fr_1fr]' : 'lg:grid-cols-[1fr_1.2fr]'
              }`}
            >
              <div className={`${index % 2 === 0 ? '' : 'lg:order-2'}`}>
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]">
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-500/10 via-transparent to-primary/5" />
                </div>
              </div>
              <div className={`${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${lab.bg}`}>
                  <lab.icon className={`h-7 w-7 ${lab.color}`} />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-primary">{lab.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {lab.description}
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {lab.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${lab.color.replace('text-', 'bg-')}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/facilities"
                  className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  View Facilities
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
