import Link from 'next/link'
import { GraduationCap, ArrowRight, Phone } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
      <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
      <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[90vh] flex-col items-center justify-center py-20 text-center lg:py-32">
          <div className="mx-auto max-w-4xl">
            <span className="badge-pill">
              {schoolConfig.name} | {schoolConfig.board} | English Medium
            </span>

            <div className="mt-12 space-y-2">
              <p className="shloka">॥ {schoolConfig.hero.shloka} ॥</p>
              <p className="shloka-meaning">{schoolConfig.hero.shlokaMeaning}</p>
            </div>

            <h1 className="mt-10 text-3xl font-bold leading-[1.3] tracking-tight text-deep-blue sm:text-4xl lg:text-5xl xl:text-6xl">
              {schoolConfig.hero.heading}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {schoolConfig.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
              >
                <GraduationCap className="h-4 w-4" />
                Apply for Admission
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`tel:${schoolConfig.contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full border border-deep-blue/20 bg-white px-7 py-3.5 text-sm font-semibold text-deep-blue shadow-sm transition-all duration-300 hover:bg-saffron-light"
              >
                <Phone className="h-4 w-4" />
                Call: {schoolConfig.contact.phone}
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-deep-blue/10 pt-12 sm:grid-cols-4">
              {[
                { value: `${schoolConfig.stats.students.value}${schoolConfig.stats.students.suffix}`, label: 'Students' },
                { value: `${schoolConfig.stats.teachers.value}${schoolConfig.stats.teachers.suffix}`, label: 'Teachers' },
                { value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`, label: 'Years of Excellence' },
                { value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`, label: 'Board Results' },
              ].map((stat) => (
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
