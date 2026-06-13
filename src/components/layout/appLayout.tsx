import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'

import type { Permission } from '@/lib/rbac'
import { ROUTES } from '@/lib/routes'
import { usePermissions } from '@/hooks/usePermissions'
import { useAuthStore } from '@/stores/useAuthStore'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

/** Maps the current path to the permission required to view it. */
function requiredPermission(pathname: string): Permission | null {
  if (pathname.startsWith('/settings')) return 'settings.view'
  if (pathname.startsWith('/analytics')) return 'analytics.view'
  if (pathname === ROUTES.offerNew) return 'offers.manage'
  if (pathname.startsWith('/offers')) return 'offers.view'
  if (pathname === ROUTES.jobNew) return 'jobs.create'
  if (pathname.startsWith('/jobs')) return 'jobs.view'
  if (pathname === ROUTES.interviewSchedule) return 'interviews.schedule'
  if (/^\/interviews\/.+\/scorecard$/.test(pathname)) return 'scorecards.submit'
  if (pathname.startsWith('/interviews')) return 'interviews.view'
  if (pathname.startsWith('/candidates')) return 'candidates.view'
  if (pathname.startsWith('/messages')) return 'messages.view'
  if (pathname.startsWith('/dashboard')) return 'dashboard.view'
  return null
}

const FALLBACK_ORDER: { permission: Permission; route: string }[] = [
  { permission: 'dashboard.view', route: ROUTES.dashboard },
  { permission: 'candidates.view', route: ROUTES.candidates },
  { permission: 'jobs.view', route: ROUTES.jobs },
  { permission: 'interviews.view', route: ROUTES.interviews },
]

export function AppLayout() {
  const { pathname } = useLocation()
  const { role, can } = usePermissions()
  const user = useAuthStore((s) => s.user)

  // Signed-out users go to login.
  if (!user) {
    return <Navigate to={ROUTES.login} replace />
  }

  // Applicants never see the internal app.
  if (role === 'applicant') {
    return <Navigate to={ROUTES.careers} replace />
  }

  const needed = requiredPermission(pathname)
  if (needed && !can(needed)) {
    const fallback =
      FALLBACK_ORDER.find((f) => can(f.permission))?.route ?? ROUTES.careers
    return <Navigate to={fallback} replace />
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-64">
        <Topbar />
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 lg:px-8 lg:py-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
