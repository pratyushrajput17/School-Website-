'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { sectionHeaderVariants } from '@/lib/animations'

interface SectionHeaderProps {
  badge: string
  title: ReactNode
  highlight?: string
  description?: string
  badgeClassName?: string
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  badgeClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      className="mx-auto max-w-2xl text-center"
      variants={sectionHeaderVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <span className={`inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 ${badgeClassName ?? ''}`}>
        {badge}
      </span>
      <h2 className="heading-xl mt-6">
        {title}
        {highlight && (
          <span className="text-blue-600"> {highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  )
}
