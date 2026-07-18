'use client'

import { ArrowRight, Phone } from 'lucide-react'
import CTASection from '@/components/ui/cta-section'
import { schoolConfig } from '@/lib/school-config'

export default function FinalCTA() {
  return (
    <CTASection
      icon={ArrowRight}
      title="Admissions Are"
      highlight="Now Open"
      description={`Take the first step towards securing your child's future at ${schoolConfig.name}. Apply today and become a part of our inspiring learning community.`}
      buttons={[
        { label: 'Apply Online', href: '#apply', icon: <ArrowRight className="h-4 w-4" />, variant: 'primary' },
        { label: 'Call Admissions Office', href: `tel:${schoolConfig.contact.phone.replace(/\s/g, '')}`, icon: <Phone className="h-4 w-4" />, variant: 'secondary' },
      ]}
      features={['No Hidden Fees', 'Merit-Based Scholarships', 'Individual Attention', 'Holistic Development']}
    />
  )
}
