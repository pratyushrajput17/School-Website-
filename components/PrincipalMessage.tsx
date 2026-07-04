'use client'

import { motion, type Variants } from 'framer-motion'
import { Check, Quote, User } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const achievements = [
  'Academic Excellence',
  'Student Success',
  'Modern Education',
  'Character Building',
] as const

const achievementContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const achievementItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function PrincipalMessage() {
  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
              {schoolConfig.principal.badge}
            </span>
          </motion.div>

          <motion.h2
            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            A Message from Our Principal
          </motion.h2>

          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            Our philosophy is rooted in nurturing future leaders through
            academic excellence, values, discipline, and innovation.
          </motion.p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-blue-200/40 lg:-inset-6" />

              <div className="absolute -right-3 top-8 h-4 w-4 rounded-full bg-blue-400/40 lg:-right-4 lg:top-12" />
              <div className="absolute -left-2 top-1/3 h-2.5 w-2.5 rounded-full bg-blue-300/50" />
              <div className="absolute -bottom-2 left-1/4 h-3 w-3 rounded-full bg-blue-400/30" />

              <div className="relative h-72 w-72 lg:h-96 lg:w-96">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 p-1 shadow-xl shadow-blue-500/20">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-slate-50 to-white">
                      <User className="h-28 w-28 text-blue-600/15 lg:h-36 lg:w-36" />
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-1/4"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-5 py-3 shadow-lg shadow-blue-500/10 backdrop-blur-sm">
                    <div>
                        <span className="text-2xl font-bold text-blue-600">
                          {schoolConfig.principal.experience}+
                        </span>
                    </div>
                    <div className="h-8 w-px bg-blue-200" />
                    <div>
                      <p className="text-xs font-semibold text-primary">
                        Years of
                      </p>
                      <p className="text-xs font-semibold text-primary">
                        Leadership
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
              Principal
            </span>

            <h3 className="mt-2 text-3xl font-bold leading-tight text-primary lg:text-4xl">
              {schoolConfig.principal.name}
            </h3>

            <div className="relative mt-6">
              <Quote className="h-10 w-10 text-blue-200" />
              <blockquote className="mt-1 text-xl italic leading-relaxed text-primary/75 lg:text-2xl">
                &ldquo;{schoolConfig.principal.quote}&rdquo;
              </blockquote>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-base leading-relaxed text-muted-foreground">
                At our school, we follow a student-first approach that nurtures
                holistic development. Our focus extends beyond textbooks to
                build strong values, encourage innovation, and foster a lifelong
                love for learning. Every child is unique, and we are committed
                to helping them discover and realize their full potential.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                We believe in fostering a strong partnership with parents to
                create a supportive ecosystem where every child feels valued,
                inspired, and empowered to achieve their dreams. Together, we
                build a community rooted in trust, respect, and shared purpose.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <svg
                className="h-10 w-36 text-primary/60"
                viewBox="0 0 150 40"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 25 Q15 8 28 22 Q38 32 48 18 Q58 4 72 20 Q84 33 96 17 Q108 4 120 22 Q132 36 145 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="mt-2">
                <p className="text-lg font-semibold text-primary">
                  {schoolConfig.principal.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {schoolConfig.principal.title}
                </p>
              </div>
            </div>

            <motion.div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
              variants={achievementContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement}
                  variants={achievementItemVariants}
                  className="flex items-center gap-2"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-3 w-3 text-blue-600" />
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
