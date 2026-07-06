'use client'

import { motion } from 'framer-motion'
import { Users, Beaker, Monitor, Lightbulb } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, fadeIn } from '@/lib/animations'

const pillars = [
  {
    icon: Users,
    title: 'Student-Centric Learning',
    description: 'Every student is unique. Our approach focuses on personalized learning paths, small class sizes, and individual attention to ensure each child reaches their full potential.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Beaker,
    title: 'Practical Education',
    description: 'Learning by doing is at the core of our pedagogy. Through experiments, projects, and hands-on activities, students develop a deep understanding of concepts.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Monitor,
    title: 'Digital Learning',
    description: 'Technology enhances education at every level. Smart classrooms, digital resources, and online platforms create an engaging and interactive learning environment.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Lightbulb,
    title: 'Critical Thinking',
    description: 'We nurture analytical minds through inquiry-based learning, problem-solving challenges, and discussions that encourage students to question and explore.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
] as const

export default function LearningPhilosophy() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Learning Philosophy"
          title="How We Inspire Learning"
          description="Our educational philosophy is built on four foundational pillars that guide every aspect of teaching and learning at our school."
        />

        <motion.div
          className="mt-16 space-y-16 lg:space-y-24"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              variants={fadeIn}
              className={`grid items-center gap-8 lg:gap-16 ${
                index % 2 === 0 ? 'lg:grid-cols-[1.2fr_1fr]' : 'lg:grid-cols-[1fr_1.2fr]'
              }`}
            >
              <div className={`${index % 2 === 0 ? '' : 'lg:order-2'}`}>
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]">
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-500/10 via-transparent to-primary/5" />
                </div>
              </div>
              <div className={`${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${pillar.bg}`}>
                  <pillar.icon className={`h-7 w-7 ${pillar.color}`} />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
