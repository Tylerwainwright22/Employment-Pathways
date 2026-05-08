import type { ReactNode } from 'react'
import { Header } from './Header'
import type { StaffRole } from '../../types'

interface AppShellProps {
  currentRole: StaffRole
  onRoleChange: (role: StaffRole) => void
  children: ReactNode
}

export function AppShell({ currentRole, onRoleChange, children }: AppShellProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header currentRole={currentRole} onRoleChange={onRoleChange} />
      <main
        style={{
          flex: 1,
          padding: 'var(--space-6) var(--space-4)',
          maxWidth: 900,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {children}
      </main>
    </div>
  )
}
