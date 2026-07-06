'use client'

import { motion } from 'framer-motion'
import { GraduationCap, ShieldCheck, Award, Monitor, Building2, Sparkles } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const reasons = [
  { icon: GraduationCap, title: 'Experienced Faculty', description: 'Highly qualified educators with years of teaching expertise and a passion for nurturing young minds.' },
  { icon: ShieldCheck, title: 'Safe Campus', description: '24×7 CCTV surveillance, security personnel, and strict safety protocols ensure a secure environment.' },
  { icon: Award, title: 'Excellent Results', description: 'Consistent 100% board exam results and top rankings in academic and co-curricular competitions.' },
  { icon: Monitor, title: 'Smart Learning', description: 'Interactive smart boards, digital platforms, and AI-powered tools for personalized learning experiences.' },
  { icon: Building2, title: 'Modern Infrastructure', description: 'State-of-the-art classrooms, labs, sports complex, and libraries designed for 21st-century education.' },
  { icon: Sparkles, title: 'Character Development', description: 'A strong emphasis on values, ethics, and holistic growth to build well-rounded individuals.' },
] as const

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Choose Us"
          title="What Makes Us"
          highlight="the Right Choice"
          description="Every decision we make is guided by our commitment to providing the best possible education and environment for your child."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {reasons.map((reason) => (
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
