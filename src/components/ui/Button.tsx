import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'phase'
  colorIndex?: number
  size?: 'sm' | 'md'
}

export function Button({
  children,
  variant = 'primary',
  colorIndex,
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base = [
    'inline-flex items-center gap-2 font-medium cursor-pointer',
    'transition-all duration-200 ease-out',
    'border-0 outline-none select-none',
    size === 'sm' ? 'text-xs px-3 py-1.5 rounded-lg' : 'text-sm px-4 py-2.5 rounded-input',
  ].join(' ')

  if (variant === 'ghost') {
    return (
      <button
        className={`${base} text-[var(--color-text-2)] bg-transparent hover:bg-black/5 active:bg-black/8 ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }

  if (variant === 'phase' && colorIndex) {
    return (
      <button
        className={`${base} ${className}`}
        style={{
          background: `var(--phase-${colorIndex}-tint)`,
          color: `var(--phase-${colorIndex}-text)`,
          border: `1px solid var(--phase-${colorIndex}-border)`,
        }}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      className={`${base} bg-[var(--color-text)] text-white hover:opacity-90 active:opacity-80 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
