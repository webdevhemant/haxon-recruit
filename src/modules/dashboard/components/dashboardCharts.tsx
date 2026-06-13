import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SOURCES } from '@/lib/data/constants'
import { useDataStore } from '@/stores/useDataStore'

const TREND = [
  { month: 'Jan', hires: 3 },
  { month: 'Feb', hires: 5 },
  { month: 'Mar', hires: 4 },
  { month: 'Apr', hires: 7 },
  { month: 'May', hires: 6 },
  { month: 'Jun', hires: 9 },
]

const SOURCE_COLORS = ['#7b6cff', '#3bd6ff', '#b7ff3b', '#fbbf24', '#f472b6']

function ChartTooltip({
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
      <p className="text-muted-foreground">{payload[0].value}</p>
    </div>
  )
}

export function HiringTrendChart() {
  return (
    <Card className="p-5">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-base">Hiring trend</CardTitle>
        <CardDescription>Hires per month, last 6 months</CardDescription>
      </CardHeader>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={TREND} margin={{ left: -28, right: 8, top: 4 }}>
          <defs>
            <linearGradient id="hiresGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7b6cff" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#7b6cff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="hires"
            stroke="#7b6cff"
            strokeWidth={2}
            fill="url(#hiresGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function SourceBreakdownChart() {
  const candidates = useDataStore((s) => s.candidates)
  const data = SOURCES.map((source) => ({
    source,
    count: candidates.filter((c) => c.source === source && !c.archived).length,
  }))

  return (
    <Card className="p-5">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-base">Candidates by source</CardTitle>
        <CardDescription>Where applicants come from</CardDescription>
      </CardHeader>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ left: -28, right: 8, top: 4 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="source"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: 'hsl(var(--secondary))' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={SOURCE_COLORS[i % SOURCE_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
