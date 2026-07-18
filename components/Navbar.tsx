'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/notices', label: 'Notices' },
  { href: '/events', label: 'Events' },
] as const

const MORE_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const raf = useRef<number | undefined>(undefined)
  const moreRef = useRef<HTMLDivElement>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label={`${schoolConfig.name} - Home`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-blue/10">
              <GraduationCap className="h-7 w-7 text-deep-blue" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight text-deep-blue">
                {schoolConfig.name}
              </span>
              <span className="text-xs leading-tight text-muted-foreground hidden sm:block">
                {schoolConfig.tagline}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-deep-blue/20 px-5 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-deep-blue/40 hover:text-deep-blue"
            >
              Admin Login
            </Link>
            <Link
              href="/admissions"
              className="rounded-full bg-deep-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
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
                className="group relative px-5 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-deep-blue"
              >
                {label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-deep-blue transition-all duration-300 group-hover:w-4/5" />
              </Link>
            ))}

            <div
              ref={moreRef}
              className="relative"
              onMouseEnter={() => {
                clearTimeout(dropdownTimeout.current)
                setMoreOpen(true)
              }}
              onMouseLeave={() => {
                dropdownTimeout.current = setTimeout(() => setMoreOpen(false), 150)
              }}
            >
              <button
                type="button"
                onClick={() => setMoreOpen((o) => !o)}
                className="group relative flex items-center gap-1.5 px-5 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-deep-blue"
              >
                More
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreOpen ? 'rotate-180' : ''
                  }`}
                />
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-deep-blue transition-all duration-300 group-hover:w-4/5" />
              </button>

              <div
                className={`absolute left-0 top-full mt-0 w-44 rounded-b-xl border border-t-0 border-gray-100 bg-white py-2 shadow-lg transition-all duration-200 ${
                  moreOpen
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-1 opacity-0'
                }`}
              >
                {MORE_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-gray-50 hover:text-deep-blue"
                    onClick={() => setMoreOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobile}
          aria-hidden="true"
        />

        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-deep-blue/10">
                <GraduationCap className="h-5 w-5 text-deep-blue" />
              </div>
              <span className="text-lg font-bold text-deep-blue">{schoolConfig.name}</span>
            </div>
            <button
              type="button"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-deep-blue"
              onClick={closeMobile}
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col items-center justify-start gap-1 overflow-y-auto px-6 pt-10"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="w-full py-3 text-center text-2xl font-medium text-muted-foreground transition-colors hover:text-deep-blue"
                onClick={closeMobile}
              >
                {label}
              </Link>
            ))}

            <div className="my-4 w-12 border-t border-gray-200" />

            {MORE_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="w-full py-3 text-center text-xl font-medium text-muted-foreground/70 transition-colors hover:text-deep-blue"
                onClick={closeMobile}
              >
                {label}
              </Link>
            ))}

            <div className="mt-8 flex flex-col items-center gap-4">
              <Link
                href="/login"
                className="rounded-full border border-deep-blue/20 px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-deep-blue/40 hover:text-deep-blue"
                onClick={closeMobile}
              >
                Admin Login
              </Link>
              <Link
                href="/admissions"
                className="rounded-full bg-deep-blue px-8 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
                onClick={closeMobile}
              >
                Apply Now
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
