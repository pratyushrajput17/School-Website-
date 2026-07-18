import { FileText, Image, FileCheck, Fingerprint, ScrollText, HeartPulse } from 'lucide-react'

const documents = [
  { icon: FileText, title: 'जन्म प्रमाण पत्र', description: 'नगर निगम या जन्म रजिस्ट्रार से जारी मूल प्रमाण पत्र और प्रति।' },
  { icon: Image, title: 'पासपोर्ट फोटो', description: 'बच्चे के 4 हालिया पासपोर्ट साइज़ फोटो और माता-पिता के 2-2 फोटो।' },
  { icon: FileCheck, title: 'स्थानांतरण प्रमाण पत्र', description: 'पिछले स्कूल से टीसी (कक्षा I एवं उससे ऊपर के लिए)।' },
  { icon: Fingerprint, title: 'आधार कार्ड', description: 'बच्चे और माता-पिता का आधार कार्ड।' },
  { icon: ScrollText, title: 'पिछली रिपोर्ट कार्ड', description: 'पिछले दो शैक्षणिक वर्षों की रिपोर्ट कार्ड की प्रति।' },
  { icon: HeartPulse, title: 'मेडिकल प्रमाण पत्र', description: 'रजिस्टर्ड डॉक्टर से स्वास्थ्य प्रमाण पत्र और टीकाकरण रिकॉर्ड।' },
] as const

export default function Documents() {
  return (
    <section className="relative overflow-hidden bg-saffron-light/20 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">आवश्यक दस्तावेज</span>
          <h2 className="heading-xl mt-6">
            प्रवेश के लिए आवश्यक दस्तावेज
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            प्रवेश प्रक्रिया को सुचारू बनाने के लिए ये दस्तावेज तैयार रखें।
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
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground hindi-text">
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
