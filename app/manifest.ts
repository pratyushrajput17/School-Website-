import type { MetadataRoute } from 'next'
import { schoolConfig } from '@/lib/school-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Adarsh High School',
    short_name: 'Adarsh High School',
    description: 'Official website and school management portal of Adarsh High School.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: schoolConfig.metadata.themeColor,
    categories: ['education', 'school'],
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/pwa-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
