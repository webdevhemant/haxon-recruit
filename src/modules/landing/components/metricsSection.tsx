import { motion } from 'motion/react'

import { Reveal } from './motionPrimitives'

const FUNNEL = [
  { label: 'Applied', value: 100, count: '1,240' },
  { label: 'Screened', value: 62, count: '769' },
  { label: 'Interviewed', value: 31, count: '384' },
  { label: 'Offer', value: 16, count: '198' },
  { label: 'Hired', value: 12.5, count: '155' },
]

const KPIS = [
  { value: '23 days', label: 'Avg. time to hire' },
  { value: '82%', label: 'Offer acceptance' },
  { value: '12.5%', label: 'Apply → hire rate' },
]

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="relative border-y border-white/5 bg-[#0a0a0d]"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#b7ff3b]">
            <span className="h-px w-6 bg-[#b7ff3b]" />
            Analytics that decide
          </p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            See the funnel.
            <br />
            Fix the bottleneck.
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/45">
            Conversion funnels, time-to-hire, source effectiveness and DEI
            snapshots — every number you need to run a tight hiring process,
            updated as your pipeline moves.
          </p>

          <div className="mt-9 grid grid-cols-3 gap-4">
            {KPIS.map((k) => (
              <div
                key={k.label}
                className="border-white/8 rounded-xl border bg-white/[0.02] p-4"
              >
                <p className="font-display text-2xl font-bold tracking-tight text-[#b7ff3b]">
                  {k.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-white/40">
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="rounded-2xl border border-white/10 bg-[#0d0d11] p-7"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-semibold text-white/80">
              Pipeline conversion
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Last 6 months
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {FUNNEL.map((f, i) => (
              <div key={f.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-white/55">{f.label}</span>
                  <span className="font-mono text-white/40">{f.count}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#7b6cff] to-[#b7ff3b]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${f.value}%` }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.1,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
