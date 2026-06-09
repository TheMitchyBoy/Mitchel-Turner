import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FileText, Search, Flag } from 'lucide-react'
import { timeline } from '../data/content'

const typeIcons = {
  report: FileText,
  investigation: Search,
  milestone: Flag,
}

const typeColors = {
  report: '#4ecdc4',
  investigation: '#c4705a',
  milestone: '#d4a853',
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} className="relative max-w-xl mx-auto">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-mist/20" style={{ background: 'rgba(139, 164, 184, 0.2)' }}>
        <motion.div
          className="w-full origin-top"
          style={{
            height: lineHeight,
            background: 'linear-gradient(to bottom, #4ecdc4, #c4705a)',
          }}
        />
      </div>

      <div className="space-y-8">
        {timeline.map((event, i) => {
          const Icon = typeIcons[event.type]
          const color = typeColors[event.type]

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-14"
            >
              <div
                className="absolute left-3.5 w-5 h-5 rounded-full flex items-center justify-center -translate-x-1/2"
                style={{ background: `${color}33`, border: `2px solid ${color}` }}
              >
                <Icon className="w-2.5 h-2.5" style={{ color }} />
              </div>

              <div className="glass-light rounded-xl p-4 hover:scale-[1.02] transition-transform cursor-default">
                <span
                  className="font-mono text-xs"
                  style={{ color }}
                >
                  {event.date}
                </span>
                <h4 className="font-semibold text-white mt-1">{event.title}</h4>
                <p className="text-sm mt-2" style={{ color: 'var(--color-mist)' }}>
                  {event.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
