'use client'

import { useState } from 'react'
import { motion, type Variants, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'

const faqs = [
  {
    question: 'How can I contact the school for general inquiries?',
    answer: 'You can call our reception at +91 98765 43210 during office hours (Mon–Sat, 8 AM – 4 PM) or email us at info@schoolname.edu. You can also use the contact form on this page.',
  },
  {
    question: 'What are the school office hours?',
    answer: 'The school office is open Monday through Saturday from 8:00 AM to 4:00 PM. The admission office operates from 9:00 AM to 3:00 PM. Sunday is a holiday.',
  },
  {
    question: 'How do I schedule a meeting with the principal?',
    answer: 'Principal meetings are available Monday through Friday from 10:00 AM to 12:00 PM. Prior appointment is required. Please contact the reception or send an email to principal@schoolname.edu.',
  },
  {
    question: 'What is the best way to reach the admissions office?',
    answer: 'The admissions office can be reached at +91 98765 43210 or admissions@schoolname.edu. You can also schedule a campus visit through our website or visit us in person during office hours.',
  },
  {
    question: 'Does the school have transport facilities?',
    answer: 'Yes, we provide GPS-tracked bus services covering all major routes across the city. For route inquiries, contact the transport department at +91 98765 43214 or transport@schoolname.edu.',
  },
  {
    question: 'How do I report an emergency or safety concern?',
    answer: 'For on-campus emergencies, contact the security office at +91 98765 43216 or the medical room at +91 98765 43215. For external emergencies, dial 100 (police) or 102 (ambulance).',
  },
  {
    question: 'Can I visit the campus without an appointment?',
    answer: 'While walk-in visits are welcome during office hours, we recommend scheduling an appointment for a guided tour. This ensures our admission team is available to give you their full attention.',
  },
  {
    question: 'How quickly can I expect a response to my email?',
    answer: 'Our team typically responds to emails within 24 hours during business days. For urgent matters, we recommend calling us directly for a faster response.',
  },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            Contact FAQs
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Quick Answers to{' '}
            <span className="text-blue-600">Common Questions</span>
          </h2>
        </motion.div>

        <div className="relative mt-10">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setOpenIndex(null)
            }}
            className="w-full rounded-xl border border-border bg-white py-3.5 pl-11 pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Search frequently asked questions"
          />
        </div>

        <motion.div
          className="mt-8 space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50"
                aria-expanded={openIndex === index}
                aria-controls={`contact-faq-answer-${index}`}
              >
                <span className="pr-4 text-sm font-semibold text-primary">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`contact-faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="border-t border-border/40 px-6 py-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No questions found matching your search.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
