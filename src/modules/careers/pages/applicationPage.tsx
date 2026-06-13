import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, PartyPopper, Upload } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/common/emptyState'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import type { Candidate } from '@/lib/types'
import { useDataStore } from '@/stores/useDataStore'
import { findJobBySlug } from '@/stores/selectors'

const STEPS = ['Personal', 'Experience', 'Documents', 'Review']

export function ApplicationPage() {
  const { slug } = useParams()
  const { jobs } = useDataStore()
  const addCandidate = useDataStore((s) => s.addCandidate)
  const job = findJobBySlug(jobs, slug)

  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [title, setTitle] = useState('')
  const [why, setWhy] = useState('')
  const [fileName, setFileName] = useState('')

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <EmptyState
          title="Role not found"
          action={
            <Button asChild variant="outline">
              <Link to={ROUTES.careersJobs}>Browse roles</Link>
            </Button>
          }
        />
      </div>
    )
  }

  const submit = () => {
    const name = `${first} ${last}`.trim() || 'New Applicant'
    const id = `c${Date.now()}`
    const candidate: Candidate = {
      id,
      name,
      email: email || 'applicant@example.com',
      initials: `${first[0] ?? 'N'}${last[0] ?? 'A'}`.toUpperCase(),
      jobId: job.id,
      stageId: 'applied',
      source: 'Careers site',
      rating: 0,
      tags: [],
      location: location || 'Remote',
      currentTitle: title || 'Applicant',
      appliedDaysAgo: 0,
      archived: false,
    }
    addCandidate(candidate)
    toast.success('Application submitted!')
    setDone(true)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-success/10 text-success">
          <PartyPopper className="size-7" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
          Application submitted!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Thanks for applying to <strong>{job.title}</strong>. Our team reviews
          every application and will be in touch if there's a match.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Button asChild variant="outline">
            <Link to={ROUTES.careersJobs}>Browse more roles</Link>
          </Button>
          <Button asChild>
            <Link to={ROUTES.careers}>Back to careers</Link>
          </Button>
        </div>
      </div>
    )
  }

  const canContinue = step === 0 ? Boolean(first && last && email) : true

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        to={ROUTES.careersJobDetail(job.slug)}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to role
      </Link>

      <h1 className="font-display text-2xl font-bold tracking-tight">
        Apply · {job.title}
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
        <CardContent className="p-6">
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <Input
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                  />
                </Field>
                <Field label="Last name">
                  <Input
                    value={last}
                    onChange={(e) => setLast(e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Email">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                />
              </Field>
              <Field label="Location">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country or Remote"
                />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <Field label="Current title">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Engineer at Acme"
                />
              </Field>
              <Field label="Why do you want to join?">
                <Textarea
                  rows={5}
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                  placeholder="Tell us what excites you about this role…"
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <Field label="Resume / CV">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-10 text-center transition-colors hover:border-primary/50">
                  <Upload className="size-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {fileName || 'Click to upload (PDF, DOCX)'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setFileName(e.target.files?.[0]?.name ?? '')
                    }
                  />
                </label>
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-3 text-sm">
              <Review label="Name" value={`${first} ${last}`.trim() || '—'} />
              <Review label="Email" value={email || '—'} />
              <Review label="Location" value={location || '—'} />
              <Review label="Current title" value={title || '—'} />
              <Review label="Resume" value={fileName || 'Not attached'} />
              <Review label="Applying for" value={job.title} />
            </div>
          )}
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
          <Button onClick={submit}>Submit application</Button>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
