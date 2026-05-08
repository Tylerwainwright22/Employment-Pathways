import { useState } from 'react'
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
  const [hovered, setHovered] = useState(false)
  const isComplete = progress.total > 0 && progress.completed === progress.total

  return (
    <div
      className="animate-fade-in-up"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'var(--space-4)',
        animationDelay: `${animationDelay}ms`,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: 'var(--radius-card)',
        // Glass base — shifts to phase tint on hover
        background: hovered
          ? `var(--phase-${phase.colorIndex}-tint)`
          : 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: hovered
          ? `1px solid var(--phase-${phase.colorIndex}-border)`
          : '1px solid rgba(255, 255, 255, 0.80)',
        boxShadow: hovered
          ? '0 16px 48px rgba(31, 38, 135, 0.22), inset 0 4px 20px rgba(255, 255, 255, 0.40)'
          : '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 4px 20px rgba(255, 255, 255, 0.30)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:
          'background 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out, transform 200ms ease-out',
      }}
    >
      {/* Phase tint orb — top-right accent */}
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
          opacity: hovered ? 0 : 1,
          transition: 'opacity 200ms ease-out',
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
