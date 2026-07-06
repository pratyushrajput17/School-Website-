'use client'

import { motion } from 'framer-motion'
import {
  FlaskConical, Calculator, Languages, Monitor,
  ChartBar, Globe, Palette, Dumbbell,
} from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const subjects = [
  { icon: FlaskConical, title: 'Science', description: 'Physics, Chemistry, Biology with hands-on lab experience.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Calculator, title: 'Mathematics', description: 'Conceptual mastery from arithmetic to advanced calculus.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Languages, title: 'Languages', description: 'English, Hindi, and foreign language proficiency.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Monitor, title: 'Computer Science', description: 'Coding, AI, robotics, and digital literacy.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: ChartBar, title: 'Commerce', description: 'Accountancy, Economics, Business Studies.', color: 'text-rose-600', bg: 'bg-rose-50' },
  { icon: Globe, title: 'Humanities', description: 'History, Geography, Political Science, Sociology.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { icon: Palette, title: 'Arts', description: 'Fine arts, music, dance, drama, and creative design.', color: 'text-pink-600', bg: 'bg-pink-50' },
  { icon: Dumbbell, title: 'Sports', description: 'Physical education, athletics, and team sports.', color: 'text-orange-600', bg: 'bg-orange-50' },
] as const

export default function SubjectAreas() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Subject Areas"
          title="A Broad Spectrum of Learning"
          description="Our curriculum offers a rich variety of subjects that cater to diverse interests, aptitudes, and career aspirations."
        />

        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {subjects.map((subject) => (
            <motion.div
              key={subject.title}
              variants={cardVariant}
              className="group rounded-2xl border border-white/40 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${subject.bg}`}>
                <subject.icon className={`h-6 w-6 ${subject.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-primary">{subject.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {subject.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
