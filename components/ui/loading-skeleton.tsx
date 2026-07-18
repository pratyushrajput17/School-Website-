interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string
  height?: string
}

export default function LoadingSkeleton({
  className,
  variant = 'text',
  width = '100%',
  height,
}: LoadingSkeletonProps) {
  const baseClasses = 'animate-pulse bg-muted'
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className ?? ''}`}
      style={{ width, height: height ?? (variant === 'text' ? undefined : undefined) }}
      aria-hidden="true"
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
      <LoadingSkeleton variant="circular" width="3rem" height="3rem" />
      <LoadingSkeleton className="mt-4" width="60%" />
      <LoadingSkeleton className="mt-2" width="40%" />
      <LoadingSkeleton className="mt-3" />
      <LoadingSkeleton className="mt-1" width="80%" />
    </div>
  )
}
