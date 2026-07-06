'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Lightbulb, Users, Heart, Award, Sparkles } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const values = [
  { icon: ShieldCheck, title: 'Integrity', description: 'Upholding honesty and strong moral principles in every aspect of school life.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Lightbulb, title: 'Innovation', description: 'Embracing creative teaching methods and forward-thinking educational practices.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Users, title: 'Leadership', description: 'Developing confident individuals who inspire and guide others with vision.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Heart, title: 'Respect', description: 'Fostering a culture of mutual respect, empathy, and appreciation for diversity.', color: 'text-rose-600', bg: 'bg-rose-50' },
  { icon: Award, title: 'Excellence', description: 'Striving for the highest standards in academics, character, and extracurricular pursuits.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Sparkles, title: 'Compassion', description: 'Encouraging kindness, service, and a deep sense of social responsibility.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
] as const

export default function CoreValues() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Core Values"
          title="Principles That Guide Us"
          description="Our values are the foundation of every decision we make and every interaction we nurture within our school community."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={cardVariant}
              className="group rounded-2xl border border-border/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${value.bg}`}>
                <value.icon className={`h-6 w-6 ${value.color}`} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-primary">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
