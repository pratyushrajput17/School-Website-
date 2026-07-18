import { schoolConfig } from '@/lib/school-config'

export default function ParentTrust() {
  return (
    <section className="relative overflow-hidden bg-saffron-light/20 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Why Parents Trust Us</span>
          <h2 className="heading-xl mt-6">
            Why Parents Trust Adarsh High School
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            For years, parents have trusted Adarsh High School for quality education, discipline and character development.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolConfig.parentTrust.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-deep-blue/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-deep-blue">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
