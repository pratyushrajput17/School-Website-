'use client'

import { motion, type Variants } from 'framer-motion'
import { Award, Trophy, Medal, Star, Target, TrendingUp } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const achievements = [
  { icon: Award, label: 'National Awards', value: '15+', description: 'State & national recognition for academic excellence', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Trophy, label: 'Board Results', value: '100%', description: 'Consistent top-tier board exam outcomes', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Medal, label: 'Olympiad Winners', value: '50+', description: 'Gold, silver & bronze in national olympiads', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Star, label: 'Sports Championships', value: '12', description: 'District and state-level sports titles', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Target, label: 'University Placements', value: '95%', description: 'Graduates placed in top universities', color: 'text-rose-600', bg: 'bg-rose-50' },
  { icon: TrendingUp, label: 'Overall Growth', value: '500%', description: 'Enrollment growth since inception', color: 'text-cyan-600', bg: 'bg-cyan-50' },
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

export default function Achievements() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            Our Achievements
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Excellence That Speaks for Itself
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Every award, every result, and every milestone reflects our unwavering
            commitment to the highest standards of education.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {achievements.map((item) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              className="group rounded-2xl border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="mt-5">
                <span className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  {item.value}
                </span>
              </div>
              <h3 className="mt-1 text-base font-bold text-primary">{item.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
