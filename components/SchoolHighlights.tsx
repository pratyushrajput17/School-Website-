'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import {
  Users,
  GraduationCap,
  Calendar,
  Award,
  Monitor,
  Trophy,
} from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const statistics = [
  { value: schoolConfig.stats.students.value, suffix: schoolConfig.stats.students.suffix, label: 'Students', icon: Users },
  { value: schoolConfig.stats.teachers.value, suffix: schoolConfig.stats.teachers.suffix, label: 'Experienced Teachers', icon: GraduationCap },
  { value: schoolConfig.stats.years.value, suffix: schoolConfig.stats.years.suffix, label: 'Years of Excellence', icon: Calendar },
  { value: schoolConfig.stats.boardResults.value, suffix: schoolConfig.stats.boardResults.suffix, label: 'Board Exam Results', icon: Award },
  { value: schoolConfig.stats.smartClassrooms.value, suffix: schoolConfig.stats.smartClassrooms.suffix, label: 'Smart Classrooms', icon: Monitor },
  { value: schoolConfig.stats.awards.value, suffix: schoolConfig.stats.awards.suffix, label: 'State & National Awards', icon: Trophy },
] as const

function AnimatedCounter({
  target,
  duration = 2000,
  shouldStart,
}: {
  target: number
  duration?: number
  shouldStart: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [shouldStart, target, duration])

  return <>{count}</>
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
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

export default function SchoolHighlights() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-24 lg:py-32"
    >
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
              Our Achievements
            </span>
          </motion.div>

          <motion.h2
            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            Numbers That Reflect Our Excellence
          </motion.h2>

          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            Our growth, academic excellence, and student success tell a story of
            unwavering commitment to quality education.
          </motion.p>
        </div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {statistics.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="group rounded-2xl border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>

              <div className="mt-5">
                <span className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">
                  <AnimatedCounter
                    target={stat.value}
                    shouldStart={isInView}
                  />
                  {stat.suffix}
                </span>
              </div>

              <p className="mt-1.5 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
