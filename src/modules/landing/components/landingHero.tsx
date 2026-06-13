import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/lib/routes'
import { HeroMock } from './heroMock'

const STATS = [
  { value: '9', label: 'Core modules' },
  { value: '24', label: 'Pages' },
  { value: '180+', label: 'Features' },
  { value: '0', label: 'Backend deps' },
]

export function LandingHero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pb-16 pt-28 lg:grid-cols-2 lg:gap-20 lg:pb-20 lg:pt-32"
    >
      <div>
        <div
          className="lp-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
          style={{ animationDelay: '0.05s' }}
        >
          <span className="size-1.5 animate-pulse rounded-full bg-[#b7ff3b]" />
          <span className="text-xs font-medium tracking-wide text-white/60">
            The hiring OS, built on real product thinking
          </span>
        </div>

        <h1
          className="lp-reveal font-display text-[clamp(2.6rem,5.4vw,4.4rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
          style={{ animationDelay: '0.12s' }}
        >
          Hire with{' '}
          <span className="relative whitespace-nowrap text-[#7b6cff]">
            precision
          </span>
          ,
          <br />
          not guesswork.
        </h1>

        <p
          className="lp-reveal mt-5 max-w-md text-base leading-relaxed text-white/50 sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          One platform for jobs, pipelines, interviews, scorecards, offers and
          analytics — the best of Ashby, Greenhouse and Lever in a single,
          beautifully fast workflow.
        </p>

        <div
          className="lp-reveal mt-7 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '0.28s' }}
        >
          <Link
            to={ROUTES.dashboard}
            className="group inline-flex items-center gap-2 rounded-lg bg-[#7b6cff] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Launch the dashboard
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#modules"
            className="border-white/12 inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            Explore 9 modules
          </a>
        </div>

        <dl
          className="lp-reveal border-white/8 mt-10 grid max-w-md grid-cols-4 gap-4 border-t pt-6"
          style={{ animationDelay: '0.36s' }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-[10px] uppercase tracking-wide text-white/35 sm:text-[11px]">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className="lp-reveal relative px-2 sm:px-6 lg:px-0"
        style={{ animationDelay: '0.24s' }}
      >
        <HeroMock />
      </div>
    </section>
  )
}
