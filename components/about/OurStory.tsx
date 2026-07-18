'use client'

import { motion } from 'framer-motion'
import { BookOpen, Heart, TrendingUp, Globe } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const milestones = [
  { year: 2010, title: 'Foundation', description: `${schoolConfig.name} was established with a vision to provide quality education to the children of Sainkheda and surrounding areas.` },
  { year: 2015, title: 'Campus Growth', description: 'Expanded facilities with new classrooms, science labs, and a dedicated library to support holistic learning.' },
  { year: 2020, title: 'Digital Integration', description: 'Introduced smart classrooms and digital learning tools to enhance teaching methods across all grades.' },
  { year: 2025, title: 'Community Impact', description: 'Continuing our mission of providing accessible, quality education with strong board results and growing student community.' },
] as const

const journeyHighlights = [
  { icon: BookOpen, label: 'Our Beginning', detail: `Founded in ${schoolConfig.establishedYear} to serve the educational needs of the local community with a focus on academic excellence and moral values.` },
  { icon: Heart, label: 'Our Commitment', detail: 'To nurture confident, compassionate, and capable students who contribute meaningfully to their community and society.' },
  { icon: TrendingUp, label: 'Our Growth', detail: `From humble beginnings to ${schoolConfig.stats.students.value}+ students and ${schoolConfig.stats.teachers.value}+ dedicated teachers.` },
  { icon: Globe, label: 'Our Vision', detail: 'To remain a trusted institution that prepares students for success in higher education and life beyond school.' },
] as const

export default function OurStory() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The School Story"
          title="From Vision to"
          highlight="Reality"
          description={`What began as a vision to provide quality education in Sainkheda has grown into a trusted institution serving ${schoolConfig.stats.students.value}+ students.`}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="space-y-6">
              {journeyHighlights.map((item) => (
                <div
                  key={item.label}
                  className="group flex gap-4 rounded-2xl border border-border/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{item.label}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={staggerContainer(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="space-y-10">
              {milestones.map((milestone) => (
                <motion.div
                  key={milestone.year}
                  variants={cardVariant}
                  className="relative pl-10 before:absolute before:left-[11px] before:top-2 before:h-full before:w-px before:bg-blue-200 last:before:hidden"
                >
                  <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-500 bg-white">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-sm font-semibold text-blue-600">
                    {milestone.year}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-primary">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
