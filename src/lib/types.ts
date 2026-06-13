export type Department =
  | 'Engineering'
  | 'Product'
  | 'Design'
  | 'Sales'
  | 'Marketing'
  | 'Operations'
  | 'People'

export type Office = 'San Francisco' | 'London' | 'Austin' | 'Remote'

export type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Internship'

export type JobStatus = 'draft' | 'open' | 'paused' | 'closed'

export type CandidateSource =
  | 'LinkedIn'
  | 'Referral'
  | 'Careers site'
  | 'Indeed'
  | 'Agency'

export type TeamRole = 'Admin' | 'Recruiter' | 'Interviewer' | 'Viewer'

export type InterviewType =
  | 'Phone screen'
  | 'Technical'
  | 'System design'
  | 'Values'
  | 'Panel'
  | 'Executive'

export type InterviewStatus =
  | 'confirmed'
  | 'pending'
  | 'completed'
  | 'cancelled'

export type Recommendation = 'strong_yes' | 'yes' | 'no' | 'strong_no'

export type OfferStatus =
  | 'pending'
  | 'sent'
  | 'accepted'
  | 'declined'
  | 'expired'

export interface PipelineStage {
  id: string
  name: string
  type: 'screening' | 'interview' | 'offer' | 'hired'
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: TeamRole
  department: Department
  initials: string
  lastActiveDays: number
}

export interface Job {
  id: string
  title: string
  slug: string
  department: Department
  office: Office
  type: EmploymentType
  status: JobStatus
  remote: boolean
  headcount: number
  salaryMin: number
  salaryMax: number
  hiringManagerId: string
  recruiterId: string
  stages: PipelineStage[]
  description: string
  postedDaysAgo: number
  applicantCount: number
}

export interface Candidate {
  id: string
  name: string
  email: string
  initials: string
  jobId: string
  stageId: string
  source: CandidateSource
  rating: number // 0-5
  tags: string[]
  location: string
  currentTitle: string
  appliedDaysAgo: number
  archived: boolean
}

export interface Interview {
  id: string
  candidateId: string
  jobId: string
  type: InterviewType
  status: InterviewStatus
  /** ISO date-time string. */
  scheduledAt: string
  durationMins: number
  interviewerIds: string[]
}

export interface ScorecardAttribute {
  label: string
  score: number // 1-5
}

export interface Scorecard {
  id: string
  candidateId: string
  interviewId: string
  interviewerId: string
  recommendation: Recommendation
  attributes: ScorecardAttribute[]
  comment: string
  submittedDaysAgo: number
}

export interface Offer {
  id: string
  candidateId: string
  jobId: string
  status: OfferStatus
  baseSalary: number
  bonusPct: number
  equityPct: number
  startDate: string
  expiresInDays: number
}

export interface Company {
  name: string
  industry: string
  sizeRange: string
  hq: string
  offices: Office[]
  departments: Department[]
  website: string
  mission: string
}
