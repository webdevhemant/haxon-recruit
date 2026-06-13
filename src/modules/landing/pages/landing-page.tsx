import { LandingNav } from '../components/landing-nav'
import { LandingHero } from '../components/landing-hero'
import { LogoMarquee } from '../components/logo-marquee'
import { ModulesSection } from '../components/modules-section'
import { MetricsSection } from '../components/metrics-section'
import { PricingSection } from '../components/pricing-section'
import { CtaSection } from '../components/cta-section'
import { LandingFooter } from '../components/landing-footer'
import '../landing.css'

export function LandingPage() {
  return (
    <div className="lp lp-grain min-h-screen">
      <LandingNav />

      <div className="relative">
        <div className="lp-grid h-[900px]" />
        <div
          className="lp-glow"
          style={{
            width: 600,
            height: 600,
            background: '#7b6cff',
            top: -120,
            right: -120,
          }}
        />
        <div
          className="lp-glow"
          style={{
            width: 380,
            height: 380,
            background: '#b7ff3b',
            top: 320,
            left: -160,
            opacity: 0.18,
          }}
        />
        <div className="relative z-10">
          <LandingHero />
        </div>
      </div>

      <main className="relative z-10">
        <LogoMarquee />
        <ModulesSection />
        <MetricsSection />
        <PricingSection />
        <CtaSection />
      </main>

      <LandingFooter />
    </div>
  )
}
