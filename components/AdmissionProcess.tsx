'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FileText,
  CalendarDays,
  ClipboardCheck,
  BadgeCheck,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const steps = [
  {
    icon: FileText,
    title: 'Submit Application',
    description:
      'Complete the online admission form with student details.',
  },
  {
    icon: CalendarDays,
    title: 'Campus Visit',
    description:
      'Visit the campus and interact with our admission counselors.',
  },
  {
    icon: ClipboardCheck,
    title: 'Assessment',
    description:
      'Age-appropriate interaction or entrance assessment.',
  },
  {
    icon: BadgeCheck,
    title: 'Admission Confirmation',
    description:
      "Receive confirmation and begin your child's educational journey.",
  },
] as const

const features = [
  'Quick Admission',
  'Expert Guidance',
  'Transparent Process',
] as const

export default function AdmissionProcess() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
              Admissions
            </span>
          </motion.div>

          <motion.h2
            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            Your Journey Begins Here
          </motion.h2>

          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            Our admission process is simple, transparent, and designed to help
            every family find the right educational path for their child.
          </motion.p>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute left-[2rem] right-[2rem] top-8 h-0.5 rounded-full bg-blue-100" />

                <motion.div
                  className="absolute left-[2rem] top-8 h-0.5 origin-left rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
                  style={{ width: 'calc(100% - 4rem)' }}
                />

                <div className="grid grid-cols-4 gap-6">
                  {steps.map((step, index) => (
                    <div
                      key={step.title}
                      className="group flex flex-col items-center text-center"
                    >
                      <motion.div
                        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-600 bg-white shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:shadow-blue-200"
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeOut',
                          delay: 0.3 + index * 0.15,
                        }}
                      >
                        <step.icon className="h-6 w-6 text-blue-600" />
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm">
                          {index + 1}
                        </span>
                      </motion.div>

                      <motion.div
                        className="mt-6 w-full rounded-2xl border border-border/40 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeOut',
                          delay: 0.4 + index * 0.15,
                        }}
                      >
                        <h3 className="text-base font-bold text-primary">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:hidden">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="group relative flex gap-6 pb-12 last:pb-0"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 bg-white shadow-sm"
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <step.icon className="h-5 w-5 text-blue-600" />
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm">
                        {index + 1}
                      </span>
                    </motion.div>

                    {index < steps.length - 1 && (
                      <div className="mt-2 w-0.5 flex-1 rounded-full bg-blue-100" />
                    )}
                  </div>

                  <motion.div
                    className="flex-1 rounded-2xl border border-border/40 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  >
                    <h3 className="text-base font-bold text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="hidden lg:col-span-1 lg:block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <motion.div
              className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 shadow-xl shadow-blue-500/20"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-3 w-3 rounded-full bg-green-400" />
                <span className="text-sm font-medium text-blue-100">
                  {schoolConfig.admission.badge}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                {schoolConfig.admission.applyText}
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-200">
                    Academic Session
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {schoolConfig.admission.session}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-200">
                    Application Deadline
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {schoolConfig.admission.deadline}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-200">
                    Seats Available
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {schoolConfig.admission.seats}
                  </p>
                </div>
              </div>

              <Link
                href="/admissions"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
                aria-label="Apply Now"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2.5"
              >
                <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                <span className="text-sm font-medium text-primary">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
