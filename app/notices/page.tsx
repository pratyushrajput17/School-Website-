import type { Metadata } from "next"
import { Calendar } from 'lucide-react'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { schoolConfig } from "@/lib/school-config"
import { getNotices } from "@/lib/notices"

export const metadata: Metadata = {
  title: "Notices",
  description: "Latest notices and announcements from Adarsh High School — admissions, academics, examinations, holidays, and events.",
  alternates: { canonical: `${schoolConfig.url}/notices` },
}

const categoryColors: Record<string, string> = {
  Admissions: 'bg-emerald-100 text-emerald-700',
  Academic: 'bg-blue-100 text-blue-700',
  Examination: 'bg-violet-100 text-violet-700',
  Holiday: 'bg-amber-100 text-amber-700',
  Events: 'bg-rose-100 text-rose-700',
  General: 'bg-gray-100 text-gray-700',
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function NoticesPage() {
  const notices = await getNotices().catch(() => [])

  return (
    <>
      <Navbar />
      <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
        <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="badge-pill">Notice Board</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-deep-blue sm:text-5xl lg:text-6xl">
            School Notices
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Important announcements and updates for parents and students.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {notices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No notices published yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="group rounded-2xl border border-deep-blue/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md sm:p-8"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(notice.createdAt)}</span>
                    <span className={`ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColors[notice.category] || 'bg-gray-100 text-gray-700'}`}>
                      {notice.category}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-deep-blue leading-snug">
                    {notice.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {notice.description}
                  </p>
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
