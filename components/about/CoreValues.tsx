'use client'

import { motion, type Variants } from 'framer-motion'
import { ShieldCheck, Lightbulb, Users, Heart, Award, Sparkles } from 'lucide-react'

const values = [
  { icon: ShieldCheck, title: 'Integrity', description: 'Upholding honesty and strong moral principles in every aspect of school life.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Lightbulb, title: 'Innovation', description: 'Embracing creative teaching methods and forward-thinking educational practices.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Users, title: 'Leadership', description: 'Developing confident individuals who inspire and guide others with vision.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Heart, title: 'Respect', description: 'Fostering a culture of mutual respect, empathy, and appreciation for diversity.', color: 'text-rose-600', bg: 'bg-rose-50' },
  { icon: Award, title: 'Excellence', description: 'Striving for the highest standards in academics, character, and extracurricular pursuits.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Sparkles, title: 'Compassion', description: 'Encouraging kindness, service, and a deep sense of social responsibility.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function CoreValues() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            Core Values
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Principles That Guide Us
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our values are the foundation of every decision we make and every
            interaction we nurture within our school community.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
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
