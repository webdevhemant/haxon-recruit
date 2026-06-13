import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Candidate, Interview, Job, Offer, Scorecard } from '@/lib/types'
import { SEED } from '@/lib/data/seed'

interface DataState {
  jobs: Job[]
  candidates: Candidate[]
  interviews: Interview[]
  scorecards: Scorecard[]
  offers: Offer[]

  moveCandidate: (candidateId: string, stageId: string) => void
  archiveCandidate: (candidateId: string) => void
  rateCandidate: (candidateId: string, rating: number) => void
  addJob: (job: Job) => void
  addCandidate: (candidate: Candidate) => void
  addScorecard: (scorecard: Scorecard) => void
  addInterview: (interview: Interview) => void
  addOffer: (offer: Offer) => void
  updateOfferStatus: (offerId: string, status: Offer['status']) => void
  resetSeed: () => void
}

const seedSlice = () => ({
  jobs: SEED.jobs,
  candidates: SEED.candidates,
  interviews: SEED.interviews,
  scorecards: SEED.scorecards,
  offers: SEED.offers,
})

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      ...seedSlice(),

      moveCandidate: (candidateId, stageId) =>
        set((s) => ({
          candidates: s.candidates.map((c) =>
            c.id === candidateId ? { ...c, stageId, archived: false } : c,
          ),
        })),

      archiveCandidate: (candidateId) =>
        set((s) => ({
          candidates: s.candidates.map((c) =>
            c.id === candidateId ? { ...c, archived: true } : c,
          ),
        })),

      rateCandidate: (candidateId, rating) =>
        set((s) => ({
          candidates: s.candidates.map((c) =>
            c.id === candidateId ? { ...c, rating } : c,
          ),
        })),

      addJob: (job) => set((s) => ({ jobs: [job, ...s.jobs] })),

      addCandidate: (candidate) =>
        set((s) => ({ candidates: [candidate, ...s.candidates] })),

      addScorecard: (scorecard) =>
        set((s) => ({ scorecards: [scorecard, ...s.scorecards] })),

      addInterview: (interview) =>
        set((s) => ({ interviews: [interview, ...s.interviews] })),

      addOffer: (offer) => set((s) => ({ offers: [offer, ...s.offers] })),

      updateOfferStatus: (offerId, status) =>
        set((s) => ({
          offers: s.offers.map((o) =>
            o.id === offerId ? { ...o, status } : o,
          ),
        })),

      resetSeed: () => set(seedSlice()),
    }),
    {
      name: 'haxon-recruit-data',
      version: 1,
    },
  ),
)
