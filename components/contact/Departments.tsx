'use client'

import { motion, type Variants } from 'framer-motion'
import { GraduationCap, Calculator, UserCircle, Bus, Headphones } from 'lucide-react'

const departments = [
  {
    icon: GraduationCap,
    title: 'Admission Office',
    phone: '+91 98765 43210',
    email: 'admissions@schoolname.edu',
    hours: 'Mon–Sat: 9:00 AM – 3:00 PM',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Calculator,
    title: 'Accounts Department',
    phone: '+91 98765 43212',
    email: 'accounts@schoolname.edu',
    hours: 'Mon–Sat: 10:00 AM – 4:00 PM',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: UserCircle,
    title: 'Principal Office',
    phone: '+91 98765 43213',
    email: 'principal@schoolname.edu',
    hours: 'Mon–Fri: 10:00 AM – 12:00 PM',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Bus,
    title: 'Transport Department',
    phone: '+91 98765 43214',
    email: 'transport@schoolname.edu',
    hours: 'Mon–Sat: 8:00 AM – 4:00 PM',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Headphones,
    title: 'Reception',
    phone: '+91 98765 43210',
    email: 'info@schoolname.edu',
    hours: 'Mon–Sat: 7:30 AM – 5:00 PM',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
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

export default function Departments() {
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
            Departments
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Reach the Right{' '}
            <span className="text-blue-600">Department</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Contact the relevant department directly for faster assistance
            with your specific query.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {departments.map((dept) => (
            <motion.div
              key={dept.title}
              variants={cardVariants}
              className="group rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${dept.bg}`}>
                <dept.icon className={`h-6 w-6 ${dept.color}`} />
              </div>

              <h3 className="mt-4 text-base font-bold text-primary">{dept.title}</h3>

              <div className="mt-4 space-y-2.5">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm font-semibold text-primary">{dept.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="text-sm text-blue-600 break-all">{dept.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Hours</p>
                  <p className="text-sm text-muted-foreground">{dept.hours}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
