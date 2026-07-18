import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { schoolConfig } from "@/lib/school-config"
import { getGalleryImages } from "@/lib/gallery"

export const metadata: Metadata = {
  title: "Gallery",
  description: `Browse photos of Adarsh High School — campus life, classroom activities, academic events, cultural programmes, and annual functions.`,
  alternates: { canonical: `${schoolConfig.url}/gallery` },
}

const GALLERY_CATEGORIES = [
  "Campus Life",
  "Classroom Activities",
  "Academic Activities",
  "Annual Function",
  "Cultural Programs",
  "Sports Activities",
  "Independence Day",
  "Republic Day",
  "Other",
] as const

export default async function GalleryPage() {
  const images = await getGalleryImages().catch(() => [])

  const grouped = GALLERY_CATEGORIES.map((cat) => ({
    category: cat,
    items: images.filter((img) => img.category === cat),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      <Navbar />
      <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
        <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="badge-pill">Gallery</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-deep-blue sm:text-5xl lg:text-6xl">
            Moments from Our School
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A glimpse into life at Adarsh High School — academics, sports, events, and special moments.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No images in gallery yet.</p>
            </div>
          ) : grouped.length === 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={img.image}
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
          ) : (
            <div className="space-y-16">
              {grouped.map(({ category, items }) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-deep-blue mb-6">
                    {category}
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((img) => (
                      <div
                        key={img.id}
                        className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                          <img
                            src={img.image}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
