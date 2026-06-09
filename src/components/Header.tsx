import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, CloudRain } from 'lucide-react'

interface HeaderProps {
  rainActive: boolean
  onRainToggle: () => void
}

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#stories', label: 'Stories' },
  { href: '#map', label: 'Map' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#topics', label: 'Topics' },
  { href: '#dossier', label: 'Dossier' },
]

export default function Header({ rainActive, onRainToggle }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-serif text-xl text-white hover:opacity-80 transition-opacity">
          Mitchel Turner
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: 'var(--color-mist)' }}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={onRainToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all"
            style={{
              background: rainActive ? 'rgba(78, 205, 196, 0.2)' : 'rgba(255,255,255,0.05)',
              color: rainActive ? '#4ecdc4' : 'var(--color-mist)',
              border: `1px solid ${rainActive ? 'rgba(78, 205, 196, 0.4)' : 'rgba(255,255,255,0.1)'}`,
            }}
            aria-label={rainActive ? 'Turn off rain mode' : 'Turn on rain mode'}
            aria-pressed={rainActive}
          >
            <CloudRain className="w-4 h-4" />
            Rain
          </button>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm border-b border-white/5 last:border-0"
                style={{ color: 'var(--color-mist)' }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { onRainToggle(); setMobileOpen(false) }}
              className="w-full px-6 py-3 text-sm text-left flex items-center gap-2"
              style={{ color: rainActive ? '#4ecdc4' : 'var(--color-mist)' }}
            >
              <CloudRain className="w-4 h-4" />
              Rain Mode {rainActive ? 'On' : 'Off'}
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
