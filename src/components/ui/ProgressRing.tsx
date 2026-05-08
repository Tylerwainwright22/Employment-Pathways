import { useEffect, useState } from 'react'

interface ProgressRingProps {
  percent: number
  colorIndex: number
  size?: number
  strokeWidth?: number
}

export function ProgressRing({
  percent,
  colorIndex,
  size = 56,
  strokeWidth = 4,
}: ProgressRingProps) {
  const [animatedPercent, setAnimatedPercent] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPercent(percent), 100)
    return () => clearTimeout(timer)
  }, [percent])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedPercent / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}
    >
      {/* Track — CSS style prop so var() resolves */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        style={{ stroke: 'rgba(0,0,0,0.07)' }}
      />
      {/* Fill — CSS style prop required for CSS custom property resolution */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          stroke: `var(--phase-${colorIndex}-main)`,
          transition: 'stroke-dashoffset 600ms ease-out',
        }}
      />
    </svg>
  )
}
