import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, ArrowRight } from 'lucide-react'
import { mapPins, beats } from '../data/content'

const categoryColors: Record<string, string> = {
  politics: '#4ecdc4',
  community: '#6b8cae',
  investigation: '#c4705a',
  maritime: '#5a9a7a',
}

interface StoryMapProps {
  activeBeat: string | null
}

export default function StoryMap({ activeBeat }: StoryMapProps) {
  const [activePin, setActivePin] = useState<string | null>(null)

  const beat = activeBeat ? beats.find((b) => b.id === activeBeat) : null
  const highlightedPins = beat ? new Set(beat.pinIds) : null

  const visiblePins = activeBeat
    ? mapPins.filter((p) => p.beat === activeBeat)
    : mapPins

  const selected = mapPins.find((p) => p.id === activePin)

  return (
    <div className="relative max-w-2xl mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-full rounded-2xl"
        style={{ background: 'linear-gradient(180deg, #1a3a4a 0%, #0d1f2d 60%, #1a3a4a 100%)' }}
        role="img"
        aria-label="Map of Ketchikan story locations"
      >
        <rect x="0" y="60" width="100" height="40" fill="#0d2535" opacity="0.8" />
        <path d="M0,65 Q25,62 50,66 Q75,70 100,63 L100,100 L0,100 Z" fill="#152d3d" />
        <path d="M0,55 L15,25 L30,45 L45,15 L60,40 L75,20 L90,38 L100,50 L100,60 L0,60 Z" fill="#1e3a2f" opacity="0.7" />
        <path d="M10,50 L25,30 L40,48 L55,22 L70,42 L85,28 L100,48 L100,55 L0,55 Z" fill="#2d4a3e" opacity="0.5" />
        <ellipse cx="52" cy="58" rx="35" ry="18" fill="#2a4a3a" opacity="0.6" />
        <path d="M30,58 Q52,52 75,55" stroke="#3a5a4a" strokeWidth="0.3" fill="none" opacity="0.4" />
        <path d="M52,40 L52,72" stroke="#3a5a4a" strokeWidth="0.2" fill="none" opacity="0.3" />

        {mapPins.map((pin) => {
          const dimmed = highlightedPins && !highlightedPins.has(pin.id)
          const hidden = activeBeat && pin.beat !== activeBeat

          if (hidden) return null

          return (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
              role="button"
              tabIndex={0}
              aria-label={`${pin.label}: ${pin.story}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActivePin(activePin === pin.id ? null : pin.id)
                }
              }}
              opacity={dimmed ? 0.2 : 1}
            >
              <motion.circle
                cx={pin.x}
                cy={pin.y}
                r={activePin === pin.id ? 3 : 2}
                fill={categoryColors[pin.category] || '#4ecdc4'}
                animate={activePin === pin.id ? { scale: [1, 1.3, 1] } : {}}
                transition={{ repeat: activePin === pin.id ? Infinity : 0, duration: 1.5 }}
              />
              {activePin === pin.id && (
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r={5}
                  fill="none"
                  stroke={categoryColors[pin.category]}
                  strokeWidth="0.3"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
              <text
                x={pin.x}
                y={pin.y - 4}
                textAnchor="middle"
                fill="#e8edf2"
                fontSize="2.5"
                fontFamily="Inter, sans-serif"
                opacity={activePin === pin.id ? 1 : 0.6}
              >
                {pin.label}
              </text>
            </g>
          )
        })}
      </svg>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass rounded-xl p-4 mt-4 flex items-start gap-3"
          >
            <MapPin
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: categoryColors[selected.category] }}
            />
            <div className="flex-1">
              <h4 className="font-semibold text-white">{selected.label}</h4>
              <p className="text-sm mt-1" style={{ color: 'var(--color-mist)' }}>
                {selected.story}
              </p>
              {selected.storyId && (
                <a
                  href="#stories"
                  className="inline-flex items-center gap-1 mt-2 text-sm"
                  style={{ color: 'var(--color-aurora)' }}
                >
                  Read story <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <button
              onClick={() => setActivePin(null)}
              className="hover:text-white transition-colors"
              style={{ color: 'var(--color-mist)' }}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-sm mt-4" style={{ color: 'var(--color-mist)' }}>
        {activeBeat
          ? `Showing ${visiblePins.length} location${visiblePins.length === 1 ? '' : 's'} for this beat`
          : 'Click a pin to see the story tied to that location'}
      </p>
    </div>
  )
}
