import {
  BarChart3,
  Briefcase,
  CalendarDays,
  ClipboardCheck,
  Globe,
  Home,
  Receipt,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react'

export interface LandingModule {
  no: string
  title: string
  description: string
  features: string[]
  icon: LucideIcon
}

export const LANDING_MODULES: LandingModule[] = [
  {
    no: '01',
    title: 'Landing & Marketing',
    description:
      'A conversion-focused public site with live job board embeds, pricing and an ROI calculator.',
    features: ['Job board embed', 'Pricing tiers', 'ROI calculator'],
    icon: Home,
  },
  {
    no: '02',
    title: 'Jobs & Requisitions',
    description:
      'Create, approve and publish openings — from draft to closed — with templates and multi-channel publishing.',
    features: ['5-step wizard', 'Approval flow', 'Role templates'],
    icon: Briefcase,
  },
  {
    no: '03',
    title: 'Candidate Pipeline',
    description:
      'A full applicant tracking system with drag-and-drop stages, timelines, scorecards and rich profiles.',
    features: ['Drag-drop kanban', 'Source attribution', 'Bulk actions'],
    icon: Users,
  },
  {
    no: '04',
    title: 'Interviews & Scheduling',
    description:
      'Self-serve scheduling, panels, interview kits and calendar sync that protect the candidate experience.',
    features: ['Self-schedule links', 'Panel builder', 'Interview kits'],
    icon: CalendarDays,
  },
  {
    no: '05',
    title: 'Scorecards & Evals',
    description:
      'Structured feedback with rubrics, aggregate scores and debrief summaries borrowed from the best.',
    features: ['Custom rubrics', 'Strong Yes → No', 'Debrief view'],
    icon: ClipboardCheck,
  },
  {
    no: '06',
    title: 'Offers & Onboarding',
    description:
      'Offer letters, approval chains, e-signature mockups and first-day checklists across the finish line.',
    features: ['Comp + equity', 'Approval chain', 'Onboarding'],
    icon: Receipt,
  },
  {
    no: '07',
    title: 'Analytics & Reports',
    description:
      'Conversion funnels, time-to-hire, source effectiveness and DEI snapshots — the full metric suite.',
    features: ['Funnel charts', 'Time-to-hire', 'DEI dashboard'],
    icon: BarChart3,
  },
  {
    no: '08',
    title: 'Careers Site',
    description:
      'A brandable careers page, searchable listings and a multi-step application flow that just works.',
    features: ['Branded page', 'Job search', 'Apply flow'],
    icon: Globe,
  },
  {
    no: '09',
    title: 'Admin & Settings',
    description:
      'Team management, roles, email templates, pipeline config and an integrations panel for the back office.',
    features: ['Roles matrix', 'Email templates', 'Integrations'],
    icon: Settings,
  },
]
