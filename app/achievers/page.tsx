import type { Metadata } from "next"
import { ArrowRight } from 'lucide-react'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { schoolConfig } from "@/lib/school-config"
import { getAchievers } from "@/lib/achievers"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Academic Achievers",
  description: "Meet the top academic achievers at Adarsh High School — students who have excelled in their studies.",
  alternates: { canonical: `${schoolConfig.url}/achievers` },
}

function formatSession(year: number) {
  return `${year}-${String(year + 1).slice(-2)}`
}

function getGrade(percentage: number) {
  if (percentage >= 90) return { label: "A+", color: "text-emerald-600 bg-emerald-50" }
  if (percentage >= 75) return { label: "A", color: "text-blue-600 bg-blue-50" }
  if (percentage >= 60) return { label: "B+", color: "text-amber-600 bg-amber-50" }
  return { label: "B", color: "text-gray-600 bg-gray-50" }
}

export default async function AchieversPage() {
  const achievers = await getAchievers({ publishedOnly: true }).catch(() => [])

  const groupedBySession: Record<number, typeof achievers[number][]> = {}
  for (const a of achievers) {
    if (!groupedBySession[a.academicSession]) groupedBySession[a.academicSession] = []
    groupedBySession[a.academicSession].push(a)
  }

  const sessions = Object.keys(groupedBySession)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <>
      <Navbar />
      <section className="relative min-h-[45vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
        <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />
        <div className="relative mx-auto flex min-h-[45vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="badge-pill">Academic Excellence</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-deep-blue sm:text-5xl lg:text-6xl">
            Academic Achievers
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Celebrating the hard work and dedication of our students who have achieved outstanding academic results.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {achievers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No achievers published yet.</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div key={session} className="mb-16 last:mb-0">
                <div className="mb-8 text-center">
                  <span className="inline-block rounded-full bg-saffron-light px-4 py-1.5 text-sm font-semibold text-saffron-dark">
                    Session {formatSession(session)}
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedBySession[session].map((achiever) => {
                    const grade = getGrade(achiever.percentage)
                    return (
                      <div
                        key={achiever.id}
                        className="group rounded-2xl border border-deep-blue/10 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
                      >
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-saffron-light overflow-hidden">
                          {achiever.photoUrl ? (
                            <img
                              src={achiever.photoUrl}
                              alt={achiever.studentName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="text-saffron-dark text-2xl font-bold">
                              {achiever.studentName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-deep-blue">
                          {achiever.studentName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Class {achiever.className}
                        </p>
                        {achiever.achievementTitle && (
                          <p className="mt-1 text-xs font-medium text-saffron">
                            {achiever.achievementTitle}
                          </p>
                        )}
                        <div className="mt-3 flex items-center justify-center gap-2">
                          <span
                            className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${grade.color}`}
                          >
                            {grade.label}
                          </span>
                          <span className="text-lg font-bold text-saffron">
                            {achiever.percentage}%
                          </span>
                        </div>
                        {achiever.rank > 0 && (
                          <p className="mt-1 text-xs text-deep-blue font-semibold">
                            Rank #{achiever.rank}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}

          <div className="mt-12 text-center">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-saffron-dark"
            >
              Begin Your Journey at Adarsh High School
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
