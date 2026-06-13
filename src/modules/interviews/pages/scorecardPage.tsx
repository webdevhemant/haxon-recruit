import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { EmptyState } from '@/components/common/emptyState'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/format'
import { ROUTES } from '@/lib/routes'
import type { Recommendation, ScorecardAttribute } from '@/lib/types'
import { useDataStore } from '@/stores/useDataStore'
import {
  findCandidate,
  findJob,
  scorecardsForCandidate,
} from '@/stores/selectors'
import { CandidateScorecards } from '@/modules/candidates/components/candidateScorecards'

const ATTRIBUTES = [
  'Technical depth',
  'Problem solving',
  'Communication',
  'Culture add',
]

const RECS: { value: Recommendation; label: string; active: string }[] = [
  {
    value: 'strong_yes',
    label: 'Strong Yes',
    active: 'bg-success text-success-foreground',
  },
  {
    value: 'yes',
    label: 'Yes',
    active: 'bg-success/70 text-success-foreground',
  },
  {
    value: 'no',
    label: 'No',
    active: 'bg-destructive/70 text-destructive-foreground',
  },
  {
    value: 'strong_no',
    label: 'Strong No',
    active: 'bg-destructive text-destructive-foreground',
  },
]

export function ScorecardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { interviews, candidates, jobs } = useDataStore()
  const addScorecard = useDataStore((s) => s.addScorecard)

  const allScorecards = useDataStore((s) => s.scorecards)
  const interview = interviews.find((i) => i.id === id)
  const candidate =
    interview && findCandidate(candidates, interview.candidateId)
  const job = interview && findJob(jobs, interview.jobId)
  const existing = candidate
    ? scorecardsForCandidate(allScorecards, candidate.id)
    : []

  const [scores, setScores] = useState<Record<string, number>>({})
  const [rec, setRec] = useState<Recommendation | null>(null)
  const [comment, setComment] = useState('')

  if (!interview || !candidate) {
    return (
      <EmptyState
        title="Interview not found"
        action={
          <Button asChild variant="outline">
            <Link to={ROUTES.interviews}>Back to interviews</Link>
          </Button>
        }
      />
    )
  }

  const submit = () => {
    if (!rec) return
    const attributes: ScorecardAttribute[] = ATTRIBUTES.map((label) => ({
      label,
      score: scores[label] ?? 3,
    }))
    addScorecard({
      id: `sc${Date.now()}`,
      candidateId: candidate.id,
      interviewId: interview.id,
      interviewerId: interview.interviewerIds[0],
      recommendation: rec,
      attributes,
      comment: comment.trim() || 'No additional comments.',
      submittedDaysAgo: 0,
    })
    toast.success('Scorecard submitted')
    navigate(ROUTES.candidateDetail(candidate.id))
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to={ROUTES.candidateDetail(candidate.id)}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to candidate
      </Link>

      <Card className="mb-6">
        <CardContent className="flex items-center gap-4 p-5">
          <Avatar className="size-12">
            <AvatarFallback>{candidate.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-display text-lg font-bold">{candidate.name}</h1>
            <p className="text-sm text-muted-foreground">
              {interview.type} · {job?.title} ·{' '}
              {formatDate(interview.scheduledAt)}
            </p>
          </div>
        </CardContent>
      </Card>

      {existing.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
            Feedback from others ({existing.length})
          </h2>
          <CandidateScorecards scorecards={existing} />
        </div>
      )}

      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
        Your scorecard
      </h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attribute ratings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {ATTRIBUTES.map((attr) => (
            <div key={attr} className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium">{attr}</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() =>
                      setScores((prev) => ({ ...prev, [attr]: n }))
                    }
                    className={cn(
                      'flex size-8 items-center justify-center rounded-md border text-sm font-medium transition-colors',
                      scores[attr] === n
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:bg-secondary',
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Overall recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {RECS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRec(r.value)}
                className={cn(
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors',
                  rec === r.value
                    ? r.active + ' border-transparent'
                    : 'border-border hover:bg-secondary',
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Private notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="notes" className="sr-only">
            Notes
          </Label>
          <Textarea
            id="notes"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your reasoning, strengths and concerns…"
          />
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" asChild>
          <Link to={ROUTES.candidateDetail(candidate.id)}>Cancel</Link>
        </Button>
        <Button onClick={submit} disabled={!rec}>
          Submit scorecard
        </Button>
      </div>
    </div>
  )
}
