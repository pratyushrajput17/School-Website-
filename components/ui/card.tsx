'use client'

import { motion } from 'framer-motion'
import { cardVariant } from '@/lib/animations'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'a'
  href?: string
}

export function Card({ children, className, hover = true, as = 'div', href }: CardProps) {
  const Tag = as === 'a' ? motion.a : motion.div
  const extraProps = as === 'a' ? { href } : {}

  return (
    <Tag
      {...extraProps}
      variants={cardVariant}
      className={`rounded-2xl border border-border/60 bg-white p-8 shadow-sm transition-all duration-300 ${
        hover ? 'hover:-translate-y-1 hover:border-border hover:shadow-md' : ''
      } ${className ?? ''}`}
    >
      {children}
    </Tag>
  )
}

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  iconBg?: string
  iconColor?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconBg = 'bg-blue-50',
  iconColor = 'text-blue-600',
}: FeatureCardProps) {
  return (
    <Card>
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </Card>
  )
}

interface StatCardProps {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div>
      <p className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  )
}

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/50 bg-gradient-to-br from-white to-blue-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-12 ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
