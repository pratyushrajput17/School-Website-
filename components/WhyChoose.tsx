import { schoolConfig } from '@/lib/school-config'

const trustIcons: Record<string, string> = {
  'बच्चों पर व्यक्तिगत ध्यान': '👨‍🎓',
  'अनुभवी शिक्षक': '👨‍🏫',
  'अनुशासित वातावरण': '📏',
  'सुरक्षित परिसर': '🛡️',
  'संस्कारयुक्त शिक्षा': '🌺',
  'समग्र विकास': '🌱',
}

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">क्यों भरोसा करें</span>
          <h2 className="heading-xl mt-6">
            माता-पिता हम पर क्यों भरोसा करते हैं
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            हमारी शिक्षा प्रणाली बच्चों के सर्वांगीण विकास पर आधारित है।
            यही कारण है कि सैंकड़ों माता-पिता हम पर विश्वास करते हैं।
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolConfig.whyTrustUs.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-deep-blue/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-saffron-light text-2xl">
                {trustIcons[item.title] || '⭐'}
              </div>
              <h3 className="mt-5 text-xl font-bold text-deep-blue">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground hindi-text">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
