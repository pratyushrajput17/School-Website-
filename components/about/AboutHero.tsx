import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const heroStats = [
  { value: `${schoolConfig.stats.students.value}${schoolConfig.stats.students.suffix}`, label: 'Students' },
  { value: `${schoolConfig.stats.teachers.value}${schoolConfig.stats.teachers.suffix}`, label: 'Teachers' },
  { value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`, label: 'Years of Legacy' },
  { value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`, label: 'Board Result' },
] as const

export default function AboutHero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
      <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
      <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[85vh] flex-col items-center justify-center py-20 text-center lg:py-32">
          <div className="mx-auto max-w-4xl">
            <span className="badge-pill">{schoolConfig.name}</span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-deep-blue sm:text-5xl lg:text-6xl xl:text-7xl">
              Where Education Meets{' '}
              <span className="text-saffron">Values</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {schoolConfig.name} is an MP Board-recognised English-medium school dedicated
              to academic excellence, character building, and holistic development.
              Since {schoolConfig.establishedYear}, we have been shaping young minds
              with quality education and strong moral values.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue focus-visible:ring-offset-2"
              >
                Apply for Admission
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-deep-blue/20 bg-white px-5 py-3 text-sm font-medium text-deep-blue">
                <MapPin className="h-4 w-4" />
                {schoolConfig.contact.address}
              </span>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-deep-blue/10 pt-12 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold tracking-tight text-saffron sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
