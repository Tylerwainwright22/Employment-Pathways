import type { ReactNode, CSSProperties } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
  onClick?: () => void
  style?: CSSProperties
}

export function GlassCard({
  children,
  className = '',
  interactive = false,
  onClick,
  style,
}: GlassCardProps) {
  const base = interactive ? 'glass-card-interactive' : 'glass-card'
  return (
    <div className={`${base} ${className}`} onClick={onClick} style={style}>
      {/* z-index: 1 keeps content above the ::after surface-highlight layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
