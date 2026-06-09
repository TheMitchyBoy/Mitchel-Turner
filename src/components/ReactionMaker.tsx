import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reactions = [
  { emoji: '🤔', label: 'Makes you think' },
  { emoji: '😮', label: 'Did not see that coming' },
  { emoji: '👏', label: 'Needed reporting' },
  { emoji: '🗳️', label: 'Going to the meeting now' },
  { emoji: '🌧️', label: 'Classic Ketchikan' },
  { emoji: '💡', label: 'Connected the dots' },
]

export default function ReactionMaker() {
  const [selected, setSelected] = useState<string[]>([])
  const [floating, setFloating] = useState<{ id: number; emoji: string; x: number }[]>([])

  const handleReaction = (emoji: string) => {
    setSelected((prev) =>
      prev.includes(emoji) ? prev.filter((e) => e !== emoji) : [...prev, emoji]
    )

    const id = Date.now()
    setFloating((prev) => [...prev, { id, emoji, x: 20 + Math.random() * 60 }])
    setTimeout(() => {
      setFloating((prev) => prev.filter((f) => f.id !== id))
    }, 2000)
  }

  return (
    <div className="glass rounded-2xl p-6 max-w-md mx-auto relative overflow-hidden">
      <h3 className="font-serif text-xl text-white text-center mb-2">
        How does local news hit you?
      </h3>
      <p className="text-sm text-center mb-6" style={{ color: 'var(--color-mist)' }}>
        Tap a reaction — see what resonates
      </p>

      <div className="grid grid-cols-3 gap-3">
        {reactions.map((r) => (
          <button
            key={r.emoji}
            onClick={() => handleReaction(r.emoji)}
            className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all hover:scale-105 active:scale-95"
            style={{
              background: selected.includes(r.emoji)
                ? 'rgba(78, 205, 196, 0.15)'
                : 'rgba(255,255,255,0.04)',
              border: `1px solid ${selected.includes(r.emoji) ? 'rgba(78, 205, 196, 0.3)' : 'rgba(255,255,255,0.06)'}`,
            }}
            aria-label={r.label}
          >
            <span className="text-2xl">{r.emoji}</span>
            <span className="text-[10px] leading-tight" style={{ color: 'var(--color-mist)' }}>
              {r.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm mt-4"
            style={{ color: 'var(--color-aurora)' }}
          >
            {selected.length} reaction{selected.length !== 1 ? 's' : ''} — that's the power of a good story
          </motion.p>
        )}
      </AnimatePresence>

      {floating.map((f) => (
        <motion.span
          key={f.id}
          className="absolute text-2xl pointer-events-none"
          style={{ left: `${f.x}%`, bottom: '20%' }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -100 }}
          transition={{ duration: 2 }}
        >
          {f.emoji}
        </motion.span>
      ))}
    </div>
  )
}
