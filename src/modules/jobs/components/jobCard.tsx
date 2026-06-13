import { Link } from 'react-router-dom'
import { MapPin, Users } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { StatusBadge } from '@/components/common/statusBadge'
import { formatSalaryRange } from '@/lib/format'
import { ROUTES } from '@/lib/routes'
import type { Job } from '@/lib/types'

export function JobCard({
  job,
  candidateCount,
}: {
  job: Job
  candidateCount: number
}) {
  return (
    <Link to={ROUTES.jobDetail(job.id)}>
      <Card className="h-full p-5 transition-colors hover:border-primary/40">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold leading-tight">{job.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {job.department}
            </p>
          </div>
          <StatusBadge kind="job" value={job.status} />
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {job.office}
            {job.remote ? ' · Remote' : ''}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {candidateCount} in pipeline
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
          <span className="text-muted-foreground">
            {formatSalaryRange(job.salaryMin, job.salaryMax)}
          </span>
          <span className="font-medium">{job.applicantCount} applicants</span>
        </div>
      </Card>
    </Link>
  )
}
