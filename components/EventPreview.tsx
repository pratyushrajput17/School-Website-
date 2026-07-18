import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { getEvents } from '@/lib/events'

const categoryColors: Record<string, string> = {
  'Academic Activities': 'from-cyan-100 to-cyan-50',
  'Annual Function': 'from-rose-100 to-rose-50',
  'Cultural Programs': 'from-violet-100 to-violet-50',
  'Sports Activities': 'from-emerald-100 to-emerald-50',
  'National Celebrations': 'from-orange-100 to-orange-50',
  'Competitions': 'from-amber-100 to-amber-50',
  'Parent Meetings': 'from-blue-100 to-blue-50',
  'General Events': 'from-gray-100 to-gray-50',
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function EventPreview() {
  const latest = await getEvents({ limit: 3 }).catch(() => [])

  if (latest.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-saffron-light/20 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Events & Activities</span>
          <h2 className="heading-xl mt-6">
            Beyond the Classroom
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Students participate in celebrations, competitions, and educational activities throughout the year.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((event) => (
            <div
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-deep-blue/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <div className={`aspect-[16/9] w-full bg-gradient-to-br ${categoryColors[event.category] || 'from-gray-100 to-gray-50'} flex items-center justify-center overflow-hidden`}>
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Calendar className="h-12 w-12 text-white/40" />
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(event.eventDate)}</span>
                </div>
                <h3 className="mt-2 text-base font-bold text-deep-blue leading-snug">
                  {event.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
          >
            View All Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
