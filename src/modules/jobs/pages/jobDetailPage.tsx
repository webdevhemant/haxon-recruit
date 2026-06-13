import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Share2, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserAvatar } from '@/components/common/userAvatar'
import { StatusBadge } from '@/components/common/statusBadge'
import { EmptyState } from '@/components/common/emptyState'
import { formatSalaryRange } from '@/lib/format'
import { ROUTES } from '@/lib/routes'
import { usePermissions } from '@/hooks/usePermissions'
import { useDataStore } from '@/stores/useDataStore'
import { candidatesForJob, findJob, teamMember } from '@/stores/selectors'
import { PipelineKanban } from '../components/pipelineKanban'

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}

function Person({ id, role }: { id: string; role: string }) {
  const member = teamMember(id)
  if (!member) return null
  return (
    <div className="flex items-center gap-2.5">
      <UserAvatar
        seed={member.id}
        initials={member.initials}
        className="size-8"
      />
      <div className="text-sm">
        <p className="font-medium leading-tight">{member.name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  )
}

export function JobDetailPage() {
  const { id } = useParams()
  const { can } = usePermissions()
  const { jobs, candidates } = useDataStore()
  const job = findJob(jobs, id)

  if (!job) {
    return (
      <EmptyState
        title="Job not found"
        description="This role may have been removed."
        action={
          <Button asChild variant="outline">
            <Link to={ROUTES.jobs}>Back to jobs</Link>
          </Button>
        }
      />
    )
  }

  const pipelineCount = candidatesForJob(candidates, job.id).length

  return (
    <div>
      <Link
        to={ROUTES.jobs}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All jobs
      </Link>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold tracking-tight">
              {job.title}
            </h1>
            <StatusBadge kind="job" value={job.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {job.department} · {job.office}
            {job.remote ? ' · Remote' : ''} · {job.type}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="size-4" />
            Share
          </Button>
          {can('jobs.edit') && (
            <Button size="sm">
              <Pencil className="size-4" />
              Edit job
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <Card className="min-w-0">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-4 text-muted-foreground" />
              Pipeline · {pipelineCount} candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PipelineKanban jobId={job.id} stages={job.stages} />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Job details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <InfoRow
                label="Salary"
                value={formatSalaryRange(job.salaryMin, job.salaryMax)}
              />
              <InfoRow label="Headcount" value={String(job.headcount)} />
              <InfoRow label="Applicants" value={String(job.applicantCount)} />
              <InfoRow
                label="Posted"
                value={
                  job.postedDaysAgo === 0
                    ? 'Draft'
                    : `${job.postedDaysAgo} days ago`
                }
              />
              <Separator />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {job.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hiring team</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Person id={job.hiringManagerId} role="Hiring manager" />
              <Person id={job.recruiterId} role="Recruiter" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
