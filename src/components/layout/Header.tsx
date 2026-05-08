import { RoleSelector } from '../ui/RoleSelector'
import type { StaffRole } from '../../types'

interface HeaderProps {
  currentRole: StaffRole
  onRoleChange: (role: StaffRole) => void
}

export function Header({ currentRole, onRoleChange }: HeaderProps) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        padding: '0 var(--space-4)',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(242,240,236,0.80)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Logo + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: 'var(--phase-1-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="14" rx="2" stroke="white" strokeWidth="1.75" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="white" strokeWidth="1.75" />
            <path d="M12 12v4M10 14h4" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--color-text)',
              lineHeight: 1.2,
            }}
          >
            Career Pathways Tool
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 400,
              color: 'var(--color-text-3)',
              letterSpacing: '0.02em',
            }}
          >
            Black Hills Works
          </div>
        </div>
      </div>

      <RoleSelector value={currentRole} onChange={onRoleChange} />
    </header>
  )
}
