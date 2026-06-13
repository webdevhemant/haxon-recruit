import {
  CalendarDays,
  ClipboardCheck,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { daysAgoLabel, fromNow, RECOMMENDATION_LABEL } from '@/lib/format'
import type { Candidate, Interview, Scorecard } from '@/lib/types'
import { teamName } from '@/stores/selectors'

interface Event {
  id: string
  icon: LucideIcon
  tone: string
  text: string
  meta: string
  order: number
}

export function CandidateTimeline({
  candidate,
  interviews,
  scorecards,
}: {
  candidate: Candidate
  interviews: Interview[]
  scorecards: Scorecard[]
}) {
  const events: Event[] = []

  events.push({
    id: 'applied',
    icon: UserPlus,
    tone: 'bg-primary/10 text-primary',
    text: `Applied via ${candidate.source}`,
    meta: daysAgoLabel(candidate.appliedDaysAgo),
    order: -candidate.appliedDaysAgo,
  })

  for (const iv of interviews) {
    events.push({
      id: `iv-${iv.id}`,
      icon: CalendarDays,
      tone: 'bg-warning/10 text-warning',
      text: `${iv.type} interview ${iv.status === 'completed' ? 'completed' : iv.status}`,
      meta: fromNow(iv.scheduledAt),
      order:
        new Date(iv.scheduledAt).getTime() / 86400000 - Date.now() / 86400000,
    })
  }

  for (const s of scorecards) {
    events.push({
      id: `sc-${s.id}`,
      icon: ClipboardCheck,
      tone: 'bg-success/10 text-success',
      text: `${teamName(s.interviewerId)} submitted a scorecard — ${RECOMMENDATION_LABEL[s.recommendation]}`,
      meta: daysAgoLabel(s.submittedDaysAgo),
      order: -s.submittedDaysAgo,
    })
  }

  const sorted = events.sort((a, b) => b.order - a.order)

  return (
    <ol className="relative flex flex-col gap-5 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
      {sorted.map((e) => (
        <li key={e.id} className="relative flex items-start gap-3">
          <span
            className={cn(
              'z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-background',
              e.tone,
            )}
          >
            <e.icon className="size-4" />
          </span>
          <div className="pt-1">
            <p className="text-sm leading-snug">{e.text}</p>
            <p className="text-xs text-muted-foreground">{e.meta}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
