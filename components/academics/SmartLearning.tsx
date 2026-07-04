'use client'

import { motion, type Variants } from 'framer-motion'
import { Monitor, Presentation, Brain, FlaskConical } from 'lucide-react'

const features = [
  {
    icon: Monitor,
    title: 'Digital Classrooms',
    description: 'Every classroom is equipped with interactive smart boards, projectors, and high-speed internet, creating an engaging multimedia learning environment.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Presentation,
    title: 'Smart Boards',
    description: 'Interactive whiteboards that bring lessons to life with touch-enabled displays, digital annotations, and seamless integration with educational software.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Brain,
    title: 'AI-Assisted Learning',
    description: 'Personalized learning platforms powered by artificial intelligence adapt to each student\'s pace, identifying strengths and areas for improvement.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: FlaskConical,
    title: 'Project-Based Learning',
    description: 'Students work on real-world projects that integrate multiple subjects, fostering collaboration, creativity, and problem-solving skills.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function SmartLearning() {
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
            Smart Learning
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Technology-Enabled Education
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We leverage cutting-edge technology to create an interactive, personalized,
            and future-ready learning experience for every student.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-md lg:p-10"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg}`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-primary">{feature.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
