import type {
  Candidate,
  CandidateSource,
  Interview,
  InterviewType,
  Offer,
  OfferStatus,
  Recommendation,
  Scorecard,
} from '@/lib/types'
import { INTERVIEWERS } from './team'
import { JOBS } from './jobs'

/** Deterministic PRNG so generated data is stable across reloads. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rng = mulberry32(20260613)
const rand = (min: number, max: number) =>
  Math.floor(rng() * (max - min + 1)) + min
const pick = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)]
const weighted = <T>(pairs: [T, number][]): T => {
  const total = pairs.reduce((s, [, w]) => s + w, 0)
  let r = rng() * total
  for (const [val, w] of pairs) {
    if ((r -= w) <= 0) return val
  }
  return pairs[0][0]
}

const FIRST = [
  'Noah',
  'Emma',
  'Liam',
  'Olivia',
  'Ethan',
  'Ava',
  'Lucas',
  'Mia',
  'Mason',
  'Sophia',
  'Logan',
  'Isabella',
  'Aiden',
  'Amara',
  'Kai',
  'Zoe',
  'Omar',
  'Layla',
  'Ravi',
  'Nina',
  'Hugo',
  'Freya',
  'Mateo',
  'Yara',
  'Sven',
  'Ingrid',
  'Tariq',
  'Lena',
  'Cyrus',
  'Maya',
  'Dev',
  'Priscilla',
  'Felix',
  'Wren',
  'Idris',
  'Hana',
  'Bruno',
  'Esme',
  'Arjun',
  'Talia',
  'Marco',
  'Soraya',
  'Theo',
  'Anaya',
  'Quinn',
  'Rhea',
  'Caleb',
  'Suki',
  'Niko',
  'Beatriz',
]
const LAST = [
  'Carter',
  'Bennett',
  'Nguyen',
  'Patel',
  'Rivera',
  'Hayes',
  'Cohen',
  'Silva',
  'Okafor',
  'Reyes',
  'Larsen',
  'Haddad',
  'Romano',
  'Walsh',
  'Mbeki',
  'Sato',
  'Khan',
  'Dubois',
  'Fischer',
  'Andersson',
  'Costa',
  'Oduya',
  'Marsh',
  'Ito',
  'Bauer',
  'Flores',
  'Novak',
  'Singh',
  'Brandt',
  'Mercer',
  'Vance',
  'Osei',
  'Kowalski',
  'Rossi',
  'Park',
  'Lindqvist',
  'Abara',
  'Sterling',
  'Voss',
  'Castellano',
]
const TITLES: Record<string, string[]> = {
  Engineering: [
    'Software Engineer',
    'Senior Engineer',
    'Staff Engineer',
    'Engineering Lead',
  ],
  Product: ['Product Manager', 'Senior PM', 'Group PM', 'Product Lead'],
  Design: [
    'Product Designer',
    'Senior Designer',
    'Brand Designer',
    'Design Lead',
  ],
  Sales: ['Account Executive', 'SDR', 'Sales Manager', 'Enterprise AE'],
  Marketing: [
    'Marketing Manager',
    'Growth Marketer',
    'Content Lead',
    'Demand Gen',
  ],
  Operations: ['Operations Analyst', 'Data Analyst', 'BizOps Lead', 'CSM'],
  People: ['Recruiter', 'People Partner', 'Talent Lead', 'HR Generalist'],
}
const LOCATIONS = [
  'San Francisco, CA',
  'Austin, TX',
  'New York, NY',
  'London, UK',
  'Berlin, DE',
  'Remote',
  'Toronto, CA',
  'Lisbon, PT',
  'Seattle, WA',
]
const TAG_POOL = [
  'Top of funnel',
  'Referred',
  'Strong portfolio',
  'Fast mover',
  'Passive',
  'Boomerang',
  'Diversity hire',
  'Internal',
  'Relocating',
  'Urgent',
]
const SOURCE_WEIGHTS: [CandidateSource, number][] = [
  ['LinkedIn', 40],
  ['Referral', 25],
  ['Careers site', 20],
  ['Indeed', 10],
  ['Agency', 5],
]

/** Stage distribution mirrors the product blueprint (120 candidates). */
const STAGE_BUCKETS: { stageId: string; count: number; archived?: boolean }[] =
  [
    { stageId: 'applied', count: 35 },
    { stageId: 'screening', count: 28 },
    { stageId: 'interview', count: 14 },
    { stageId: 'onsite', count: 10 },
    { stageId: 'offer', count: 8 },
    { stageId: 'hired', count: 15 },
    { stageId: 'applied', count: 10, archived: true },
  ]

const openJobs = JOBS.filter((j) => j.status === 'open')
const hiredJobs = JOBS.filter((j) => j.status !== 'draft')

