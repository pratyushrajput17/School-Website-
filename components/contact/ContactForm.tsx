import { User, Mail, Phone, GraduationCap, MessageSquare, Send } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function ContactForm() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">हमें संदेश भेजें</span>
          <h2 className="heading-xl mt-6">
            हमसे संपर्क करें
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            कोई प्रश्न हो तो नीचे फॉर्म भरें। हमारी टीम 24 घंटे में आपसे संपर्क करेगी।
          </p>
        </div>

        <div className="mt-16">
          <div className="overflow-hidden rounded-2xl border border-deep-blue/10 bg-white shadow-sm">
            <div className="grid lg:grid-cols-5">
              <div className="hidden bg-gradient-to-br from-deep-blue to-deep-blue/95 p-10 lg:col-span-2 lg:block">
                <div className="flex h-full flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white">बातचीत शुरू करें</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 hindi-text">
                    प्रवेश, हमारे कार्यक्रमों या कैंपस भ्रमण के बारे में कोई भी
                    जानकारी चाहिए तो हमसे संपर्क करें।
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <Phone className="h-5 w-5 text-saffron" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/50">फ़ोन</p>
                        <p className="text-sm font-semibold text-white">{schoolConfig.contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <Mail className="h-5 w-5 text-saffron" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/50">ईमेल</p>
                        <p className="text-sm font-semibold text-white">{schoolConfig.contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <GraduationCap className="h-5 w-5 text-saffron" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/50">कार्य के घंटे</p>
                        <p className="text-sm font-semibold text-white">{schoolConfig.contact.officeHours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:col-span-3 lg:p-10">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="माता-पिता का नाम"
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="माता-पिता का नाम"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="ईमेल पता"
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="ईमेल पता"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="फ़ोन नंबर"
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="फ़ोन नंबर"
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="बच्चे का नाम"
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="बच्चे का नाम"
                    />
                  </div>
                  <div className="relative sm:col-span-2">
                    <GraduationCap className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <select
                      className="w-full appearance-none rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-10 text-sm text-deep-blue focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="कक्षा"
                      defaultValue=""
                    >
                      <option value="" disabled>कक्षा चुनें</option>
                      <option value="nursery">नर्सरी</option>
                      <option value="primary">प्राथमिक (I–V)</option>
                      <option value="middle">माध्यमिक (VI–VIII)</option>
                      <option value="secondary">हाई स्कूल (IX–X)</option>
                      <option value="senior">सीनियर सेकेंडरी (XI–XII)</option>
                    </select>
                  </div>
                  <div className="relative sm:col-span-2">
                    <MessageSquare className="absolute left-4 top-6 h-4 w-4 text-muted-foreground" />
                    <textarea
                      placeholder="आपका संदेश"
                      rows={4}
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 resize-none"
                      aria-label="आपका संदेश"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
                    >
                      संदेश भेजें
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
