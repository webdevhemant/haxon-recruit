import { Link, useNavigate, useParams } from 'react-router-dom'
import { Archive, ArrowLeft, Mail, MapPin } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserAvatar } from '@/components/common/userAvatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RatingStars } from '@/components/common/ratingStars'
import { EmptyState } from '@/components/common/emptyState'
import { daysAgoLabel } from '@/lib/format'
import { DEFAULT_PIPELINE } from '@/lib/data/constants'
import { ROUTES } from '@/lib/routes'
import { usePermissions } from '@/hooks/usePermissions'
import { useDataStore } from '@/stores/useDataStore'
import { StatusBadge } from '@/components/common/statusBadge'
import {
  findCandidate,
  findJob,
  interviewsForCandidate,
  scorecardsForCandidate,
} from '@/stores/selectors'
import { CandidateTimeline } from '../components/candidateTimeline'
import { CandidateScorecards } from '../components/candidateScorecards'

function DetailRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{children}</span>
    </div>
  )
}

export function CandidateProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { candidates, jobs, interviews, scorecards } = useDataStore()
  const moveCandidate = useDataStore((s) => s.moveCandidate)
  const rateCandidate = useDataStore((s) => s.rateCandidate)
  const archiveCandidate = useDataStore((s) => s.archiveCandidate)
  const { can } = usePermissions()
  const canManage = can('candidates.manage')

  const candidate = findCandidate(candidates, id)

  if (!candidate) {
    return (
      <EmptyState
        title="Candidate not found"
        action={
          <Button asChild variant="outline">
            <Link to={ROUTES.candidates}>Back to candidates</Link>
          </Button>
        }
      />
    )
  }

  const job = findJob(jobs, candidate.jobId)
  const ivs = interviewsForCandidate(interviews, candidate.id)
  const cards = scorecardsForCandidate(scorecards, candidate.id)

  return (
    <div>
      <Link
        to={ROUTES.candidates}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All candidates
      </Link>

      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar
              seed={candidate.id}
              initials={candidate.initials}
              className="size-14"
            />
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight">
                {candidate.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {candidate.currentTitle}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {candidate.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="size-3.5" />
                  {candidate.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <RatingStars
              value={candidate.rating}
              size={18}
              onChange={
                canManage
                  ? (r) => {
                      rateCandidate(candidate.id, r)
                      toast.success(`Rated ${r}/5`)
                    }
                  : undefined
              }
            />
            {canManage ? (
              <div className="flex items-center gap-2">
                <Select
                  value={candidate.stageId}
                  onValueChange={(v) => {
                    moveCandidate(candidate.id, v)
                    toast.success('Candidate moved')
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEFAULT_PIPELINE.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Archive"
                  onClick={() => {
                    archiveCandidate(candidate.id)
                    toast.success(`${candidate.name} archived`)
                    navigate(ROUTES.candidates)
                  }}
                >
                  <Archive className="size-4" />
                </Button>
              </div>
            ) : (
              <StatusBadge kind="stage" value={candidate.stageId} />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <Tabs defaultValue="timeline">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="scorecards">
              Scorecards ({cards.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="timeline">
            <Card>
              <CardContent className="p-6">
                <CandidateTimeline
                  candidate={candidate}
                  interviews={ivs}
                  scorecards={cards}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="scorecards">
            <CandidateScorecards scorecards={cards} />
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <DetailRow label="Applied for">
                {job ? (
                  <Link
                    to={ROUTES.jobDetail(job.id)}
                    className="text-primary hover:underline"
                  >
                    {job.title}
                  </Link>
                ) : (
                  '—'
                )}
              </DetailRow>
              <DetailRow label="Source">{candidate.source}</DetailRow>
              <DetailRow label="Applied">
                {daysAgoLabel(candidate.appliedDaysAgo)}
              </DetailRow>
              {candidate.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {candidate.tags.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
