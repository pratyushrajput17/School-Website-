'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Medal, Star, Target, TrendingUp } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const achievements = [
  { icon: Trophy, title: 'Olympiad Excellence', value: '50+', description: 'National and international olympiad medalists across subjects.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Award, title: 'Board Toppers', value: '100%', description: 'Consistent top-tier results in CBSE board examinations.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Medal, title: 'Sports Champions', value: '12', description: 'District and state-level championships in multiple sports.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Star, title: 'Scholarship Winners', value: '25+', description: 'Students awarded merit scholarships for academic excellence.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Target, title: 'Competition Winners', value: '100+', description: 'Awards in debates, quizzes, hackathons, and cultural events.', color: 'text-rose-600', bg: 'bg-rose-50' },
  { icon: TrendingUp, title: 'University Placements', value: '95%', description: 'Graduates admitted to top universities across India and abroad.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
] as const

export default function StudentAchievements() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Student Achievements"
          title="Excellence in Every Field"
          description="Our students consistently excel across academics, sports, and co-curricular arenas, bringing laurels to the school."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {achievements.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariant}
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
              <h3 className="mt-1 text-base font-bold text-primary">{item.title}</h3>
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
