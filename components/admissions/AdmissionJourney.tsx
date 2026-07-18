import { FileText, Search, Users, ClipboardCheck, GraduationCap } from 'lucide-react'

const steps = [
  { icon: FileText, title: 'जानकारी प्राप्त करें', description: 'ऑनलाइन फॉर्म भरें या स्कूल आकर जानकारी लें।' },
  { icon: Search, title: 'स्कूल भ्रमण', description: 'हमारे कैंपस को देखें, शिक्षकों से मिलें और माहौल को महसूस करें।' },
  { icon: Users, title: 'बातचीत / मूल्यांकन', description: 'बच्चे की क्षमता समझने के लिए एक सरल बातचीत और मूल्यांकन।' },
  { icon: ClipboardCheck, title: 'दस्तावेज जमा करें', description: 'सभी आवश्यक दस्तावेज जमा करके आवेदन प्रक्रिया पूरी करें।' },
  { icon: GraduationCap, title: 'प्रवेश की पुष्टि', description: 'प्रवेश की पुष्टि के बाद हमारे परिवार में आपका स्वागत है।' },
] as const

export default function AdmissionJourney() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">प्रवेश प्रक्रिया</span>
          <h2 className="heading-xl mt-6">
            प्रवेश की प्रक्रिया
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            एक सरल और पारदर्शी प्रवेश प्रक्रिया जो आपके परिवार के लिए सहज और आसान हो।
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-deep-blue/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <step.icon className="h-7 w-7 text-saffron-dark" />
              </div>

              <div className="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-saffron-light text-sm font-bold text-saffron-dark">
                {index + 1}
              </div>

              <h3 className="mt-4 text-lg font-bold text-deep-blue">{step.title}</h3>
              <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-muted-foreground hindi-text">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
