import { schoolConfig } from '@/lib/school-config'

export const contactInfo = {
  address: schoolConfig.contact.address,
  phone: schoolConfig.contact.phone,
  email: schoolConfig.contact.email,
  officeHours: schoolConfig.contact.officeHours,
} as const
