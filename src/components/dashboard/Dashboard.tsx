import { PHASES } from '../../data/phases'
import { PhaseCard } from './PhaseCard'
import type { PhaseId, PhaseProgress } from '../../types'

interface DashboardProps {
  getPhaseProgress: (id: PhaseId) => PhaseProgress
  onSelectPhase: (id: PhaseId) => void
}

export function Dashboard({ getPhaseProgress, onSelectPhase }: DashboardProps) {
  const allProgress = PHASES.map((p) => getPhaseProgress(p.id))
  const totalCompleted = allProgress.filter((p) => p.total > 0 && p.completed === p.total).length
  const totalItems = allProgress.reduce((sum, p) => sum + p.total, 0)
  const completedItems = allProgress.reduce((sum, p) => sum + p.completed, 0)
  const overallPercent = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100)

  return (
    <div>
      {/* Dashboard header */}
      <div
        className="animate-fade-in-up"
        style={{ marginBottom: 'var(--space-5)' }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                marginBottom: 4,
              }}
            >
              Career Pathways
            </h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-2)', fontWeight: 400 }}>
              Six-phase supported employment pathway
            </p>
          </div>

          {/* Overall summary chip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.60)',
              border: '1px solid rgba(255,255,255,0.80)',
              borderRadius: 'var(--radius-pill)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text)', lineHeight: 1 }}>
                {overallPercent}%
              </div>
              <div style={{ fontSize: 10, color: 'var(--color-text-3)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 1 }}>
                Overall
              </div>
            </div>
            <div
              style={{
                width: 1,
                height: 28,
                background: 'rgba(0,0,0,0.08)',
              }}
            />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text)', lineHeight: 1 }}>
                {totalCompleted} / 6
              </div>
              <div style={{ fontSize: 10, color: 'var(--color-text-3)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 1 }}>
                Phases
              </div>
            </div>
          </div>
        </div>

        {/* Master progress bar */}
        <div className="progress-track" style={{ marginTop: 16, height: 3 }}>
          <div
            className="progress-fill"
            style={{
              width: `${overallPercent}%`,
              background: 'linear-gradient(90deg, var(--phase-1-main), var(--phase-3-main), var(--phase-6-main))',
            }}
          />
        </div>
      </div>

      {/* Phase card grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        {PHASES.map((phase, i) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            progress={getPhaseProgress(phase.id)}
            onClick={() => onSelectPhase(phase.id)}
            animationDelay={i * 40}
          />
        ))}
      </div>
    </div>
  )
}
