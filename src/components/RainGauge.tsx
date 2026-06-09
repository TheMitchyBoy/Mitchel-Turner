import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CloudRain, Droplets } from 'lucide-react'
import { KETCHIKAN_RAIN_INCHES } from '../data/content'

export default function RainGauge() {
  const [inches, setInches] = useState(0)
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = KETCHIKAN_RAIN_INCHES / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      setInches(Math.min(increment * step, KETCHIKAN_RAIN_INCHES))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const handleClick = () => {
    setClicks((c) => c + 1)
    setInches((i) => Math.min(i + 0.1, 200))
  }

  const fillPercent = (inches / 200) * 100

  return (
    <div className="glass rounded-2xl p-6 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <CloudRain className="w-5 h-5 text-aurora" style={{ color: 'var(--color-aurora)' }} />
        <h3 className="font-serif text-xl text-white">Ketchikan Rain Gauge</h3>
      </div>

      <p className="text-mist text-sm mb-4" style={{ color: 'var(--color-mist)' }}>
        Average annual rainfall. Click the gauge to add a drop.
      </p>

      <button
        onClick={handleClick}
        className="relative w-full h-48 rounded-xl overflow-hidden cursor-pointer group transition-transform hover:scale-[1.02] active:scale-[0.98]"
        aria-label="Add a raindrop to the gauge"
      >
        <div className="absolute inset-0 bg-ocean/60" style={{ background: 'rgba(26, 58, 74, 0.6)' }} />

        <div className="absolute inset-x-4 bottom-4 top-4 border-2 border-mist/30 rounded-lg overflow-hidden"
          style={{ borderColor: 'rgba(139, 164, 184, 0.3)' }}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: `${fillPercent}%`,
              background: 'linear-gradient(to top, #1a3a4a, #4ecdc4)',
            }}
            animate={{ height: `${fillPercent}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
          />

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-white/10"
              style={{ bottom: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key={inches.toFixed(1)}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-mono text-3xl font-bold text-white drop-shadow-lg z-10"
          >
            {inches.toFixed(1)}"
          </motion.span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Droplets className="w-8 h-8 text-aurora/60" style={{ color: 'rgba(78, 205, 196, 0.6)' }} />
        </div>
      </button>

      {clicks > 0 && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm mt-3"
          style={{ color: 'var(--color-aurora)' }}
        >
          +{clicks} drop{clicks !== 1 ? 's' : ''} added — that's the Ketchikan spirit
        </motion.p>
      )}
    </div>
  )
}
