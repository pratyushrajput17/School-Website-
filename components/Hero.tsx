'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import {
  GraduationCap,
  Users,
  Shield,
  Trophy,
  ArrowRight,
  Play,
} from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const stats = [
  { value: `${schoolConfig.stats.students.value}${schoolConfig.stats.students.suffix}`, label: 'Students' },
  { value: `${schoolConfig.stats.teachers.value}${schoolConfig.stats.teachers.suffix}`, label: 'Teachers' },
  { value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`, label: 'Years' },
  { value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`, label: 'Board Results' },
] as const

const infoCards = [
  { icon: GraduationCap, label: 'Smart Classrooms', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Users, label: 'Experienced Faculty', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Shield, label: 'Safe Campus', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Trophy, label: 'Sports Excellence', color: 'text-amber-600', bg: 'bg-amber-50' },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const delays = [0, 0.5, 1, 1.5]

function FloatingInfoCard({
  icon: Icon,
  label,
  color,
  bg,
  className,
  index = 0,
}: {
  icon: React.ElementType
  label: string
  color: string
  bg: string
  className?: string
  index?: number
}) {
  return (
    <motion.div
      className={`flex items-center gap-2.5 rounded-xl border border-border/50 bg-white px-3.5 py-2.5 shadow-sm ${className}`}
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delays[index % delays.length],
      }}
    >
      <div className={`rounded-lg p-1.5 ${bg}`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <span className="whitespace-nowrap text-sm font-medium text-primary">
        {label}
      </span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[90vh] items-center py-20 lg:py-32">
          <motion.div
            className="grid w-full gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col gap-8">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  </span>
                  {schoolConfig.admission.badge}
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl"
                variants={itemVariants}
              >
                Building Future Leaders Through{' '}
                <span className="text-blue-600">Excellence</span> in Education
              </motion.h1>

              <motion.p
                className="max-w-lg text-lg leading-relaxed text-muted-foreground"
                variants={itemVariants}
              >
                {schoolConfig.hero.subtitle}
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-4"
                variants={itemVariants}
              >
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  aria-label="Apply for Admission"
                >
                  Apply for Admission
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="Explore Campus"
                >
                  <Play className="h-4 w-4" />
                  Explore Campus
                </Link>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-8 sm:grid-cols-4"
                variants={itemVariants}
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="relative hidden lg:block"
              variants={itemVariants}
            >
              <div className="relative px-6 py-10">
                <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="rounded-xl border border-white/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                          <Play className="h-4 w-4 fill-white text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary">
                            Campus Tour
                          </p>
                          <p className="text-xs text-muted-foreground">
                            See our world-class facilities
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs font-semibold text-blue-600">
                        A
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-xs font-semibold text-emerald-600">
                        B
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-xs font-semibold text-amber-600">
                        C
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-xs font-semibold text-violet-600">
                        D
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-200" />
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-200" />
                    </div>
                  </div>
                </div>

                <FloatingInfoCard
                  icon={GraduationCap}
                  label="Smart Classrooms"
                  color="text-blue-600"
                  bg="bg-blue-50"
                  className="absolute left-0 top-0"
                  index={0}
                />
                <FloatingInfoCard
                  icon={Users}
                  label="Experienced Faculty"
                  color="text-emerald-600"
                  bg="bg-emerald-50"
                  className="absolute right-0 top-8"
                  index={1}
                />
                <FloatingInfoCard
                  icon={Shield}
                  label="Safe Campus"
                  color="text-violet-600"
                  bg="bg-violet-50"
                  className="absolute bottom-8 left-0"
                  index={2}
                />
                <FloatingInfoCard
                  icon={Trophy}
                  label="Sports Excellence"
                  color="text-amber-600"
                  bg="bg-amber-50"
                  className="absolute bottom-0 right-0"
                  index={3}
                />
              </div>
            </motion.div>

            <motion.div
              className="lg:hidden"
              variants={itemVariants}
            >
              <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-xl border border-white/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                        <Play className="h-4 w-4 fill-white text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          Campus Tour
                        </p>
                        <p className="text-xs text-muted-foreground">
                          See our world-class facilities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs font-semibold text-blue-600">
                      A
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-xs font-semibold text-emerald-600">
                      B
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-xs font-semibold text-amber-600">
                      C
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-xs font-semibold text-violet-600">
                      D
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-200" />
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-200" />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {infoCards.map((card) => (
                  <div
                    key={card.label}
                    className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-white px-3.5 py-2.5 shadow-sm"
                  >
                    <div className={`rounded-lg p-1.5 ${card.bg}`}>
                      <card.icon
                        className={`h-4 w-4 ${card.color}`}
                      />
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {card.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
