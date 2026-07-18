import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  { label: 'Campus Life', color: 'from-emerald-100 to-emerald-50', icon: '🏫' },
  { label: 'Classroom Activities', color: 'from-blue-100 to-blue-50', icon: '📚' },
  { label: 'Cultural Programs', color: 'from-amber-100 to-amber-50', icon: '🎭' },
] as const

export default function GalleryPreview() {
  return (
    <section className="relative overflow-hidden bg-saffron-light/20 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Gallery</span>
          <h2 className="heading-xl mt-6">
            Glimpses of School Life
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A quick look at what makes Adarsh High School a vibrant place for learning and growth.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`aspect-[4/3] w-full bg-gradient-to-br ${cat.color}`}>
                <div className="flex h-full flex-col items-center justify-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm">
                    <span className="text-3xl">{cat.icon}</span>
                  </div>
                  <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-deep-blue shadow-sm">
                    {cat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
