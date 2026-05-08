import { useEffect, useState } from 'react'
import type { PhaseProgress as PhaseProgressType } from '../../types'

interface PhaseProgressProps {
  progress: PhaseProgressType
  colorIndex: number
}

export function PhaseProgress({ progress, colorIndex }: PhaseProgressProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(progress.percent), 100)
    return () => clearTimeout(timer)
  }, [progress.percent])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-2)', fontWeight: 400 }}>
          {progress.completed} of {progress.total} checklist items complete
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: `var(--phase-${colorIndex}-text)`,
          }}
        >
          {progress.percent}%
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${animatedWidth}%`,
            background: `var(--phase-${colorIndex}-main)`,
          }}
        />
      </div>
    </div>
  )
}
