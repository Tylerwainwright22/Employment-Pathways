import { useRef, useEffect } from 'react'
import type { DocField as DocFieldType, PhaseId } from '../../types'

interface DocFieldProps {
  field: DocFieldType
  value: string
  phaseId: PhaseId
  onChange: (phaseId: PhaseId, fieldId: string, value: string) => void
}

export function DocField({ field, value, phaseId, onChange }: DocFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-expand textarea height
  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      const minHeight = (field.rows ?? 3) * 22 + 20
      el.style.height = `${Math.max(el.scrollHeight, minHeight)}px`
    }
  }, [value, field.rows])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label
        htmlFor={field.id}
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-text-2)',
        }}
      >
        {field.label}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          ref={textareaRef}
          id={field.id}
          value={value}
          onChange={(e) => onChange(phaseId, field.id, e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows ?? 3}
          className="glass-input"
          style={{
            padding: '10px 12px',
            lineHeight: 1.6,
            overflowY: 'hidden',
          }}
        />
      ) : (
        <input
          type="text"
          id={field.id}
          value={value}
          onChange={(e) => onChange(phaseId, field.id, e.target.value)}
          placeholder={field.placeholder}
          className="glass-input"
          style={{ padding: '10px 12px' }}
        />
      )}
    </div>
  )
}
