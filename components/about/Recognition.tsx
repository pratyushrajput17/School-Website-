'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'
import { Award, ShieldCheck, Medal, ScrollText, Globe, Verified } from 'lucide-react'

const recognitions = [
  {
    icon: Award,
    title: 'CBSE Affiliation',
    description: 'Permanently affiliated with the Central Board of Secondary Education, ensuring a nationally recognized curriculum.',
    badge: 'Affiliated',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: ShieldCheck,
    title: 'ISO Certified',
    description: 'ISO 9001:2015 certified for quality management systems in educational processes and administration.',
    badge: 'Certified',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Medal,
    title: 'National Award Winner',
    description: 'Recipient of the National Award for Excellence in Education, recognizing our contribution to the field.',
    badge: 'Awarded',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: ScrollText,
    title: 'Academic Recognition',
    description: 'Consistently ranked among the top schools in the region for academic performance and holistic development.',
    badge: 'Top Ranked',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Globe,
    title: 'Global Partnerships',
    description: 'Collaborations with international educational institutions for exchange programs and global curriculum.',
    badge: 'Global',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Verified,
    title: 'Green Campus Award',
    description: 'Recognized for sustainable practices including solar energy, rainwater harvesting, and eco-friendly initiatives.',
    badge: 'Eco-Friendly',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
] as const

export default function Recognition() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Recognition & Affiliations"
          title="Accredited & Recognized"
          description="Our partnerships and certifications reflect our commitment to maintaining the highest standards in education."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {recognitions.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariant}
              className="group rounded-2xl border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <span className={`rounded-full border px-3 py-0.5 text-xs font-medium ${
                  item.color === 'text-blue-600'
                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                    : item.color === 'text-emerald-600'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : item.color === 'text-amber-600'
                    ? 'border-amber-200 bg-amber-50 text-amber-700'
                    : item.color === 'text-violet-600'
                    ? 'border-violet-200 bg-violet-50 text-violet-700'
                    : item.color === 'text-rose-600'
                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                    : 'border-cyan-200 bg-cyan-50 text-cyan-700'
                }`}>
                  {item.badge}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
