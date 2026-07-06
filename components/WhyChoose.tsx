'use client'

import { motion } from 'framer-motion'
import {
  Monitor,
  GraduationCap,
  FlaskConical,
  Trophy,
  ShieldCheck,
  Bus,
} from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const features = [
  {
    icon: Monitor,
    title: 'Smart Classrooms',
    description: 'Technology-enabled learning environment.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: GraduationCap,
    title: 'Qualified Faculty',
    description: 'Experienced and passionate educators.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: FlaskConical,
    title: 'Science & Computer Labs',
    description: 'Hands-on practical learning.',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: Trophy,
    title: 'Sports & Activities',
    description: 'Balanced academic and physical development.',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Campus',
    description: '24×7 secure and monitored campus.',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    icon: Bus,
    title: 'Transport Facility',
    description: 'Safe transportation across the city.',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
] as const

export default function WhyChoose() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Choose Us"
          title="An Environment Where Every Student Thrives"
          description="Our school is dedicated to academic excellence, innovation, and holistic development, ensuring every student reaches their full potential."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariant}
              className="group rounded-2xl border border-border/50 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border/80 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-primary">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
