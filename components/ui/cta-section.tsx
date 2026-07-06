'use client'

import { motion } from 'framer-motion'
import { ctaVariants, listVariants } from '@/lib/animations'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface CTAButton {
  label: string
  href: string
  icon?: ReactNode
  variant?: 'primary' | 'secondary'
}

interface CTASectionProps {
  icon: LucideIcon
  title: string
  highlight?: string
  description: string
  buttons: CTAButton[]
  features?: string[]
}

export default function CTASection({
  icon: Icon,
  title,
  highlight,
  description,
  buttons,
  features,
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary section-spacing">
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg backdrop-blur-sm">
            <Icon className="h-8 w-8 text-white" />
          </div>

          <h2 className="mt-8 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
            {highlight && (
              <br />
            )}
            {highlight && (
              <span className="text-blue-300">{highlight}</span>
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {buttons.map((btn) => {
              const isPrimary = btn.variant !== 'secondary'
              const cls = isPrimary
                ? 'inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary'
                : 'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary'

              return (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={cls}
                >
                  {btn.icon}
                  {btn.label}
                </a>
              )
            })}
          </div>

          {features && features.length > 0 && (
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
