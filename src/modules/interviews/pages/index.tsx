import { PagePlaceholder } from '@/components/common/pagePlaceholder'

export { ScorecardPage } from './scorecardPage'

export function InterviewsPage() {
  return (
    <PagePlaceholder
      title="Interviews"
      description="Week, day and list calendar of every scheduled interview."
    />
  )
}

export function ScheduleInterviewPage() {
  return (
    <PagePlaceholder
      title="Schedule Interview"
      description="Pick candidate, stage and interviewers, then choose a time slot."
    />
  )
}
