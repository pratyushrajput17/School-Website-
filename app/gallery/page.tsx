import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import PageBanner from "@/components/layout/PageBanner"
import { schoolConfig } from "@/lib/school-config"

const Footer = dynamic(() => import("@/components/Footer"))

export const metadata: Metadata = {
  title: "Gallery",
  description: `Browse photos of Adarsh High School — campus life, classroom activities, academic events, cultural programmes, and annual functions.`,
  alternates: { canonical: `${schoolConfig.url}/gallery` },
}

const categories = ["Campus Life", "Classroom Activities", "Academic Activities", "Cultural Programs", "Annual Functions"] as const
const colors = ["from-emerald-100 to-emerald-50 text-emerald-700", "from-blue-100 to-blue-50 text-blue-700", "from-violet-100 to-violet-50 text-violet-700", "from-amber-100 to-amber-50 text-amber-700", "from-rose-100 to-rose-50 text-rose-700"]
const categoryIcons = ["🏫", "📚", "🔬", "🎭", "🏆"]

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
            {categories.map((cat, i) => (
              <span
                key={cat}
                className="rounded-full border border-deep-blue/10 bg-white px-5 py-2 text-sm font-medium text-deep-blue shadow-sm"
              >
                {categoryIcons[i]} {cat}
              </span>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.flatMap((cat, ci) =>
              [1, 2].map((num) => {
                const id = `${ci}-${num}`
                return (
                  <div
                    key={id}
                    className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className={`aspect-[4/3] w-full bg-gradient-to-br ${colors[ci % colors.length]}`}>
                      <div className="flex h-full flex-col items-center justify-center gap-2">
                        <span className="text-4xl">{categoryIcons[ci]}</span>
                        <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-deep-blue shadow-sm">
                          {cat}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-4 pt-8">
                      <p className="text-sm font-medium text-white">
                        {cat} - {num}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
