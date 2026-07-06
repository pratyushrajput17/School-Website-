'use client'

import { motion } from 'framer-motion'
import { Quote, Award, BookOpen, Star } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const managementTeam = [
  { name: 'Mr. Rajesh Verma', role: 'Vice Principal', department: 'Administration', initials: 'RV' },
  { name: 'Ms. Anita Sharma', role: 'Head of Academics', department: 'Curriculum Development', initials: 'AS' },
  { name: 'Dr. Vikram Singh', role: 'Dean of Students', department: 'Student Welfare', initials: 'VS' },
] as const

const chairman = {
  name: 'Dr. Suresh K. Agarwal',
  role: 'Chairman',
  initials: 'SA',
  experience: '30+ years in education',
  qualification: 'PhD in Educational Leadership',
  quote: 'Our mission is to create an environment where every child discovers their unique potential and develops the confidence to pursue their dreams.',
} as const

export default function Leadership() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Leadership" title="Meet Our Leaders" />

        <motion.div
          className="mt-16"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div
            variants={cardVariant}
            className="group relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white to-blue-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-12"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 shadow-md ring-1 ring-black/[0.04]">
                  <span className="text-5xl font-bold text-blue-600">{chairman.initials}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1">
                  <Award className="h-3.5 w-3.5 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-700">
                    {chairman.experience}
                  </span>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -left-2 -top-2 h-8 w-8 text-blue-200" />
                <p className="text-lg leading-relaxed text-muted-foreground italic">
                  &ldquo;{chairman.quote}&rdquo;
                </p>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-2xl font-bold text-primary">
                    {chairman.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {chairman.role}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">{chairman.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">National Award for Excellence in Education</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariant}
            className="group relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white to-blue-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-12"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 shadow-md ring-1 ring-black/[0.04]">
                  <span className="text-5xl font-bold text-blue-600">PS</span>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1">
                  <Award className="h-3.5 w-3.5 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-700">
                    {schoolConfig.principal.experience}+ Years Experience
                  </span>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -left-2 -top-2 h-8 w-8 text-blue-200" />
                <p className="text-lg leading-relaxed text-muted-foreground italic">
                  &ldquo;{schoolConfig.principal.quote}&rdquo;
                </p>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-2xl font-bold text-primary">
                    {schoolConfig.principal.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {schoolConfig.principal.title}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">PhD in Education</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">National Award for Teaching Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {managementTeam.map((member) => (
              <motion.div
                key={member.name}
                variants={cardVariant}
                className="group rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50">
                  <span className="text-xl font-bold text-blue-600">
                    {member.initials}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-blue-600">{member.role}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {member.department}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
