import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardCheck, Plus, Video } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeader } from '@/components/common/pageHeader'
import { StatusBadge } from '@/components/common/statusBadge'
import { EmptyState } from '@/components/common/emptyState'
import { formatDate, formatTime } from '@/lib/format'
import { INTERVIEWERS } from '@/lib/data/team'
import { ROUTES } from '@/lib/routes'
import type { Interview } from '@/lib/types'
import { usePermissions } from '@/hooks/usePermissions'
import { useDataStore } from '@/stores/useDataStore'
import { findCandidate, findJob, teamMember } from '@/stores/selectors'

function InterviewRow({ interview }: { interview: Interview }) {
  const { candidates, jobs } = useDataStore()
  const candidate = findCandidate(candidates, interview.candidateId)
  const job = findJob(jobs, interview.jobId)
  const upcoming =
    new Date(interview.scheduledAt).getTime() >= Date.now() - 3600_000

  return (
    <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center">
      <div className="flex w-28 shrink-0 flex-col">
        <span className="text-sm font-semibold">
          {formatTime(interview.scheduledAt)}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatDate(interview.scheduledAt)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <Link
          to={
            candidate ? ROUTES.candidateDetail(candidate.id) : ROUTES.interviews
          }
          className="font-medium hover:text-primary"
        >
          {candidate?.name ?? 'Candidate'}
        </Link>
        <p className="truncate text-xs text-muted-foreground">
          {interview.type} · {job?.title}
        </p>
      </div>
      <div className="flex -space-x-2">
        {interview.interviewerIds.map((iid) => (
          <Avatar key={iid} className="size-7 ring-2 ring-card">
            <AvatarFallback className="text-[10px]">
              {teamMember(iid)?.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <StatusBadge kind="interview" value={interview.status} />
      <div className="flex gap-2">
        {upcoming && interview.status !== 'cancelled' ? (
          <Button size="sm" variant="outline">
            <Video className="size-4" />
            Join
          </Button>
        ) : (
          <Button size="sm" variant="ghost" asChild>
            <Link to={ROUTES.interviewScorecard(interview.id)}>
              <ClipboardCheck className="size-4" />
              Scorecard
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export function InterviewsPage() {
  const interviews = useDataStore((s) => s.interviews)
  const { can } = usePermissions()
  const [status, setStatus] = useState('all')
  const [interviewer, setInterviewer] = useState('all')

  const filtered = useMemo(() => {
    return interviews.filter((iv) => {
      if (status !== 'all' && iv.status !== status) return false
      if (interviewer !== 'all' && !iv.interviewerIds.includes(interviewer))
        return false
      return true
    })
  }, [interviews, status, interviewer])

  const now = Date.now() - 3600_000
  const upcoming = filtered
    .filter((i) => new Date(i.scheduledAt).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    )
  const past = filtered
    .filter((i) => new Date(i.scheduledAt).getTime() < now)
    .sort(
      (a, b) =>
        new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime(),
    )

  return (
    <div>
      <PageHeader
        title="Interviews"
        description={`${upcoming.length} upcoming · ${past.length} past`}
        actions={
          can('interviews.schedule') ? (
            <Button asChild>
              <Link to={ROUTES.interviewSchedule}>
                <Plus className="size-4" />
                Schedule
              </Link>
            </Button>
          ) : undefined
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={interviewer} onValueChange={setInterviewer}>
          <SelectTrigger className="sm:w-52">
            <SelectValue placeholder="Interviewer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All interviewers</SelectItem>
            {INTERVIEWERS.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {upcoming.length === 0 && past.length === 0 ? (
        <EmptyState
          title="No interviews"
          description="Schedule one to get started."
        />
      ) : (
        <div className="flex flex-col gap-6">
          {upcoming.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
                Upcoming
              </h2>
              <Card className="divide-y divide-border">
                {upcoming.map((iv) => (
                  <InterviewRow key={iv.id} interview={iv} />
                ))}
              </Card>
            </section>
          )}
          {past.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
                Past
              </h2>
              <Card className="divide-y divide-border">
                {past.slice(0, 20).map((iv) => (
                  <InterviewRow key={iv.id} interview={iv} />
                ))}
              </Card>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
