'use client'

import { motion } from 'framer-motion'
import { Music, Trophy, Palette, PartyPopper, FlaskConical, BookOpen } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const activities = [
  { icon: Music, title: 'Cultural Activities', subtitle: 'Music, Dance & Drama', span: 'sm:col-span-2 sm:row-span-2', gradient: 'from-blue-500/10 to-blue-500/5' },
  { icon: Trophy, title: 'Sports & Athletics', subtitle: 'Competitive & Recreational', gradient: 'from-emerald-500/10 to-emerald-500/5' },
  { icon: Palette, title: 'Creative Arts', subtitle: 'Art, Craft & Design', gradient: 'from-violet-500/10 to-violet-500/5' },
  { icon: PartyPopper, title: 'Celebrations', subtitle: 'Festivals & Events', gradient: 'from-amber-500/10 to-amber-500/5' },
  { icon: FlaskConical, title: 'Science & Innovation', subtitle: 'Labs & Workshops', gradient: 'from-rose-500/10 to-rose-500/5' },
  { icon: BookOpen, title: 'Library & Reading', subtitle: 'Quiet Study & Research', gradient: 'from-cyan-500/10 to-cyan-500/5' },
] as const

export default function CampusLife() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Campus Life"
          title="Life Beyond the Classroom"
          description="A vibrant campus where students discover passions, build friendships, and create memories that last a lifetime."
        />

        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              variants={cardVariant}
              className={`group relative overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} transition-all duration-500 group-hover:scale-110`} />
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-sm backdrop-blur-sm">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary">
                  {activity.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
