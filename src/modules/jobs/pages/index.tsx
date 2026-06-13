import { PagePlaceholder } from '@/components/common/pagePlaceholder'

export { JobsPage } from './jobsPage'
export { JobDetailPage } from './jobDetailPage'

export function CreateJobPage() {
  return (
    <PagePlaceholder
      title="Create Job"
      description="Five-step wizard: basics, details, pipeline, scorecards, review & publish."
    />
  )
}
