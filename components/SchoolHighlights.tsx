import { schoolConfig } from '@/lib/school-config'

const highlights = [
  { value: `${schoolConfig.stats.students.value}${schoolConfig.stats.students.suffix}`, label: 'विद्यार्थी', description: 'हमारे परिवार का हिस्सा' },
  { value: `${schoolConfig.stats.teachers.value}${schoolConfig.stats.teachers.suffix}`, label: 'अनुभवी शिक्षक', description: 'समर्पित और योग्य' },
  { value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`, label: 'वर्षों का अनुभव', description: 'गुणवत्तापूर्ण शिक्षा में' },
  { value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`, label: 'बोर्ड परिणाम', description: 'उत्कृष्ट शैक्षणिक प्रदर्शन' },
] as const

export default function SchoolHighlights() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-deep-blue to-deep-blue/95 py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron/5 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-4xl font-bold tracking-tight text-saffron sm:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-lg font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-sm text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
