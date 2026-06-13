import {
  BarChart3,
  Briefcase,
  CalendarDays,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Receipt,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { ROUTES } from '@/lib/routes'
import type { Permission } from '@/lib/rbac'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  permission: Permission
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
      {
        label: 'Dashboard',
        to: ROUTES.dashboard,
        icon: LayoutDashboard,
        permission: 'dashboard.view',
      },
      {
        label: 'Jobs',
        to: ROUTES.jobs,
        icon: Briefcase,
        matchNested: true,
        permission: 'jobs.view',
      },
      {
        label: 'Candidates',
        to: ROUTES.candidates,
        icon: Users,
        matchNested: true,
        permission: 'candidates.view',
      },
      {
        label: 'Interviews',
        to: ROUTES.interviews,
        icon: CalendarDays,
        matchNested: true,
        permission: 'interviews.view',
      },
      {
        label: 'Offers',
        to: ROUTES.offers,
        icon: Receipt,
        matchNested: true,
        permission: 'offers.view',
      },
      {
        label: 'Messages',
        to: ROUTES.messages,
        icon: MessageSquare,
        matchNested: true,
        permission: 'messages.view',
      },
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
        permission: 'analytics.view',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        label: 'Templates',
        to: ROUTES.settingsTemplates,
        icon: Mail,
        permission: 'settings.view',
      },
      {
        label: 'Settings',
        to: ROUTES.settingsTeam,
        icon: Settings,
        matchNested: true,
        permission: 'settings.view',
      },
    ],
  },
]
