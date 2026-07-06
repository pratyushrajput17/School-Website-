'use client'

import { GraduationCap, MapPin, ArrowRight } from 'lucide-react'
import CTASection from '@/components/ui/cta-section'
import { schoolConfig } from '@/lib/school-config'

export default function FinalCTA() {
  return (
    <CTASection
      icon={GraduationCap}
      title="Become a Part of Our"
      highlight="School Family"
      description={`Join ${schoolConfig.name} and give your child access to a world-class education, exceptional faculty, and a nurturing environment that inspires excellence.`}
      buttons={[
        { label: 'Schedule Campus Visit', href: '/contact', icon: <MapPin className="h-4 w-4" />, variant: 'primary' },
        { label: 'Apply Now', href: '/admissions', icon: <ArrowRight className="h-4 w-4" />, variant: 'secondary' },
      ]}
      features={['Limited Seats Available', 'Merit-Based Scholarships', 'Global Curriculum Standards', 'Holistic Development']}
    />
  )
}
