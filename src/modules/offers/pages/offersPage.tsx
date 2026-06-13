import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Plus, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { StatusBadge } from '@/components/common/statusBadge'
import { EmptyState } from '@/components/common/emptyState'
import { formatCurrency, formatDate } from '@/lib/format'
import { ROUTES } from '@/lib/routes'
import { useDataStore } from '@/stores/useDataStore'
import { findCandidate, findJob } from '@/stores/selectors'

export function OffersPage() {
  const { offers, candidates, jobs } = useDataStore()
  const updateOfferStatus = useDataStore((s) => s.updateOfferStatus)
  const [status, setStatus] = useState('all')

  const filtered = offers.filter((o) => status === 'all' || o.status === status)

  return (
    <div>
      <PageHeader
        title="Offers"
        description={`${offers.filter((o) => o.status === 'pending' || o.status === 'sent').length} awaiting response`}
        actions={
          <Button asChild>
            <Link to={ROUTES.offerNew}>
              <Plus className="size-4" />
              New offer
            </Link>
          </Button>
        }
      />

      <div className="mb-4 flex">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No offers"
          description="Create one to get started."
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Base</TableHead>
                <TableHead className="text-right">Equity</TableHead>
                <TableHead>Start date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((offer) => {
                const candidate = findCandidate(candidates, offer.candidateId)
                const job = findJob(jobs, offer.jobId)
                const actionable =
                  offer.status === 'pending' || offer.status === 'sent'
                return (
                  <TableRow key={offer.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-[10px]">
                            {candidate?.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{candidate?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {job?.title}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(offer.baseSalary)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {offer.equityPct}%
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {formatDate(offer.startDate)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge kind="offer" value={offer.status} />
                      {actionable && offer.expiresInDays > 0 && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {offer.expiresInDays}d left
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {actionable ? (
                        offer.status === 'pending' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateOfferStatus(offer.id, 'sent')}
                          >
                            <Send className="size-3.5" />
                            Send
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() =>
                              updateOfferStatus(offer.id, 'accepted')
                            }
                          >
                            <Check className="size-3.5" />
                            Mark accepted
                          </Button>
                        )
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
