import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      to={ROUTES.dashboard}
      className={cn(
        'flex items-center gap-2 font-display text-lg font-extrabold tracking-tight',
        className,
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
        H
      </span>
      <span>
        haxon<span className="text-primary">.</span>recruit
      </span>
    </Link>
  )
}
