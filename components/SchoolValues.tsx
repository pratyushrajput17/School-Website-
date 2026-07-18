import { schoolConfig } from '@/lib/school-config'

export default function SchoolValues() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">हमारे मूल्य और आदर्श</span>
          <h2 className="heading-xl mt-6">
            हमारी पहचान के मूल्य
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            हमारे विद्यालय के मूल्य प्रत्येक विद्यार्थी के चरित्र निर्माण की नींव हैं।
            ये जिम्मेदार नागरिक और संवेदनशील इंसान बनाने में सहायक होते हैं।
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
