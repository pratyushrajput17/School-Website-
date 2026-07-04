import type { MetadataRoute } from 'next'
import { schoolConfig } from '@/lib/school-config'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = schoolConfig.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
