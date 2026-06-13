import {
  ClipboardCheck,
  FileText,
  PartyPopper,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { daysAgoLabel, RECOMMENDATION_LABEL } from '@/lib/format'
import { useDataStore } from '@/stores/useDataStore'
import { findCandidate, teamName } from '@/stores/selectors'

interface Activity {
  id: string
  icon: LucideIcon
  tone: string
  text: string
  days: number
}

export function ActivityFeed() {
  const { candidates, scorecards, offers } = useDataStore()

  const events: Activity[] = []

  for (const c of candidates) {
    if (c.appliedDaysAgo <= 7 && !c.archived) {
      events.push({
        id: `app-${c.id}`,
        icon: UserPlus,
        tone: 'text-primary bg-primary/10',
        text: `${c.name} applied via ${c.source}`,
        days: c.appliedDaysAgo,
      })
    }
  }
  for (const s of scorecards) {
    const c = findCandidate(candidates, s.candidateId)
    if (!c || s.submittedDaysAgo > 10) continue
    events.push({
      id: `sc-${s.id}`,
      icon: ClipboardCheck,
      tone: 'text-warning bg-warning/10',
      text: `${teamName(s.interviewerId)} scored ${c.name} — ${RECOMMENDATION_LABEL[s.recommendation]}`,
      days: s.submittedDaysAgo,
    })
  }
  for (const o of offers) {
    const c = findCandidate(candidates, o.candidateId)
    if (!c) continue
    if (o.status === 'accepted') {
      events.push({
        id: `of-${o.id}`,
        icon: PartyPopper,
        tone: 'text-success bg-success/10',
        text: `${c.name} accepted their offer`,
        days: 2,
      })
    } else if (o.status === 'sent' || o.status === 'pending') {
      events.push({
        id: `of-${o.id}`,
        icon: FileText,
        tone: 'text-primary bg-primary/10',
        text: `Offer sent to ${c.name}`,
        days: 1,
      })
    }
  }

  const feed = events.sort((a, b) => a.days - b.days).slice(0, 8)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>What’s happening across hiring</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="relative flex flex-col gap-4 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
          {feed.map((e) => (
            <li key={e.id} className="relative flex items-start gap-3">
              <span
                className={cn(
                  'z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-card',
                  e.tone,
                )}
              >
                <e.icon className="size-4" />
              </span>
              <div className="pt-1">
                <p className="text-sm leading-snug">{e.text}</p>
                <p className="text-xs text-muted-foreground">
                  {daysAgoLabel(e.days)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
