import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/components/layout/appLayout'
import { PublicLayout } from '@/components/layout/publicLayout'
import { NotFound } from '@/components/common/notFound'
import { ROUTES } from '@/lib/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.landing,
    lazy: async () => {
      const m = await import('@/modules/landing/pages/landingPage')
      return { Component: m.LandingPage }
    },
  },
  {
    path: ROUTES.account,
    lazy: async () => {
      const m = await import('@/modules/account/pages/accountPage')
      return { Component: m.AccountPage }
    },
  },
  {
    lazy: async () => {
      const m = await import('@/modules/auth/components/authLayout')
      return { Component: m.AuthLayout }
    },
    children: [
      {
        path: ROUTES.login,
        lazy: async () => {
          const m = await import('@/modules/auth/pages/loginPage')
          return { Component: m.LoginPage }
        },
      },
      {
        path: ROUTES.signup,
        lazy: async () => {
          const m = await import('@/modules/auth/pages/signupPage')
          return { Component: m.SignupPage }
        },
      },
      {
        path: ROUTES.forgotPassword,
        lazy: async () => {
          const m = await import('@/modules/auth/pages/forgotPasswordPage')
          return { Component: m.ForgotPasswordPage }
        },
      },
      {
        path: ROUTES.resetPassword,
        lazy: async () => {
          const m = await import('@/modules/auth/pages/resetPasswordPage')
          return { Component: m.ResetPasswordPage }
        },
      },
    ],
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.careers,
        lazy: async () => {
          const m = await import('@/modules/careers/pages')
          return { Component: m.CareersPage }
        },
      },
      {
        path: ROUTES.careersJobs,
        lazy: async () => {
          const m = await import('@/modules/careers/pages')
          return { Component: m.JobBoardPage }
        },
      },
      {
        path: ROUTES.careersJobDetail(),
        lazy: async () => {
          const m = await import('@/modules/careers/pages')
          return { Component: m.PublicJobDetailPage }
        },
      },
      {
        path: ROUTES.careersApply(),
        lazy: async () => {
          const m = await import('@/modules/careers/pages')
          return { Component: m.ApplicationPage }
        },
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.dashboard,
        lazy: async () => {
          const m = await import('@/modules/dashboard/pages/dashboardPage')
          return { Component: m.DashboardPage }
        },
      },
      {
        path: ROUTES.jobs,
        lazy: async () => {
          const m = await import('@/modules/jobs/pages')
          return { Component: m.JobsPage }
        },
      },
      {
        path: ROUTES.jobNew,
        lazy: async () => {
          const m = await import('@/modules/jobs/pages')
          return { Component: m.CreateJobPage }
        },
      },
      {
        path: ROUTES.jobDetail(),
        lazy: async () => {
          const m = await import('@/modules/jobs/pages')
          return { Component: m.JobDetailPage }
        },
      },
      {
        path: ROUTES.candidates,
        lazy: async () => {
          const m = await import('@/modules/candidates/pages')
          return { Component: m.CandidatesPage }
        },
      },
      {
        path: ROUTES.candidateDetail(),
        lazy: async () => {
          const m = await import('@/modules/candidates/pages')
          return { Component: m.CandidateProfilePage }
        },
      },
      {
        path: ROUTES.interviews,
        lazy: async () => {
          const m = await import('@/modules/interviews/pages')
          return { Component: m.InterviewsPage }
        },
      },
      {
        path: ROUTES.interviewSchedule,
        lazy: async () => {
          const m = await import('@/modules/interviews/pages')
          return { Component: m.ScheduleInterviewPage }
        },
      },
      {
        path: ROUTES.interviewScorecard(),
        lazy: async () => {
          const m = await import('@/modules/interviews/pages')
          return { Component: m.ScorecardPage }
        },
      },
      {
        path: ROUTES.offers,
        lazy: async () => {
          const m = await import('@/modules/offers/pages')
          return { Component: m.OffersPage }
        },
      },
      {
        path: ROUTES.offerNew,
        lazy: async () => {
          const m = await import('@/modules/offers/pages')
          return { Component: m.CreateOfferPage }
        },
      },
      {
        path: ROUTES.analytics,
        lazy: async () => {
          const m = await import('@/modules/analytics/pages')
          return { Component: m.AnalyticsPage }
        },
      },
      {
        path: ROUTES.analyticsDei,
        lazy: async () => {
          const m = await import('@/modules/analytics/pages')
          return { Component: m.DeiReportPage }
        },
      },
      {
        path: ROUTES.analyticsSources,
        lazy: async () => {
          const m = await import('@/modules/analytics/pages')
          return { Component: m.SourceReportPage }
        },
      },
      {
        path: ROUTES.settingsTeam,
        lazy: async () => {
          const m = await import('@/modules/settings/pages')
          return { Component: m.TeamSettingsPage }
        },
      },
      {
        path: ROUTES.settingsIntegrations,
        lazy: async () => {
          const m = await import('@/modules/settings/pages')
          return { Component: m.IntegrationsPage }
        },
      },
      {
        path: ROUTES.settingsTemplates,
        lazy: async () => {
          const m = await import('@/modules/settings/pages')
          return { Component: m.EmailTemplatesPage }
        },
      },
      {
        path: ROUTES.settingsPipeline,
        lazy: async () => {
          const m = await import('@/modules/settings/pages')
          return { Component: m.PipelineConfigPage }
        },
      },
      {
        path: ROUTES.settingsCompany,
        lazy: async () => {
          const m = await import('@/modules/settings/pages')
          return { Component: m.CompanyProfilePage }
        },
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
