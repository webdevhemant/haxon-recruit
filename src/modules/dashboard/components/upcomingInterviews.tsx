import { Link } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/common/emptyState'
import { fromNow, formatTime } from '@/lib/format'
import { ROUTES } from '@/lib/routes'
import { useDataStore } from '@/stores/useDataStore'
import {
  findCandidate,
  findJob,
  teamMember,
  upcomingInterviews,
} from '@/stores/selectors'

export function UpcomingInterviews() {
  const { interviews, candidates, jobs } = useDataStore()
  const upcoming = upcomingInterviews(interviews).slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Upcoming interviews</CardTitle>
          <CardDescription>Next sessions on the calendar</CardDescription>
        </div>
        <Link
          to={ROUTES.interviews}
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {upcoming.length === 0 && (
          <EmptyState
            icon={CalendarDays}
            title="No upcoming interviews"
            description="Schedule one from a candidate profile."
          />
        )}
        {upcoming.map((iv) => {
          const candidate = findCandidate(candidates, iv.candidateId)
          const job = findJob(jobs, iv.jobId)
          return (
            <Link
              key={iv.id}
              to={
                candidate
                  ? ROUTES.candidateDetail(candidate.id)
                  : ROUTES.interviews
              }
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-secondary"
            >
              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-secondary text-center">
                <span className="text-[10px] uppercase text-muted-foreground">
                  {new Date(iv.scheduledAt).toLocaleDateString('en-US', {
                    month: 'short',
                  })}
                </span>
                <span className="text-sm font-bold leading-none">
                  {new Date(iv.scheduledAt).getDate()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {candidate?.name ?? 'Candidate'}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {iv.type} · {job?.title ?? 'Role'}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="secondary">{fromNow(iv.scheduledAt)}</Badge>
                <span className="text-xs text-muted-foreground">
                  {formatTime(iv.scheduledAt)} ·{' '}
                  {teamMember(iv.interviewerIds[0])?.initials}
                </span>
              </div>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
