'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant, fadeUp } from '@/lib/animations'
import {
  Puzzle,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Sparkles,
  Monitor,
  Award,
  Compass,
  Heart,
  ArrowRight,
} from 'lucide-react'

const programs = [
  {
    title: 'Pre-Primary',
    subtitle: 'Age: 3–5 Years',
    description:
      'Activity-based learning, creativity, communication and confidence.',
    icon: Puzzle,
    gradient: 'from-blue-600 to-blue-400',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    ring: 'ring-blue-600/10',
  },
  {
    title: 'Primary School',
    subtitle: 'Classes I–V',
    description:
      'Strong fundamentals in Mathematics, Science, Languages and Creativity.',
    icon: BookOpen,
    gradient: 'from-emerald-600 to-emerald-400',
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
    ring: 'ring-emerald-600/10',
  },
  {
    title: 'Middle School',
    subtitle: 'Classes VI–VIII',
    description:
      'Critical thinking, practical learning, digital education and leadership.',
    icon: Lightbulb,
    gradient: 'from-violet-600 to-violet-400',
    bg: 'bg-violet-50',
    color: 'text-violet-600',
    ring: 'ring-violet-600/10',
  },
  {
    title: 'Senior Secondary',
    subtitle: 'Classes IX–XII',
    description:
      'Board preparation, career guidance and competitive exam foundation.',
    icon: GraduationCap,
    gradient: 'from-amber-600 to-amber-400',
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    ring: 'ring-amber-600/10',
  },
] as const

const features = [
  { label: 'Smart Learning', icon: Sparkles },
  { label: 'Digital Classrooms', icon: Monitor },
  { label: 'Experienced Faculty', icon: Award },
  { label: 'Career Guidance', icon: Compass },
  { label: 'Value-Based Education', icon: Heart },
] as const

export default function AcademicPrograms() {
  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Academics"
          title="Learning Path for Every Stage"
          description="From foundational learning to higher secondary education, our balanced curriculum nurtures students at every stage of their academic journey."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {programs.map((program) => (
            <motion.div
              key={program.title}
              variants={cardVariant}
              className="group relative rounded-3xl border border-border/50 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`absolute left-8 right-8 top-0 h-0.5 rounded-full bg-gradient-to-r ${program.gradient}`}
              />

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${program.bg} ring-1 ${program.ring}`}
              >
                <program.icon className={`h-7 w-7 ${program.color}`} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-primary">
                {program.title}
              </h3>

              <p className={`mt-1 text-sm font-medium ${program.color}`}>
                {program.subtitle}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {program.description}
              </p>

              <Link
                href="/academics"
                className={`group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${program.color} transition-all hover:gap-2`}
                aria-label={`Learn more about ${program.title}`}
              >
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform duration-200" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="rounded-2xl border border-border/40 bg-white py-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <feature.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