function buildCandidates(): Candidate[] {
  const out: Candidate[] = []
  let n = 0
  for (const bucket of STAGE_BUCKETS) {
    for (let i = 0; i < bucket.count; i++) {
      const first = FIRST[n % FIRST.length]
      const last =
        LAST[Math.floor(n / FIRST.length) + (n % LAST.length)] ?? pick(LAST)
      const name = `${first} ${last}`
      const jobPool = bucket.stageId === 'hired' ? hiredJobs : openJobs
      const job = jobPool[n % jobPool.length]
      const ratingByStage: Record<string, [number, number]> = {
        applied: [0, 3],
        screening: [2, 4],
        interview: [3, 5],
        onsite: [3, 5],
        offer: [4, 5],
        hired: [4, 5],
      }
      const [rmin, rmax] = ratingByStage[bucket.stageId] ?? [0, 3]
      out.push({
        id: `c${n + 1}`,
        name,
        email: `${first}.${last}@example.com`.toLowerCase(),
        initials: `${first[0]}${last[0]}`,
        jobId: job.id,
        stageId: bucket.stageId,
        source: weighted(SOURCE_WEIGHTS),
        rating: bucket.archived ? rand(0, 2) : rand(rmin, rmax),
        tags: rng() > 0.55 ? [pick(TAG_POOL)] : [],
        location: pick(LOCATIONS),
        currentTitle: pick(TITLES[job.department]),
        appliedDaysAgo: rand(1, 60),
        archived: Boolean(bucket.archived),
      })
      n++
    }
  }
  return out
}

const INTERVIEW_TYPES: InterviewType[] = [
  'Phone screen',
  'Technical',
  'System design',
  'Values',
  'Panel',
  'Executive',
]

function isoFromOffset(days: number, hour: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

function buildInterviews(candidates: Candidate[]): Interview[] {
  const out: Interview[] = []
  let n = 0
  for (const c of candidates) {
    if (c.archived) continue
    const stage = c.stageId
    if (!['interview', 'onsite', 'offer', 'hired'].includes(stage)) continue

    const past = stage === 'offer' || stage === 'hired'
    const rounds = stage === 'onsite' ? 2 : 1
    for (let r = 0; r < rounds; r++) {
      const upcoming = stage === 'interview' || (stage === 'onsite' && r === 1)
      const status = upcoming
        ? rng() > 0.3
          ? 'confirmed'
          : 'pending'
        : rng() > 0.88
          ? 'cancelled'
          : 'completed'
      const dayOffset = upcoming ? rand(0, 6) : -rand(2, 40)
      out.push({
        id: `iv${n + 1}`,
        candidateId: c.id,
        jobId: c.jobId,
        type: pick(INTERVIEW_TYPES),
        status: past && status === 'pending' ? 'completed' : status,
        scheduledAt: isoFromOffset(dayOffset, rand(9, 16)),
        durationMins: pick([30, 45, 60]),
        interviewerIds: [
          INTERVIEWERS[n % INTERVIEWERS.length].id,
          ...(rng() > 0.6
            ? [INTERVIEWERS[(n + 1) % INTERVIEWERS.length].id]
            : []),
        ],
      })
      n++
    }
  }
  return out
}

const ATTRIBUTE_SETS = [
  'Technical depth',
  'Problem solving',
  'Communication',
  'Culture add',
  'Ownership',
  'Collaboration',
]
const COMMENTS = [
  'Strong technical signal, walked through trade-offs clearly.',
  'Great communicator but limited depth on system design.',
  'Excellent culture add, would pair well with the team.',
  'Solid problem solver, a little slow on follow-ups.',
  'Impressive ownership stories from a previous startup.',
  'Good fundamentals, needs more exposure to scale.',
  'Clear thinker, asked sharp clarifying questions.',
  'Borderline — strengths in delivery, gaps in strategy.',
]
const RECS: [Recommendation, number][] = [
  ['strong_yes', 25],
  ['yes', 40],
  ['no', 25],
  ['strong_no', 10],
]

function buildScorecards(interviews: Interview[]): Scorecard[] {
  return interviews
    .filter((iv) => iv.status === 'completed')
    .map((iv, i) => {
      const count = rand(4, 6)
      const attributes = ATTRIBUTE_SETS.slice(0, count).map((label) => ({
        label,
        score: rand(2, 5),
      }))
      return {
        id: `sc${i + 1}`,
        candidateId: iv.candidateId,
        interviewId: iv.id,
        interviewerId: iv.interviewerIds[0],
        recommendation: weighted(RECS),
        attributes,
        comment: pick(COMMENTS),
        submittedDaysAgo: rand(1, 35),
      }
    })
}

const OFFER_STATUS_PLAN: OfferStatus[] = [
  'accepted',
  'accepted',
  'accepted',
  'accepted',
  'pending',
  'sent',
  'declined',
  'expired',
]

function buildOffers(candidates: Candidate[]): Offer[] {
  const eligible = candidates.filter(
    (c) => c.stageId === 'offer' || c.stageId === 'hired',
  )
  return OFFER_STATUS_PLAN.map((status, i) => {
    const c = eligible[i % eligible.length]
    const job = JOBS.find((j) => j.id === c.jobId)!
    const base = rand(job.salaryMin, job.salaryMax)
    return {
      id: `of${i + 1}`,
      candidateId: c.id,
      jobId: c.jobId,
      status,
      baseSalary: Math.round(base / 1000) * 1000,
      bonusPct: pick([0, 5, 10, 15]),
      equityPct: Number((rng() * 0.24 + 0.01).toFixed(2)),
      startDate: isoFromOffset(rand(14, 60), 9),
      expiresInDays:
        status === 'pending' || status === 'sent' ? rand(2, 10) : 0,
    }
  })
}

const candidates = buildCandidates()
const interviews = buildInterviews(candidates)
const scorecards = buildScorecards(interviews)
const offers = buildOffers(candidates)

export const GENERATED = { candidates, interviews, scorecards, offers }
