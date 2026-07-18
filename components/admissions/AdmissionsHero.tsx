import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const quickFacts = [
  { icon: CheckCircle, label: 'प्रवेश जारी', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Clock, label: 'सीमित सीटें', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Calendar, label: 'आवेदन करें', color: 'text-saffron-dark', bg: 'bg-saffron-light' },
] as const

const heroStats = [
  { value: `${schoolConfig.stats.students.value}${schoolConfig.stats.students.suffix}`, label: 'विद्यार्थी' },
  { value: `${schoolConfig.stats.teachers.value}${schoolConfig.stats.teachers.suffix}`, label: 'शिक्षक' },
  { value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`, label: 'वर्षों का अनुभव' },
  { value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`, label: 'बोर्ड परिणाम' },
] as const

export default function AdmissionsHero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
      <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
      <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[85vh] flex-col items-center justify-center py-20 text-center lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-center gap-3">
              <span className="badge-pill">प्रवेश खुले हैं</span>
              <span className="inline-block rounded-full border border-saffron/30 bg-saffron-light px-4 py-1.5 text-sm font-medium text-saffron-dark">
                सत्र {schoolConfig.admission.session}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-deep-blue sm:text-5xl lg:text-6xl xl:text-7xl">
              अपने बच्चे का भविष्य{' '}
              <span className="text-saffron">संवारें</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl hindi-text">
              {schoolConfig.name} में अपने बच्चे को गुणवत्तापूर्ण शिक्षा और संस्कारयुक्त
              वातावरण दें। यहाँ हर विद्यार्थी को उनकी क्षमता पहचानने और जीवन में
              सफल होने का अवसर मिलता है।
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`tel:${schoolConfig.contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
              >
                प्रवेश के लिए संपर्क करें
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-deep-blue/20 bg-white px-5 py-3 text-sm font-medium text-deep-blue">
                <MapPin className="h-4 w-4" />
                {schoolConfig.contact.address}
              </span>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-2 rounded-full border border-deep-blue/10 bg-white px-5 py-2 shadow-sm"
                >
                  <fact.icon className={`h-4 w-4 ${fact.color}`} />
                  <span className="text-sm font-semibold text-deep-blue">{fact.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-deep-blue/10 pt-12 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold tracking-tight text-saffron sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
