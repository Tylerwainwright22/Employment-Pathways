import { ArrowLeft } from 'lucide-react'
import { PhaseChip } from '../ui/PhaseChip'
import { PhaseProgress } from './PhaseProgress'
import type { PhaseDefinition, PhaseProgress as PhaseProgressType } from '../../types'

interface PhaseHeaderProps {
  phase: PhaseDefinition
  progress: PhaseProgressType
  onBack: () => void
}

export function PhaseHeader({ phase, progress, onBack }: PhaseHeaderProps) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ marginBottom: 'var(--space-4)' }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 'var(--space-3)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-text-2)',
          fontFamily: 'inherit',
          padding: '4px 0',
          transition: 'color var(--transition-base)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-2)'
        }}
      >
        <ArrowLeft size={15} strokeWidth={2} />
        All Phases
      </button>

      {/* Phase identity */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PhaseChip
            index={phase.index}
            colorIndex={phase.colorIndex}
            lucideIcon={phase.lucideIcon}
            size="md"
          />
          <h2
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {phase.label}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-3)', fontWeight: 400 }}>
            {phase.timeline}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <PhaseProgress progress={progress} colorIndex={phase.colorIndex} />
    </div>
  )
}
