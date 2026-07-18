import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import PageBanner from "@/components/layout/PageBanner"
import { schoolConfig } from "@/lib/school-config"

const Footer = dynamic(() => import("@/components/Footer"))

export const metadata: Metadata = {
  title: "Gallery",
  description: `Browse photos of Adarsh High School — campus, programmes, sports, and student life.`,
  alternates: { canonical: `${schoolConfig.url}/gallery` },
}

const categories = ["Campus", "Programmes", "Sports", "Activities"]
const colors = ["bg-blue-100 text-blue-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-violet-100 text-violet-700"]

const galleryItems = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  category: categories[i % categories.length],
  color: colors[i % colors.length],
  title: `${categories[i % categories.length]} ${Math.floor(i / categories.length) + 1}`,
}))

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <PageBanner
        badge="Gallery"
        title="Moments from"
        highlight="Our School"
        description="A glimpse into life at Adarsh High School — academics, sports, events, and special moments."
        minHeight="min-h-[50vh]"
      />
      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-deep-blue/10 bg-white px-5 py-2 text-sm font-medium text-deep-blue shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-saffron/20 via-white to-deep-blue/10">
                  <div className="flex h-full items-center justify-center">
                    <span className={`rounded-full px-4 py-1.5 text-xs font-medium ${item.color}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-4 pt-8">
                  <p className="text-sm font-medium text-white">{item.title}</p>
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
