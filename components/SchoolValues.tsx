import { schoolConfig } from '@/lib/school-config'

const valueIcons: Record<string, string> = {
  'सत्य': '⚖️',
  'अनुशासन': '📚',
  'सम्मान': '🙏',
  'करुणा': '❤️',
  'सेवा': '🤝',
  'राष्ट्रप्रेम': '🇮🇳',
}

export default function SchoolValues() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-saffron-light/10 to-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">हमारे संस्कार एवं मूल्य</span>
          <h2 className="heading-xl mt-6">
            जो हमें परिभाषित करते हैं
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            हमारे विद्यालय के मूल्य ही हमारे विद्यार्थियों के चरित्र की नींव हैं।
            ये मूल्य उन्हें जीवन में सफल और संस्कारी इंसान बनाते हैं।
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolConfig.schoolValues.map((item) => (
            <div
              key={item.value}
              className="group rounded-2xl border border-saffron/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-saffron-light text-2xl">
                {valueIcons[item.value] || '⭐'}
              </div>
              <h3 className="mt-5 text-2xl font-bold text-deep-blue">
                {item.value}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground hindi-text">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
