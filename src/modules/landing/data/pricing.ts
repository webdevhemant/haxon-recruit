export interface PricingTier {
  name: string
  price: string
  cadence: string
  blurb: string
  features: string[]
  featured?: boolean
  cta: string
}

export const PRICING: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    cadence: 'forever',
    blurb: 'For small teams making their first few hires.',
    features: [
      'Up to 3 open jobs',
      'Candidate pipeline',
      'Basic scorecards',
      'Careers page',
    ],
    cta: 'Start free',
  },
  {
    name: 'Growth',
    price: '$149',
    cadence: 'per month',
    blurb: 'For scaling teams that hire every week.',
    features: [
      'Unlimited jobs',
      'Interview scheduling',
      'Offers & approvals',
      'Full analytics suite',
      'Integrations',
    ],
    featured: true,
    cta: 'Start 14-day trial',
  },
  {
    name: 'Scale',
    price: 'Custom',
    cadence: 'talk to us',
    blurb: 'For orgs with advanced compliance needs.',
    features: [
      'Everything in Growth',
      'DEI reporting',
      'SSO & audit log',
      'Custom roles & SLAs',
      'Dedicated support',
    ],
    cta: 'Contact sales',
  },
]
