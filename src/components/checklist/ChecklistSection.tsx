import { CheckSquare } from 'lucide-react'
import { ChecklistItem } from './ChecklistItem'
import { GlassCard } from '../ui/GlassCard'
import type { ChecklistItem as ChecklistItemType, PhaseId } from '../../types'

interface ChecklistSectionProps {
  items: ChecklistItemType[]
  checkedMap: Record<string, boolean>
  colorIndex: number
  phaseId: PhaseId
  onToggle: (phaseId: PhaseId, itemId: string) => void
}

export function ChecklistSection({
  items,
  checkedMap,
  colorIndex,
  phaseId,
  onToggle,
}: ChecklistSectionProps) {
  const completedCount = items.filter((i) => checkedMap[i.id]).length

  return (
    <GlassCard
      className="animate-fade-in-up stagger-1"
      style={{ padding: 'var(--space-4)' }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
            <CheckSquare
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
            Checklist
          </span>
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: completedCount === items.length && items.length > 0
              ? `var(--phase-${colorIndex}-text)`
              : 'var(--color-text-3)',
          }}
        >
          {completedCount} / {items.length}
        </span>
      </div>

      {/* Items */}
      <div>
        {items.map((item, i) => (
          <ChecklistItem
            key={item.id}
            item={item}
            checked={!!checkedMap[item.id]}
            colorIndex={colorIndex}
            isLast={i === items.length - 1}
            onToggle={() => onToggle(phaseId, item.id)}
          />
        ))}
      </div>
    </GlassCard>
  )
}
