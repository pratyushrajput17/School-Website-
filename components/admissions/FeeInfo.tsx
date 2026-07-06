'use client'

import { motion } from 'framer-motion'
import { GraduationCap, CreditCard, Bus, BookOpen, Shirt, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, fadeUp } from '@/lib/animations'

const feeItems = [
  { icon: CreditCard, title: 'Admission Fee', amount: 'On Request', description: 'One-time payment at the time of admission confirmation.' },
  { icon: GraduationCap, title: 'Annual Tuition Fee', amount: 'On Request', description: 'Covers the complete academic program and learning resources.' },
  { icon: Bus, title: 'Transport Fee', amount: 'On Request', description: 'Optional door-to-door transport service with GPS-tracked buses.' },
  { icon: Shirt, title: 'Uniform & Books', amount: 'On Request', description: 'Includes全套 uniforms, textbooks, and stationery supplies.' },
  { icon: BookOpen, title: 'Activity Fee', amount: 'On Request', description: 'Covers extracurricular activities, workshops, and special programs.' },
] as const

export default function FeeInfo() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Fee Structure"
          title="Affordable Excellence in"
          highlight="Education"
          description="Transparent and competitive fee structure designed to provide world-class education at accessible rates."
        />

        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div
            variants={fadeUp}
            className="col-span-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-blue-50 to-white p-1 shadow-sm"
          >
            <div className="rounded-xl bg-white">
              {feeItems.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-center justify-between px-6 py-4 ${
                    index < feeItems.length - 1 ? 'border-b border-border/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold text-blue-600">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            For a detailed fee breakdown and payment schedule, please get in touch with our admissions office.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Request Fee Structure
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
