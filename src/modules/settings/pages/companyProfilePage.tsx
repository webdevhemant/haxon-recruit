import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { COMPANY } from '@/lib/data/constants'
import { TabFade } from '@/components/common/tabFade'
import { SettingsTabs } from '../components/settingsTabs'

const BRAND_COLORS = ['#7b6cff', '#1a9e72', '#d97706', '#d4537e', '#185fa5']

export function CompanyProfilePage() {
  const [name, setName] = useState(COMPANY.name)
  const [website, setWebsite] = useState(COMPANY.website)
  const [hq, setHq] = useState(COMPANY.hq)
  const [size, setSize] = useState(COMPANY.sizeRange)
  const [industry, setIndustry] = useState(COMPANY.industry)
  const [subdomain, setSubdomain] = useState('nexaflow')
  const [brand, setBrand] = useState(BRAND_COLORS[0])

  return (
    <div>
      <SettingsTabs />

      <TabFade>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Company details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Field label="Company name">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Website">
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </Field>
                <Field label="HQ location">
                  <Input value={hq} onChange={(e) => setHq(e.target.value)} />
                </Field>
                <Field label="Company size">
                  <Input
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </Field>
                <Field label="Industry">
                  <Input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Careers subdomain">
                <div className="flex items-center">
                  <Input
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    className="rounded-r-none"
                  />
                  <span className="flex h-9 items-center rounded-r-md border border-l-0 border-input bg-secondary px-3 text-sm text-muted-foreground">
                    .haxon.careers
                  </span>
                </div>
              </Field>
              <div className="flex justify-end">
                <Button onClick={() => toast.success('Company profile saved')}>
                  Save changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Logo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <span
                    className="flex size-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
                    style={{ background: brand }}
                  >
                    {name.charAt(0)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success('Logo updated (demo)')}
                  >
                    Upload logo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Brand colour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2.5">
                  {BRAND_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setBrand(c)}
                      aria-label={`Brand colour ${c}`}
                      className="size-8 rounded-full ring-offset-2 ring-offset-card transition-all"
                      style={{
                        background: c,
                        boxShadow: brand === c ? `0 0 0 2px ${c}` : 'none',
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabFade>
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
