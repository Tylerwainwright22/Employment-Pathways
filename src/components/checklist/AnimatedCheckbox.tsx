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
  // Checkmark path: 24x24 box, path draws from left to right
  // pathLength is used for stroke-dasharray/offset animation
  const checkPath = 'M5 12.5L10 17.5L19 8'
  const pathLength = 18 // approximate drawn length of the path

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
        transition: `background 200ms ease-out, border-color 200ms ease-out, transform 250ms cubic-bezier(0.34,1.56,0.64,1)`,
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
          d={checkPath}
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={checked ? 0 : pathLength}
          style={{
            transition: checked
              ? 'stroke-dashoffset 220ms cubic-bezier(0.34,1.56,0.64,1) 30ms'
              : 'stroke-dashoffset 150ms ease-in',
          }}
        />
      </svg>
    </button>
  )
}
