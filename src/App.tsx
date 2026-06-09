import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ChevronDown } from 'lucide-react'
import Header from './components/Header'
import RainCanvas from './components/RainCanvas'
import RainGauge from './components/RainGauge'
import StoryMap from './components/StoryMap'
import Timeline from './components/Timeline'
import TopicConstellation from './components/TopicConstellation'
import StoryCards from './components/StoryCards'
import ReactionMaker from './components/ReactionMaker'
import Footer from './components/Footer'
import { DOSSIER_LINK } from './data/content'

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
  const [rainActive, setRainActive] = useState(true)

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-deep)' }}>
      <RainCanvas active={rainActive} />
      <Header rainActive={rainActive} onRainToggle={() => setRainActive(!rainActive)} />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
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
          className="relative text-center max-w-3xl"
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

          <p className="text-lg md:text-xl max-w-xl mx-auto mb-8" style={{ color: 'var(--color-mist)' }}>
            Local reporting on politics, community, and the issues that shape life on the island.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
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
              href="#about"
              className="px-6 py-3 rounded-full font-medium text-sm glass transition-all hover:scale-105"
              style={{ color: 'var(--color-mist)' }}
            >
              About Me
            </a>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8"
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

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
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
              <p>
                A lot of people like to listen about what's going on in town. I've always liked to
                be a part of it. I do like keeping people informed — there's something special about
                telling someone a story. Their reaction grows something, maybe even connects a dot
                or two.
              </p>
            </motion.div>

            <div className="space-y-6">
              <RainGauge />
              <ReactionMaker />
            </div>
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

      {/* Map */}
      <section id="map" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Explore where the stories happen">
            Ketchikan Story Map
          </SectionTitle>
          <StoryMap />
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="section-padding" style={{ background: 'rgba(26, 58, 74, 0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="From arrival to investigations">
            Reporting Timeline
          </SectionTitle>
          <Timeline />
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="How local issues connect across the island">
            Topic Constellation
          </SectionTitle>
          <TopicConstellation />
        </div>
      </section>

      {/* Dossier */}
      <section id="dossier" className="section-padding" style={{ background: 'rgba(26, 58, 74, 0.15)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle subtitle="Public records and community accounts">
            Investigation Dossier
          </SectionTitle>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <h3 className="font-serif text-2xl text-white mb-4">
              PeaceHealth Dossier
            </h3>
            <p className="mb-8" style={{ color: 'var(--color-mist)' }}>
              An ongoing compilation of public records, community accounts, and reporting
              on healthcare in Ketchikan. Access the full dossier via Google Drive.
            </p>
            <a
              href={DOSSIER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #c4705a, #a05540)',
                color: '#fff',
              }}
            >
              Access Dossier
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
