'use client'

import { motion } from 'framer-motion'
import { Baby, Backpack, BookOpen, GraduationCap } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const levels = [
  {
    icon: Baby,
    title: 'Nursery',
    age: '3 – 4 Years',
    classes: 'Pre-Nursery & Nursery',
    description: 'A warm, nurturing environment where young learners take their first steps into formal education through play-based learning.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200/50',
  },
  {
    icon: Backpack,
    title: 'Primary',
    age: '5 – 10 Years',
    classes: 'Class I – V',
    description: 'Building strong foundations in literacy, numeracy, and critical thinking with a balanced approach to academics and co-curricular activities.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/50',
  },
  {
    icon: BookOpen,
    title: 'Middle School',
    age: '11 – 13 Years',
    classes: 'Class VI – VIII',
    description: 'A transitional phase that deepens subject knowledge while fostering independent thinking, collaboration, and leadership skills.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200/50',
  },
  {
    icon: GraduationCap,
    title: 'Senior Secondary',
    age: '14 – 17 Years',
    classes: 'Class IX – XII',
    description: 'Rigorous academic preparation for board examinations with specialized streams and career guidance for higher education pathways.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200/50',
  },
] as const

export default function Eligibility() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Eligibility"
          title="Find the Right"
          highlight="Grade for Your Child"
          description="Age-appropriate admission criteria designed to ensure every child thrives in their learning journey."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {levels.map((level) => (
            <motion.div
              key={level.title}
              variants={cardVariant}
              className={`group rounded-2xl border ${level.border} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${level.bg}`}>
                <level.icon className={`h-6 w-6 ${level.color}`} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-primary">{level.title}</h3>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                  <span className="text-xs font-medium text-muted-foreground">Age Group</span>
                  <span className="text-sm font-bold text-primary">{level.age}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                  <span className="text-xs font-medium text-muted-foreground">Classes</span>
                  <span className="text-sm font-bold text-primary">{level.classes}</span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {level.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
