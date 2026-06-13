import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Globe2,
  HeartPulse,
  Plane,
  Rocket,
  Sparkles,
  Wallet,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { COMPANY } from '@/lib/data/constants'
import { ROUTES } from '@/lib/routes'
import { useDataStore } from '@/stores/useDataStore'

const BENEFITS = [
  {
    icon: Wallet,
    title: 'Competitive pay + equity',
    text: 'Top-of-market salary and meaningful ownership.',
  },
  {
    icon: HeartPulse,
    title: 'Health & wellness',
    text: 'Full medical, dental, vision and a wellness stipend.',
  },
  {
    icon: Plane,
    title: 'Unlimited PTO',
    text: 'Take the time you need, with a 3-week minimum.',
  },
  {
    icon: Globe2,
    title: 'Remote-friendly',
    text: 'Work from SF, London, Austin or fully remote.',
  },
  {
    icon: Rocket,
    title: 'Growth budget',
    text: '$2k/yr for courses, conferences and books.',
  },
  {
    icon: Sparkles,
    title: 'Real impact',
    text: 'Small teams, big ownership, ship every week.',
  },
]

export function CareersPage() {
  const jobs = useDataStore((s) => s.jobs)
  const open = jobs.filter((j) => j.status === 'open').slice(0, 4)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute -right-40 -top-40 size-[480px] rounded-full opacity-30 blur-[130px]"
          style={{ background: 'hsl(var(--primary))' }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Badge variant="secondary" className="mb-5">
            {COMPANY.industry} · {COMPANY.sizeRange}
          </Badge>
          <h1 className="max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
            Build the tools that
            <br />
            give teams their time back.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {COMPANY.mission}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={ROUTES.careersJobs}>
                View open roles
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#benefits">Why {COMPANY.name}</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Perks &amp; benefits
        </h2>
        <p className="mt-2 text-muted-foreground">
          We invest in our people so they can do the best work of their careers.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <Card key={b.title} className="p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <b.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Featured roles
              </h2>
              <p className="mt-2 text-muted-foreground">
                {jobs.filter((j) => j.status === 'open').length} open positions
                across the company.
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link to={ROUTES.careersJobs}>
                All roles
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {open.map((job) => (
              <Link key={job.id} to={ROUTES.careersJobDetail(job.slug)}>
                <Card className="flex items-center justify-between p-5 transition-colors hover:border-primary/40">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.department} · {job.office}
                      {job.remote ? ' · Remote' : ''}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
