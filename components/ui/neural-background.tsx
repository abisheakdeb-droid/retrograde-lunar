"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    
    // Configuration
    const particleCount = 60
    const connectionDistance = 150
    const mouseDistance = 200

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener("resize", resize)
    resize()

    // Mouse tracking
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(6, 182, 212, 0.5)" // Primary Cyan
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      particles.forEach((a, index) => {
        // Connect to other particles
        for (let j = index + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance)
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        // Connect to mouse
        const dx = a.x - mouse.x
        const dy = a.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseDistance) {
            const opacity = 1 - (distance / mouseDistance)
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.4})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-[-1] pointer-events-none bg-background"
    />
  )
}
