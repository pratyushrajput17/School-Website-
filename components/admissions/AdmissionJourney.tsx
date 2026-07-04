'use client'

import { motion, type Variants } from 'framer-motion'
import { FileText, Search, Users, ClipboardCheck, GraduationCap } from 'lucide-react'

const steps = [
  { icon: FileText, title: 'Submit Enquiry', description: 'Fill out the online enquiry form or visit our campus to express your interest.' },
  { icon: Search, title: 'Campus Visit', description: 'Tour our world-class facilities, meet our faculty, and experience the learning environment.' },
  { icon: Users, title: 'Interaction / Assessment', description: 'A friendly interaction and age-appropriate assessment to understand your child\'s potential.' },
  { icon: ClipboardCheck, title: 'Document Verification', description: 'Submit and verify all required documents to complete the application process.' },
  { icon: GraduationCap, title: 'Admission Confirmation', description: 'Welcome to the family! Receive the admission confirmation and join our community.' },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function AdmissionJourney() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            Admission Process
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Your Journey to{' '}
            <span className="text-blue-600">Joining Our School</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A simple, transparent, and supportive admission process designed to
            make your family&apos;s transition seamless.
          </p>
        </motion.div>

        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-0">
            <div className="absolute left-6 top-12 hidden h-[2px] w-[calc(100%-3rem)] bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 lg:block" />
            <div className="absolute left-6 top-12 z-10 block h-[calc(100%-3rem)] w-[2px] bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 lg:hidden" />

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="group relative flex w-full flex-col items-center text-center lg:w-1/5"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-black/[0.04] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <step.icon className="relative h-6 w-6 text-blue-600" />
                </div>

                <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                  {index + 1}
                </div>

                <h3 className="mt-4 text-lg font-bold text-primary">{step.title}</h3>
                <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
