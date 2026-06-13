import { Link } from 'react-router-dom'

import { UserAvatar } from '@/components/common/userAvatar'
import { RatingStars } from '@/components/common/ratingStars'
import { Badge } from '@/components/ui/badge'
import { daysAgoLabel } from '@/lib/format'
import { ROUTES } from '@/lib/routes'
import type { Candidate } from '@/lib/types'

interface PipelineCardProps {
  candidate: Candidate
  dragging?: boolean
}

export function PipelineCard({ candidate, dragging }: PipelineCardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-card p-3 shadow-sm transition-shadow ${
        dragging ? 'shadow-lg ring-1 ring-primary' : 'hover:border-primary/40'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <UserAvatar
          seed={candidate.id}
          initials={candidate.initials}
          className="size-8"
        />
        <div className="min-w-0 flex-1">
          <Link
            to={ROUTES.candidateDetail(candidate.id)}
            onPointerDown={(e) => e.stopPropagation()}
            className="block truncate text-sm font-medium hover:text-primary"
          >
            {candidate.name}
          </Link>
          <p className="truncate text-xs text-muted-foreground">
            {candidate.currentTitle}
          </p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <RatingStars value={candidate.rating} size={12} />
        <span className="text-[11px] text-muted-foreground">
          {daysAgoLabel(candidate.appliedDaysAgo)}
        </span>
      </div>
      {candidate.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {candidate.tags.map((t) => (
            <Badge key={t} variant="secondary" className="text-[10px]">
              {t}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
