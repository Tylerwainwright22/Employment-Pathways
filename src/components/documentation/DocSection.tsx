import { FileText } from 'lucide-react'
import { DocField } from './DocField'
import { GlassCard } from '../ui/GlassCard'
import type { DocField as DocFieldType, PhaseId, StaffRole } from '../../types'
import { getRoleLabel } from '../../data/roles'

interface DocSectionProps {
  fields: DocFieldType[]
  docsMap: Record<string, string>
  colorIndex: number
  phaseId: PhaseId
  currentRole: StaffRole
  onChange: (phaseId: PhaseId, fieldId: string, value: string) => void
}

export function DocSection({
  fields,
  docsMap,
  colorIndex,
  phaseId,
  currentRole,
  onChange,
}: DocSectionProps) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const roleLabel = getRoleLabel(currentRole)

  return (
    <GlassCard
      className="animate-fade-in-up stagger-2"
      style={{ padding: 'var(--space-4)' }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: `var(--phase-${colorIndex}-glass)`,
              border: `1px solid var(--phase-${colorIndex}-border)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FileText
              size={15}
              strokeWidth={1.75}
              style={{ color: `var(--phase-${colorIndex}-main)` }}
            />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--color-text)',
              letterSpacing: '-0.01em',
            }}
          >
            Documentation
          </span>
        </div>

        {/* Session identifier — date + role only, no participant info */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 10px',
            background: 'rgba(0,0,0,0.04)',
            borderRadius: 'var(--radius-pill)',
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--color-text-2)',
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ color: 'var(--color-text-3)' }}>Session:</span>
          {dateStr}
          <span style={{ color: 'var(--color-text-3)' }}>·</span>
          {roleLabel}
        </div>
      </div>

      {/* Doc fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {fields.map((field) => (
          <DocField
            key={field.id}
            field={field}
            value={docsMap[field.id] ?? ''}
            phaseId={phaseId}
            onChange={onChange}
          />
        ))}
      </div>
    </GlassCard>
  )
}
