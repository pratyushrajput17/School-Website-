import { Monitor, FlaskConical, Library, Trophy } from 'lucide-react'

const facilities = [
  {
    title: 'स्मार्ट डिजिटल क्लासरूम',
    description: 'आधुनिक तकनीक से सुसज्जित कक्षाएँ जहाँ शिक्षण रोचक और प्रभावी होता है।',
    icon: Monitor,
    points: ['इंटरैक्टिव स्मार्ट बोर्ड', 'डिजिटल लर्निंग टूल्स', 'विशाल और हवादार कक्षाएँ'],
  },
  {
    title: 'विज्ञान एवं कंप्यूटर प्रयोगशाला',
    description: 'व्यावहारिक शिक्षा के लिए पूरी तरह सुसज्जित प्रयोगशालाएँ।',
    icon: FlaskConical,
    points: ['भौतिकी प्रयोगशाला', 'रसायन विज्ञान प्रयोगशाला', 'जीवविज्ञान प्रयोगशाला', 'कंप्यूटर प्रयोगशाला'],
  },
  {
    title: 'पुस्तकालय एवं अध्ययन कक्ष',
    description: 'ज्ञानवर्धन और शोध के लिए शांत और समृद्ध वातावरण।',
    icon: Library,
    points: ['हजारों पुस्तकें', 'डिजिटल संसाधन', 'अध्ययन क्षेत्र'],
  },
  {
    title: 'खेलकूद एवं शारीरिक शिक्षा',
    description: 'खेल और शारीरिक गतिविधियों के माध्यम से सर्वांगीण विकास।',
    icon: Trophy,
    points: ['इनडोर खेल', 'आउटडोर मैदान', 'वार्षिक खेलकूद प्रतियोगिताएँ'],
  },
] as const

export default function Facilities() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">सुविधाएँ</span>
          <h2 className="heading-xl mt-6">
            हमारी प्रमुख सुविधाएँ
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            हमारा कैंपस आधुनिक सुविधाओं से सुसज्जित है जो विद्यार्थियों के सर्वांगीण विकास में सहायक हैं।
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {facilities.map((facility, index) => (
            <div
              key={facility.title}
              className="rounded-2xl border border-deep-blue/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-saffron-light">
                  <facility.icon className="h-7 w-7 text-saffron-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-deep-blue">{facility.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground hindi-text">
                    {facility.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {facility.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full bg-saffron-light/50 px-3 py-1 text-xs font-medium text-saffron-dark"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
