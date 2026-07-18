import {
  Users,
  GraduationCap,
  Calendar,
  Award,
  Monitor,
  Trophy,
  BookOpen,
  ShieldCheck,
  Bus,
  FlaskConical,
  Lightbulb,
  Puzzle,
  Sparkles,
  Compass,
  Heart,
  type LucideIcon,
} from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const

export interface Statistic {
  value: number
  suffix: string
  label: string
  icon: LucideIcon
}

export interface FeatureCard {
  icon: LucideIcon
  title: string
  description: string
  iconBg: string
  iconColor: string
}

export interface FAQItem {
  question: string
  answer: string
}

export const stats: Statistic[] = [
  { value: 1500, suffix: '+', label: 'Students', icon: Users },
  { value: 75, suffix: '+', label: 'Experienced Teachers', icon: GraduationCap },
  { value: 20, suffix: '+', label: 'Years of Excellence', icon: Calendar },
  { value: 100, suffix: '%', label: 'Board Exam Results', icon: Award },
  { value: 30, suffix: '+', label: 'Smart Classrooms', icon: Monitor },
  { value: 15, suffix: '+', label: 'State & National Awards', icon: Trophy },
]

export const whyChooseFeatures: FeatureCard[] = [
  { icon: Monitor, title: 'Smart Classrooms', description: 'Technology-enabled learning environment.', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { icon: GraduationCap, title: 'Qualified Faculty', description: 'Experienced and passionate educators.', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { icon: FlaskConical, title: 'Science & Computer Labs', description: 'Hands-on practical learning.', iconBg: 'bg-violet-50', iconColor: 'text-violet-600' },
  { icon: Trophy, title: 'Sports & Activities', description: 'Balanced academic and physical development.', iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { icon: ShieldCheck, title: 'Safe Campus', description: '24×7 secure and monitored campus.', iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
  { icon: Bus, title: 'Transport Facility', description: 'Safe transportation across the city.', iconBg: 'bg-rose-50', iconColor: 'text-rose-600' },
]

export const academicPrograms = [
  { title: 'Pre-Primary', subtitle: 'Age: 3–5 Years', description: 'Activity-based learning, creativity, communication and confidence.', icon: Puzzle, gradient: 'from-blue-600 to-blue-400', bg: 'bg-blue-50', color: 'text-blue-600' },
  { title: 'Primary School', subtitle: 'Classes I–V', description: 'Strong fundamentals in Mathematics, Science, Languages and Creativity.', icon: BookOpen, gradient: 'from-emerald-600 to-emerald-400', bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { title: 'Middle School', subtitle: 'Classes VI–VIII', description: 'Critical thinking, practical learning, digital education and leadership.', icon: Lightbulb, gradient: 'from-violet-600 to-violet-400', bg: 'bg-violet-50', color: 'text-violet-600' },
  { title: 'Secondary', subtitle: 'Classes IX–X', description: 'Board preparation, academic excellence and career awareness.', icon: GraduationCap, gradient: 'from-amber-600 to-amber-400', bg: 'bg-amber-50', color: 'text-amber-600' },
]

export const trustIndicators = [
  { label: 'Smart Learning', icon: Sparkles },
  { label: 'Digital Classrooms', icon: Monitor },
  { label: 'Experienced Faculty', icon: Award },
  { label: 'Career Guidance', icon: Compass },
  { label: 'Value-Based Education', icon: Heart },
]

export const faqs: FAQItem[] = [
  {
    question: 'What is the admission process for the upcoming academic year?',
    answer: 'Our admission process involves submitting an online application, scheduling a campus visit, an age-appropriate assessment or interaction, and final confirmation. We guide families through each step to ensure a smooth experience.',
  },
  {
    question: 'What is the student-teacher ratio at the school?',
    answer: 'We maintain an optimal student-teacher ratio of 20:1, ensuring personalized attention and effective learning outcomes for every student in our care.',
  },
  {
    question: 'Does the school provide transportation facilities?',
    answer: 'Yes, we operate a fleet of GPS-enabled buses with trained drivers and attendants, covering major routes across the city to ensure safe and convenient transportation for all students.',
  },
  {
    question: 'What extracurricular activities are offered?',
    answer: 'Students can choose from a wide range of activities including sports, music, dance, drama, debate, robotics, coding, art, and community service programs that run throughout the academic year.',
  },
  {
    question: 'How does the school ensure student safety?',
    answer: 'Our campus is equipped with 24×7 CCTV surveillance, security personnel at all entry points, visitor management systems, GPS-tracked buses, and regular safety drills to maintain a secure environment.',
  },
  {
    question: 'What is the school\'s approach to holistic development?',
    answer: 'We follow a balanced approach that combines academic excellence with sports, arts, life skills, and value education. Our curriculum is designed to nurture intellectual, emotional, social, and physical development.',
  },
  {
    question: 'Are there scholarship programs available?',
    answer: 'Yes, we offer merit-based and need-based scholarships for deserving students. Details regarding eligibility criteria and application process are published at the beginning of each academic session.',
  },
  {
    question: 'What is the fee structure and payment schedule?',
    answer: 'Our fee structure is designed to be transparent and competitive. Detailed information about tuition fees, payment plans, and installment options is available in our admission office or on the admissions portal.',
  },
]

export const contactInfo = {
  address: schoolConfig.contact.address,
  phone: schoolConfig.contact.phone,
  email: schoolConfig.contact.email,
  officeHours: schoolConfig.contact.officeHours,
} as const

export const socialLinks = {
  facebook: schoolConfig.socialLinks.facebook,
  instagram: schoolConfig.socialLinks.instagram,
  twitter: schoolConfig.socialLinks.twitter,
  youtube: schoolConfig.socialLinks.youtube,
  linkedin: schoolConfig.socialLinks.linkedin,
} as const

export const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
] as const
