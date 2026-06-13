import {
  BarChart3,
  Briefcase,
  CalendarDays,
  LayoutDashboard,
  Mail,
  Receipt,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { ROUTES } from '@/lib/routes'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  /** Match nested routes as active (e.g. /jobs/123). */
  matchNested?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Recruiting',
    items: [
      { label: 'Dashboard', to: ROUTES.dashboard, icon: LayoutDashboard },
      { label: 'Jobs', to: ROUTES.jobs, icon: Briefcase, matchNested: true },
      {
        label: 'Candidates',
        to: ROUTES.candidates,
        icon: Users,
        matchNested: true,
      },
      {
        label: 'Interviews',
        to: ROUTES.interviews,
        icon: CalendarDays,
        matchNested: true,
      },
      { label: 'Offers', to: ROUTES.offers, icon: Receipt, matchNested: true },
    ],
  },
  {
    label: 'Insights',
    items: [
      {
        label: 'Analytics',
        to: ROUTES.analytics,
        icon: BarChart3,
        matchNested: true,
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Templates', to: ROUTES.settingsTemplates, icon: Mail },
      {
        label: 'Settings',
        to: ROUTES.settingsTeam,
        icon: Settings,
        matchNested: true,
      },
    ],
  },
]
