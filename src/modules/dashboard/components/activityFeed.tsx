import { Link } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UserAvatar } from '@/components/common/userAvatar'
import { daysAgoLabel, RECOMMENDATION_LABEL } from '@/lib/format'
import { ROUTES } from '@/lib/routes'
import { useDataStore } from '@/stores/useDataStore'
import { findCandidate, findJob, teamMember } from '@/stores/selectors'

interface Activity {
  id: string
  actorSeed: string
  actorInitials: string
  actorName: string
  action: string
  to?: string
  days: number
}

export function ActivityFeed() {
  const { candidates, scorecards, offers, jobs } = useDataStore()

  const events: Activity[] = []

  for (const c of candidates) {
    if (c.appliedDaysAgo <= 7 && !c.archived) {
      events.push({
        id: `app-${c.id}`,
        actorSeed: c.id,
        actorInitials: c.initials,
        actorName: c.name,
        action: `applied via ${c.source}`,
        to: ROUTES.candidateDetail(c.id),
        days: c.appliedDaysAgo,
      })
    }
  }
  for (const s of scorecards) {
    const c = findCandidate(candidates, s.candidateId)
    const m = teamMember(s.interviewerId)
    if (!c || !m || s.submittedDaysAgo > 10) continue
    events.push({
      id: `sc-${s.id}`,
      actorSeed: m.id,
      actorInitials: m.initials,
      actorName: m.name,
      action: `scored ${c.name} — ${RECOMMENDATION_LABEL[s.recommendation]}`,
      to: ROUTES.candidateDetail(c.id),
      days: s.submittedDaysAgo,
    })
  }
  for (const o of offers) {
    const c = findCandidate(candidates, o.candidateId)
    if (!c) continue
    if (o.status === 'accepted') {
      events.push({
        id: `of-${o.id}`,
        actorSeed: c.id,
        actorInitials: c.initials,
        actorName: c.name,
        action: 'accepted their offer',
        to: ROUTES.offers,
        days: 2,
      })
    } else if (o.status === 'sent' || o.status === 'pending') {
      const recruiter = teamMember(findJob(jobs, o.jobId)?.recruiterId ?? '')
      events.push({
        id: `of-${o.id}`,
        actorSeed: recruiter?.id ?? 'system',
        actorInitials: recruiter?.initials ?? 'HR',
        actorName: recruiter?.name ?? 'Recruiter',
        action: `sent an offer to ${c.name}`,
        to: ROUTES.offers,
        days: 1,
      })
    }
  }

  const feed = events.sort((a, b) => a.days - b.days).slice(0, 8)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Who changed what across hiring</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-1">
          {feed.map((e) => (
            <li key={e.id}>
              <Link
                to={e.to ?? ROUTES.dashboard}
                className="flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-secondary"
              >
                <UserAvatar
                  seed={e.actorSeed}
                  initials={e.actorInitials}
                  className="size-8"
                />
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{e.actorName}</span>{' '}
                    <span className="text-muted-foreground">{e.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {daysAgoLabel(e.days)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
