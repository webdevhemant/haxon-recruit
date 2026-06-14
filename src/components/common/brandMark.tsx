import { cn } from '@/lib/utils'

/** The Haxon brand mark — identical to the favicon so the logo is consistent
 *  across the app, auth, careers and the browser tab. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('size-7 shrink-0', className)}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="16" fill="#7b6cff" />
      <path d="M18 16h9v12h10V16h9v32h-9V36H27v12h-9z" fill="#ffffff" />
    </svg>
  )
}
