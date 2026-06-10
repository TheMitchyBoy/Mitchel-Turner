import { beats } from '../data/content'

interface BeatExplorerProps {
  activeBeat: string | null
  onBeatChange: (beatId: string | null) => void
}

export default function BeatExplorer({ activeBeat, onBeatChange }: BeatExplorerProps) {
  return (
    <div>
      <p className="text-sm text-center mb-6" style={{ color: 'var(--color-mist)' }}>
        I organize coverage by beat. Pick one to filter stories.
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => onBeatChange(null)}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={{
            background: !activeBeat ? 'rgba(78, 205, 196, 0.2)' : 'rgba(255,255,255,0.05)',
            color: !activeBeat ? '#4ecdc4' : 'var(--color-mist)',
            border: `1px solid ${!activeBeat ? 'rgba(78, 205, 196, 0.4)' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          All Beats
        </button>
        {beats.map((beat) => (
          <button
            key={beat.id}
            onClick={() => onBeatChange(activeBeat === beat.id ? null : beat.id)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: activeBeat === beat.id ? `${beat.color}22` : 'rgba(255,255,255,0.05)',
              color: activeBeat === beat.id ? beat.color : 'var(--color-mist)',
              border: `1px solid ${activeBeat === beat.id ? `${beat.color}66` : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {beat.label}
          </button>
        ))}
      </div>

      {activeBeat && (
        <div className="glass rounded-xl p-5 max-w-lg mx-auto text-center">
          {(() => {
            const beat = beats.find((b) => b.id === activeBeat)
            if (!beat) return null
            return (
              <>
                <h3 className="font-serif text-xl text-white mb-2">{beat.label}</h3>
                <p className="text-sm" style={{ color: 'var(--color-mist)' }}>
                  {beat.description}
                </p>
                <p className="text-xs mt-3 font-mono" style={{ color: beat.color }}>
                  {beat.storyIds.length} stor{beat.storyIds.length === 1 ? 'y' : 'ies'}
                </p>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}
