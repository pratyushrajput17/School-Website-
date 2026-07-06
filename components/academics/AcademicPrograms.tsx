'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Puzzle, BookOpen, Lightbulb, GraduationCap } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const programs = [
  {
    icon: Puzzle,
    title: 'Pre-Primary',
    subtitle: 'Age: 3–5 Years',
    description: 'A nurturing environment where young learners discover the joy of learning through play, exploration, and creative activities that build strong foundations.',
    features: ['Activity-based learning', 'Language development', 'Social skills', 'Creative expression'],
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    gradient: 'from-blue-600 to-blue-400',
  },
  {
    icon: BookOpen,
    title: 'Primary School',
    subtitle: 'Classes I–V',
    description: 'Building strong academic foundations with a focus on literacy, numeracy, scientific curiosity, and holistic development through engaging methodologies.',
    features: ['Strong fundamentals', 'Interactive learning', 'Co-curricular exposure', 'Character building'],
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    gradient: 'from-emerald-600 to-emerald-400',
  },
  {
    icon: Lightbulb,
    title: 'Middle School',
    subtitle: 'Classes VI–VIII',
    description: 'A transitional phase that fosters critical thinking, subject-depth exploration, and leadership skills while preparing students for senior secondary challenges.',
    features: ['Critical thinking', 'Subject specialization', 'Digital education', 'Leadership development'],
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    gradient: 'from-violet-600 to-violet-400',
  },
  {
    icon: GraduationCap,
    title: 'Senior Secondary',
    subtitle: 'Classes IX–XII',
    description: 'Comprehensive board preparation with career-focused streams, competitive exam training, and guidance for higher education and professional pathways.',
    features: ['Board exam preparation', 'Career guidance', 'Competitive coaching', 'University counseling'],
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    gradient: 'from-amber-600 to-amber-400',
  },
] as const

export default function AcademicPrograms() {
  return (
    <section id="programs" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Academic Programs"
          title="A Program for Every Stage"
          description="From early childhood to higher secondary, our programs are designed to meet the developmental needs of every learner."
        />

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-2"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {programs.map((program) => (
            <motion.div
              key={program.title}
              variants={cardVariant}
              className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-md lg:p-10"
            >
              <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${program.gradient} opacity-5 transition-all duration-500 group-hover:scale-150 group-hover:opacity-10`} />
              <div className="relative">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${program.bg}`}>
                  <program.icon className={`h-7 w-7 ${program.color}`} />
                </div>
                <div className="mt-5 flex items-baseline gap-3">
                  <h3 className="text-2xl font-bold text-primary">{program.title}</h3>
                  <span className="text-sm font-medium text-blue-600">{program.subtitle}</span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {program.description}
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${program.color.replace('text-', 'bg-')}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/admissions"
                  className="group/btn mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
