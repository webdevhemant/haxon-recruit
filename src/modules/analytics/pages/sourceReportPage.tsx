import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RatingStars } from '@/components/common/ratingStars'
import { PageHeader } from '@/components/common/pageHeader'
import { formatCurrency } from '@/lib/format'
import { TabFade } from '@/components/common/tabFade'
import { AnalyticsTabs } from '../components/analyticsTabs'
import { SOURCE_STATS } from '../data'

const COLORS = ['#7b6cff', '#3bd6ff', '#b7ff3b', '#fbbf24', '#f472b6']

function TipBox({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-md">
      <p className="font-medium">{label}</p>
      <p className="text-muted-foreground">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  )
}

export function SourceReportPage() {
  return (
    <div>
      <PageHeader
        title="Source report"
        description="Channel effectiveness, cost per hire and quality."
      />
      <AnalyticsTabs />

      <TabFade>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Cost per hire by source</CardTitle>
            <CardDescription>Lower is better</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SOURCE_STATS} margin={{ left: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="source"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  content={<TipBox />}
                  cursor={{ fill: 'hsl(var(--secondary))' }}
                />
                <Bar dataKey="costPerHire" radius={[4, 4, 0, 0]}>
                  {SOURCE_STATS.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Candidates</TableHead>
                <TableHead className="text-right">Hires</TableHead>
                <TableHead className="text-right">Cost / hire</TableHead>
                <TableHead className="text-right">Conversion</TableHead>
                <TableHead>Quality</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SOURCE_STATS.map((s) => (
                <TableRow key={s.source}>
                  <TableCell className="font-medium">{s.source}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {s.candidates}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {s.hires}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(s.costPerHire)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {((s.hires / s.candidates) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <RatingStars value={s.quality} size={13} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </TabFade>
    </div>
  )
}
