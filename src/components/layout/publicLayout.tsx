import { Outlet } from 'react-router-dom'

import { CareersHeader } from '@/modules/careers/components/careersHeader'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <CareersHeader />
      <Outlet />
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Nexaflow Inc. · Careers powered by Haxon
          Recruit.
        </div>
      </footer>
    </div>
  )
}
