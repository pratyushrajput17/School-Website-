import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const contactDetails = [
  { icon: Phone, title: 'फ़ोन', detail: schoolConfig.contact.phone, subtitle: schoolConfig.contact.altPhone, bg: 'bg-saffron-light', color: 'text-saffron-dark', href: `tel:${schoolConfig.contact.phone}` },
  { icon: Mail, title: 'ईमेल', detail: schoolConfig.contact.email, subtitle: 'हम 24 घंटे में उत्तर देते हैं', bg: 'bg-saffron-light', color: 'text-saffron-dark', href: `mailto:${schoolConfig.contact.email}` },
  { icon: MapPin, title: 'पता', detail: schoolConfig.contact.address, subtitle: 'Gadarwara Road, Sainkheda', bg: 'bg-saffron-light', color: 'text-saffron-dark', href: '#map' },
  { icon: Clock, title: 'कार्य के घंटे', detail: schoolConfig.contact.officeHours, subtitle: 'रविवार बंद', bg: 'bg-saffron-light', color: 'text-saffron-dark', href: '#' },
] as const

export default function ContactInfo() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">संपर्क जानकारी</span>
          <h2 className="heading-xl mt-6">
            हमसे जुड़ने के तरीके
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            अपनी सुविधा के अनुसार हमसे संपर्क करें। हम आपकी सहायता के लिए हमेशा तैयार हैं।
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group flex items-start gap-4 rounded-2xl border border-deep-blue/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-deep-blue">{item.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.detail}</p>
                <p className="mt-0.5 text-xs text-saffron-dark">{item.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
