import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SearchInput } from '@/components/common/searchInput'
import { EmptyState } from '@/components/common/emptyState'
import { formatSalaryRange } from '@/lib/format'
import { DEPARTMENTS } from '@/lib/data/constants'
import { ROUTES } from '@/lib/routes'
import { useDataStore } from '@/stores/useDataStore'

const OFFICES = ['San Francisco', 'London', 'Austin', 'Remote']

export function JobBoardPage() {
  const jobs = useDataStore((s) => s.jobs)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('all')
  const [office, setOffice] = useState('all')

  const open = jobs.filter((j) => {
    if (j.status !== 'open') return false
    if (department !== 'all' && j.department !== department) return false
    if (office !== 'all' && j.office !== office) return false
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()))
      return false
    return true
  })

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Open roles
      </h1>
      <p className="mt-2 text-muted-foreground">
        Find your next opportunity at Nexaflow.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search roles…"
          className="sm:max-w-xs"
        />
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={office} onValueChange={setOffice}>
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {OFFICES.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {open.length === 0 ? (
          <EmptyState
            title="No roles match"
            description="Try broadening your filters."
          />
        ) : (
          open.map((job) => (
            <Link key={job.id} to={ROUTES.careersJobDetail(job.slug)}>
              <Card className="flex flex-col gap-3 p-5 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-semibold">{job.title}</h3>
                    <Badge variant="secondary">{job.department}</Badge>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {job.office}
                      {job.remote ? ' · Remote' : ''}
                    </span>
                    <span>{job.type}</span>
                    <span>
                      {formatSalaryRange(job.salaryMin, job.salaryMax)}
                    </span>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-primary">
                  View role
                  <ArrowRight className="size-4" />
                </span>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
