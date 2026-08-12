'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { schoolConfig } from '@/lib/school-config'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/notices', label: 'Notices' },
  { href: '/events', label: 'Events' },
  { href: '/contact', label: 'Contact' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const raf = useRef<number | undefined>(undefined)
  const moreRef = useRef<HTMLDivElement>(null)
  const loginRef = useRef<HTMLDivElement>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const loginDropdownTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        raf.current = undefined
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label={`${schoolConfig.name} - Home`}
          >
            <Image
              src="/school-logo.png"
              alt={`${schoolConfig.name} Logo`}
              width={48}
              height={48}
              className="h-11 w-11 rounded-full object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-deep-blue">
                {schoolConfig.name}
              </span>
              <span className="text-[11px] leading-tight text-muted-foreground hidden sm:block">
                {schoolConfig.tagline}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            <div
              ref={loginRef}
              className="relative"
              onMouseEnter={() => {
                clearTimeout(loginDropdownTimeout.current)
                setLoginOpen(true)
              }}
              onMouseLeave={() => {
                loginDropdownTimeout.current = setTimeout(() => setLoginOpen(false), 150)
              }}
            >
              <button
                type="button"
                onClick={() => setLoginOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-full border border-deep-blue/20 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-deep-blue/40 hover:text-deep-blue"
              >
                Login
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    loginOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`absolute right-0 top-full mt-1.5 w-40 rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg transition-all duration-200 ${
                  loginOpen
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-1 opacity-0'
                }`}
              >
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-gray-50 hover:text-deep-blue"
                  onClick={() => setLoginOpen(false)}
                >
                  Admin Login
                </Link>
                <Link
                  href="/teacher/login"
                  className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-gray-50 hover:text-deep-blue"
                  onClick={() => setLoginOpen(false)}
                >
                  Teacher Login
                </Link>
                <Link
                  href="/parent/login"
                  className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-gray-50 hover:text-deep-blue"
                  onClick={() => setLoginOpen(false)}
                >
                  Parent Login
                </Link>
              </div>
            </div>
            <Link
              href="/admissions"
              className="rounded-full bg-deep-blue px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
            >
              Apply Now
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-deep-blue lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="hidden lg:block border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-8">
          <nav className="flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group relative px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-deep-blue"
              >
                {label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-deep-blue transition-all duration-300 group-hover:w-4/5" />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        <aside
          className={`fixed inset-y-0 right-0 flex max-h-dvh w-[min(92vw,400px)] flex-col bg-white shadow-xl transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ maxHeight: '100dvh' }}
        >
          <div className="flex items-center justify-between border-b px-4 py-3 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <Image
                src="/school-logo.png"
                alt={`${schoolConfig.name} Logo`}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-contain"
              />
              <span className="text-base font-bold text-deep-blue">{schoolConfig.name}</span>
            </div>
            <button
              type="button"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-deep-blue hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col overflow-y-auto px-4 pt-4 pb-6"
            aria-label="Mobile navigation"
            style={{ maxHeight: 'calc(100dvh - 140px)' }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="w-full py-2.5 text-center text-base font-medium text-gray-700 transition-colors hover:text-deep-blue hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="my-3 border-t border-gray-200" />

            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                className="w-full py-2.5 text-center text-base font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Admin Login
              </Link>
              <Link
                href="/teacher/login"
                className="w-full py-2.5 text-center text-base font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Teacher Login
              </Link>
              <Link
                href="/parent/login"
                className="w-full py-2.5 text-center text-base font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Parent Login
              </Link>
              <Link
                href="/admissions"
                className="w-full py-2.5 text-center text-base font-semibold text-white bg-deep-blue rounded-lg hover:bg-deep-blue-light transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  )
}