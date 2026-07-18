import { FileText, Image, FileCheck, Fingerprint, ScrollText, HeartPulse } from 'lucide-react'

const documents = [
  { icon: FileText, title: 'Birth Certificate', description: 'Original certificate and copy issued by municipal corporation or birth registrar.' },
  { icon: Image, title: 'Passport Photos', description: '4 recent passport-size photos of the child and 2 each of parents.' },
  { icon: FileCheck, title: 'Transfer Certificate', description: 'TC from previous school (for Class I and above).' },
  { icon: Fingerprint, title: 'Aadhaar Card', description: 'Aadhaar card of the child and both parents.' },
  { icon: ScrollText, title: 'Previous Report Cards', description: 'Copies of report cards from the last two academic years.' },
  { icon: HeartPulse, title: 'Medical Certificate', description: 'Health certificate from a registered doctor and immunisation records.' },
] as const

export default function Documents() {
  return (
    <section className="relative overflow-hidden bg-saffron-light/20 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Required Documents</span>
          <h2 className="heading-xl mt-6">
            Documents Needed for Admission
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Keep these documents ready to ensure a smooth admission process.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <div
              key={doc.title}
              className="group flex items-start gap-4 rounded-xl border border-deep-blue/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron/20 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-saffron-light">
                <doc.icon className="h-5 w-5 text-saffron-dark" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-deep-blue">{doc.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {doc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
