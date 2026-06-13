import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/lib/routes'
import { HeroMock } from './hero-mock'

const STATS = [
  { value: '9', label: 'Core modules' },
  { value: '24', label: 'Pages' },
  { value: '180+', label: 'Features' },
  { value: '23d', label: 'Time-to-hire' },
]

export function LandingHero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:pt-44"
    >
      <div>
        <div
          className="lp-reveal mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
          style={{ animationDelay: '0.05s' }}
        >
          <span className="size-1.5 rounded-full bg-[#b7ff3b]" />
          <span className="text-xs font-medium tracking-wide text-white/60">
            The hiring OS, built on real product thinking
          </span>
        </div>

        <h1
          className="lp-reveal font-display text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.03em]"
          style={{ animationDelay: '0.12s' }}
        >
          Hire with
          <br />
          <span className="text-[#7b6cff]">precision</span>, not
          <br />
          guesswork.
        </h1>

        <p
          className="lp-reveal mt-7 max-w-md text-lg leading-relaxed text-white/50"
          style={{ animationDelay: '0.2s' }}
        >
          One platform for jobs, pipelines, interviews, scorecards, offers and
          analytics — combining the best of Ashby, Greenhouse and Lever into a
          single, beautifully fast workflow.
        </p>

        <div
          className="lp-reveal mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '0.28s' }}
        >
          <Link
            to={ROUTES.dashboard}
            className="group inline-flex items-center gap-2 rounded-lg bg-[#7b6cff] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Launch the dashboard
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#modules"
            className="border-white/12 inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            Explore all 9 modules
          </a>
        </div>

        <dl
          className="lp-reveal border-white/8 mt-14 grid max-w-md grid-cols-4 gap-4 border-t pt-7"
          style={{ animationDelay: '0.36s' }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-2xl font-bold tracking-tight">
                {s.value}
              </dt>
              <dd className="mt-1 text-[11px] uppercase tracking-wide text-white/35">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="lp-reveal" style={{ animationDelay: '0.24s' }}>
        <HeroMock />
      </div>
    </section>
  )
}
