import { LandingNav } from '../components/landingNav'
import { LandingHero } from '../components/landingHero'
import { LogoMarquee } from '../components/logoMarquee'
import { ModulesSection } from '../components/modulesSection'
import { MetricsSection } from '../components/metricsSection'
import { PricingSection } from '../components/pricingSection'
import { CtaSection } from '../components/ctaSection'
import { LandingFooter } from '../components/landingFooter'
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
