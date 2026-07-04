'use client'

import { motion, type Variants } from 'framer-motion'
import { GraduationCap, ShieldCheck, Award, Building2, BookHeart, HeartHandshake } from 'lucide-react'

const trustReasons = [
  { icon: GraduationCap, title: 'Experienced Faculty', description: 'Highly qualified educators with years of teaching expertise and a passion for nurturing young minds.' },
  { icon: ShieldCheck, title: 'Safe Campus', description: '24×7 CCTV surveillance, security personnel, and strict safety protocols ensure a secure environment.' },
  { icon: Award, title: 'Excellent Results', description: 'Consistent 100% board exam results and top rankings in academic and co-curricular competitions.' },
  { icon: Building2, title: 'Modern Infrastructure', description: 'State-of-the-art classrooms, labs, sports facilities, and digital learning tools across the campus.' },
  { icon: BookHeart, title: 'Value-Based Education', description: 'A curriculum that integrates moral values, ethics, and social responsibility with academic learning.' },
  { icon: HeartHandshake, title: 'Personal Attention', description: 'Small class sizes ensure every student receives individualized guidance and mentorship.' },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function TrustSection() {
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
            Why Parents Trust Us
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Built on Trust, Proven by Results
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Generations of families have chosen us because we deliver on our
            promise of holistic, high-quality education.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {trustReasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={cardVariants}
              className="group rounded-2xl border border-border/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <reason.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
