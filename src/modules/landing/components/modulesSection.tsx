import { LANDING_MODULES } from '../data/modules'
import { PopItem, Reveal, StaggerGroup } from './motionPrimitives'

export function ModulesSection() {
  return (
    <section id="modules" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal className="mb-14 max-w-2xl">
        <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b6cff]">
          <span className="h-px w-6 bg-[#7b6cff]" />
          Core modules
        </p>
        <h2 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Nine modules. Every feature that matters.
        </h2>
        <p className="mt-5 text-lg text-white/45">
          Distilled from a deep analysis of the category leaders, then merged
          and rebuilt into one cohesive, end-to-end hiring workflow.
        </p>
      </Reveal>

      <StaggerGroup className="border-white/8 bg-white/8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
        {LANDING_MODULES.map((m) => (
          <PopItem key={m.no} className="h-full">
            <article className="group relative h-full bg-[#0a0a0d] p-7 transition-colors hover:bg-[#0f0f15]">
              <div className="mb-5 flex items-center justify-between">
                <span className="bg-[#7b6cff]/12 flex size-11 items-center justify-center rounded-xl text-[#9a8dff] transition-colors group-hover:bg-[#7b6cff]/20">
                  <m.icon className="size-5" />
                </span>
                <span className="font-mono text-xs font-semibold tracking-widest text-white/15">
                  {m.no}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight">
                {m.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/45">
                {m.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {m.features.map((f) => (
                  <span
                    key={f}
                    className="border-white/8 rounded-full border bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/55"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </article>
          </PopItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
