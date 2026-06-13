import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/common/pageHeader'
import { ROUTES } from '@/lib/routes'

const TABS = [
  { label: 'Team', to: ROUTES.settingsTeam },
  { label: 'Pipeline', to: ROUTES.settingsPipeline },
  { label: 'Templates', to: ROUTES.settingsTemplates },
  { label: 'Integrations', to: ROUTES.settingsIntegrations },
  { label: 'Company', to: ROUTES.settingsCompany },
]

export function SettingsTabs() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your workspace, team and integrations."
      />
      <div className="mb-6 flex flex-wrap gap-1 border-b border-border">
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              cn(
                '-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )
            }
          >
            {t.label}
          </NavLink>
        ))}
      </div>
    </>
  )
}
