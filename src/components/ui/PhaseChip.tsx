import {
  GraduationCap,
  Compass,
  Search,
  Briefcase,
  UserCheck,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Compass,
  Search,
  Briefcase,
  UserCheck,
  TrendingUp,
}

interface PhaseChipProps {
  index: number
  colorIndex: number
  lucideIcon: string
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
}

export function PhaseChip({
  index,
  colorIndex,
  lucideIcon,
  size = 'md',
  showNumber = true,
}: PhaseChipProps) {
  const Icon = ICON_MAP[lucideIcon] ?? GraduationCap

  const sizeStyles = {
    sm: { iconSize: 14, padding: '4px 8px', fontSize: '11px', gap: '4px' },
    md: { iconSize: 16, padding: '5px 10px', fontSize: '12px', gap: '5px' },
    lg: { iconSize: 18, padding: '6px 12px', fontSize: '13px', gap: '6px' },
  }

  const s = sizeStyles[size]

  return (
    <span
      className="phase-pill"
      style={{
        background: `var(--phase-${colorIndex}-tint)`,
        color: `var(--phase-${colorIndex}-text)`,
        border: `1px solid var(--phase-${colorIndex}-border)`,
        padding: s.padding,
        fontSize: s.fontSize,
        gap: s.gap,
      }}
    >
      <Icon size={s.iconSize} strokeWidth={1.75} />
      {showNumber && (
        <span style={{ fontWeight: 500, letterSpacing: '0.01em' }}>
          Phase {index}
        </span>
      )}
    </span>
  )
}
