'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  FileText,
  ChevronRight,
  Newspaper,
} from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const featuredNews = {
  category: 'Achievement',
  date: 'June 15, 2026',
  title: 'National Science Olympiad Winners 2026',
  description:
    'Our students brought home 12 gold medals, 8 silver medals, and 5 bronze medals at the National Science Olympiad, making us the top-performing school in the region.',
  gradient: 'from-emerald-500/10 via-teal-500/5 to-emerald-500/10',
  badgeBg: 'bg-emerald-500',
  icon: Newspaper,
}

const newsItems = [
  {
    category: 'Event',
    date: 'June 12, 2026',
    title: 'Annual Sports Day 2026',
    summary:
      'Students showcased their athletic talents in a grand celebration of sports and teamwork.',
    gradient: 'from-blue-500/10 via-indigo-500/5 to-blue-500/10',
    badgeBg: 'bg-blue-500',
  },
  {
    category: 'Achievement',
    date: 'June 8, 2026',
    title: 'Inter-School Debate Championship',
    summary:
      'Our debate team secured first place at the regional inter-school debate championship.',
    gradient: 'from-purple-500/10 via-pink-500/5 to-purple-500/10',
    badgeBg: 'bg-purple-500',
  },
  {
    category: 'Celebration',
    date: 'June 5, 2026',
    title: 'Annual Cultural Fest 2026',
    summary:
      'Students mesmerized everyone with stunning performances in music, dance, and drama.',
    gradient: 'from-amber-500/10 via-orange-500/5 to-amber-500/10',
    badgeBg: 'bg-amber-500',
  },
] as const

const events = [
  {
    month: 'Jun',
    date: '20',
    name: 'Parent-Teacher Meeting',
    time: '9:00 AM \u2013 12:00 PM',
    location: 'School Auditorium',
  },
  {
    month: 'Jul',
    date: '05',
    name: 'Summer Camp Begins',
    time: '8:00 AM \u2013 2:00 PM',
    location: 'School Campus',
  },
  {
    month: 'Jul',
    date: '15',
    name: 'Inter-School Sports Meet',
    time: '7:00 AM \u2013 4:00 PM',
    location: 'Sports Complex',
  },
  {
    month: 'Aug',
    date: '10',
    name: 'Independence Day Celebration',
    time: '8:00 AM \u2013 10:00 AM',
    location: 'School Ground',
  },
  {
    month: 'Aug',
    date: '20',
    name: 'Science Exhibition 2026',
    time: '9:00 AM \u2013 3:00 PM',
    location: 'Science Block',
  },
] as const

const announcements = [
  {
    title: 'School Circular',
    description:
      'Important updates for parents and guardians for the upcoming month.',
  },
  {
    title: 'Holiday Notice',
    description:
      'Summer break scheduled. School will remain closed from July 1\u201315.',
  },
  {
    title: 'Exam Schedule',
    description:
      'Final term examination timetable published for classes I\u2013XII.',
  },
  {
    title: 'Admission Notice',
    description:
      `Applications for the academic session ${schoolConfig.admission.session} are now open.`,
  },
] as const

export default function NewsEvents() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Latest Updates"
          title="News, Events & Achievements"
          description="Stay updated with the latest happenings, announcements, competitions, celebrations, and academic achievements."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-8 lg:col-span-7">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="group overflow-hidden rounded-3xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                <div
                  className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${featuredNews.gradient} sm:aspect-[16/7]`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 shadow-sm backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                      <featuredNews.icon className="h-8 w-8 text-emerald-600" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-block rounded-full ${featuredNews.badgeBg} px-3 py-0.5 text-xs font-semibold text-white`}
                    >
                      {featuredNews.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {featuredNews.date}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold leading-tight text-primary sm:text-2xl">
                    {featuredNews.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {featuredNews.description}
                  </p>

                  <Link
                    href="/news"
                    className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all hover:gap-2"
                    aria-label={`Read more about ${featuredNews.title}`}
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid gap-5 sm:grid-cols-3"
variants={staggerContainer(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {newsItems.map((item) => (
                <motion.div
                  key={item.title}
variants={cardVariant}
                  className="group overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${item.gradient}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/60 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Calendar className="h-5 w-5 text-slate-600" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-block rounded-full ${item.badgeBg} px-2.5 py-0.5 text-[10px] font-semibold text-white`}
                      >
                        {item.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {item.date}
                      </span>
                    </div>

                    <h4 className="mt-2 text-sm font-bold leading-snug text-primary">
                      {item.title}
                    </h4>

                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>

                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600 transition-all group-hover:gap-1.5">
                      Read
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="space-y-10 lg:col-span-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={cardVariants}>
              <div className="rounded-3xl border border-border/50 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">
                    Upcoming Events
                  </h3>
                </div>

                <div className="mt-6 space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.name}
                      className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex shrink-0 flex-col items-center rounded-xl bg-blue-50 px-3.5 py-2.5">
                        <span className="text-xs font-semibold uppercase text-blue-600">
                          {event.month}
                        </span>
                        <span className="text-xl font-bold leading-none text-blue-700">
                          {event.date}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-primary">
                          {event.name}
                        </h4>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>

                <Link
                  href="/events"
                  className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all hover:gap-2"
                  aria-label="View all events"
                >
                  View All Events
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={cardVariants}>
              <div className="rounded-3xl border border-border/50 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                    <FileText className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">
                    Announcements
                  </h3>
                </div>

                <div className="mt-6 space-y-3">
                  {announcements.map((item) => (
                    <div
                      key={item.title}
                      className="group flex items-center gap-3.5 rounded-xl border border-border/30 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                        <FileText className="h-5 w-5 text-slate-500" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-primary">
                          {item.title}
                        </h4>
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
