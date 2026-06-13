import { GripVertical, Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DEFAULT_PIPELINE, DISQUALIFY_REASONS } from '@/lib/data/constants'
import { SettingsTabs } from '../components/settingsTabs'

const TYPE_VARIANT: Record<
  string,
  'default' | 'secondary' | 'warning' | 'success'
> = {
  screening: 'secondary',
  interview: 'default',
  offer: 'warning',
  hired: 'success',
}

export function PipelineConfigPage() {
  return (
    <div>
      <SettingsTabs />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Default pipeline stages</CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="size-4" />
              Add stage
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {DEFAULT_PIPELINE.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <GripVertical className="size-4 cursor-grab text-muted-foreground" />
                <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{s.name}</span>
                <Badge
                  variant={TYPE_VARIANT[s.type] ?? 'secondary'}
                  className="ml-auto capitalize"
                >
                  {s.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Disqualification reasons
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {DISQUALIFY_REASONS.map((r) => (
              <div
                key={r}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
              >
                {r}
                <X className="size-3.5 cursor-pointer text-muted-foreground hover:text-foreground" />
              </div>
            ))}
            <Button size="sm" variant="ghost" className="mt-1 justify-start">
              <Plus className="size-4" />
              Add reason
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
