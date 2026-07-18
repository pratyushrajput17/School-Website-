import { schoolConfig } from '@/lib/school-config'

export default function SchoolValues() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Our Values & Principles</span>
          <h2 className="heading-xl mt-6">
            The Values That Define Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our school values are the foundation of every student&apos;s character.
            They shape responsible citizens and compassionate human beings.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolConfig.schoolValues.map((item) => (
            <div
              key={item.value}
              className="group rounded-2xl border border-saffron/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-deep-blue">
                {item.value}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
