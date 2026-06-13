import { useState } from 'react'
import { CalendarCheck, Gauge, Percent, Timer } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeader } from '@/components/common/pageHeader'
import { StatCard } from '@/components/common/statCard'
import { AnalyticsTabs } from '../components/analyticsTabs'
import {
  DATE_RANGES,
  FUNNEL,
  HIRES_BY_DEPT,
  SOURCE_STATS,
  TIME_TO_HIRE_TREND,
} from '../data'

const DONUT_COLORS = ['#7b6cff', '#3bd6ff', '#b7ff3b', '#fbbf24', '#f472b6']

function TipBox({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number; name?: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-md">
      <p className="font-medium">{label ?? payload[0].name}</p>
      <p className="text-muted-foreground">{payload[0].value}</p>
    </div>
  )
}

export function AnalyticsPage() {
  const [range, setRange] = useState(DATE_RANGES[2])
  const sourceData = SOURCE_STATS.map((s) => ({
    name: s.source,
    value: s.candidates,
  }))

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Hiring performance across your pipeline."
        actions={
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGES.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      <AnalyticsTabs />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Avg. time to hire"
          value="23 days"
          icon={Timer}
          delta={-9}
        />
        <StatCard
          label="Offer acceptance"
          value="82%"
          icon={Percent}
          delta={4}
        />
        <StatCard
          label="Pipeline velocity"
          value="6.2 days/stage"
          icon={Gauge}
        />
        <StatCard
          label="Hires this quarter"
          value="7"
          icon={CalendarCheck}
          delta={16}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pipeline funnel</CardTitle>
            <CardDescription>Conversion from apply to hire</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart layout="vertical" data={FUNNEL} margin={{ left: 20 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  horizontal={false}
                />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="stage"
                  axisLine={false}
                  tickLine={false}
                  width={80}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip
                  content={<TipBox />}
                  cursor={{ fill: 'hsl(var(--secondary))' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="#7b6cff" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Source breakdown</CardTitle>
            <CardDescription>Candidates by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={sourceData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  isAnimationActive={false}
                >
                  {sourceData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={DONUT_COLORS[i % DONUT_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<TipBox />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
              {sourceData.map((s, i) => (
                <span
                  key={s.name}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{
                      background: DONUT_COLORS[i % DONUT_COLORS.length],
                    }}
                  />
                  {s.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hires by department</CardTitle>
            <CardDescription>Trailing 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={HIRES_BY_DEPT} margin={{ left: -20 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="dept"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <Tooltip
                  content={<TipBox />}
                  cursor={{ fill: 'hsl(var(--secondary))' }}
                />
                <Bar dataKey="hires" radius={[4, 4, 0, 0]} fill="#3bd6ff" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Time to hire</CardTitle>
            <CardDescription>Average days, trending down</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={TIME_TO_HIRE_TREND} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="tthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b7ff3b" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#b7ff3b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <Tooltip content={<TipBox />} />
                <Area
                  type="monotone"
                  dataKey="days"
                  stroke="#b7ff3b"
                  strokeWidth={2}
                  fill="url(#tthGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
