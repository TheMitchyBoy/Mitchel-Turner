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
    <div className="glass rounded-2xl px-6 py-4 md:px-8 md:py-5 w-full max-w-xl mx-auto mt-8">
      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-aurora)' }}>
        Latest
      </p>
      <div className="min-h-[3.5rem] md:min-h-[4rem] overflow-hidden relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="text-base md:text-lg text-white font-medium leading-snug absolute inset-x-0"
          >
            {headlineTicker[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
