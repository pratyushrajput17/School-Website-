'use client'

import FAQ from '@/components/ui/faq'

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

export default function ContactFAQ() {
  return <FAQ items={faqs} badge="Contact FAQs" title="Quick Answers to" highlight="Common Questions" />
}
