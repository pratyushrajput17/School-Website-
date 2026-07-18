import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'nav' | 'main'
}

export default function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ''}`}>
      {children}
    </Tag>
  )
}
