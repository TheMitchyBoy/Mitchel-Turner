import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { headlineTicker } from '../data/content'

export default function HeadlineTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (headlineTicker.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % headlineTicker.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  if (headlineTicker.length === 0) return null

  return (
    <div className="glass rounded-full px-5 py-2.5 max-w-md mx-auto mt-8">
      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--color-aurora)' }}>
        Latest
      </p>
      <div className="h-6 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-white font-medium truncate absolute inset-x-0"
          >
            {headlineTicker[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
