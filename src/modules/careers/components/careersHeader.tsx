import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { UserAvatar } from '@/components/common/userAvatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import { ROLE_LABEL } from '@/lib/rbac'
import { DEMO_USERS, useAuthStore } from '@/stores/useAuthStore'

const LINKS = [
  { label: 'Overview', to: ROUTES.careers, end: true },
  { label: 'Open roles', to: ROUTES.careersJobs, end: false },
]

export function CareersHeader() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const loginAs = useAuthStore((s) => s.loginAs)
  const isApplicant = !user || user.role === 'applicant'

  const onSwitch = (id: string, role: string) => {
    loginAs(id)
    navigate(role === 'applicant' ? ROUTES.careers : ROUTES.dashboard)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to={ROUTES.careers}
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
            H
          </span>
          haxon<span className="-ml-2 text-primary">.</span>recruit
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  'text-sm transition-colors',
                  isActive
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!isApplicant && (
            <Button asChild size="sm" variant="outline">
              <Link to={ROUTES.dashboard}>
                Back to app
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Account menu"
              >
                <UserAvatar
                  seed={user?.id ?? 'guest'}
                  initials={user?.initials ?? 'JB'}
                  className="size-8"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{user?.name ?? 'Guest'}</p>
                  {user && (
                    <Badge variant="secondary">{ROLE_LABEL[user.role]}</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {user?.email ?? 'Browsing as guest'}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate(ROUTES.account)}>
                View profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Switch role (demo)
              </DropdownMenuLabel>
              {DEMO_USERS.map((u) => (
                <DropdownMenuItem
                  key={u.id}
                  onSelect={() => onSwitch(u.id, u.role)}
                  className="gap-2"
                >
                  <UserAvatar
                    seed={u.id}
                    initials={u.initials}
                    className="size-6"
                  />
                  <span className="flex-1 truncate">{u.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {ROLE_LABEL[u.role]}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
