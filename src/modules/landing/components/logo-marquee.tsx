const LOGOS = [
  'Nexaflow',
  'Lumen',
  'Northwind',
  'Acme Labs',
  'Verdant',
  'Quanta',
  'Cobalt',
  'Driftwood',
]

export function LogoMarquee() {
  const row = [...LOGOS, ...LOGOS]
  return (
    <section className="relative border-y border-white/5 py-10">
      <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-white/30">
        Trusted by modern talent teams
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="lp-marquee gap-16 pr-16">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-xl font-bold text-white/25"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
