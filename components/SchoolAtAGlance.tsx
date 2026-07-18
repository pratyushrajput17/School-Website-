import { GraduationCap, BookOpen, Users, MapPin, Bus, Shield, School, LayoutList } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const items = [
  {
    icon: School,
    label: 'School Name',
    value: schoolConfig.name,
  },
  {
    icon: BookOpen,
    label: 'Board',
    value: schoolConfig.board,
  },
  {
    icon: LayoutList,
    label: 'Classes',
    value: 'Nursery to Class 10',
  },
  {
    icon: Users,
    label: 'Students',
    value: `${schoolConfig.stats.students.value}${schoolConfig.stats.students.suffix}`,
  },
  {
    icon: GraduationCap,
    label: 'Teachers',
    value: `${schoolConfig.stats.teachers.value}${schoolConfig.stats.teachers.suffix}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Gadarwara Road, Sainkheda, MP',
  },
  {
    icon: Bus,
    label: 'Transport',
    value: 'Pick & Drop Facility Available',
  },
  {
    icon: Shield,
    label: 'Safety',
    value: 'CCTV Monitored Campus',
  },
] as const

export default function SchoolAtAGlance() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Overview</span>
          <h2 className="heading-xl mt-6">
            School At A Glance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Quick information about Adarsh High School.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-deep-blue/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron/20 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron-light">
                  <item.icon className="h-6 w-6 text-saffron-dark" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-deep-blue leading-tight">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
