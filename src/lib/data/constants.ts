import type {
  Company,
  CandidateSource,
  Department,
  PipelineStage,
} from '@/lib/types'

export const COMPANY: Company = {
  name: 'Nexaflow Inc.',
  industry: 'B2B SaaS',
  sizeRange: '150–500 employees',
  hq: 'San Francisco, CA',
  offices: ['San Francisco', 'London', 'Austin', 'Remote'],
  departments: [
    'Engineering',
    'Product',
    'Design',
    'Sales',
    'Marketing',
    'Operations',
    'People',
  ],
  website: 'nexaflow.io',
  mission:
    'We help modern teams automate the busywork so they can focus on work that matters.',
}

export const DEPARTMENTS: Department[] = COMPANY.departments

export const SOURCES: CandidateSource[] = [
  'LinkedIn',
  'Referral',
  'Careers site',
  'Indeed',
  'Agency',
]

export const DEFAULT_PIPELINE: PipelineStage[] = [
  { id: 'applied', name: 'Applied', type: 'screening' },
  { id: 'screening', name: 'Screening', type: 'screening' },
  { id: 'interview', name: 'Interview', type: 'interview' },
  { id: 'onsite', name: 'Onsite', type: 'interview' },
  { id: 'offer', name: 'Offer', type: 'offer' },
  { id: 'hired', name: 'Hired', type: 'hired' },
]

export const DISQUALIFY_REASONS = [
  'Not enough experience',
  'Compensation mismatch',
  'Failed technical bar',
  'Withdrew',
  'Position filled',
  'Better aligned elsewhere',
]
