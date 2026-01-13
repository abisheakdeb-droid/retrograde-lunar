import { ReactNode, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import Lenis from "lenis"
import { cn } from "@/lib/utils"

interface SmoothScrollAreaProps {
  children: ReactNode
  className?: string
  orientation?: "vertical" | "horizontal"
}

export interface SmoothScrollHandle {
  lenis: Lenis | undefined
}

export const SmoothScrollArea = forwardRef<SmoothScrollHandle, SmoothScrollAreaProps>(({ 
  children, 
  className,
  orientation = "vertical" 
}, ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null) // Explicitly allow null

  useImperativeHandle(ref, () => ({
    get lenis() {
      // Return undefined if null to match interface if needed, or cast
      return lenisRef.current ?? undefined
    }
  }))

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: orientation,
      gestureOrientation: orientation,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })
    
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null // Clean up with null
    }
  }, [orientation])

  return (
    <div 
      ref={wrapperRef} 
      className={cn("h-full w-full overflow-hidden", className)}
      // Important to allow nested scroll without passing up to parent lenis
      data-lenis-prevent
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  )
})

SmoothScrollArea.displayName = "SmoothScrollArea"
