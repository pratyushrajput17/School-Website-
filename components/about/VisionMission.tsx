import { Eye, Target } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">हमारा उद्देश्य</span>
          <h2 className="heading-xl mt-6">
            हमारी दृष्टि और मिशन
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="group rounded-2xl border border-saffron/10 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md lg:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-light">
              <Eye className="h-7 w-7 text-saffron-dark" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-deep-blue">हमारी दृष्टि</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground hindi-text">
              {schoolConfig.name} का लक्ष्य एक ऐसी शिक्षा प्रणाली विकसित करना है
              जो विद्यार्थियों को न केवल शैक्षणिक रूप से सक्षम बनाए, बल्कि उनमें
              नैतिक मूल्यों, अनुशासन और चरित्र का भी विकास करे।
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'गुणवत्तापूर्ण शिक्षा पर ध्यान',
                'चरित्र और संस्कारों का विकास',
                'समाज के प्रति जिम्मेदारी',
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
            <h3 className="mt-6 text-2xl font-bold text-deep-blue">हमारा मिशन</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground hindi-text">
              हर बच्चे को एक ऐसा वातावरण प्रदान करना जहाँ वे शैक्षणिक, सामाजिक
              और नैतिक रूप से विकसित हो सकें और जीवन में सफल और संस्कारी नागरिक बन सकें।
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'अनुभवी शिक्षकों द्वारा गुणवत्तापूर्ण शिक्षा',
                'संस्कार और अनुशासन पर आधारित शिक्षा',
                'विद्यार्थियों को जीवन के लिए तैयार करना',
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
