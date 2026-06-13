import { UserAvatar } from '@/components/common/userAvatar'
import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/common/statusBadge'
import { EmptyState } from '@/components/common/emptyState'
import { daysAgoLabel } from '@/lib/format'
import type { Scorecard } from '@/lib/types'
import { aggregateScore, teamMember } from '@/stores/selectors'

export function CandidateScorecards({
  scorecards,
}: {
  scorecards: Scorecard[]
}) {
  const aggregate = aggregateScore(scorecards)

  if (scorecards.length === 0) {
    return (
      <EmptyState
        title="No scorecards yet"
        description="Scorecards appear here after interviewers submit feedback."
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {aggregate !== null && (
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Aggregate score</p>
              <p className="font-display text-3xl font-bold">
                {aggregate.toFixed(1)}
                <span className="text-base text-muted-foreground">/5</span>
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {scorecards.length} scorecard{scorecards.length > 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
      )}

      {scorecards.map((s) => {
        const interviewer = teamMember(s.interviewerId)
        return (
          <Card key={s.id}>
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <UserAvatar
                    seed={s.interviewerId}
                    initials={interviewer?.initials ?? '?'}
                    className="size-8"
                  />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {interviewer?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {daysAgoLabel(s.submittedDaysAgo)}
                    </p>
                  </div>
                </div>
                <StatusBadge kind="recommendation" value={s.recommendation} />
              </div>

              <div className="flex flex-col gap-2.5">
                {s.attributes.map((a) => (
                  <div key={a.label} className="flex items-center gap-3">
                    <span className="w-32 shrink-0 text-xs text-muted-foreground">
                      {a.label}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(a.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-xs font-medium tabular-nums">
                      {a.score}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
                “{s.comment}”
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
