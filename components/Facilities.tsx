'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Monitor,
  FlaskConical,
  Library,
  Trophy,
  ArrowRight,
} from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { cardVariant } from '@/lib/animations'

const facilities = [
  {
    title: 'Smart Digital Classrooms',
    description:
      'Interactive classrooms equipped with modern teaching technology.',
    icon: Monitor,
    gradient: 'from-blue-600 to-sky-400',
    badge: 'Interactive Learning',
    points: [
      'Interactive Smart Boards',
      'Digital Learning Tools',
      'Airy & Spacious Rooms',
      'Student-Centric Environment',
    ],
  },
  {
    title: 'Science & Computer Laboratories',
    description:
      'Well-equipped laboratories designed for practical learning.',
    icon: FlaskConical,
    gradient: 'from-violet-600 to-purple-400',
    badge: 'Hands-On Learning',
    points: [
      'Physics Lab',
      'Chemistry Lab',
      'Biology Lab',
      'Computer Lab',
    ],
  },
  {
    title: 'Library & Innovation Center',
    description:
      'A peaceful space encouraging reading, creativity and research.',
    icon: Library,
    gradient: 'from-amber-600 to-orange-400',
    badge: 'Knowledge Hub',
    points: [
      'Thousands of Books',
      'Digital Resources',
      'Reading Zone',
      'Research Support',
    ],
  },
  {
    title: 'Sports & Recreation',
    description:
      'Developing teamwork, discipline and physical fitness.',
    icon: Trophy,
    gradient: 'from-emerald-600 to-teal-400',
    badge: 'Physical Excellence',
    points: [
      'Indoor Sports',
      'Outdoor Grounds',
      'Annual Sports Events',
      'Professional Coaching',
    ],
  },
] as const

function FacilityImage({
  icon: Icon,
  gradient,
  badge,
  index,
}: {
  icon: React.ElementType
  gradient: string
  badge: string
  index: number
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${gradient}`}
      >
        <div className="absolute inset-0 bg-black/10 transition-transform duration-700 group-hover:scale-105" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 shadow-lg shadow-black/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-10 w-10 text-white" />
          </div>
        </div>

        <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
          <motion.div
            className="rounded-xl border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-sm"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          >
            {badge}
          </motion.div>
        </div>

        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/15 shadow-sm backdrop-blur-sm"
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5 + 0.5,
            }}
          >
            <div className="h-2 w-2 rounded-full bg-white" />
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-6">
          <div className="flex -space-x-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 text-[10px] font-semibold text-white backdrop-blur-sm"
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Facilities() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Facilities"
          title="Designed for Learning, Innovation & Growth"
          description="Our campus provides a modern, safe, and inspiring environment where students can explore, learn, and grow."
        />

        <div className="mt-20 space-y-24 lg:space-y-32">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <div
                className={index % 2 !== 0 ? 'lg:order-2' : ''}
              >
                <FacilityImage
                  icon={facility.icon}
                  gradient={facility.gradient}
                  badge={facility.badge}
                  index={index}
                />
              </div>

              <div
                className={index % 2 !== 0 ? 'lg:order-1' : ''}
              >
                <motion.span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  {facility.badge}
                </motion.span>

                <motion.h3 className="mt-2 text-2xl font-bold leading-tight text-primary sm:text-3xl">
                  {facility.title}
                </motion.h3>

                <motion.p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {facility.description}
                </motion.p>

                <motion.ul className="mt-6 space-y-3">
                  {facility.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      <span className="text-base text-muted-foreground">
                        {point}
                      </span>
                    </li>
                  ))}
                </motion.ul>

                <motion.div>
                  <Link
                    href="/about"
                    className="group mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                    aria-label={`Learn more about ${facility.title}`}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
