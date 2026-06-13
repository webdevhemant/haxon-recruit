import { PagePlaceholder } from '@/components/common/pagePlaceholder'

export function AnalyticsPage() {
  return (
    <PagePlaceholder
      title="Analytics Overview"
      description="KPI cards, funnel conversion, source breakdown and hires by department."
    />
  )
}

export function DeiReportPage() {
  return (
    <PagePlaceholder
      title="DEI Report"
      description="Anonymised diversity funnel with benchmark comparisons."
    />
  )
}

export function SourceReportPage() {
  return (
    <PagePlaceholder
      title="Source Report"
      description="Channel-by-channel effectiveness, cost-per-hire and quality scores."
    />
  )
}
