'use client'

import { motion, type Variants } from 'framer-motion'
import { Music, Drum, Trophy, Microscope, Palette, Drama, Users, Heart } from 'lucide-react'

const activities = [
  { icon: Music, title: 'Music', description: 'Vocal training, instrumental music, and choir performances.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Drum, title: 'Dance', description: 'Classical, contemporary, and folk dance forms.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Trophy, title: 'Sports', description: 'Athletics, team sports, and individual competitions.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Microscope, title: 'Debate', description: 'Public speaking, elocution, and parliamentary debates.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Palette, title: 'Art', description: 'Painting, sculpture, pottery, and visual design.', color: 'text-rose-600', bg: 'bg-rose-50' },
  { icon: Drama, title: 'Drama', description: 'Theatre productions, role-play, and stage performances.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { icon: Users, title: 'Leadership Clubs', description: 'Student council, prefects, and peer mentoring.', color: 'text-pink-600', bg: 'bg-pink-50' },
  { icon: Heart, title: 'Community Service', description: 'NSS, outreach programs, and social initiatives.', color: 'text-orange-600', bg: 'bg-orange-50' },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function CoCurricular() {
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
            Co-Curricular Activities
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Beyond the Curriculum
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We believe in nurturing the whole child through a rich tapestry of
            activities that complement academic learning.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.title}
              variants={cardVariants}
              className="group rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${activity.bg}`}>
                <activity.icon className={`h-6 w-6 ${activity.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-primary">{activity.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
