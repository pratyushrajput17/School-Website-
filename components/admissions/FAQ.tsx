'use client'

import FAQ from '@/components/ui/faq'

const faqs = [
  {
    question: 'When does the admission process begin for the academic year?',
    answer: 'The admission process typically begins in December of the preceding academic year. We encourage parents to apply early as seats are limited and fill up quickly.',
  },
  {
    question: 'What is the age criteria for admission to Nursery?',
    answer: 'For Nursery admission, the child must be at least 3 years old as of 31 March of the admission year. Age requirements for other grades follow CBSE guidelines.',
  },
  {
    question: 'Is there an entrance test for admission?',
    answer: 'For pre-primary classes, admission is based on a friendly interaction with the child and parents. For Classes I and above, an age-appropriate assessment is conducted to understand the child\'s learning level.',
  },
  {
    question: 'What documents are required at the time of admission?',
    answer: 'You will need the birth certificate, passport-size photographs, transfer certificate (for Class I onwards), Aadhaar card, previous report cards, and a medical fitness certificate.',
  },
  {
    question: 'Does the school provide transportation?',
    answer: 'Yes, we offer a comprehensive transport service with GPS-tracked buses covering all major routes. Each bus has a trained attendant and follows strict safety protocols.',
  },
  {
    question: 'Are scholarships available for students?',
    answer: 'Yes, we offer merit-based scholarships for academic excellence, sports scholarships for talented athletes, and need-based scholarships to support deserving students.',
  },
  {
    question: 'Can I schedule a campus visit before applying?',
    answer: 'Absolutely! We encourage parents to visit our campus and experience the environment firsthand. You can schedule a guided tour through our campus visit booking form.',
  },
  {
    question: 'What is the student-teacher ratio at the school?',
    answer: 'We maintain an optimal student-teacher ratio of 20:1, ensuring personalized attention and effective learning outcomes for every student in our care.',
  },
] as const

export default function AdmissionsFAQ() {
  return <FAQ items={faqs} badge="Admission FAQs" title="Answers to Your" highlight="Admission Questions" />
}
