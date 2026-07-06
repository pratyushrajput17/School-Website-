'use client'

import { MapPin, Phone } from 'lucide-react'
import CTASection from '@/components/ui/cta-section'
import { schoolConfig } from '@/lib/school-config'

export default function FinalCTA() {
  return (
    <CTASection
      icon={MapPin}
      title="Schedule Your"
      highlight="Campus Visit Today"
      description={`Experience ${schoolConfig.name} firsthand. Walk through our campus, meet our faculty, and discover why we're the right choice for your child's future.`}
      buttons={[
        { label: 'Book a Visit', href: '/admissions#campus-visit', icon: <MapPin className="h-4 w-4" />, variant: 'primary' },
        { label: 'Call Now', href: 'tel:+919876543210', icon: <Phone className="h-4 w-4" />, variant: 'secondary' },
      ]}
      features={['Guided Campus Tours', 'Meet Our Faculty', 'Admission Guidance', 'No Obligation']}
    />
  )
}
