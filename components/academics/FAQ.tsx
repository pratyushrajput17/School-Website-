'use client'

import { useState } from 'react'
import { motion, type Variants, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'

const faqs = [
  {
    question: 'What curriculum does the school follow?',
    answer: 'Our school follows the CBSE curriculum from pre-primary through senior secondary, offering a comprehensive education that prepares students for board examinations and competitive entrance tests.',
  },
  {
    question: 'What streams are offered in senior secondary?',
    answer: 'We offer three streams: Science (with PCM/B), Commerce, and Humanities. Each stream provides a robust foundation for higher education and career pathways.',
  },
  {
    question: 'How are students assessed throughout the year?',
    answer: 'We follow a continuous assessment system with periodic tests, projects, practical exams, assignments, and term-end examinations to comprehensively evaluate student progress.',
  },
  {
    question: 'Is there support for competitive exam preparation?',
    answer: 'Yes, we provide dedicated coaching for JEE, NEET, and other competitive exams through specialized classes, mock tests, and expert guidance from experienced faculty.',
  },
  {
    question: 'What is the student-teacher ratio in classrooms?',
    answer: 'We maintain an optimal student-teacher ratio of 20:1, ensuring personalized attention and effective learning outcomes for every student.',
  },
  {
    question: 'Are there remedial classes for students who need extra help?',
    answer: 'Yes, we offer remedial and enrichment programs for students who need additional support or want to accelerate their learning beyond the regular curriculum.',
  },
  {
    question: 'What languages are taught at the school?',
    answer: 'We offer English as the primary medium of instruction, with Hindi as a compulsory language. Students can also opt for Sanskrit and French as additional languages.',
  },
  {
    question: 'How does the school integrate technology in academics?',
    answer: 'Every classroom is equipped with smart boards and projectors. We use digital platforms for assignments, assessments, and parent communication, along with AI-powered personalized learning tools.',
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
