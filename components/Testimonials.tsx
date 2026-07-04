'use client'

import { motion, type Variants } from 'framer-motion'
import { Quote, Star, CheckCircle } from 'lucide-react'

const testimonials = [
  {
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Parent of Grade V Student',
    content:
      'The school has been instrumental in my child\u2019s overall development. The teachers are dedicated, the curriculum is well-rounded, and the environment is truly nurturing.',
    color: 'bg-blue-100',
    textColor: 'text-blue-600',
    ring: 'ring-blue-600/10',
  },
  {
    initials: 'AM',
    name: 'Arjun Mehta',
    role: 'Alumni \u2013 Batch 2023',
    content:
      'My years at this school shaped my character and career. The holistic education approach, dedicated mentors, and strong value system prepared me well for college and beyond.',
    color: 'bg-emerald-100',
    textColor: 'text-emerald-600',
    ring: 'ring-emerald-600/10',
  },
  {
    initials: 'RK',
    name: 'Rekha Kapoor',
    role: 'Parent of Nursery Student',
    content:
      'We were amazed by how quickly our child adapted to the school environment. The warm teachers, activity-based learning, and safe campus gave us complete peace of mind.',
    color: 'bg-violet-100',
    textColor: 'text-violet-600',
    ring: 'ring-violet-600/10',
  },
  {
    initials: 'AV',
    name: 'Aarav Verma',
    role: 'Grade X Student',
    content:
      'I love coming to school every day. The smart classrooms, amazing library, and supportive teachers make learning enjoyable. The sports facilities are fantastic too!',
    color: 'bg-amber-100',
    textColor: 'text-amber-600',
    ring: 'ring-amber-600/10',
  },
  {
    initials: 'SN',
    name: 'Sunita Nair',
    role: 'Parent of Grade VIII Student',
    content:
      'The academic standards and extracurricular opportunities here are outstanding. My child has grown in confidence and curiosity. The regular parent-teacher interactions are excellent.',
    color: 'bg-rose-100',
    textColor: 'text-rose-600',
    ring: 'ring-rose-600/10',
  },
  {
    initials: 'RC',
    name: 'Rohan Choudhury',
    role: 'Alumni \u2013 Engineering Student',
    content:
      'This school gave me a strong academic foundation and the confidence to pursue my dreams. The teachers went above and beyond to guide me. Forever grateful for my time here.',
    color: 'bg-cyan-100',
    textColor: 'text-cyan-600',
    ring: 'ring-cyan-600/10',
  },
] as const

const trustIndicators = [
  'Experienced Faculty',
  'Safe Campus',
  'Excellent Results',
  'Happy Parents',
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                Testimonials
              </span>
            </motion.div>

            <motion.h2
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            >
              What Parents &amp; Students Say
            </motion.h2>

            <motion.p
              className="mt-4 text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
              Authentic experiences from our community highlight the trust,
              academic excellence, and holistic development that define our
              school.
            </motion.p>
          </div>

          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  ⭐
                </span>
                <div>
                  <p className="text-xl font-bold text-primary">4.9 / 5</p>
                  <p className="whitespace-nowrap text-sm text-muted-foreground">
                    Based on 500+ Parent Reviews
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className="group rounded-3xl border border-white/40 bg-white/80 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-md"
            >
              <Quote className="h-8 w-8 text-blue-200" aria-hidden="true" />

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3.5 border-t border-border/40 pt-5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${testimonial.color} ring-1 ${testimonial.ring}`}
                >
                  <span
                    className={`text-sm font-bold ${testimonial.textColor}`}
                  >
                    {testimonial.initials}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>

                <StarRating rating={5} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustIndicators.map((indicator) => (
              <div
                key={indicator}
                className="flex items-center gap-2.5"
              >
                <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                <span className="text-sm font-medium text-primary">
                  {indicator}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
