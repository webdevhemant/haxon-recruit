export const ROUTES = {
  landing: '/',

  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',

  account: '/account',

  dashboard: '/dashboard',

  jobs: '/jobs',
  jobNew: '/jobs/new',
  jobDetail: (id = ':id') => `/jobs/${id}`,

  candidates: '/candidates',
  candidateDetail: (id = ':id') => `/candidates/${id}`,

  interviews: '/interviews',
  interviewSchedule: '/interviews/schedule',
  interviewScorecard: (id = ':id') => `/interviews/${id}/scorecard`,

  offers: '/offers',
  offerNew: '/offers/new',

  analytics: '/analytics',
  analyticsDei: '/analytics/dei',
  analyticsSources: '/analytics/sources',

  careers: '/careers',
  careersJobs: '/careers/jobs',
  careersJobDetail: (slug = ':slug') => `/careers/jobs/${slug}`,
  careersApply: (slug = ':slug') => `/careers/apply/${slug}`,

  settingsTeam: '/settings/team',
  settingsIntegrations: '/settings/integrations',
  settingsTemplates: '/settings/templates',
  settingsPipeline: '/settings/pipeline',
  settingsCompany: '/settings/company',
} as const
