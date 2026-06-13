import { PagePlaceholder } from '@/components/common/pagePlaceholder'

export { JobsPage } from './jobsPage'

export function JobDetailPage() {
  return (
    <PagePlaceholder
      title="Job Detail"
      description="Pipeline kanban for this role, candidate counts per stage and job details."
    />
  )
}

export function CreateJobPage() {
  return (
    <PagePlaceholder
      title="Create Job"
      description="Five-step wizard: basics, details, pipeline, scorecards, review & publish."
    />
  )
}
