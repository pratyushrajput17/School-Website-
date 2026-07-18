import { Quote, User } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function PrincipalMessage() {
  return (
    <section className="bg-saffron-light/20 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-saffron/30 lg:-inset-6" />
              <div className="relative h-72 w-72 lg:h-96 lg:w-96">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-saffron/10 via-saffron-light to-white p-1 shadow-xl shadow-saffron/10">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <User className="h-28 w-28 text-saffron/20 lg:h-36 lg:w-36" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-saffron-dark">
              {schoolConfig.principal.badge}
            </span>

            <div className="relative mt-4">
              <Quote className="h-10 w-10 text-saffron/30" />
              <blockquote className="mt-2 text-xl italic leading-relaxed text-deep-blue/80 lg:text-2xl">
                &ldquo;{schoolConfig.principal.quote}&rdquo;
              </blockquote>
            </div>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground hindi-text">
              <p>
                हमारे विद्यालय में हम छात्र-केंद्रित दृष्टिकोण अपनाते हैं जो
                सर्वांगीण विकास को बढ़ावा देता है। हमारा ध्यान केवल पाठ्यपुस्तकों
                तक सीमित नहीं है, बल्कि हम मजबूत मूल्यों, नैतिकता और जीवनपर्यंत
                सीखने की आदतों को विकसित करते हैं।
              </p>
              <p>
                हम माता-पिता के साथ मजबूत साझेदारी में विश्वास करते हैं ताकि
                एक ऐसा वातावरण बनाया जा सके जहाँ हर बच्चा मूल्यवान, प्रेरित और
                अपने सपनों को पूरा करने में सक्षम महसूस करे।
              </p>
            </div>

            <div className="mt-8 border-t border-saffron/20 pt-6">
              <p className="text-lg font-semibold text-deep-blue">
                {schoolConfig.principal.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {schoolConfig.principal.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
