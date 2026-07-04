'use client'

import { motion, type Variants } from 'framer-motion'
import { Phone, Mail, MapPin, GraduationCap, Bus, ShieldAlert } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const contactDetails = [
  { icon: Phone, title: 'Phone', detail: schoolConfig.contact.phone, subtitle: 'Mon–Sat, 8 AM – 4 PM', bg: 'bg-blue-50', color: 'text-blue-600', href: `tel:${schoolConfig.contact.phone}` },
  { icon: Mail, title: 'Email', detail: schoolConfig.contact.email, subtitle: 'We respond within 24 hours', bg: 'bg-emerald-50', color: 'text-emerald-600', href: `mailto:${schoolConfig.contact.email}` },
  { icon: MapPin, title: 'Office Address', detail: schoolConfig.contact.address, subtitle: 'Main Administration Block', bg: 'bg-violet-50', color: 'text-violet-600', href: '#map' },
  { icon: GraduationCap, title: 'Admission Office', detail: schoolConfig.contact.phone, subtitle: 'admissions@schoolname.edu', bg: 'bg-amber-50', color: 'text-amber-600', href: `tel:${schoolConfig.contact.phone}` },
  { icon: Bus, title: 'Transport Office', detail: schoolConfig.contact.phone, subtitle: 'transport@schoolname.edu', bg: 'bg-cyan-50', color: 'text-cyan-600', href: `tel:${schoolConfig.contact.phone}` },
  { icon: ShieldAlert, title: 'Emergency Contact', detail: '+91 98765 43211', subtitle: 'Available 24×7', bg: 'bg-rose-50', color: 'text-rose-600', href: 'tel:+919876543211' },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
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

export default function ContactInfo() {
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
            Contact Information
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Ways to{' '}
            <span className="text-blue-600">Get in Touch</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Choose the most convenient way to reach us. We&apos;re always happy
            to assist you.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {contactDetails.map((item) => (
            <motion.a
              key={item.title}
              href={item.href}
              variants={cardVariants}
              className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground break-words">{item.detail}</p>
                <p className="mt-0.5 text-xs text-blue-600">{item.subtitle}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
