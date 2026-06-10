import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { stories } from '../data/content'
import type { Story } from '../data/content'

const categoryStyles: Record<Story['category'], { bg: string; text: string; label: string }> = {
  politics: { bg: 'rgba(78, 205, 196, 0.15)', text: '#4ecdc4', label: 'Politics' },
  community: { bg: 'rgba(107, 140, 174, 0.15)', text: '#6b8cae', label: 'Community' },
  investigation: { bg: 'rgba(196, 112, 90, 0.15)', text: '#c4705a', label: 'Investigation' },
  maritime: { bg: 'rgba(45, 74, 62, 0.3)', text: '#5a9a7a', label: 'Maritime' },
}

export default function StoryCards() {
  const [filter, setFilter] = useState<Story['category'] | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = filter === 'all' ? stories : stories.filter((s) => s.category === filter)
  const categories = ['all', 'politics', 'community', 'investigation', 'maritime'] as const

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              background: filter === cat ? 'rgba(78, 205, 196, 0.2)' : 'rgba(255,255,255,0.05)',
              color: filter === cat ? '#4ecdc4' : 'var(--color-mist)',
              border: `1px solid ${filter === cat ? 'rgba(78, 205, 196, 0.4)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {cat === 'all' ? 'All Stories' : categoryStyles[cat].label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((story) => {
            const style = categoryStyles[story.category]
            const isExpanded = expanded === story.id

            return (
              <motion.article
                key={story.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`glass-light rounded-xl p-5 cursor-pointer transition-all hover:border-aurora/30 ${
                  story.featured ? 'md:col-span-2' : ''
                }`}
                onClick={() => setExpanded(isExpanded ? null : story.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setExpanded(isExpanded ? null : story.id)
                  }
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: style.bg, color: style.text }}
                  >
                    {style.label}
                  </span>
                  {story.featured && (
                    <span className="text-xs" style={{ color: 'var(--color-gold)' }}>
                      Featured
                    </span>
                  )}
                  <span className="text-xs ml-auto flex items-center gap-1" style={{ color: 'var(--color-mist)' }}>
                    <Clock className="w-3 h-3" />
                    {story.readTime}
                  </span>
                </div>

                <h3 className={`font-serif text-white ${story.featured ? 'text-2xl' : 'text-lg'}`}>
                  {story.title}
                </h3>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm mt-3" style={{ color: 'var(--color-mist)' }}>
                        {story.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-sm" style={{ color: 'var(--color-aurora)' }}>
                        <span>Read more</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isExpanded && (
                  <p className="text-sm mt-2 line-clamp-2" style={{ color: 'var(--color-mist)' }}>
                    {story.excerpt}
                  </p>
                )}
              </motion.article>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
