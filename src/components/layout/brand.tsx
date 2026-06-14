import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import { BrandMark } from '@/components/common/brandMark'

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      to={ROUTES.dashboard}
      className={cn(
        'flex items-center gap-2 font-display text-lg font-extrabold tracking-tight',
        className,
      )}
    >
      <BrandMark />
      <span>
        haxon<span className="text-primary">.</span>recruit
      </span>
    </Link>
  )
}
