"use client";

import { useState, useEffect } from 'react'
import { Award, BookOpen, Target, BarChart3, GraduationCap } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

interface Achiever {
  id: string
  name: string
  className: string
  percentage: number
  photo: string | null
  year: number
}

const highlights = [
  {
    icon: Award,
    title: 'Board Results',
    value: `${schoolConfig.stats.boardResults.value}${schoolConfig.stats.boardResults.suffix}`,
    description: 'Students consistently achieve strong academic results in MP Board examinations.',
  },
  {
    icon: BookOpen,
    title: 'MP Board Curriculum',
    value: 'Nursery–Class 10',
    description: 'Structured learning through the MP Board syllabus with focus on conceptual clarity.',
  },
  {
    icon: Target,
    title: 'Years of Experience',
    value: `${schoolConfig.stats.years.value}${schoolConfig.stats.years.suffix}`,
    description: 'Over a decade of experience in providing quality education to the community.',
  },
  {
    icon: BarChart3,
    title: 'Regular Assessments',
    value: 'Continuous',
    description: 'Periodic tests, assignments and feedback to track and support student progress.',
  },
] as const

function getGrade(percentage: number) {
  if (percentage >= 90) return { label: 'A+', color: 'text-emerald-600 bg-emerald-50' }
  if (percentage >= 75) return { label: 'A', color: 'text-blue-600 bg-blue-50' }
  if (percentage >= 60) return { label: 'B+', color: 'text-amber-600 bg-amber-50' }
  return { label: 'B', color: 'text-gray-600 bg-gray-50' }
}

export default function AcademicAchievers() {
  const [achievers, setAchievers] = useState<Achiever[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAchievers() {
      try {
        const res = await fetch('/api/achievers?limit=8')
        if (res.ok) {
          const data = await res.json()
          setAchievers(data.achievers || [])
        }
      } catch {
        /* silent */
      } finally {
        setLoading(false)
      }
    }
    fetchAchievers()
  }, [])

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Academic Excellence</span>
          <h2 className="heading-xl mt-6">
            Academic Achievers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our students strive for academic excellence through a well-structured curriculum and dedicated guidance.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-deep-blue/10 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-light">
                <item.icon className="h-7 w-7 text-saffron-dark" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-saffron">
                {item.value}
              </p>
              <h3 className="mt-1 text-base font-bold text-deep-blue">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {!loading && achievers.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-deep-blue">Top Achievers</h3>
              <p className="mt-2 text-muted-foreground">
                Students who have excelled in their academic pursuits
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {achievers.map((achiever) => {
                const grade = getGrade(achiever.percentage)
                return (
                  <div
                    key={achiever.id}
                    className="group rounded-2xl border border-deep-blue/10 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-light overflow-hidden">
                      {achiever.photo ? (
                        <img
                          src={achiever.photo}
                          alt={achiever.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <GraduationCap className="h-8 w-8 text-saffron-dark" />
                      )}
                    </div>
                    <h3 className="mt-4 font-bold text-deep-blue">{achiever.name}</h3>
                    <p className="text-sm text-muted-foreground">Class {achiever.className}</p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${grade.color}`}>
                        {grade.label}
                      </span>
                      <span className="text-lg font-bold text-saffron">{achiever.percentage}%</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Session {achiever.year}-{String(achiever.year + 1).slice(-2)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
