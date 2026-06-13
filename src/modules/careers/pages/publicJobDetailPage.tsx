import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Briefcase, Check, MapPin, Wallet } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/common/emptyState'
import { formatSalaryRange } from '@/lib/format'
import { ROUTES } from '@/lib/routes'
import { useDataStore } from '@/stores/useDataStore'
import { findJobBySlug } from '@/stores/selectors'

const RESPONSIBILITIES = [
  'Own meaningful features end to end, from design to ship.',
  'Partner closely with product, design and other engineers.',
  'Raise the bar on quality, performance and developer experience.',
  'Mentor teammates and contribute to a strong engineering culture.',
]

const REQUIREMENTS = [
  '4+ years of relevant professional experience.',
  'Strong fundamentals and a bias for shipping.',
  'Excellent written and verbal communication.',
  'Comfort with ambiguity in a fast-moving environment.',
]

export function PublicJobDetailPage() {
  const { slug } = useParams()
  const jobs = useDataStore((s) => s.jobs)
  const job = findJobBySlug(jobs, slug)

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <EmptyState
          title="Role not found"
          description="This position may have closed."
          action={
            <Button asChild variant="outline">
              <Link to={ROUTES.careersJobs}>Browse roles</Link>
            </Button>
          }
        />
      </div>
    )
  }

  const similar = jobs
    .filter(
      (j) =>
        j.status === 'open' &&
        j.id !== job.id &&
        j.department === job.department,
    )
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        to={ROUTES.careersJobs}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All roles
      </Link>

      <Badge variant="secondary" className="mb-3">
        {job.department}
      </Badge>
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {job.title}
      </h1>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-4" />
          {job.office}
          {job.remote ? ' · Remote' : ''}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="size-4" />
          {job.type}
        </span>
        <span className="flex items-center gap-1.5">
          <Wallet className="size-4" />
          {formatSalaryRange(job.salaryMin, job.salaryMax)}
        </span>
      </div>

      <div className="mt-6 flex gap-3">
        <Button asChild size="lg">
          <Link to={ROUTES.careersApply(job.slug)}>Apply now</Link>
        </Button>
      </div>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-lg font-semibold">About the role</h2>
          <p className="text-muted-foreground">{job.description}</p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold">What you'll do</h2>
          <ul className="space-y-2">
            {RESPONSIBILITIES.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                <span className="text-muted-foreground">{r}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold">What we're looking for</h2>
          <ul className="space-y-2">
            {REQUIREMENTS.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                <span className="text-muted-foreground">{r}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-secondary/30 p-6 text-center">
        <h2 className="font-semibold">Ready to apply?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          It takes about 5 minutes. We read every application.
        </p>
        <Button asChild className="mt-4">
          <Link to={ROUTES.careersApply(job.slug)}>Apply for this role</Link>
        </Button>
      </div>

      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Similar roles</h2>
          <div className="flex flex-col gap-3">
            {similar.map((j) => (
              <Link key={j.id} to={ROUTES.careersJobDetail(j.slug)}>
                <Card className="flex items-center justify-between p-4 transition-colors hover:border-primary/40">
                  <span className="font-medium">{j.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {j.office}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
