/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import AuthLayout from './layouts/AuthLayout'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'
import { AppContext } from './contexts/app.context'
import LoginGoogle from './pages/LoginGoogle'
import CreateLayout from './layouts/CreateLayout'

const HomeLanding = lazy(() => import('./pages/HomeLanding'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Home = lazy(() => import('./pages/Home'))
const Me = lazy(() => import('./pages/Me'))
const FitnessCaculator = lazy(() => import('./pages/FitnessCaculator'))
const Cooking = lazy(() => import('./pages/Cooking'))
const CookingFood = lazy(() => import('./pages/CookingFood'))
const Blog = lazy(() => import('./pages/Blog'))
const PostInfo = lazy(() => import('./pages/PostInfo'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const BMI = lazy(() => import('./pages/BMI'))
const Calories = lazy(() => import('./pages/Calories'))
const BMR = lazy(() => import('./pages/BMR'))
const BodyFat = lazy(() => import('./pages/BodyFat'))
const IBW = lazy(() => import('./pages/IBW'))
const LBM = lazy(() => import('./pages/LBM'))
const CaloBurned = lazy(() => import('./pages/CaloBurned'))
const WaterPerDay = lazy(() => import('./pages/WaterPerDay'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const CreateBlog = lazy(() => import('./pages/CreateBlog'))
const BlogList = lazy(() => import('./pages/BlogList'))

export default function useRouteElement() {
  function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
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
      path: '',
      element: <ProtectedRoute />,
      children: [
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
          path: '/post/:id',
          element: (
            <MainLayout>
              <Suspense>
                <PostInfo />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/me',
          element: (
            <MainLayout>
              <Suspense>
                <Me />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/user/:id',
          element: (
            <MainLayout>
              <Suspense>
                <UserProfile />
              </Suspense>
            </MainLayout>
          )
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
      path: '/blog/:id',
      element: (
        <MainLayout>
          <Suspense>
            <BlogDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/album',
      element: (
        <MainLayout>
          <Suspense>
            <div className=' '>Hello</div>
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
      path: 'fitness/fitness-caculator/BMI',
      element: (
        <MainLayout>
          <Suspense>
            <BMI />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'fitness/fitness-caculator/calories',
      element: (
        <MainLayout>
          <Suspense>
            <Calories />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'fitness/fitness-caculator/BMR',
      element: (
        <MainLayout>
          <Suspense>
            <BMR />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'fitness/fitness-caculator/body-fat',
      element: (
        <MainLayout>
          <Suspense>
            <BodyFat />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'fitness/fitness-caculator/IBW',
      element: (
        <MainLayout>
          <Suspense>
            <IBW />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'fitness/fitness-caculator/LBM',
      element: (
        <MainLayout>
          <Suspense>
            <LBM />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'fitness/fitness-caculator/calo-burned',
      element: (
        <MainLayout>
          <Suspense>
            <CaloBurned />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'fitness/fitness-caculator/water-need',
      element: (
        <MainLayout>
          <Suspense>
            <WaterPerDay />
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
      path: 'chef/create-food',
      element: (
        <MainLayout>
          <Suspense>
            <div>Hello</div>
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'chef/create-blog',
      element: (
        <CreateLayout>
          <Suspense>
            <CreateBlog />
          </Suspense>
        </CreateLayout>
      )
    },
    {
      path: 'chef/blog-list',
      element: (
        <MainLayout>
          <Suspense>
            <BlogList />
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
