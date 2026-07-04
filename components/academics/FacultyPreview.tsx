'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, GraduationCap, Briefcase, BookOpen } from 'lucide-react'

const faculty = [
  { initials: 'AM', name: 'Dr. Ananya Mehta', qualification: 'PhD, Mathematics', experience: '18 years', department: 'Mathematics', bg: 'bg-blue-50', color: 'text-blue-600' },
  { initials: 'RK', name: 'Prof. Rajesh Kumar', qualification: 'M.Sc., B.Ed', experience: '15 years', department: 'Physics', bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { initials: 'SP', name: 'Ms. Sunita Patel', qualification: 'MA, PhD (English)', experience: '20 years', department: 'Languages', bg: 'bg-violet-50', color: 'text-violet-600' },
  { initials: 'PN', name: 'Dr. Priya Nair', qualification: 'PhD, Chemistry', experience: '14 years', department: 'Science', bg: 'bg-amber-50', color: 'text-amber-600' },
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

export default function FacultyPreview() {
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
            Faculty Excellence
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Learn from the Best
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our faculty comprises highly qualified educators who bring expertise,
            passion, and years of experience to every classroom.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {faculty.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              className="group rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${member.bg}`}>
                <span className={`text-xl font-bold ${member.color}`}>{member.initials}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-primary">{member.name}</h3>
              <p className="text-sm text-blue-600">{member.department}</p>
              <div className="mt-4 space-y-2 border-t pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                  {member.qualification}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Briefcase className="h-3.5 w-3.5 shrink-0" />
                  {member.experience}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5 shrink-0" />
                  {member.department}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Meet Our Faculty
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
