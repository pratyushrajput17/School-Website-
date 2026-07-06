'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

const testimonials = [
  {
    name: 'Priya Mehta',
    role: 'Parent of Aarav, Class II',
    content: 'The admission process was incredibly smooth and transparent. The faculty took time to understand my child\'s needs and made us feel completely at ease. It was clear from day one that this school genuinely cares about each child\'s development.',
    rating: 5,
  },
  {
    name: 'Rahul Kapoor',
    role: 'Parent of Ananya, Class VI',
    content: 'What stood out during our admission journey was the warmth and professionalism of the entire team. From the campus tour to the interaction session, every step was well-organized. Our daughter has flourished here beyond our expectations.',
    rating: 5,
  },
  {
    name: 'Sunita Desai',
    role: 'Parent of Rohan, Class IX',
    content: 'We chose this school for its balanced approach to academics and extracurricular activities. The admission team patiently answered all our questions and helped us make an informed decision. Two years later, we know we made the right choice.',
    rating: 5,
  },
] as const



export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Parent Testimonials"
          title="Hear from Our"
          highlight="Parent Community"
          description="Discover why families trust us with their children's education and future."
        />

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="group relative rounded-2xl border border-border/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-blue-100" />

              <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm font-bold text-blue-600">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
