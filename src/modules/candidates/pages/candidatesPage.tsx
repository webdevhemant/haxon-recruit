import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpDown, Download, Archive } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { UserAvatar } from '@/components/common/userAvatar'
import { Card } from '@/components/ui/card'
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
import { PageHeader } from '@/components/common/pageHeader'
import { Pagination } from '@/components/common/pagination'
import { SearchInput } from '@/components/common/searchInput'
import { RatingStars } from '@/components/common/ratingStars'
import { StatusBadge } from '@/components/common/statusBadge'
import { EmptyState } from '@/components/common/emptyState'
import { daysAgoLabel } from '@/lib/format'
import { DEFAULT_PIPELINE, SOURCES } from '@/lib/data/constants'
import { ROUTES } from '@/lib/routes'
import type { Candidate } from '@/lib/types'
import { useDataStore } from '@/stores/useDataStore'
import { findJob, stageName } from '@/stores/selectors'

type SortKey = 'name' | 'rating' | 'applied'

export function CandidatesPage() {
  const navigate = useNavigate()
  const { candidates, jobs } = useDataStore()
  const archiveCandidate = useDataStore((s) => s.archiveCandidate)

  const [search, setSearch] = useState('')
  const [stage, setStage] = useState('all')
  const [source, setSource] = useState('all')
  const [sort, setSort] = useState<SortKey>('applied')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const pageSize = 12

  const rows = useMemo(() => {
    let list = candidates.filter((c) => !c.archived)
    if (stage !== 'all') list = list.filter((c) => c.stageId === stage)
    if (source !== 'all') list = list.filter((c) => c.source === source)
    if (search)
      list = list.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      )
    return [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'rating') return b.rating - a.rating
      return a.appliedDaysAgo - b.appliedDaysAgo
    })
  }, [candidates, stage, source, search, sort])

  useEffect(() => setPage(1), [stage, source, search, sort])

  const paged = rows.slice((page - 1) * pageSize, page * pageSize)

  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id))
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)))
  const toggleOne = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const exportCsv = (list: Candidate[]) => {
    const header = ['Name', 'Title', 'Job', 'Stage', 'Source', 'Rating']
    const lines = list.map((c) =>
      [
        c.name,
        c.currentTitle,
        findJob(jobs, c.jobId)?.title ?? '',
        stageName(c.stageId),
        c.source,
        c.rating,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    )
    const blob = new Blob([[header.join(','), ...lines].join('\n')], {
      type: 'text/csv',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'candidates.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const bulkArchive = () => {
    selected.forEach((id) => archiveCandidate(id))
    setSelected(new Set())
  }

  return (
    <div>
      <PageHeader
        title="Candidates"
        description={`${candidates.filter((c) => !c.archived).length} active candidates`}
        actions={
          <Button variant="outline" onClick={() => exportCsv(rows)}>
            <Download className="size-4" />
            Export CSV
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search candidates…"
          className="sm:max-w-xs"
        />
        <Select value={stage} onValueChange={setStage}>
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {DEFAULT_PIPELINE.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={source} onValueChange={setSource}>
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {SOURCES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selected.size > 0 && (
        <div className="mb-3 flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm">
          <span className="font-medium">{selected.size} selected</span>
          <Button size="sm" variant="ghost" onClick={bulkArchive}>
            <Archive className="size-4" />
            Archive
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => exportCsv(rows.filter((r) => selected.has(r.id)))}
          >
            <Download className="size-4" />
            Export
          </Button>
        </div>
      )}

      {rows.length === 0 ? (
        <EmptyState
          title="No candidates found"
          description="Adjust your filters or search."
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => setSort('name')}
                  >
                    Candidate <ArrowUpDown className="size-3" />
                  </button>
                </TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => setSort('rating')}
                  >
                    Rating <ArrowUpDown className="size-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => setSort('applied')}
                  >
                    Applied <ArrowUpDown className="size-3" />
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((c) => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer"
                  data-state={selected.has(c.id) ? 'selected' : undefined}
                  onClick={() => navigate(ROUTES.candidateDetail(c.id))}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selected.has(c.id)}
                      onCheckedChange={() => toggleOne(c.id)}
                      aria-label={`Select ${c.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <UserAvatar
                        seed={c.id}
                        initials={c.initials}
                        className="size-8"
                      />
                      <div>
                        <p className="font-medium leading-tight">{c.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.currentTitle}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {findJob(jobs, c.jobId)?.title ?? '—'}
                  </TableCell>
                  <TableCell>
                    <StatusBadge kind="stage" value={c.stageId} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.source}
                  </TableCell>
                  <TableCell>
                    <RatingStars value={c.rating} size={13} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {daysAgoLabel(c.appliedDaysAgo)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            page={page}
            pageSize={pageSize}
            total={rows.length}
            onPageChange={setPage}
          />
        </Card>
      )}
    </div>
  )
}
