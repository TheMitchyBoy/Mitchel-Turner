import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, ArrowRight } from 'lucide-react'
import { mapPins } from '../data/content'

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

  const visiblePins = activeBeat
    ? mapPins.filter((p) => p.beat === activeBeat)
    : mapPins

  const selected = mapPins.find((p) => p.id === activePin)

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-center">
        {visiblePins.map((pin) => {
          const isActive = activePin === pin.id
          const color = categoryColors[pin.category] || '#4ecdc4'

          return (
            <button
              key={pin.id}
              onClick={() => setActivePin(isActive ? null : pin.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: isActive ? `${color}22` : 'rgba(255,255,255,0.05)',
                color: isActive ? color : 'var(--color-mist)',
                border: `1px solid ${isActive ? `${color}66` : 'rgba(255,255,255,0.08)'}`,
              }}
              aria-pressed={isActive}
            >
              {pin.label}
            </button>
          )
        })}
      </div>

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
          : 'Click a location to see the story tied to it'}
      </p>
    </div>
  )
}
