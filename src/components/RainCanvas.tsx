import { useEffect, useRef, useCallback } from 'react'

interface Drop {
  x: number
  y: number
  speed: number
  length: number
  opacity: number
}

interface RainCanvasProps {
  active: boolean
  intensity?: number
}

export default function RainCanvas({ active, intensity = 1 }: RainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: -100, y: -100 })

  const initDrops = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 8000) * intensity
    dropsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 4 + Math.random() * 8,
      length: 10 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.4,
    }))
  }, [intensity])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initDrops(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouse)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const drop of dropsRef.current) {
        drop.y += drop.speed
        drop.x += drop.speed * 0.15

        const dx = drop.x - mouseRef.current.x
        const dy = drop.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          drop.x += (dx / dist) * force * 3
          drop.y += (dy / dist) * force * 2
        }

        if (drop.y > canvas.height) {
          drop.y = -drop.length
          drop.x = Math.random() * canvas.width
        }
        if (drop.x > canvas.width) drop.x = 0

        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x + 2, drop.y + drop.length)
        ctx.strokeStyle = `rgba(139, 164, 184, ${drop.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      if (mouseRef.current.x > 0) {
        ctx.beginPath()
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 80, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(78, 205, 196, 0.03)'
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [active, initDrops])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  )
}
