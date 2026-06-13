import { useState } from 'react'
import { Bell, Menu, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserAvatar } from '@/components/common/userAvatar'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/lib/routes'
import { ROLE_LABEL } from '@/lib/rbac'
import { DEMO_USERS, useAuthStore } from '@/stores/useAuthStore'
import { Brand } from './brand'
import { SidebarNav } from './sidebarNav'

export function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const loginAs = useAuthStore((s) => s.loginAs)

  const onSignOut = () => {
    logout()
    navigate(ROUTES.login)
  }

  const onSwitch = (id: string, role: string) => {
    loginAs(id)
    navigate(role === 'applicant' ? ROUTES.careers : ROUTES.dashboard)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-8">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex h-16 items-center px-6">
            <Brand />
          </div>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search candidates, jobs…"
          className="pl-9"
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Account menu"
            >
              <UserAvatar
                seed={user?.id ?? 'guest'}
                initials={user?.initials ?? 'U'}
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
                {user?.email ?? 'Not signed in'}
              </p>
            </DropdownMenuLabel>
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onSignOut}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
