'use client'

import { motion } from 'framer-motion'
import { ClipboardList, FolderGit2, Beaker, FileText, Target } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const stages = [
  {
    icon: ClipboardList,
    title: 'Continuous Assessment',
    description: 'Regular formative assessments track student progress throughout the term, providing timely feedback for improvement.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: FolderGit2,
    title: 'Projects',
    description: 'Interdisciplinary projects assess research skills, creativity, collaboration, and practical application of knowledge.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Beaker,
    title: 'Practical Exams',
    description: 'Hand-on practical examinations evaluate laboratory skills, experimental techniques, and scientific reasoning.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: FileText,
    title: 'Assignments',
    description: 'Structured assignments reinforce classroom learning and develop independent study habits and time management.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Target,
    title: 'Board Preparation',
    description: 'Comprehensive mock tests, revision programs, and exam strategy sessions prepare students for final board examinations.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
] as const

export default function AssessmentMethodology() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Assessment Methodology"
          title="Measuring Growth, Not Just Grades"
          description="Our assessment framework evaluates students holistically, combining traditional exams with modern evaluation methods."
        />

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-[27px] top-0 hidden w-px bg-gradient-to-b from-blue-200 via-blue-200 to-transparent md:block" />

          <motion.div
            className="space-y-12 md:space-y-0"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {stages.map((stage, index) => (
              <motion.div
                key={stage.title}
                variants={cardVariant}
                className="relative md:flex md:items-start md:gap-12"
              >
                <div className="relative z-10 flex w-14 shrink-0 items-center gap-4 md:flex-col md:items-center">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white shadow-sm backdrop-blur-sm ${stage.bg}`}>
                    <stage.icon className={`h-7 w-7 ${stage.color}`} />
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 md:mt-2">
                    {index + 1}
                  </span>
                </div>

                <div className="mt-4 flex-1 rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:mt-0 md:p-8">
                  <h3 className="text-xl font-bold text-primary">{stage.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
