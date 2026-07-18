import { type Variants } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

export type { LucideIcon }
export type { Variants }

export interface NavLink {
  href: string
  label: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  icon: LucideIcon
}

export interface FeatureCard {
  icon: LucideIcon
  title: string
  description: string
  iconBg: string
  iconColor: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  officeHours: string
}

export interface SocialLinks {
  facebook: string
  instagram: string
  twitter: string
  youtube: string
  linkedin: string
}

export interface QuickLink {
  href: string
  label: string
}

export { fadeUp, fadeIn, scaleIn, staggerContainer, cardVariant, revealLeft, revealRight, itemVariants, sectionHeaderVariants, ctaVariants, listVariants } from '@/lib/animations'
