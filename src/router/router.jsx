/* eslint-disable react-refresh/only-export-components -- route config module, not an HMR component boundary */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const AuthenticationClientPage = lazy(() => import('@/pages/client/auth'))
const UserRootPage = lazy(() => import('@/pages/user'))
const UserHomePage = lazy(() => import('@/pages/user/home-page'))

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
    path: '/home',
    element: withSuspense(<UserRootPage />),
    children: [
      {
        index: true,
        element: withSuspense(<UserHomePage />),
      },
    ],
  },
])

export default router
