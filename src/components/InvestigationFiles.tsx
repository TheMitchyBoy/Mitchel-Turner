import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderOpen, FileText, ExternalLink, ChevronRight } from 'lucide-react'
import { investigations } from '../data/content'

const statusLabels = {
  active: { label: 'Active', color: '#4ecdc4' },
  ongoing: { label: 'Ongoing', color: '#d4a853' },
  published: { label: 'Published', color: '#c4705a' },
}

export default function InvestigationFiles() {
  const [openFolder, setOpenFolder] = useState<string | null>(investigations[0]?.id ?? null)

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-sm text-center mb-6" style={{ color: 'var(--color-mist)' }}>
        Open investigations with supporting documents. Click a folder to browse what's inside.
      </p>

      <div className="space-y-3">
        {investigations.map((inv) => {
          const isOpen = openFolder === inv.id
          const status = statusLabels[inv.status]

          return (
            <div key={inv.id} className="glass-light rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFolder(isOpen ? null : inv.id)}
                className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
                aria-expanded={isOpen}
              >
                <FolderOpen
                  className="w-6 h-6 shrink-0"
                  style={{ color: isOpen ? 'var(--color-gold)' : 'var(--color-mist)' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{inv.title}</h3>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide"
                      style={{ background: `${status.color}22`, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm mt-0.5 line-clamp-1" style={{ color: 'var(--color-mist)' }}>
                    {inv.documents.length} documents
                  </p>
                </div>
                <ChevronRight
                  className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
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
                    <div className="px-5 pb-5 border-t border-white/5">
                      <p className="text-sm mt-4 mb-4" style={{ color: 'var(--color-mist)' }}>
                        {inv.summary}
                      </p>

                      <div className="space-y-2">
                        {inv.documents.map((doc) => (
                          <div
                            key={doc.name}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg glass"
                          >
                            <FileText className="w-4 h-4 shrink-0" style={{ color: 'var(--color-mist)' }} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white truncate">{doc.name}</p>
                              <p className="text-xs" style={{ color: 'var(--color-mist)' }}>
                                {doc.type} · {doc.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {inv.link && (
                        <a
                          href={inv.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                          style={{
                            background: 'linear-gradient(135deg, #c4705a, #a05540)',
                            color: '#fff',
                          }}
                        >
                          Open Full Dossier
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
