'use client'

import { useState } from 'react'
import { motion, type Variants, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'

const faqs = [
  {
    question: 'What curriculum does the school follow?',
    answer: 'Our school follows the CBSE curriculum from primary through senior secondary, offering a comprehensive education that prepares students for board examinations and competitive entrance tests.',
  },
  {
    question: 'What are the school timings?',
    answer: 'School operates from 8:00 AM to 3:00 PM, Monday through Saturday. The pre-primary section has a shorter day from 8:30 AM to 12:30 PM to accommodate younger learners.',
  },
  {
    question: 'Is transportation available for students?',
    answer: 'Yes, we provide safe GPS-tracked bus service covering all major routes across the city. Each bus has a trained attendant and follows strict safety protocols.',
  },
  {
    question: 'What extracurricular activities are offered?',
    answer: 'Students can participate in a wide variety of activities including sports, music, dance, drama, art, robotics, coding, debate, and community service programs.',
  },
  {
    question: 'How does the school ensure student safety?',
    answer: 'Our campus has 24×7 CCTV surveillance, security personnel, visitor management system, GPS-tracked buses, and conducts regular safety drills.',
  },
  {
    question: 'What is the student-teacher ratio?',
    answer: 'We maintain an optimal student-teacher ratio of 20:1 to ensure personalized attention and effective learning outcomes for every student.',
  },
  {
    question: 'Are scholarships available?',
    answer: 'Yes, we offer merit-based and need-based scholarships. Details are published at the start of each academic session.',
  },
  {
    question: 'How can I schedule a campus visit?',
    answer: 'You can schedule a campus visit by calling our admission office or filling out the campus visit request form on our website.',
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
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            Frequently Asked Questions
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Have Questions? We&apos;re Here to Help
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
                aria-controls={`faq-answer-${index}`}
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
                    id={`faq-answer-${index}`}
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
