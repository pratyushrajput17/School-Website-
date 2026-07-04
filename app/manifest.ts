import type { MetadataRoute } from 'next'
import { schoolConfig } from '@/lib/school-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: schoolConfig.name,
    short_name: schoolConfig.name,
    description: schoolConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: schoolConfig.metadata.themeColor,
    categories: ['education', 'school'],
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
