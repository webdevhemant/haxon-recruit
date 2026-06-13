import { Link } from 'react-router-dom'
import { Briefcase, CalendarCheck, Plus, TrendingUp, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/common/pageHeader'
import { StatCard } from '@/components/common/statCard'
import { ROUTES } from '@/lib/routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { useDataStore } from '@/stores/useDataStore'
import { upcomingInterviews } from '@/stores/selectors'
import { UpcomingInterviews } from '../components/upcomingInterviews'
import { ActivityFeed } from '../components/activityFeed'
import { PipelineSnapshot } from '../components/pipelineSnapshot'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const { jobs, candidates, interviews, offers } = useDataStore()

  const openJobs = jobs.filter((j) => j.status === 'open').length
  const activeCandidates = candidates.filter((c) => !c.archived).length
  const weekMs = Date.now() + 7 * 86400000
  const interviewsThisWeek = upcomingInterviews(interviews).filter(
    (i) => new Date(i.scheduledAt).getTime() <= weekMs,
  ).length
  const accepted = offers.filter((o) => o.status === 'accepted').length
  const decided = offers.filter(
    (o) => o.status === 'accepted' || o.status === 'declined',
  ).length
  const acceptance = decided ? Math.round((accepted / decided) * 100) : 0

  const firstName = user?.name.split(' ')[0] ?? 'there'

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Here’s what’s happening across your hiring today."
        actions={
          <Button asChild>
            <Link to={ROUTES.jobNew}>
              <Plus className="size-4" />
              New job
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Open jobs"
          value={openJobs}
          icon={Briefcase}
          hint="actively hiring"
        />
        <StatCard
          label="Active candidates"
          value={activeCandidates}
          icon={Users}
          delta={8}
          hint="vs last month"
        />
        <StatCard
          label="Interviews this week"
          value={interviewsThisWeek}
          icon={CalendarCheck}
          hint="scheduled"
        />
        <StatCard
          label="Offer acceptance"
          value={`${acceptance}%`}
          icon={TrendingUp}
          delta={4}
          hint="vs last quarter"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <PipelineSnapshot />
          <UpcomingInterviews />
        </div>
        <ActivityFeed />
      </div>
    </div>
  )
}
