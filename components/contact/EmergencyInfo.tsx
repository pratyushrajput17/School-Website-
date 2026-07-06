'use client'

import { motion } from 'framer-motion'
import { HeartPulse, Shield, Phone, Ambulance as AmbulanceIcon, AlertTriangle } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, itemVariants } from '@/lib/animations'

const emergencyContacts = [
  { icon: HeartPulse, title: 'Medical Room', phone: '+91 98765 43215', location: 'Ground Floor, Main Building', color: 'text-rose-600', bg: 'bg-rose-50' },
  { icon: Shield, title: 'Security Office', phone: '+91 98765 43216', location: 'Main Gate, Security Block', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: AmbulanceIcon, title: 'Ambulance', phone: '102', location: 'On-call 24×7', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: AlertTriangle, title: 'Fire Safety', phone: '101', location: 'Fire extinguishers across campus', color: 'text-orange-600', bg: 'bg-orange-50' },
] as const

const importantNumbers = [
  { label: 'Police Station', number: '100' },
  { label: 'Fire Brigade', number: '101' },
  { label: 'Ambulance', number: '102' },
  { label: 'Child Helpline', number: '1098' },
  { label: 'Women Helpline', number: '181' },
] as const

export default function EmergencyInfo() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-rose-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-rose-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Emergency Information"
          title={<>Safety & <span className="text-blue-600">Emergency Contacts</span></>}
          description="Your child's safety is our highest priority. These contacts are available around the clock for any emergency."
          badgeClassName="border-rose-200 bg-rose-50 text-rose-700"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <motion.div
            className="lg:col-span-2"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {emergencyContacts.map((contact) => (
                <motion.a
                  key={contact.title}
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  variants={itemVariants}
                  className="group rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${contact.bg}`}>
                      <contact.icon className={`h-6 w-6 ${contact.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary">{contact.title}</h3>
                      <p className={`mt-0.5 text-lg font-bold ${contact.color}`}>{contact.phone}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{contact.location}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-bold text-primary">Important Numbers</h3>
              </div>

              <div className="mt-4 space-y-2">
                {importantNumbers.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5"
                  >
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-bold text-primary">{item.number}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-700">In case of emergency, dial 100 or contact the security office immediately.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
