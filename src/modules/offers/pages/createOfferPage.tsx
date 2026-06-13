import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Clock } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { WizardStep } from '@/components/common/wizardStep'
import { formatCurrency, formatDate } from '@/lib/format'
import { ROUTES } from '@/lib/routes'
import { useDataStore } from '@/stores/useDataStore'
import { findJob } from '@/stores/selectors'

const STEPS = ['Compensation', 'Approvals', 'Preview']
const APPROVERS = [
  { name: 'Hiring Manager', status: 'approved' },
  { name: 'Finance', status: 'approved' },
  { name: 'VP People', status: 'pending' },
]

export function CreateOfferPage() {
  const navigate = useNavigate()
  const { candidates, jobs } = useDataStore()
  const addOffer = useDataStore((s) => s.addOffer)

  const eligible = candidates.filter(
    (c) => !c.archived && (c.stageId === 'offer' || c.stageId === 'onsite'),
  )

  const [step, setStep] = useState(0)
  const [candidateId, setCandidateId] = useState('')
  const [base, setBase] = useState('150000')
  const [bonus, setBonus] = useState('10')
  const [equity, setEquity] = useState('0.1')
  const [startDate, setStartDate] = useState<Date | undefined>()

  const candidate = candidates.find((c) => c.id === candidateId)
  const job = candidate && findJob(jobs, candidate.jobId)

  const publish = () => {
    if (!candidate) return
    const id = `of${Date.now()}`
    toast.success(`Offer sent to ${candidate.name}`)
    addOffer({
      id,
      candidateId: candidate.id,
      jobId: candidate.jobId,
      status: 'sent',
      baseSalary: Number(base) || 0,
      bonusPct: Number(bonus) || 0,
      equityPct: Number(equity) || 0,
      startDate: startDate
        ? startDate.toISOString()
        : new Date(Date.now() + 30 * 86400000).toISOString(),
      expiresInDays: 7,
    })
    navigate(ROUTES.offers)
  }

  const canContinue = step === 0 ? Boolean(candidateId) : true

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to={ROUTES.offers}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All offers
      </Link>

      <h1 className="font-display text-2xl font-bold tracking-tight">
        Create an offer
      </h1>

      <div className="my-6 flex items-center">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex size-7 items-center justify-center rounded-full text-xs font-semibold',
                  i < step && 'bg-primary text-primary-foreground',
                  i === step &&
                    'bg-primary/15 text-primary ring-2 ring-primary',
                  i > step && 'bg-secondary text-muted-foreground',
                )}
              >
                {i < step ? <Check className="size-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  'hidden text-sm sm:block',
                  i === step ? 'font-medium' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-2 h-px flex-1 bg-border" />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="overflow-hidden p-6">
          <WizardStep stepKey={step}>
            {step === 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label>Candidate</Label>
                  <Select value={candidateId} onValueChange={setCandidateId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {eligible.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name} — {c.currentTitle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="base">Base salary ($)</Label>
                    <Input
                      id="base"
                      type="number"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="bonus">Bonus (%)</Label>
                    <Input
                      id="bonus"
                      type="number"
                      value={bonus}
                      onChange={(e) => setBonus(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="equity">Equity (%)</Label>
                    <Input
                      id="equity"
                      type="number"
                      step="0.01"
                      value={equity}
                      onChange={(e) => setEquity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Start date</Label>
                  <DatePicker
                    value={startDate}
                    onChange={setStartDate}
                    disabled={(d) =>
                      d < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  This offer requires the following approvals before it can be
                  sent.
                </p>
                {APPROVERS.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <span className="text-sm font-medium">{a.name}</span>
                    {a.status === 'approved' ? (
                      <span className="flex items-center gap-1.5 text-xs text-success">
                        <CheckCircle2 className="size-4" /> Approved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-warning">
                        <Clock className="size-4" /> Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="rounded-xl border border-border p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Offer letter
                </p>
                <h2 className="mt-2 font-display text-lg font-bold">
                  {candidate?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {job?.title} · {job?.department}
                </p>
                <div className="mt-5 flex flex-col gap-2 text-sm">
                  <Row
                    label="Base salary"
                    value={formatCurrency(Number(base))}
                  />
                  <Row label="Annual bonus" value={`${bonus}%`} />
                  <Row label="Equity" value={`${equity}%`} />
                  <Row
                    label="Start date"
                    value={
                      startDate
                        ? formatDate(startDate.toISOString())
                        : 'To be confirmed'
                    }
                  />
                </div>
              </div>
            )}
          </WizardStep>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button onClick={publish}>Sign &amp; send offer</Button>
        )}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
