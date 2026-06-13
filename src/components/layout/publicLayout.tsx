import { Outlet } from 'react-router-dom'

import { CareersHeader } from '@/modules/careers/components/careersHeader'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <CareersHeader />
      <Outlet />
    </div>
  )
}
