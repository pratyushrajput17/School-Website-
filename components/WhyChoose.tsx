import { schoolConfig } from '@/lib/school-config'

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Why Parents Trust Us</span>
          <h2 className="heading-xl mt-6">
            Why Families Choose Adarsh High School
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our education system is built on holistic development, strong values, and personal attention.
            Here is why hundreds of parents trust us with their children&apos;s future.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolConfig.whyTrustUs.map((item) => (
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
