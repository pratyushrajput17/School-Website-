'use client'

import { motion, type Variants } from 'framer-motion'
import { Clock, CalendarDays, Sun, GraduationCap, User } from 'lucide-react'

const schedule = [
  { day: 'Monday – Saturday', hours: '8:00 AM – 4:00 PM', status: 'Open', icon: CalendarDays },
  { day: 'Sunday', hours: 'Closed', status: 'Closed', icon: Sun },
] as const

const additionalHours = [
  { icon: GraduationCap, label: 'Admission Office Hours', detail: 'Mon–Sat: 9:00 AM – 3:00 PM', note: 'Sunday by appointment only' },
  { icon: User, label: 'Principal Meeting Hours', detail: 'Mon–Fri: 10:00 AM – 12:00 PM', note: 'Prior appointment required' },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function OfficeHours() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            Office Hours
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            When We&apos;re{' '}
            <span className="text-blue-600">Available</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our campus and offices are open throughout the week. Visit us or
            call during these hours.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Clock className="h-4 w-4 text-blue-600" />
              General Office Hours
            </div>

            {schedule.map((item) => (
              <motion.div
                key={item.day}
                variants={itemVariants}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-white px-6 py-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-primary">{item.day}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{item.hours}</span>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                    item.status === 'Open'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              Special Office Hours
            </div>

            {additionalHours.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="rounded-xl border border-border/60 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <item.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">{item.label}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.detail}</p>
                    <p className="mt-0.5 text-xs text-blue-600">{item.note}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
