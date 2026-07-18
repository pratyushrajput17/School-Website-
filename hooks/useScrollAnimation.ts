import { useEffect, useRef, useState } from 'react'

interface ScrollState {
  scrollY: number
  scrollProgress: number
  isScrolled: boolean
}

export function useScrollAnimation(threshold = 50) {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
  })
  const raf = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0
        setState({ scrollY, scrollProgress, isScrolled: scrollY > threshold })
        raf.current = undefined
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [threshold])

  return state
}
