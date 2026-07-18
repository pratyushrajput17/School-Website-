import { Eye, Target } from 'lucide-react'

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Our Purpose</span>
          <h2 className="heading-xl mt-6">
            Our Vision & Mission
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="group rounded-2xl border border-saffron/10 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md lg:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-light">
              <Eye className="h-7 w-7 text-saffron-dark" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-deep-blue">Our Vision</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              To build an education system that empowers students not only with
              academic knowledge but also with strong moral values, discipline,
              and character — preparing them to be responsible citizens.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Commitment to quality education',
                'Character and value-based upbringing',
                'Responsibility towards community',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-saffron" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="group rounded-2xl border border-saffron/10 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md lg:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-light">
              <Target className="h-7 w-7 text-saffron-dark" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-deep-blue">Our Mission</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              To provide every child with an environment where they can grow
              academically, socially, and morally — becoming successful and
              value-driven citizens of tomorrow.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Quality education through experienced teachers',
                'Value-based and disciplined learning',
                'Preparing students for life beyond school',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-saffron" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
