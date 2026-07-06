'use client'

import FAQ from '@/components/ui/faq'

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

export default function AboutFAQ() {
  return <FAQ items={faqs} badge="Frequently Asked Questions" title="Have Questions About Our School?" highlight="We're Here to Help" />
}
