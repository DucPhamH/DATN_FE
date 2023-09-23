/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
// import HomeLanding from './pages/HomeLanding'
import { Suspense, lazy } from 'react'
import AuthLayout from './layouts/AuthLayout'

const HomeLanding = lazy(() => import('./pages/HomeLanding'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <Suspense>
          <HomeLanding />
        </Suspense>
      )
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: 'login',

      element: (
        <AuthLayout>
          <Suspense>
            <Login />
          </Suspense>
        </AuthLayout>
      )
    },
    {
      path: 'register',
      element: (
        <AuthLayout>
          <Suspense>
            <Register />
          </Suspense>
        </AuthLayout>
      )
    }
  ])
  return routeElement
}
