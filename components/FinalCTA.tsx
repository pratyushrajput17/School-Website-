'use client'

import { GraduationCap, ArrowRight } from 'lucide-react'
import CTASection from '@/components/ui/cta-section'
import { schoolConfig } from '@/lib/school-config'

export default function FinalCTA() {
  return (
    <CTASection
      icon={GraduationCap}
      title="Ready to Give Your Child"
      highlight="the Best Education?"
      description={`Admissions for the academic session ${schoolConfig.admission.session} are now open. Secure your child's future at one of the most respected educational institutions.`}
      buttons={[
        { label: 'Apply for Admission', href: '/admissions', icon: <ArrowRight className="h-4 w-4" />, variant: 'primary' },
        { label: 'Talk to Our Team', href: '/contact', variant: 'secondary' },
      ]}
      features={['Limited Seats Available', 'Merit-Based Scholarships', 'MP Board Curriculum', 'Holistic Development Focus']}
    />
  )
}
