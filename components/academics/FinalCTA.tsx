'use client'

import { BookOpen, ArrowRight } from 'lucide-react'
import CTASection from '@/components/ui/cta-section'
import { schoolConfig } from '@/lib/school-config'

export default function FinalCTA() {
  return (
    <CTASection
      icon={BookOpen}
      title="Start Your Child's Academic"
      highlight="Journey Today"
      description={`Give your child access to a world-class education that combines academic rigor with holistic development at ${schoolConfig.name}.`}
      buttons={[
        { label: 'Apply Now', href: '/admissions', icon: <ArrowRight className="h-4 w-4" />, variant: 'primary' },
        { label: 'Contact Us', href: '/contact', icon: <BookOpen className="h-4 w-4" />, variant: 'secondary' },
      ]}
      features={['MP Board Curriculum', 'Expert Faculty', 'Smart Classrooms', 'Holistic Development']}
    />
  )
}
