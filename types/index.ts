import { type Variants } from 'framer-motion'
import {
  type LucideIcon,
} from 'lucide-react'

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

export interface AnimationVariants {
  container: Variants
  item: Variants
}

export const fadeUpVariants: AnimationVariants = {
  container: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
}

export const staggerVariants = (stagger = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
})

export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}
