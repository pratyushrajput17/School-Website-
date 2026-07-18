import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getGalleryImages } from '@/lib/gallery'

export default async function GalleryPreview() {
  const latest = await getGalleryImages({ limit: 6 }).catch(() => [])

  if (latest.length === 0) return null

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
          {latest.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                <h3 className="text-sm font-semibold text-white">
                  {img.title}
                </h3>
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
