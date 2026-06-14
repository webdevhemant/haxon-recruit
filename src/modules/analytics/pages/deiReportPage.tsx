import { Info } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
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
import { PageHeader } from '@/components/common/pageHeader'
import { TabFade } from '@/components/common/tabFade'
import { AnalyticsTabs } from '../components/analyticsTabs'
import { DEI_ETHNICITY, DEI_GENDER } from '../data'

const ETH_COLORS = ['#7b6cff', '#3bd6ff', '#b7ff3b', '#fbbf24', '#f472b6']

function TipBox({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number; name?: string; color?: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-md">
      <p className="mb-1 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-muted-foreground">
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  )
}

export function DeiReportPage() {
  return (
    <div>
      <PageHeader
        title="DEI report"
        description="Anonymised diversity signals across the funnel."
      />
      <AnalyticsTabs />

      <TabFade>
        <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-border bg-secondary/40 p-3 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          Figures are self-reported and anonymised. Data collection rate is 68%.
          Use directionally, not as exact measures.
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Gender by stage</CardTitle>
              <CardDescription>
                Share at each pipeline stage (%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={DEI_GENDER}
                  margin={{ left: -20 }}
                  stackOffset="expand"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="stage"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: 'hsl(var(--muted-foreground))',
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: 'hsl(var(--muted-foreground))',
                      fontSize: 11,
                    }}
                  />
                  <Tooltip
                    content={<TipBox />}
                    cursor={{ fill: 'hsl(var(--secondary))' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar
                    dataKey="women"
                    name="Women"
                    stackId="a"
                    fill="#7b6cff"
                  />
                  <Bar dataKey="men" name="Men" stackId="a" fill="#3bd6ff" />
                  <Bar
                    dataKey="nonBinary"
                    name="Non-binary"
                    stackId="a"
                    fill="#b7ff3b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ethnicity (hires)</CardTitle>
              <CardDescription>Self-identified distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={DEI_ETHNICITY}
                    dataKey="value"
                    nameKey="group"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={2}
                    isAnimationActive={false}
                  >
                    {DEI_ETHNICITY.map((_, i) => (
                      <Cell key={i} fill={ETH_COLORS[i % ETH_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<TipBox />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
                {DEI_ETHNICITY.map((e, i) => (
                  <span
                    key={e.group}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ background: ETH_COLORS[i % ETH_COLORS.length] }}
                    />
                    {e.group} {e.value}%
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabFade>
    </div>
  )
}
