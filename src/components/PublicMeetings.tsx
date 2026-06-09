import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Clock, ChevronDown } from 'lucide-react'
import { publicMeetings } from '../data/content'

export default function PublicMeetings() {
  const [expanded, setExpanded] = useState<string | null>(publicMeetings[0].id)

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <p className="text-sm text-center mb-6" style={{ color: 'var(--color-mist)' }}>
        These are the rooms where local decisions get made. Click a meeting to see what's on the agenda.
      </p>

      {publicMeetings.map((meeting) => {
        const isOpen = expanded === meeting.id

        return (
          <motion.div
            key={meeting.id}
            layout
            className="glass-light rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpanded(isOpen ? null : meeting.id)}
              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
              aria-expanded={isOpen}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(78, 205, 196, 0.12)' }}
              >
                <Calendar className="w-5 h-5" style={{ color: 'var(--color-aurora)' }} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white">{meeting.body}</h3>
                <p className="text-sm truncate" style={{ color: 'var(--color-mist)' }}>
                  {meeting.schedule} · Next: {meeting.nextDate}
                </p>
              </div>

              <ChevronDown
                className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                style={{ color: 'var(--color-mist)' }}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 border-t border-white/5">
                    <div className="flex flex-wrap gap-4 text-sm mb-4" style={{ color: 'var(--color-mist)' }}>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {meeting.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {meeting.location}
                      </span>
                    </div>

                    <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-aurora)' }}>
                      On the agenda
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {meeting.agenda.map((item) => (
                        <li key={item} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-mist)' }}>
                          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--color-aurora)' }} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="text-sm glass rounded-lg p-3" style={{ color: 'var(--color-fog)' }}>
                      <span className="font-medium text-white">My coverage: </span>
                      {meeting.coverage}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
