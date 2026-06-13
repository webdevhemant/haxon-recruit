import type {
  Candidate,
  Interview,
  Job,
  PipelineStage,
  Scorecard,
  TeamMember,
} from '@/lib/types'
import { TEAM } from '@/lib/data/team'

export const teamMember = (id: string): TeamMember | undefined =>
  TEAM.find((m) => m.id === id)

export const teamName = (id: string): string =>
  teamMember(id)?.name ?? 'Unknown'

export const findJob = (jobs: Job[], id?: string) =>
  jobs.find((j) => j.id === id)

export const findJobBySlug = (jobs: Job[], slug?: string) =>
  jobs.find((j) => j.slug === slug)

export const findCandidate = (candidates: Candidate[], id?: string) =>
  candidates.find((c) => c.id === id)

export const candidatesForJob = (candidates: Candidate[], jobId: string) =>
  candidates.filter((c) => c.jobId === jobId && !c.archived)

export const stageCounts = (
  candidates: Candidate[],
  stages: PipelineStage[],
): Record<string, number> => {
  const counts: Record<string, number> = {}
  for (const s of stages) counts[s.id] = 0
  for (const c of candidates) {
    if (c.archived) continue
    counts[c.stageId] = (counts[c.stageId] ?? 0) + 1
  }
  return counts
}

export const scorecardsForCandidate = (
  scorecards: Scorecard[],
  candidateId: string,
) => scorecards.filter((s) => s.candidateId === candidateId)

export const interviewsForCandidate = (
  interviews: Interview[],
  candidateId: string,
) => interviews.filter((i) => i.candidateId === candidateId)

export const aggregateScore = (cards: Scorecard[]): number | null => {
  const scores = cards.flatMap((c) => c.attributes.map((a) => a.score))
  if (!scores.length) return null
  return scores.reduce((a, b) => a + b, 0) / scores.length
}

export const upcomingInterviews = (interviews: Interview[]) =>
  interviews
    .filter(
      (i) =>
        (i.status === 'confirmed' || i.status === 'pending') &&
        new Date(i.scheduledAt).getTime() >= Date.now() - 3600_000,
    )
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    )
