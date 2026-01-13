"use client"

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { cn } from '@/lib/utils'

interface SmoothScrollContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function SmoothScrollContainer({ children, className, ...props }: SmoothScrollContainerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return

    const lenis = new Lenis({
      // Target elements for scoped scrolling
      wrapper: wrapperRef.current,
      content: contentRef.current,
      // Physics settings matching the global provider
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true, 
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenis.on('scroll', (e) => {
        if (contentRef.current) {
            // Apply a subtle skew based on scroll velocity for that "gentle jump" / elastic feel
            // Clamped to avoid extreme distortion
            const skew = Math.min(Math.max(e.velocity * 0.25, -2), 2)
            contentRef.current.style.transform = `skewY(${skew}deg)`
            contentRef.current.style.transformOrigin = 'center center'
            contentRef.current.style.transition = 'transform 0.1s ease-out'
        }
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div 
      ref={wrapperRef} 
      className={cn("overflow-y-auto", className)} 
      // Stop the global Lenis instance from interfering/hijacking this area
      data-lenis-prevent 
      {...props}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
