import { useState } from 'react'
import {
  CalendarDays,
  Check,
  FileSignature,
  Link2,
  MessageSquare,
  Plug,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SettingsTabs } from '../components/settingsTabs'

type State = 'connected' | 'available' | 'coming-soon'

interface Integration {
  id: string
  name: string
  description: string
  icon: LucideIcon
  state: State
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get pipeline alerts in your channels.',
    icon: MessageSquare,
    state: 'connected',
  },
  {
    id: 'gcal',
    name: 'Google Calendar',
    description: 'Two-way interview scheduling sync.',
    icon: CalendarDays,
    state: 'connected',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Source and import candidate profiles.',
    icon: Users,
    state: 'available',
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse Import',
    description: 'Migrate jobs and candidates.',
    icon: Link2,
    state: 'available',
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    description: 'Send offers for e-signature.',
    icon: FileSignature,
    state: 'available',
  },
  {
    id: 'bamboo',
    name: 'BambooHR',
    description: 'Sync new hires to your HRIS.',
    icon: Workflow,
    state: 'coming-soon',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate anything with 5k+ apps.',
    icon: Plug,
    state: 'coming-soon',
  },
]

export function IntegrationsPage() {
  const [connected, setConnected] = useState<Set<string>>(
    new Set(
      INTEGRATIONS.filter((i) => i.state === 'connected').map((i) => i.id),
    ),
  )

  const toggle = (id: string) =>
    setConnected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div>
      <SettingsTabs />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((it) => {
          const isConnected = connected.has(it.id)
          const comingSoon = it.state === 'coming-soon'
          return (
            <Card key={it.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-foreground">
                  <it.icon className="size-5" />
                </span>
                {isConnected && (
                  <Badge variant="success">
                    <Check className="mr-1 size-3" />
                    Connected
                  </Badge>
                )}
                {comingSoon && <Badge variant="outline">Coming soon</Badge>}
              </div>
              <h3 className="mt-4 font-semibold">{it.name}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">
                {it.description}
              </p>
              <Button
                className="mt-4"
                variant={isConnected ? 'outline' : 'default'}
                disabled={comingSoon}
                onClick={() => toggle(it.id)}
              >
                {comingSoon
                  ? 'Notify me'
                  : isConnected
                    ? 'Disconnect'
                    : 'Connect'}
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
