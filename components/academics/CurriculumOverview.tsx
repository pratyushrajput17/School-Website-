'use client'

import { motion } from 'framer-motion'
import { Baby, BookOpen, Layers, GraduationCap, Award } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, revealLeft } from '@/lib/animations'

const stages = [
  {
    icon: Baby,
    title: 'Foundation',
    subtitle: 'Pre-Primary',
    description: 'Play-based learning that develops motor skills, language, and social interaction through structured activities and guided exploration.',
    year: 'Age 3–5',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: BookOpen,
    title: 'Primary',
    subtitle: 'Classes I–V',
    description: 'Building core competencies in languages, mathematics, science, and social studies with an emphasis on conceptual understanding.',
    year: 'Ages 6–10',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Layers,
    title: 'Middle',
    subtitle: 'Classes VI–VIII',
    description: 'Introducing subject specialization, critical analysis, and project-based learning to prepare students for advanced studies.',
    year: 'Ages 11–13',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: GraduationCap,
    title: 'Secondary',
    subtitle: 'Classes IX–X',
    description: 'Comprehensive board curriculum with focus on academic excellence, practical applications, and career awareness.',
    year: 'Ages 14–15',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Award,
    title: 'Senior Secondary',
    subtitle: 'Classes XI–XII',
    description: 'Stream-based learning with Science, Commerce, and Humanities pathways, coupled with competitive exam preparation.',
    year: 'Ages 16–17',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
] as const

export default function CurriculumOverview() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Curriculum Overview"
          title="A Curriculum Designed for Growth"
          description="Our curriculum progresses through five carefully structured stages, each building on the last to create a seamless learning journey."
        />

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-[27px] top-0 hidden w-px bg-gradient-to-b from-blue-200 via-blue-200 to-transparent md:block" />

          <motion.div
            className="space-y-12 md:space-y-0"
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {stages.map((stage) => (
              <motion.div
                key={stage.title}
                variants={revealLeft}
                className="relative md:flex md:items-start md:gap-12"
              >
                <div className="relative z-10 flex w-14 shrink-0 items-center gap-4 md:flex-col md:items-center">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white shadow-sm backdrop-blur-sm ${stage.bg}`}>
                    <stage.icon className={`h-7 w-7 ${stage.color}`} />
                  </div>
                  <span className="whitespace-nowrap text-sm font-bold text-blue-600 md:mt-2">
                    {stage.year}
                  </span>
                </div>

                <div className="mt-4 flex-1 rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:mt-0 md:p-8">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-xl font-bold text-primary">{stage.title}</h3>
                    <span className={`text-sm font-medium ${stage.color}`}>
                      {stage.subtitle}
                    </span>
                  </div>
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
