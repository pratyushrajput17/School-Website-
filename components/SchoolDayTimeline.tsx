import {
  Sunrise,
  BookOpen,
  MessageCircle,
  Heart,
  Shield,
  Trophy,
  Sun,
} from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const icons = [
  Sunrise,
  BookOpen,
  MessageCircle,
  Heart,
  Shield,
  Trophy,
  Sun,
] as const

export default function SchoolDayTimeline() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-saffron/[0.03] blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-saffron/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">School Life</span>
          <h2 className="heading-xl mt-6">
            A Day at Adarsh High School
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every day is an opportunity to learn, grow and build character.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute bottom-0 left-[31px] top-0 hidden w-px bg-gradient-to-b from-saffron/40 via-saffron/20 to-transparent md:block" />

          <div className="space-y-12 md:space-y-10">
            {schoolConfig.schoolDay.map((item, index) => {
              const IconComponent = icons[index]
              return (
                <div
                  key={item.title}
                  className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-8"
                >
                  <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-2 md:pt-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-saffron/10 bg-white shadow-sm">
                      <IconComponent className="h-7 w-7 text-saffron-dark" />
                    </div>
                    <span className="text-xs font-bold text-saffron-dark md:hidden">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1 rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron/20 hover:shadow-md md:p-8">
                    <div className="flex items-center gap-3">
                      <span className="hidden h-7 w-7 items-center justify-center rounded-full bg-saffron-light text-xs font-bold text-saffron-dark md:flex">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-deep-blue">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
