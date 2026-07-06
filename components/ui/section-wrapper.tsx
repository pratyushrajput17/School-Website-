'use client'

import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  bg?: 'white' | 'slate'
  stagger?: number
  viewportMargin?: string
}

export default function SectionWrapper({
  children,
  className,
  bg = 'white',
  stagger = 0.1,
  viewportMargin = '-80px',
}: SectionWrapperProps) {
  const variants: Variants = staggerContainer(stagger)

  return (
    <section
      className={`relative overflow-hidden section-spacing ${
        bg === 'slate' ? 'bg-slate-50' : ''
      } ${className ?? ''}`}
    >
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/3 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/3 blur-3xl" />

      <div className="container-page">
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: viewportMargin }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
