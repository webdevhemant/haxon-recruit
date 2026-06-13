import { NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { usePermissions } from '@/hooks/usePermissions'
import { NAV_GROUPS } from './navConfig'

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const { can } = usePermissions()

  const groups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => can(item.permission)),
  })).filter((group) => group.items.length > 0)

  return (
    <nav className="flex flex-col gap-6 px-3">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            {group.label}
          </p>
          {group.items.map((item) => {
            const active = item.matchNested
              ? pathname.startsWith(item.to)
              : pathname === item.to
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </NavLink>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
