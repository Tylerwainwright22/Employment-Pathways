interface AnimatedCheckboxProps {
  checked: boolean
  colorIndex: number
  onChange: () => void
  id: string
}

export function AnimatedCheckbox({
  checked,
  colorIndex,
  onChange,
  id,
}: AnimatedCheckboxProps) {
  // Using SVG pathLength="100" normalizes the path's total length to exactly 100,
  // so strokeDasharray/strokeDashoffset values are always 0–100 regardless of path geometry.
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={onChange}
      style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        border: checked
          ? `1.5px solid var(--phase-${colorIndex}-main)`
          : '1.5px solid rgba(0,0,0,0.18)',
        background: checked
          ? `var(--phase-${colorIndex}-main)`
          : 'rgba(255,255,255,0.70)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition:
          'background 200ms ease-out, border-color 200ms ease-out, transform 250ms cubic-bezier(0.34,1.56,0.64,1)',
        transform: checked ? 'scale(1)' : 'scale(0.92)',
        outline: 'none',
        padding: 0,
      }}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <path
          d="M5 12.5L10 17.5L19 8"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          // pathLength normalizes the path's measured length to 100
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={checked ? 0 : 100}
          style={{
            transition: checked
              ? 'stroke-dashoffset 240ms cubic-bezier(0.34,1.56,0.64,1) 30ms'
              : 'stroke-dashoffset 150ms ease-in',
          }}
        />
      </svg>
    </button>
  )
}
