import { useEffect, useRef, useCallback } from 'react'

interface Drop {
  x: number
  y: number
  speed: number
  length: number
  opacity: number
}

export default function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const animRef = useRef<number>(0)

  const initDrops = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 12000)
    dropsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 3 + Math.random() * 5,
      length: 8 + Math.random() * 14,
      opacity: 0.08 + Math.random() * 0.2,
    }))
  }, [])

  useEffect(() => {
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const drop of dropsRef.current) {
        drop.y += drop.speed
        drop.x += drop.speed * 0.12

        if (drop.y > canvas.height) {
          drop.y = -drop.length
          drop.x = Math.random() * canvas.width
        }
        if (drop.x > canvas.width) drop.x = 0

        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x + 1.5, drop.y + drop.length)
        ctx.strokeStyle = `rgba(139, 164, 184, ${drop.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [initDrops])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  )
}
