'use client'

import { motion } from 'framer-motion'
import { GraduationCap, ShieldCheck, Award, Building2, HeartHandshake, Monitor } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const trustReasons = [
  { icon: ShieldCheck, title: 'Student Safety', description: '24×7 CCTV surveillance, security personnel, and strict safety protocols ensure a secure campus environment at all times.' },
  { icon: Monitor, title: 'Digital Campus', description: 'Smart classrooms with interactive boards, blended learning platforms, and high-speed connectivity across the campus.' },
  { icon: Award, title: 'Academic Excellence', description: 'Consistent 100% board exam results with top rankings in academic and co-curricular competitions year after year.' },
  { icon: Building2, title: 'Modern Infrastructure', description: 'State-of-the-art labs, library, sports complex, and learning spaces designed for 21st-century education.' },
  { icon: GraduationCap, title: 'Experienced Faculty', description: 'Highly qualified educators with years of teaching expertise and a passion for nurturing young minds.' },
  { icon: HeartHandshake, title: 'Personal Attention', description: 'Small class sizes ensure every student receives individualized guidance and mentorship from dedicated teachers.' },
] as const

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Parents Trust Us"
          title="Built on Trust, Proven by Results"
          description="Generations of families have chosen us because we deliver on our promise of holistic, high-quality education."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {trustReasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={cardVariant}
              className="group rounded-2xl border border-border/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <reason.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
