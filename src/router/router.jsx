/* eslint-disable react-refresh/only-export-components -- route config module, not an HMR component boundary */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import WorkspaceComingSoon from '@/pages/user/workspace/ComingSoon'

const AuthenticationClientPage = lazy(() => import('@/pages/client/auth'))
const UserRootPage = lazy(() => import('@/pages/user'))
const UserHomePage = lazy(() => import('@/pages/user/home-page'))
const WorkspaceManagement = lazy(() => import('@/pages/user/workspace'))
const TaskManagement = lazy(() => import('@/pages/user/workspace/task-management'))
const ProjectDevelopment = lazy(() => import('@/pages/user/workspace/project-development'))

/** Fallback shown while a lazy page chunk loads. */
const PageFallback = () => (
  <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
    Loading…
  </div>
)

/** Wraps a lazy page in Suspense so each route gets its own loading boundary. */
const withSuspense = (element) => <Suspense fallback={<PageFallback />}>{element}</Suspense>

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: withSuspense(<AuthenticationClientPage />),
  },
  {
    // Shared user-actor layout (top bar + sidebar) wrapping the home page and
    // the per-space workspace shell. Children render into the layout's <Outlet>.
    element: withSuspense(<UserRootPage />),
    children: [
      {
        path: '/home',
        element: withSuspense(<UserHomePage />),
      },
      {
        path: '/workspace/:spaceId',
        element: withSuspense(<WorkspaceManagement />),
        children: [
          { index: true, element: <Navigate to="list" replace /> },
          { path: 'summary', element: <WorkspaceComingSoon title="Summary" /> },
          { path: 'list', element: withSuspense(<TaskManagement />) },
          { path: 'board', element: <WorkspaceComingSoon title="Board" /> },
          { path: 'backlog', element: <WorkspaceComingSoon title="Backlog" /> },
          { path: 'development', element: withSuspense(<ProjectDevelopment />) },
          { path: 'timeline', element: <WorkspaceComingSoon title="Timeline" /> },
          { path: 'docs', element: <WorkspaceComingSoon title="Docs" /> },
          { path: 'forms', element: <WorkspaceComingSoon title="Forms" /> },
          { path: 'reports', element: <WorkspaceComingSoon title="Reports" /> },
          { path: 'calendar', element: <WorkspaceComingSoon title="Calendar" /> },
        ],
      },
    ],
  },
])

export default router
