import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, FileSearch, ChevronDown, Shield } from 'lucide-react'

const recordsSteps = [
  {
    step: '1',
    title: 'Identify the agency',
    detail: 'Figure out which body holds the records — borough, city, school district, or state agency.',
  },
  {
    step: '2',
    title: 'Submit a written request',
    detail: 'Under Alaska\'s public records law (AS 40.25.110), send a specific written request describing the documents you need.',
  },
  {
    step: '3',
    title: 'Allow reasonable time',
    detail: 'Agencies typically have 10 working days to respond. Complex requests may take longer with notice.',
  },
  {
    step: '4',
    title: 'Appeal if denied',
    detail: 'If a request is denied, you can appeal to the head of the agency and seek review.',
  },
]

export default function TipAndRecords() {
  const [recordsOpen, setRecordsOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5" style={{ color: 'var(--color-aurora)' }} />
          <h3 className="font-serif text-xl text-white">Send a Tip</h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--color-mist)' }}>
          Know something happening in town? I take tips on local government, public spending,
          and community issues. Everything is off the record unless you say otherwise.
        </p>
        <a
          href="mailto:hello@mitchelturner.com?subject=Tip%20for%20Mitchel%20Turner"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
          style={{
            background: 'rgba(78, 205, 196, 0.15)',
            color: 'var(--color-aurora)',
            border: '1px solid rgba(78, 205, 196, 0.3)',
          }}
        >
          <Mail className="w-4 h-4" />
          Email a tip
        </a>
        <p className="text-xs mt-3" style={{ color: 'var(--color-mist)', opacity: 0.7 }}>
          Include what you know, where you heard it, and how I can follow up.
        </p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <button
          onClick={() => setRecordsOpen(!recordsOpen)}
          className="w-full p-6 flex items-center gap-3 text-left hover:bg-white/[0.02] transition-colors"
          aria-expanded={recordsOpen}
        >
          <FileSearch className="w-5 h-5 shrink-0" style={{ color: 'var(--color-gold)' }} />
          <div className="flex-1">
            <h3 className="font-serif text-xl text-white">Request Public Records</h3>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-mist)' }}>
              How to file a records request in Alaska
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${recordsOpen ? 'rotate-180' : ''}`}
            style={{ color: 'var(--color-mist)' }}
          />
        </button>

        <AnimatePresence>
          {recordsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-3 border-t border-white/5 pt-4">
                {recordsSteps.map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0"
                      style={{ background: 'rgba(212, 168, 83, 0.15)', color: 'var(--color-gold)' }}
                    >
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--color-mist)' }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
