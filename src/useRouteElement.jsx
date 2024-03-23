/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
// import Home from './pages/Home'
// import HomeLanding from './pages/HomeLanding'
import { Suspense, lazy, useContext } from 'react'
import AuthLayout from './layouts/AuthLayout'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'
import { AppContext } from './contexts/app.context'
import LoginGoogle from './pages/LoginGoogle'

const HomeLanding = lazy(() => import('./pages/HomeLanding'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Home = lazy(() => import('./pages/Home'))
const MyProfile = lazy(() => import('./pages/MyProfile'))
const FitnessCaculator = lazy(() => import('./pages/FitnessCaculator'))
const Cooking = lazy(() => import('./pages/Cooking'))
const CookingFood = lazy(() => import('./pages/CookingFood'))
const Blog = lazy(() => import('./pages/Blog'))

export default function useRouteElement() {
  function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    console.log(isAuthenticated)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/home' />
  }
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
      path: '',
      element: <RejectedRoute />,
      children: [
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
        }
      ]
    },
    {
      path: '/login-google',
      element: <LoginGoogle />
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
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/my-profile',
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
              element: (
                <div>
                  Info
                  <div>Info</div> <div>Info</div> <div>Info</div> <div>Info</div> <div>Info</div> <div>Info</div>{' '}
                  <div>Info</div> <div>Info</div> <div>Info</div> <div>Info</div> <div>Info</div> <div>Info</div>
                </div>
              )
            },
            {
              path: 'blog',
              element: <div>blog</div>
            }
          ]
        }
      ]
    },

    {
      path: '/cooking',
      element: (
        <MainLayout>
          <Suspense>
            <Cooking />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/cooking/cooking-food',
      element: (
        <MainLayout>
          <Suspense>
            <CookingFood />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/blog',
      element: (
        <MainLayout>
          <Suspense>
            <Blog />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/chef',
      element: (
        <MainLayout>
          <Suspense>
            <div>Hello</div>
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'fitness/fitness-caculator',
      element: (
        <MainLayout>
          <Suspense>
            <FitnessCaculator />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'fitness/fitness-history',
      element: (
        <MainLayout>
          <Suspense>
            <div>Hello</div>
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'schedule/ex-schedule',
      element: (
        <MainLayout>
          <Suspense>
            <div>Hello</div>
          </Suspense>
        </MainLayout>
      )
    },

    {
      path: '*',
      element: <NotFound />
    }
  ])
  return routeElement
}
