'use client'

import FAQ from '@/components/ui/faq'

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

export default function AcademicsFAQ() {
  return <FAQ items={faqs} badge="Frequently Asked Questions" title="Have Questions? We&apos;re Here to Help" />
}
