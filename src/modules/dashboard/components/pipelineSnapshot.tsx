import { Link } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DEFAULT_PIPELINE } from '@/lib/data/constants'
import { ROUTES } from '@/lib/routes'
import { useDataStore } from '@/stores/useDataStore'
import { stageCounts } from '@/stores/selectors'

const STAGE_COLORS: Record<string, string> = {
  applied: 'bg-blue-500',
  screening: 'bg-indigo-500',
  interview: 'bg-primary',
  onsite: 'bg-violet-500',
  offer: 'bg-warning',
  hired: 'bg-success',
}

export function PipelineSnapshot() {
  const candidates = useDataStore((s) => s.candidates)
  const counts = stageCounts(candidates, DEFAULT_PIPELINE)
  const total = DEFAULT_PIPELINE.reduce(
    (sum, s) => sum + (counts[s.id] || 0),
    0,
  )

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Pipeline snapshot</CardTitle>
          <CardDescription>
            {total} active candidates across all stages
          </CardDescription>
        </div>
        <Link
          to={ROUTES.candidates}
          className="text-sm font-medium text-primary hover:underline"
        >
          View candidates
        </Link>
      </CardHeader>
      <CardContent>
        <div className="mb-5 flex h-3 overflow-hidden rounded-full">
          {DEFAULT_PIPELINE.map((stage) => {
            const pct = total ? ((counts[stage.id] || 0) / total) * 100 : 0
            if (!pct) return null
            return (
              <div
                key={stage.id}
                className={STAGE_COLORS[stage.id]}
                style={{ width: `${pct}%` }}
                title={`${stage.name}: ${counts[stage.id]}`}
              />
            )
          })}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
          {DEFAULT_PIPELINE.map((stage) => (
            <div key={stage.id} className="flex items-center gap-2">
              <span
                className={`size-2.5 rounded-full ${STAGE_COLORS[stage.id]}`}
              />
              <span className="text-sm text-muted-foreground">
                {stage.name}
              </span>
              <span className="ml-auto text-sm font-semibold tabular-nums">
                {counts[stage.id] || 0}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
