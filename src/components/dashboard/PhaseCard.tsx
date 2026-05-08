import { ArrowRight } from 'lucide-react'
import { PhaseChip } from '../ui/PhaseChip'
import { ProgressRing } from '../ui/ProgressRing'
import type { PhaseDefinition, PhaseProgress } from '../../types'

interface PhaseCardProps {
  phase: PhaseDefinition
  progress: PhaseProgress
  onClick: () => void
  animationDelay?: number
}

export function PhaseCard({ phase, progress, onClick, animationDelay = 0 }: PhaseCardProps) {
  const isComplete = progress.total > 0 && progress.completed === progress.total

  return (
    <div
      className="glass-card-interactive animate-fade-in-up"
      onClick={onClick}
      style={{
        padding: 'var(--space-4)',
        animationDelay: `${animationDelay}ms`,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle phase tint on top-right corner */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `var(--phase-${phase.colorIndex}-glass)`,
          pointerEvents: 'none',
        }}
      />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <PhaseChip
          index={phase.index}
          colorIndex={phase.colorIndex}
          lucideIcon={phase.lucideIcon}
          size="sm"
        />
        <ProgressRing
          percent={progress.percent}
          colorIndex={phase.colorIndex}
          size={44}
          strokeWidth={3.5}
        />
      </div>

      {/* Phase title */}
      <div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--color-text)',
            lineHeight: 1.3,
            marginBottom: 3,
          }}
        >
          {phase.label}
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--color-text-3)',
            fontWeight: 400,
          }}
        >
          {phase.timeline}
        </div>
      </div>

      {/* Progress + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 12, color: 'var(--color-text-2)', fontWeight: 400 }}>
            {progress.completed} of {progress.total} complete
          </div>
          {/* Mini progress bar */}
          <div className="progress-track" style={{ width: 80 }}>
            <div
              className="progress-fill"
              style={{
                width: `${progress.percent}%`,
                background: `var(--phase-${phase.colorIndex}-main)`,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            fontWeight: 500,
            color: isComplete
              ? `var(--phase-${phase.colorIndex}-text)`
              : 'var(--color-text-3)',
          }}
        >
          {isComplete ? 'Complete' : 'Open'}
          <ArrowRight size={13} strokeWidth={2} />
        </div>
      </div>
    </div>
  )
}
