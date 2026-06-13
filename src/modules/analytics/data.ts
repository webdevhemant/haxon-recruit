export const FUNNEL = [
  { stage: 'Applied', count: 1240 },
  { stage: 'Screened', count: 769 },
  { stage: 'Interviewed', count: 384 },
  { stage: 'Offer', count: 198 },
  { stage: 'Hired', count: 155 },
]

export const HIRES_BY_DEPT = [
  { dept: 'Engineering', hires: 42 },
  { dept: 'Sales', hires: 31 },
  { dept: 'Product', hires: 14 },
  { dept: 'Design', hires: 11 },
  { dept: 'Marketing', hires: 18 },
  { dept: 'Operations', hires: 23 },
  { dept: 'People', hires: 9 },
]

export const TIME_TO_HIRE_TREND = [
  { month: 'Jan', days: 29 },
  { month: 'Feb', days: 27 },
  { month: 'Mar', days: 26 },
  { month: 'Apr', days: 25 },
  { month: 'May', days: 24 },
  { month: 'Jun', days: 23 },
]

export interface SourceStat {
  source: string
  candidates: number
  hires: number
  costPerHire: number
  quality: number
}

export const SOURCE_STATS: SourceStat[] = [
  {
    source: 'LinkedIn',
    candidates: 496,
    hires: 58,
    costPerHire: 4200,
    quality: 4.3,
  },
  {
    source: 'Referral',
    candidates: 310,
    hires: 51,
    costPerHire: 1100,
    quality: 4.7,
  },
  {
    source: 'Careers site',
    candidates: 248,
    hires: 28,
    costPerHire: 600,
    quality: 4.0,
  },
  {
    source: 'Indeed',
    candidates: 124,
    hires: 12,
    costPerHire: 3100,
    quality: 3.6,
  },
  {
    source: 'Agency',
    candidates: 62,
    hires: 6,
    costPerHire: 9800,
    quality: 3.9,
  },
]

export interface DeiRow {
  stage: string
  women: number
  men: number
  nonBinary: number
}

export const DEI_GENDER: DeiRow[] = [
  { stage: 'Applied', women: 41, men: 56, nonBinary: 3 },
  { stage: 'Screened', women: 43, men: 54, nonBinary: 3 },
  { stage: 'Interviewed', women: 45, men: 52, nonBinary: 3 },
  { stage: 'Offer', women: 47, men: 50, nonBinary: 3 },
  { stage: 'Hired', women: 46, men: 51, nonBinary: 3 },
]

export const DEI_ETHNICITY = [
  { group: 'Asian', value: 28 },
  { group: 'Black', value: 14 },
  { group: 'Hispanic', value: 17 },
  { group: 'White', value: 33 },
  { group: 'Other', value: 8 },
]

export const DATE_RANGES = [
  'Last 30 days',
  'Last 90 days',
  'Last 6 months',
  'Year to date',
]
