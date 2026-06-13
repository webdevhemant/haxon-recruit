import { Star } from 'lucide-react'

import { cn } from '@/lib/utils'

interface RatingStarsProps {
  value: number
  max?: number
  className?: string
  size?: number
  onChange?: (value: number) => void
}

export function RatingStars({
  value,
  max = 5,
  className,
  size = 14,
  onChange,
}: RatingStarsProps) {
  const interactive = Boolean(onChange)
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.round(value)
        const star = (
          <Star
            style={{ width: size, height: size }}
            className={cn(
              filled ? 'fill-warning text-warning' : 'text-muted-foreground/35',
            )}
          />
        )
        return interactive ? (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(i + 1)}
            className="transition-transform hover:scale-110"
            aria-label={`Rate ${i + 1}`}
          >
            {star}
          </button>
        ) : (
          <span key={i}>{star}</span>
        )
      })}
    </div>
  )
}
