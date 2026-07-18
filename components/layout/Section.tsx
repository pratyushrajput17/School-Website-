import type { ReactNode } from 'react'
import Container from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  background?: 'white' | 'slate' | 'gradient'
  blur?: boolean
}

const bgStyles: Record<string, string> = {
  white: '',
  slate: 'bg-slate-50',
  gradient: 'bg-gradient-to-b from-white via-blue-50/40 to-white',
}

export default function Section({
  children,
  className,
  containerClassName,
  background = 'white',
  blur = true,
}: SectionProps) {
  return (
    <section className={`relative overflow-hidden py-24 lg:py-32 ${bgStyles[background]} ${className ?? ''}`}>
      {blur && (
        <>
          <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />
        </>
      )}
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}
