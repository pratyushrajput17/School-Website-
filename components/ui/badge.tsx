interface BadgeProps {
  children: string
  className?: string
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
