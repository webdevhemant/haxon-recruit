import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

import { ROUTES } from '@/lib/routes'

export function CtaSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d11] px-8 py-20 text-center"
      >
        <div
          className="lp-glow"
          style={{
            width: 420,
            height: 420,
            background: '#7b6cff',
            top: -160,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        <figure className="relative mx-auto max-w-2xl">
          <blockquote className="font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
            “We replaced three tools with Haxon and cut our time-to-hire by
            nearly half. It’s the first ATS our hiring managers actually enjoy
            using.”
          </blockquote>
          <figcaption className="mt-7 flex items-center justify-center gap-3 text-sm">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#7b6cff] text-xs font-bold text-white">
              MH
            </span>
            <span className="text-white/55">
              <span className="font-semibold text-white/85">Maya Hartwell</span>{' '}
              · Head of Talent, Nexaflow
            </span>
          </figcaption>
        </figure>

        <div className="relative mt-12">
          <Link
            to={ROUTES.dashboard}
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-7 py-4 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Start hiring with Haxon
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-xs text-white/35">
            No backend. No setup. Explore the full product instantly.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
