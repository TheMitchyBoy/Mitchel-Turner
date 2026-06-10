import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Header from './components/Header'
import RainCanvas from './components/RainCanvas'
import HeadlineTicker from './components/HeadlineTicker'
import PublicMeetings from './components/PublicMeetings'
import InvestigationFiles from './components/InvestigationFiles'
import StoryCards from './components/StoryCards'
import TipAndRecords from './components/TipAndRecords'
import Footer from './components/Footer'

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-3xl md:text-4xl text-gradient"
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-sm md:text-base max-w-lg mx-auto"
          style={{ color: 'var(--color-mist)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-deep)' }}>
      <RainCanvas />
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col px-6 pt-20 pb-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, #1a3a4a 0%, transparent 70%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full"
        >
          <p
            className="font-mono text-sm tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-aurora)' }}
          >
            Ketchikan, Alaska
          </p>

          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-6">
            Stories from the{' '}
            <span className="text-gradient italic">Rain Coast</span>
          </h1>

          <p className="text-lg md:text-xl max-w-xl mx-auto mb-4" style={{ color: 'var(--color-mist)' }}>
            Local reporting on politics, community, and the issues that shape life on the island.
          </p>

          <HeadlineTicker />

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href="#stories"
              className="px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #4ecdc4, #2d8a82)',
                color: '#0d1f2d',
              }}
            >
              Read Stories
            </a>
            <a
              href="#meetings"
              className="px-6 py-3 rounded-full font-medium text-sm glass transition-all hover:scale-105"
              style={{ color: 'var(--color-mist)' }}
            >
              Public Meetings
            </a>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative flex justify-center pt-10"
        >
          <ChevronDown className="w-6 h-6" style={{ color: 'var(--color-mist)' }} />
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Reporter, captain, Ketchikan local">
            About Me
          </SectionTitle>

          <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-start max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto md:mx-0 w-full max-w-[320px]"
            >
              <div className="rounded-2xl overflow-hidden glass p-1.5">
                <div className="photo-tone rounded-xl aspect-[2/3]">
                  <img
                    src="/mitchel-turner.jpg"
                    alt="Mitchel Turner in Ketchikan, Alaska"
                    width={683}
                    height={1024}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5 text-base leading-relaxed"
              style={{ color: 'var(--color-mist)' }}
            >
              <p>
                I moved to Ketchikan going on three years now. To be honest, I don't quite like
                the cold or the rain. But the people, the mountains, and the ocean make me hesitate
                when family asks if I'm coming to visit.
              </p>
              <p>
                I met my wife in Ketchikan, got married on the north side of town. We both like to
                captain when needed, help others around town when free. Journalism is just something
                extra for me.
              </p>

              <h3 className="font-serif text-xl text-white pt-2">My Mission</h3>
              <p>
                A lot of people like to listen about what's going on in town. I've always liked to
                be a part of it.
              </p>
              <p>
                My mission? Well I don't quite have one, at least not yet. Maybe it'll change.
              </p>
              <p>
                I do like keeping people informed — there's something special about telling someone
                a story. Their reaction grows something, maybe even connects a dot or two. I think
                that's about all I'm up to.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding" style={{ background: 'rgba(26, 58, 74, 0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Tips, questions, and how to request public records">
            Get In Touch
          </SectionTitle>
          <div className="max-w-2xl mx-auto">
            <TipAndRecords />
          </div>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="section-padding" style={{ background: 'rgba(26, 58, 74, 0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Politics, community, investigations, and maritime">
            Latest Coverage
          </SectionTitle>
          <StoryCards />
        </div>
      </section>

      {/* Public Meetings */}
      <section id="meetings" className="section-padding" style={{ background: 'rgba(26, 58, 74, 0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Where local decisions get made — and what I'm watching">
            Public Meetings
          </SectionTitle>
          <PublicMeetings />
        </div>
      </section>

      {/* Investigations */}
      <section id="investigations" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Open folders, public records, and ongoing work">
            Investigation Files
          </SectionTitle>
          <InvestigationFiles />
        </div>
      </section>

      <Footer />
    </div>
  )
}
