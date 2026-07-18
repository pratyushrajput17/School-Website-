import type { Metadata } from "next"
import { Calendar } from 'lucide-react'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { schoolConfig } from "@/lib/school-config"

export const metadata: Metadata = {
  title: "Events & Activities",
  description: "Explore events and activities at Adarsh High School — annual functions, celebrations, sports, cultural programs, competitions, and more.",
  alternates: { canonical: `${schoolConfig.url}/events` },
}

const categoryIcons: Record<string, string> = {
  'Annual Function': '🎭',
  'Independence Day': '🇮🇳',
  'Republic Day': '🇮🇳',
  'Sports Activities': '🏃',
  'Cultural Programs': '🎵',
  'Educational Activities': '🔬',
  'Competitions': '🏆',
  'Special Celebrations': '🎉',
}

const categoryColors: Record<string, string> = {
  'Annual Function': 'from-rose-100 to-rose-50',
  'Independence Day': 'from-orange-100 to-orange-50',
  'Republic Day': 'from-blue-100 to-blue-50',
  'Sports Activities': 'from-emerald-100 to-emerald-50',
  'Cultural Programs': 'from-violet-100 to-violet-50',
  'Educational Activities': 'from-cyan-100 to-cyan-50',
  'Competitions': 'from-amber-100 to-amber-50',
  'Special Celebrations': 'from-pink-100 to-pink-50',
}

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
        <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="badge-pill">Events & Activities</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-deep-blue sm:text-5xl lg:text-6xl">
            Events & Activities
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            At Adarsh High School, learning extends beyond textbooks. Students participate in celebrations, competitions, sports, and cultural activities throughout the year.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {schoolConfig.events.map((event) => (
              <div
                key={event.id}
                className="group overflow-hidden rounded-2xl border border-deep-blue/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
              >
                <div className={`aspect-[16/9] w-full bg-gradient-to-br ${categoryColors[event.category] || 'from-gray-100 to-gray-50'} flex items-center justify-center`}>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm">
                    <span className="text-3xl">{categoryIcons[event.category] || '📅'}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-deep-blue leading-snug">
                    {event.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
