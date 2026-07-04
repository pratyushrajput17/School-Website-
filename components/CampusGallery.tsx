'use client'

import { motion, type Variants } from 'framer-motion'
import {
  Building2,
  Monitor,
  FlaskConical,
  BookOpen,
  Trophy,
  Music,
  Laptop,
  Smile,
} from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const galleryItems = [
  {
    title: 'Campus Building',
    category: 'Infrastructure',
    icon: Building2,
    cols: 2,
    gradient: 'from-blue-600/20 via-indigo-500/10 to-purple-600/20',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Smart Classroom',
    category: 'Academics',
    icon: Monitor,
    cols: 1,
    gradient: 'from-emerald-600/20 via-teal-500/10 to-cyan-600/20',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Science Laboratory',
    category: 'Academics',
    icon: FlaskConical,
    cols: 1,
    gradient: 'from-violet-600/20 via-purple-500/10 to-fuchsia-600/20',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    title: 'Library',
    category: 'Infrastructure',
    icon: BookOpen,
    cols: 1,
    gradient: 'from-amber-600/20 via-orange-500/10 to-yellow-600/20',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Sports Ground',
    category: 'Sports',
    icon: Trophy,
    cols: 1,
    gradient: 'from-green-600/20 via-emerald-500/10 to-teal-600/20',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Annual Function',
    category: 'Events',
    icon: Music,
    cols: 2,
    gradient: 'from-pink-600/20 via-rose-500/10 to-red-600/20',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    title: 'Computer Lab',
    category: 'Academics',
    icon: Laptop,
    cols: 1,
    gradient: 'from-cyan-600/20 via-sky-500/10 to-blue-600/20',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    title: 'Students Activities',
    category: 'Culture',
    icon: Smile,
    cols: 1,
    gradient: 'from-orange-600/20 via-amber-500/10 to-yellow-600/20',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
] as const

const featureBadges = [
  { label: 'Learning', icon: BookOpen },
  { label: 'Sports', icon: Trophy },
  { label: 'Culture', icon: Smile },
  { label: 'Technology', icon: Monitor },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function CampusGallery() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
              Campus Life
            </span>
          </motion.div>

          <motion.h2
            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            Experience Life at Our School
          </motion.h2>

          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            A vibrant learning environment where academics, creativity, sports,
            and personal growth come together.
          </motion.p>
        </div>

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-3xl ${
                item.cols === 2 ? 'sm:col-span-2' : ''
              }`}
            >
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${item.gradient} transition-all duration-700 group-hover:scale-105 sm:aspect-auto sm:h-72`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent opacity-60" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/80">
                    <item.icon
                      className={`h-8 w-8 ${item.iconColor}`}
                    />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={cardVariants}
            className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex flex-1 items-center gap-5 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-50/50 p-6 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Smile className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <span className="text-3xl font-bold tracking-tight text-blue-600">
                  {schoolConfig.stats.students.value}{schoolConfig.stats.students.suffix}
                </span>
                <p className="text-sm font-medium text-blue-700">
                  Happy Students
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {featureBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-white px-4 py-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-md"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50">
                    <badge.icon className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
