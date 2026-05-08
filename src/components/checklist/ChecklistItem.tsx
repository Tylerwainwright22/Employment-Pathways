import { AnimatedCheckbox } from './AnimatedCheckbox'
import type { ChecklistItem as ChecklistItemType } from '../../types'

interface ChecklistItemProps {
  item: ChecklistItemType
  checked: boolean
  colorIndex: number
  isLast?: boolean
  onToggle: () => void
}

export function ChecklistItem({ item, checked, colorIndex, isLast = false, onToggle }: ChecklistItemProps) {
  return (
    <label
      htmlFor={item.id}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '10px 0',
        cursor: 'pointer',
        borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.05)',
        userSelect: 'none',
      }}
    >
      <div style={{ paddingTop: 1 }}>
        <AnimatedCheckbox
          id={item.id}
          checked={checked}
          colorIndex={colorIndex}
          onChange={onToggle}
        />
      </div>
      <span
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: checked ? 'var(--color-text-3)' : 'var(--color-text)',
          lineHeight: 1.5,
          textDecoration: checked ? 'line-through' : 'none',
          textDecorationColor: 'rgba(0,0,0,0.20)',
          transition: 'color var(--transition-base), text-decoration-color var(--transition-base)',
          flex: 1,
        }}
      >
        {item.label}
      </span>
    </label>
  )
}
