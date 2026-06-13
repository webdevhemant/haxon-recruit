import { COMPANY, DEFAULT_PIPELINE, DEPARTMENTS, SOURCES } from './constants'
import { TEAM } from './team'
import { JOBS } from './jobs'
import { GENERATED } from './generate'

export const SEED = {
  company: COMPANY,
  departments: DEPARTMENTS,
  sources: SOURCES,
  pipeline: DEFAULT_PIPELINE,
  team: TEAM,
  jobs: JOBS,
  candidates: GENERATED.candidates,
  interviews: GENERATED.interviews,
  scorecards: GENERATED.scorecards,
  offers: GENERATED.offers,
}

export type Seed = typeof SEED
