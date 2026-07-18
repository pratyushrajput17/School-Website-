import { Award, BookOpen, Target, BarChart3 } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const highlights = [
  {
    icon: Award,
    title: 'Board Results',
    value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`,
    description: 'Students consistently achieve strong academic results in MP Board examinations.',
  },
  {
    icon: BookOpen,
    title: 'MP Board Curriculum',
    value: 'Nursery–Class 10',
    description: 'Structured learning through the MP Board syllabus with focus on conceptual clarity.',
  },
  {
    icon: Target,
    title: 'Years of Experience',
    value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`,
    description: 'Over a decade of experience in providing quality education to the community.',
  },
  {
    icon: BarChart3,
    title: 'Regular Assessments',
    value: 'Continuous',
    description: 'Periodic tests, assignments and feedback to track and support student progress.',
  },
] as const

export default function AcademicAchievers() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Academic Excellence</span>
          <h2 className="heading-xl mt-6">
            Academic Achievers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our students strive for academic excellence through a well-structured curriculum and dedicated guidance.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-deep-blue/10 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-light">
                <item.icon className="h-7 w-7 text-saffron-dark" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-saffron">
                {item.value}
              </p>
              <h3 className="mt-1 text-base font-bold text-deep-blue">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
