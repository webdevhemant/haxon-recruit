import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Video } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { INTERVIEWERS } from '@/lib/data/team'
import { ROUTES } from '@/lib/routes'
import type { InterviewType } from '@/lib/types'
import { useDataStore } from '@/stores/useDataStore'
import { findJob } from '@/stores/selectors'

const TYPES: InterviewType[] = [
  'Phone screen',
  'Technical',
  'System design',
  'Values',
  'Panel',
  'Executive',
]
const SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

export function ScheduleInterviewPage() {
  const navigate = useNavigate()
  const { candidates, jobs } = useDataStore()
  const addInterview = useDataStore((s) => s.addInterview)

  const active = candidates.filter((c) => !c.archived && c.stageId !== 'hired')

  const [candidateId, setCandidateId] = useState('')
  const [type, setType] = useState<InterviewType>('Technical')
  const [interviewerIds, setInterviewerIds] = useState<string[]>([])
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('10:00')

  const candidate = candidates.find((c) => c.id === candidateId)
  const job = candidate && findJob(jobs, candidate.jobId)

  const toggleInterviewer = (id: string) =>
    setInterviewerIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  const canSchedule = candidateId && date && slot && interviewerIds.length > 0

  const schedule = () => {
    if (!candidate || !canSchedule) return
    const [h, m] = slot.split(':')
    const dt = new Date(date)
    dt.setHours(Number(h), Number(m), 0, 0)
    addInterview({
      id: `iv${Date.now()}`,
      candidateId: candidate.id,
      jobId: candidate.jobId,
      type,
      status: 'confirmed',
      scheduledAt: dt.toISOString(),
      durationMins: 60,
      interviewerIds,
    })
    navigate(ROUTES.interviews)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to={ROUTES.interviews}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All interviews
      </Link>

      <h1 className="mb-6 font-display text-2xl font-bold tracking-tight">
        Schedule interview
      </h1>

      <Card>
        <CardContent className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-1.5">
            <Label>Candidate</Label>
            <Select value={candidateId} onValueChange={setCandidateId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a candidate" />
              </SelectTrigger>
              <SelectContent>
                {active.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} — {c.currentTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {job && (
              <p className="text-xs text-muted-foreground">
                Applying for {job.title}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Interview type</Label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as InterviewType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Interviewers</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {INTERVIEWERS.map((m) => (
                <label
                  key={m.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-2.5"
                >
                  <Checkbox
                    checked={interviewerIds.includes(m.id)}
                    onCheckedChange={() => toggleInterviewer(m.id)}
                  />
                  <span className="text-sm">{m.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {m.department}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Time</Label>
              <div className="flex flex-wrap gap-1.5">
                {SLOTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={cn(
                      'rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors',
                      slot === s
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:bg-secondary',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2.5 text-sm text-muted-foreground">
            <Video className="size-4" />A video link will be generated and
            emailed to all participants.
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" asChild>
          <Link to={ROUTES.interviews}>Cancel</Link>
        </Button>
        <Button onClick={schedule} disabled={!canSchedule}>
          Send invite
        </Button>
      </div>
    </div>
  )
}
