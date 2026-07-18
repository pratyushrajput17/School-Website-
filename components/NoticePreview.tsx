import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { getNotices } from '@/lib/notices'

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

export default async function NoticePreview() {
  const latest = await getNotices({ limit: 3 }).catch(() => [])

  if (latest.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Notice Board</span>
          <h2 className="heading-xl mt-6">
            Latest Notices
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated with important announcements and school events.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((notice) => (
            <div
              key={notice.id}
              className="group rounded-2xl border border-deep-blue/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(notice.createdAt)}</span>
                <span className={`ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColors[notice.category] || 'bg-gray-100 text-gray-700'}`}>
                  {notice.category}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-deep-blue leading-snug">
                {notice.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {notice.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
          >
            View All Notices
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
