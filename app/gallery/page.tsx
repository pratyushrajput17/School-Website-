import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import PageBanner from "@/components/layout/PageBanner"
import { schoolConfig } from "@/lib/school-config"

const Footer = dynamic(() => import("@/components/Footer"))

export const metadata: Metadata = {
  title: "Gallery",
  description: `Browse photos of Adarsh High School — campus, events, sports, and moments from school life in Sainkheda, MP.`,
  alternates: { canonical: `${schoolConfig.url}/gallery` },
}

const categories = ["Campus", "Events", "Sports", "Activities"]
const gradients = [
  "from-blue-400 to-blue-600",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-amber-600",
  "from-violet-400 to-violet-600",
]

const galleryItems = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  category: categories[i % categories.length],
  gradient: gradients[i % gradients.length],
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
        description="A glimpse into the vibrant life at Adarsh High School — from classrooms and events to sports and special moments."
        minHeight="min-h-[50vh]"
      />
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700"
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`aspect-[4/3] w-full bg-gradient-to-br ${item.gradient}`}>
                  <div className="flex h-full items-center justify-center">
                    <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 pt-8">
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
