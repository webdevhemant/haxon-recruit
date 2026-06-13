import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, GripVertical } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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
import { formatSalaryRange } from '@/lib/format'
import { DEFAULT_PIPELINE, DEPARTMENTS } from '@/lib/data/constants'
import { RECRUITERS } from '@/lib/data/team'
import { ROUTES } from '@/lib/routes'
import type { Department, EmploymentType, Job, Office } from '@/lib/types'
import { useDataStore } from '@/stores/useDataStore'

const OFFICES: Office[] = ['San Francisco', 'London', 'Austin', 'Remote']
const TYPES: EmploymentType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
]
const ATTRIBUTES = [
  'Technical depth',
  'Problem solving',
  'Communication',
  'Culture add',
  'Ownership',
  'Collaboration',
]
const STEPS = ['Basics', 'Details', 'Pipeline', 'Scorecards', 'Review']

export function CreateJobPage() {
  const navigate = useNavigate()
  const addJob = useDataStore((s) => s.addJob)
  const [step, setStep] = useState(0)

  const [title, setTitle] = useState('')
  const [department, setDepartment] = useState<Department>('Engineering')
  const [office, setOffice] = useState<Office>('San Francisco')
  const [type, setType] = useState<EmploymentType>('Full-time')
  const [remote, setRemote] = useState(true)
  const [headcount, setHeadcount] = useState('1')
  const [salaryMin, setSalaryMin] = useState('120000')
  const [salaryMax, setSalaryMax] = useState('160000')
  const [description, setDescription] = useState('')
  const [attributes, setAttributes] = useState<string[]>(ATTRIBUTES.slice(0, 4))

  const canNext = step === 0 ? title.trim().length > 0 : true

  const toggleAttr = (a: string) =>
    setAttributes((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    )

  const publish = (status: Job['status']) => {
    const id = `j${Date.now()}`
    const job: Job = {
      id,
      title: title.trim(),
      slug: `${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}-${id}`,
      department,
      office,
      type,
      status,
      remote,
      headcount: Number(headcount) || 1,
      salaryMin: Number(salaryMin) || 0,
      salaryMax: Number(salaryMax) || 0,
      hiringManagerId: 'u2',
      recruiterId: RECRUITERS[0].id,
      stages: DEFAULT_PIPELINE,
      description:
        description.trim() ||
        `We're hiring a ${title} to join our ${department} team.`,
      postedDaysAgo: status === 'open' ? 0 : 0,
      applicantCount: 0,
    }
    addJob(job)
    toast.success(
      status === 'open' ? `Published “${job.title}”` : 'Saved as draft',
    )
    navigate(ROUTES.jobDetail(id))
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to={ROUTES.jobs}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All jobs
      </Link>

      <h1 className="font-display text-2xl font-bold tracking-tight">
        Create a job
      </h1>

      {/* stepper */}
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
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="title">Job title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Department">
                  <Select
                    value={department}
                    onValueChange={(v) => setDepartment(v as Department)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Office">
                  <Select
                    value={office}
                    onValueChange={(v) => setOffice(v as Office)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OFFICES.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Type">
                  <Select
                    value={type}
                    onValueChange={(v) => setType(v as EmploymentType)}
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
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Headcount">
                  <Input
                    type="number"
                    min={1}
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                  />
                </Field>
                <Field label="Salary min ($)">
                  <Input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                  />
                </Field>
                <Field label="Salary max ($)">
                  <Input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                  />
                </Field>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">Remote friendly</p>
                  <p className="text-xs text-muted-foreground">
                    Allow candidates to work remotely.
                  </p>
                </div>
                <Switch checked={remote} onCheckedChange={setRemote} />
              </div>
              <Field label="Job description">
                <Textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the role, responsibilities and requirements…"
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="mb-3 text-sm text-muted-foreground">
                Candidates will move through these stages. Drag to reorder
                (using the default pipeline).
              </p>
              <div className="flex flex-col gap-2">
                {DEFAULT_PIPELINE.map((s, i) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <GripVertical className="size-4 text-muted-foreground" />
                    <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className="ml-auto text-xs capitalize text-muted-foreground">
                      {s.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="mb-3 text-sm text-muted-foreground">
                Choose the attributes interviewers will score.
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ATTRIBUTES.map((a) => (
                  <label
                    key={a}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <Checkbox
                      checked={attributes.includes(a)}
                      onCheckedChange={() => toggleAttr(a)}
                    />
                    <span className="text-sm">{a}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-3 text-sm">
              <Review label="Title" value={title || '—'} />
              <Review
                label="Team"
                value={`${department} · ${office}${remote ? ' · Remote' : ''} · ${type}`}
              />
              <Review label="Headcount" value={headcount} />
              <Review
                label="Salary"
                value={formatSalaryRange(Number(salaryMin), Number(salaryMax))}
              />
              <Review
                label="Pipeline"
                value={`${DEFAULT_PIPELINE.length} stages`}
              />
              <Review
                label="Scorecard"
                value={`${attributes.length} attributes`}
              />
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
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => publish('draft')}>
              Save as draft
            </Button>
            <Button onClick={() => publish('open')}>Publish job</Button>
          </div>
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
