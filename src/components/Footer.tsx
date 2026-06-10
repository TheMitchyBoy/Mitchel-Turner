import { Anchor, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Anchor className="w-5 h-5" style={{ color: 'var(--color-aurora)' }} />
          <span className="font-signature text-3xl text-white">Mitchel Turner</span>
        </div>

        <p className="text-sm mb-6" style={{ color: 'var(--color-mist)' }}>
          Local reporting and research in Ketchikan, Alaska
        </p>

        <div className="flex items-center justify-center gap-6 mb-8">
          <a
            href="mailto:hello@mitchelturner.com"
            className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: 'var(--color-mist)' }}
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </a>
        </div>

        <p className="text-xs" style={{ color: 'var(--color-mist)', opacity: 0.6 }}>
          © {new Date().getFullYear()} Mitchel Turner. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
