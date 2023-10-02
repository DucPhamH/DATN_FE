/* eslint-disable react-refresh/only-export-components */
import { useRoutes } from 'react-router-dom'
// import Home from './pages/Home'
// import HomeLanding from './pages/HomeLanding'
import { Suspense, lazy } from 'react'
import AuthLayout from './layouts/AuthLayout'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'

const HomeLanding = lazy(() => import('./pages/HomeLanding'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Home = lazy(() => import('./pages/Home'))
const MyProfile = lazy(() => import('./pages/MyProfile'))

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
      element: (
        <MainLayout>
          <Suspense>
            <Home />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <AuthLayout>
          <Suspense>
            <Login />
          </Suspense>
        </AuthLayout>
      )
    },
    {
      path: '/register',
      element: (
        <AuthLayout>
          <Suspense>
            <Register />
          </Suspense>
        </AuthLayout>
      )
    },
    {
      path: '/me',
      element: (
        <MainLayout>
          <Suspense>
            <MyProfile />
          </Suspense>
        </MainLayout>
      ),
      children: [
        {
          path: '',
          element: <div>Post</div>
        },
        {
          path: 'info',
          element: <div>Info</div>
        },
        {
          path: 'blog',
          element: <div>blog</div>
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return routeElement
}
