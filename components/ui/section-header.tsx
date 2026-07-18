interface SectionHeaderProps {
  badge?: string
  title: string
  highlight?: string
  description?: string
}

export default function SectionHeader({ badge, title, highlight, description }: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && <span className="badge-pill">{badge}</span>}
      <h2 className="heading-xl mt-6">
        {title}{highlight ? <span className="text-saffron"> {highlight}</span> : ''}
      </h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </div>
  )
}
