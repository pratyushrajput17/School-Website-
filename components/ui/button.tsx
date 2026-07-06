'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonBaseProps {
  children: ReactNode
  className?: string
  ariaLabel?: string
}

interface ButtonLinkProps extends ButtonBaseProps {
  href: string
  external?: boolean
  onClick?: never
}

interface ButtonActionProps extends ButtonBaseProps {
  href?: never
  external?: never
  onClick: () => void
}

type ButtonProps = ButtonLinkProps | ButtonActionProps

const base =
  'inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

const variants = {
  primary:
    `${base} bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:scale-105 hover:shadow-md focus-visible:ring-blue-500`,
  secondary:
    `${base} border border-border bg-white text-primary hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary`,
  ctaPrimary:
    `${base} bg-white text-primary hover:scale-105 hover:shadow-lg focus-visible:ring-white focus-visible:ring-offset-primary`,
  ctaSecondary:
    `${base} border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white focus-visible:ring-offset-primary`,
} as const

export function ButtonPrimary({ children, href, external, onClick, className, ariaLabel }: ButtonProps) {
  const cls = `${variants.primary} ${className ?? ''}`
  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

export function ButtonSecondary({ children, href, external, onClick, className, ariaLabel }: ButtonProps) {
  const cls = `${variants.secondary} ${className ?? ''}`
  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

export function ButtonCTAPrimary({ children, href, onClick, className, ariaLabel }: ButtonProps) {
  const cls = `${variants.ctaPrimary} ${className ?? ''}`
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

export function ButtonCTASecondary({ children, href, onClick, className, ariaLabel }: ButtonProps) {
  const cls = `${variants.ctaSecondary} ${className ?? ''}`
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
