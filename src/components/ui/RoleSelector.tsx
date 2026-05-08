import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { STAFF_ROLES } from '../../data/roles'
import type { StaffRole } from '../../types'

interface RoleSelectorProps {
  value: StaffRole
  onChange: (role: StaffRole) => void
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = STAFF_ROLES.find((r) => r.value === value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '7px 12px',
          borderRadius: 'var(--radius-input)',
          background: 'rgba(255,255,255,0.60)',
          border: '1px solid rgba(0,0,0,0.10)',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-text)',
          fontFamily: 'inherit',
          transition: 'background var(--transition-base), border-color var(--transition-base)',
          outline: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: 'var(--color-text-2)', fontSize: 11, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Role
        </span>
        <span>{selected?.label ?? 'Select role'}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          style={{
            color: 'var(--color-text-3)',
            transition: `transform var(--transition-base)`,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {open && (
        <div
          className="animate-fade-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            minWidth: 220,
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.80)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            borderRadius: 'var(--radius-card)',
            overflow: 'hidden',
            zIndex: 50,
            transformOrigin: 'top right',
            animation: 'dropdownOpen 150ms ease-out both',
          }}
        >
          {STAFF_ROLES.map((role) => (
            <button
              key={role.value}
              onClick={() => {
                onChange(role.value)
                setOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 14px',
                background: role.value === value ? 'rgba(0,0,0,0.04)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: role.value === value ? 500 : 400,
                color: 'var(--color-text)',
                fontFamily: 'inherit',
                textAlign: 'left',
                transition: 'background 120ms ease-out',
              }}
              onMouseEnter={(e) => {
                if (role.value !== value) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.03)'
                }
              }}
              onMouseLeave={(e) => {
                if (role.value !== value) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                }
              }}
            >
              {role.label}
              {role.value === value && (
                <Check size={14} strokeWidth={2.5} style={{ color: 'var(--color-text-2)' }} />
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes dropdownOpen {
          from { opacity: 0; transform: scale(0.97) translateY(-4px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  )
}
