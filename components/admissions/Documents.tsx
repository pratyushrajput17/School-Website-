'use client'

import { motion } from 'framer-motion'
import { FileText, Image, FileCheck, Fingerprint, ScrollText, HeartPulse } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const documents = [
  { icon: FileText, title: 'Birth Certificate', description: 'Original and photocopy of the child\'s birth certificate issued by municipal authorities.' },
  { icon: Image, title: 'Passport Photos', description: '4 recent passport-size photographs of the child and 2 of each parent or guardian.' },
  { icon: FileCheck, title: 'Transfer Certificate', description: 'Transfer certificate from the previous school for admission to Class I and above.' },
  { icon: Fingerprint, title: 'Aadhaar Card', description: 'Aadhaar card of the child and parent or guardian for identity verification.' },
  { icon: ScrollText, title: 'Previous Report Card', description: 'Report cards from the last two academic years for assessing academic progress.' },
  { icon: HeartPulse, title: 'Medical Certificate', description: 'Medical fitness certificate and immunization record from a registered practitioner.' },
] as const

export default function Documents() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Required Documents"
          title="Documents Needed for"
          highlight="Admission"
          description="Ensure a smooth admission process by keeping these documents ready for submission."
        />

        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {documents.map((doc) => (
            <motion.div
              key={doc.title}
              variants={cardVariant}
              className="group flex items-start gap-4 rounded-xl border border-border/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <doc.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">{doc.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {doc.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
