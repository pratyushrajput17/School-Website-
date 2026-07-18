'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'

interface PageBannerProps {
  badge: string
  title: string
  highlight?: string
  description?: string
  cta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  minHeight?: string
  borderTop?: boolean
}

export default function PageBanner({
  badge,
  title,
  highlight,
  description,
  cta,
  secondaryCta,
  minHeight = 'min-h-[50vh]',
  borderTop,
}: PageBannerProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white ${minHeight}`}>
      <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-primary/[0.02] blur-3xl" />
      <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.02] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col items-center justify-center py-20 text-center lg:py-28 ${minHeight}`}>
          <motion.div
            className="w-full max-w-4xl"
            variants={staggerContainer(0.15)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="badge-pill">{badge}</span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
              variants={fadeUp}
            >
              {title}
              {highlight && (
                <span className="text-blue-600"> {highlight}</span>
              )}
            </motion.h1>

            {description && (
              <motion.p
                className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
                variants={fadeUp}
              >
                {description}
              </motion.p>
            )}

            {(cta || secondaryCta) && (
              <motion.div
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
                variants={fadeUp}
              >
                {cta && (
                  <Link
                    href={cta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </motion.div>
            )}

            {borderTop && (
              <motion.div
                className="mt-12 border-t pt-12"
                variants={fadeUp}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
