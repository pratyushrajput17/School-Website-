'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, itemVariants } from '@/lib/animations'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: readonly FAQItem[]
  badge?: string
  title?: string
  highlight?: string
}

export default function FAQ({
  items,
  badge = 'Frequently Asked Questions',
  title = 'Have Questions?',
  highlight = "We're Here to Help",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = items.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <section className="relative overflow-hidden section-spacing">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/2 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/2 blur-3xl" />

      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            badge={badge}
            title={title}
            highlight={highlight}
          />

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
            variants={staggerContainer(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {filtered.map((faq, index) => (
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

            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No questions found matching your search.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
