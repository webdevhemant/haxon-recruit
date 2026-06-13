import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import { PRICING } from '../data/pricing'

export function PricingSection() {
  return (
    <section id="pricing" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="mb-14 max-w-2xl">
        <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b6cff]">
          <span className="h-px w-6 bg-[#7b6cff]" />
          Pricing
        </p>
        <h2 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Simple plans that scale with you.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {PRICING.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              'relative flex flex-col rounded-2xl border p-7',
              tier.featured
                ? 'from-[#7b6cff]/12 border-[#7b6cff]/50 bg-gradient-to-b to-transparent'
                : 'border-white/8 bg-[#0a0a0d]',
            )}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-[#7b6cff] px-3 py-1 text-[11px] font-semibold text-white">
                Most popular
              </span>
            )}
            <h3 className="font-display text-lg font-bold">{tier.name}</h3>
            <p className="mt-1 text-sm text-white/40">{tier.blurb}</p>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-extrabold tracking-tight">
                {tier.price}
              </span>
              <span className="text-sm text-white/40">/ {tier.cadence}</span>
            </div>

            <ul className="mt-7 flex flex-1 flex-col gap-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="size-4 shrink-0 text-[#b7ff3b]" />
                  <span className="text-white/65">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              to={ROUTES.dashboard}
              className={cn(
                'mt-8 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5',
                tier.featured
                  ? 'bg-[#7b6cff] text-white'
                  : 'border-white/12 border text-white/80 hover:border-white/30',
              )}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
