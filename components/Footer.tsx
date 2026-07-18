import Link from 'next/link'
import { GraduationCap, MapPin, Phone, Mail } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const { contact } = schoolConfig

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const

const socialLinks = [
  { label: 'Facebook', href: schoolConfig.socialLinks.facebook, icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )},
  { label: 'Instagram', href: schoolConfig.socialLinks.instagram, icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.459c.636-.247 1.363-.416 2.427-.465C8.84 1.942 9.942 2 12.315 2zm0 1.802c-2.36 0-2.676.009-3.62.052-1.054.048-1.626.224-2.008.372a3.098 3.098 0 00-1.148.749 3.098 3.098 0 00-.749 1.148c-.148.382-.324.954-.372 2.008-.043.945-.052 1.26-.052 3.62 0 2.36.009 2.676.052 3.62.048 1.054.224 1.626.372 2.008a3.098 3.098 0 00.749 1.148 3.098 3.098 0 001.148.749c.382.148.954.324 2.008.372.945.043 1.26.052 3.62.052 2.36 0 2.676-.009 3.62-.052 1.054-.048 1.626-.224 2.008-.372a3.098 3.098 0 001.148-.749 3.098 3.098 0 00.749-1.148c.148-.382.324-.954.372-2.008.043-.945.052-1.26.052-3.62 0-2.36-.009-2.676-.052-3.62-.048-1.054-.224-1.626-.372-2.008a3.098 3.098 0 00-.749-1.148 3.098 3.098 0 00-1.148-.749c-.382-.148-.954-.324-2.008-.372-.945-.043-1.26-.052-3.62-.052zm0 3.073a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zm0 6.447a2.322 2.322 0 110-4.644 2.322 2.322 0 010 4.644zm4.04-6.749a.964.964 0 100-1.928.964.964 0 000 1.928z" />
    </svg>
  )},
  { label: 'YouTube', href: schoolConfig.socialLinks.youtube, icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )},
  { label: 'LinkedIn', href: schoolConfig.socialLinks.linkedin, icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )},
]

export default function Footer() {
  return (
    <footer className="border-t border-deep-blue/10 bg-deep-blue" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label={`${schoolConfig.name} - Home`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/20">
                <GraduationCap className="h-5 w-5 text-saffron" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">
                  {schoolConfig.name}
                </span>
                <p className="text-xs text-white/60">
                  {schoolConfig.tagline}
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              At Adarsh High School, we prepare students not just for examinations,
              but for life — with knowledge, values, discipline, and character.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/60 backdrop-blur-sm transition-all duration-200 hover:bg-saffron/20 hover:text-saffron"
                  aria-label={`Follow us on ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-saffron"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white">Contact Us</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="flex items-start gap-2 text-sm text-white/60">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                  Gadarwara Road, Sainkheda, MP 484661
                </span>
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-saffron">
                  <Phone className="h-4 w-4 shrink-0 text-saffron" />
                  9893652202
                </a>
              </li>
              <li>
                <a href={`tel:${contact.altPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-saffron">
                  <Phone className="h-4 w-4 shrink-0 text-saffron" />
                  9993606232
                </a>
              </li>
              <li>
                <a href={`tel:${contact.thirdPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-saffron">
                  <Phone className="h-4 w-4 shrink-0 text-saffron" />
                  9993794981
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-saffron">
                  <Mail className="h-4 w-4 shrink-0 text-saffron" />
                  adresh2111@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white">School</h4>
            <ul className="mt-4 space-y-3">
              <li><p className="text-sm text-white/60">Education with Values</p></li>
              <li><p className="text-sm text-white/60">Knowledge with Character</p></li>
              <li><p className="text-sm text-white/60">MP Board | English Medium</p></li>
              <li><p className="text-sm text-white/60">900+ Students | 40+ Teachers</p></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} {schoolConfig.name}. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              Education with Values. Knowledge with Character.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
