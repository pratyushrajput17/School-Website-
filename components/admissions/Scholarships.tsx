'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const scholarships = [
  {
    icon: Trophy,
    title: 'Merit Scholarship',
    description: 'Awarded to students who demonstrate exceptional academic performance, rewarding excellence with significant fee concessions.',
    benefits: ['Based on previous academic record', 'Up to 50% fee waiver', 'Renewable annually', 'Covers all grades'],
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    gradient: 'from-amber-500/10 to-amber-500/5',
    border: 'border-amber-200/40',
  },
  {
    icon: Medal,
    title: 'Sports Scholarship',
    description: 'Recognizing young athletes who have excelled at district, state, or national levels in recognized sports disciplines.',
    benefits: ['State/national level athletes', 'Up to 40% fee waiver', 'Professional coaching access', 'Tournament support'],
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    gradient: 'from-blue-500/10 to-blue-500/5',
    border: 'border-blue-200/40',
  },
  {
    icon: Heart,
    title: 'Need-Based Scholarship',
    description: 'Ensuring that financial constraints never come in the way of deserving students seeking quality education.',
    benefits: ['Income-based assessment', 'Confidential application', 'Flexible fee structure', 'Covers full/partial tuition'],
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    gradient: 'from-emerald-500/10 to-emerald-500/5',
    border: 'border-emerald-200/40',
  },
] as const



export default function Scholarships() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Scholarships"
          title="Making Excellence"
          highlight="Accessible to All"
          description="We believe every deserving student deserves access to quality education. Our scholarship programs reward excellence and support potential."
        />

        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-3"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {scholarships.map((scholarship) => (
            <motion.div
              key={scholarship.title}
              variants={cardVariant}
              className={`group relative overflow-hidden rounded-2xl border ${scholarship.border} bg-gradient-to-br ${scholarship.gradient} p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${scholarship.bg}`}>
                <scholarship.icon className={`h-7 w-7 ${scholarship.color}`} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-primary">{scholarship.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {scholarship.description}
              </p>

              <ul className="mt-5 space-y-2.5">
                {scholarship.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${scholarship.color.replace('text-', 'bg-').replace('600', '500')}`} />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
