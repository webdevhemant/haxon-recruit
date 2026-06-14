import type { ReactNode } from 'react'

/** Fades content in on mount — used under route-based tabs so switching tabs
 *  animates the content without re-animating the whole page. */
export function TabFade({ children }: { children: ReactNode }) {
  return (
    <div className="duration-300 animate-in fade-in-0 slide-in-from-bottom-1">
      {children}
    </div>
  )
}
