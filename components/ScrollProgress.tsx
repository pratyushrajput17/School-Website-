'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const raf = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress / 100})`
        }
        raf.current = undefined
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent"
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-accent to-blue-400 will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
