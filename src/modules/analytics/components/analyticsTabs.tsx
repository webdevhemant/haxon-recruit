import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'

const TABS = [
  { label: 'Overview', to: ROUTES.analytics, end: true },
  { label: 'DEI', to: ROUTES.analyticsDei, end: false },
  { label: 'Sources', to: ROUTES.analyticsSources, end: false },
]

export function AnalyticsTabs() {
  return (
    <div className="mb-6 inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1">
      {TABS.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  )
}
