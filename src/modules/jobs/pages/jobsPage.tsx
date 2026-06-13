import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutGrid, Plus, Table2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/common/pageHeader'
import { Pagination } from '@/components/common/pagination'
import { SearchInput } from '@/components/common/searchInput'
import { StatusBadge } from '@/components/common/statusBadge'
import { EmptyState } from '@/components/common/emptyState'
import { cn } from '@/lib/utils'
import { formatSalaryRange } from '@/lib/format'
import { DEPARTMENTS } from '@/lib/data/constants'
import { ROUTES } from '@/lib/routes'
import { useDataStore } from '@/stores/useDataStore'
import { candidatesForJob } from '@/stores/selectors'
import { JobCard } from '../components/jobCard'

type View = 'table' | 'grid'

export function JobsPage() {
  const { jobs, candidates } = useDataStore()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [department, setDepartment] = useState('all')
  const [view, setView] = useState<View>('table')

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const j of jobs) map[j.id] = candidatesForJob(candidates, j.id).length
    return map
  }, [jobs, candidates])

  const [page, setPage] = useState(1)
  const pageSize = 10

  const filtered = jobs.filter((j) => {
    if (status !== 'all' && j.status !== status) return false
    if (department !== 'all' && j.department !== department) return false
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()))
      return false
    return true
  })

  useEffect(() => setPage(1), [search, status, department, view])

  const pagedTable = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div>
      <PageHeader
        title="Jobs"
        description={`${jobs.filter((j) => j.status === 'open').length} open roles · ${jobs.length} total`}
        actions={
          <Button asChild>
            <Link to={ROUTES.jobNew}>
              <Plus className="size-4" />
              New job
            </Link>
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search jobs…"
          className="sm:max-w-xs"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
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
        <div className="ml-auto hidden items-center gap-1 rounded-md border border-border p-0.5 sm:flex">
          <button
            onClick={() => setView('table')}
            className={cn(
              'flex size-7 items-center justify-center rounded',
              view === 'table'
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground',
            )}
            aria-label="Table view"
          >
            <Table2 className="size-4" />
          </button>
          <button
            onClick={() => setView('grid')}
            className={cn(
              'flex size-7 items-center justify-center rounded',
              view === 'grid'
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground',
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="size-4" />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No jobs match your filters"
          description="Try adjusting search, status or department."
        />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} candidateCount={counts[job.id]} />
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Pipeline</TableHead>
                <TableHead className="text-right">Applicants</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedTable.map((job) => (
                <TableRow
                  key={job.id}
                  className="cursor-pointer"
                  onClick={() => navigate(ROUTES.jobDetail(job.id))}
                >
                  <TableCell>
                    <Link
                      to={ROUTES.jobDetail(job.id)}
                      className="font-medium hover:text-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {job.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {job.department}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {job.office}
                    {job.remote ? ' · Remote' : ''}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {counts[job.id]}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {job.applicantCount}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatSalaryRange(job.salaryMin, job.salaryMax)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge kind="job" value={job.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
          />
        </Card>
      )}
    </div>
  )
}
