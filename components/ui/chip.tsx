import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info'
  className?: string
}

const variantStyles: Record<string, string> = {
  default: 'border-blue-200 bg-blue-50 text-blue-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  info: 'border-violet-200 bg-violet-50 text-violet-700',
}

export default function Chip({ children, variant = 'default', className }: ChipProps) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${variantStyles[variant]} ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
