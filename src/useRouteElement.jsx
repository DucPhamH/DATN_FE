/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import AuthLayout from './layouts/AuthLayout'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'
import { AppContext } from './contexts/app.context'
import LoginGoogle from './pages/LoginGoogle'
import CreateLayout from './layouts/CreateLayout'
import SendEmail from './pages/ForgotPassword/components/SendEmail'
import InputConfirm from './pages/ForgotPassword/components/InputConfirm'
import ChangePassForm from './pages/ForgotPassword/components/ChangePassForm'
import ChangeSuccess from './pages/ForgotPassword/components/ChangeSuccess'
import WorkoutScheduleDetail from './pages/WorkoutScheduleDetail'

const HomeLanding = lazy(() => import('./pages/HomeLanding'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Home = lazy(() => import('./pages/Home'))
const Me = lazy(() => import('./pages/Me'))
const FitnessCalculator = lazy(() => import('./pages/FitnessCalculator'))
const Cooking = lazy(() => import('./pages/Cooking'))
const Recipe = lazy(() => import('./pages/Recipe'))
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
const EditBlog = lazy(() => import('./pages/EditBlog'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const FitnessCalculatorHistory = lazy(() => import('./pages/FitnessCalculatorHistory'))
const WorkoutSchedule = lazy(() => import('./pages/WorkoutSchedule'))
const RecipeList = lazy(() => import('./pages/RecipeList'))
const CreateRecipe = lazy(() => import('./pages/CreateRecipe'))
const EditRecipe = lazy(() => import('./pages/EditRecipe'))
const AlbumList = lazy(() => import('./pages/AlbumList'))
const CreateAlbum = lazy(() => import('./pages/CreateAlbum'))
const EditAlbum = lazy(() => import('./pages/EditAlbum'))
const Album = lazy(() => import('./pages/Album'))
const AlbumDetail = lazy(() => import('./pages/AlbumDetail'))
const RecipeDetail = lazy(() => import('./pages/RecipeDetail'))
const MealSchedule = lazy(() => import('./pages/MealSchedule'))
const MealScheduleDetail = lazy(() => import('./pages/MealScheduleDetail'))
const SearchImage = lazy(() => import('./pages/SearchImage'))
const Bookmark = lazy(() => import('./pages/Bookmark'))
const Search = lazy(() => import('./pages/Search'))

export default function useRouteElement() {
  function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/home' />
  }

  function RoleProtectedRouterChef() {
    const { profile } = useContext(AppContext)
    const check = Boolean(profile.role === 1)
    //  console.log(check)
    return check ? <Outlet /> : <Navigate to='/home' />
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
          path: '/cooking/recipe',
          element: (
            <MainLayout>
              <Suspense>
                <Recipe />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/cooking/recipe/:id',
          element: (
            <MainLayout>
              <Suspense>
                <RecipeDetail />
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
                <Album />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/album/:id',
          element: (
            <MainLayout>
              <Suspense>
                <AlbumDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'fitness/fitness-calculator',
          element: (
            <MainLayout>
              <Suspense>
                <FitnessCalculator />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'fitness/fitness-calculator/BMI',
          element: (
            <MainLayout>
              <Suspense>
                <BMI />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'fitness/fitness-calculator/calories',
          element: (
            <MainLayout>
              <Suspense>
                <Calories />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'fitness/fitness-calculator/BMR',
          element: (
            <MainLayout>
              <Suspense>
                <BMR />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'fitness/fitness-calculator/body-fat',
          element: (
            <MainLayout>
              <Suspense>
                <BodyFat />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'fitness/fitness-calculator/IBW',
          element: (
            <MainLayout>
              <Suspense>
                <IBW />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'fitness/fitness-calculator/LBM',
          element: (
            <MainLayout>
              <Suspense>
                <LBM />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'fitness/fitness-calculator/calo-burned',
          element: (
            <MainLayout>
              <Suspense>
                <CaloBurned />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'fitness/fitness-calculator/water-need',
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
                <FitnessCalculatorHistory />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'schedule/eat-schedule',
          element: (
            <MainLayout>
              <Suspense>
                <MealSchedule />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'schedule/eat-schedule/:id',
          element: (
            <MainLayout>
              <Suspense>
                <MealScheduleDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'schedule/ex-schedule',
          element: (
            <MainLayout>
              <Suspense>
                <WorkoutSchedule />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'schedule/ex-schedule/:id',
          element: (
            <MainLayout>
              <Suspense>
                <WorkoutScheduleDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'search-image',
          element: (
            <MainLayout>
              <Suspense>
                <SearchImage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'bookmark',
          element: (
            <MainLayout>
              <Suspense>
                <Bookmark />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: 'search',
          element: (
            <MainLayout>
              <Suspense>
                <Search />
              </Suspense>
            </MainLayout>
          )
        }

        /////////////////////////////////////////////
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <RoleProtectedRouterChef />,
          children: [
            {
              path: 'chef/create-recipe',
              element: (
                <CreateLayout>
                  <Suspense>
                    <CreateRecipe />
                  </Suspense>
                </CreateLayout>
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
              path: 'chef/create-album',
              element: (
                <CreateLayout>
                  <Suspense>
                    <CreateAlbum />
                  </Suspense>
                </CreateLayout>
              )
            },
            {
              path: 'chef/edit-blog/:id',
              element: (
                <CreateLayout>
                  <Suspense>
                    <EditBlog />
                  </Suspense>
                </CreateLayout>
              )
            },
            {
              path: 'chef/edit-recipe/:id',
              element: (
                <CreateLayout>
                  <Suspense>
                    <EditRecipe />
                  </Suspense>
                </CreateLayout>
              )
            },
            {
              path: 'chef/edit-album/:id',
              element: (
                <CreateLayout>
                  <Suspense>
                    <EditAlbum />
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
              path: 'chef/recipe-list',
              element: (
                <MainLayout>
                  <Suspense>
                    <RecipeList />
                  </Suspense>
                </MainLayout>
              )
            },
            {
              path: 'chef/album-list',
              element: (
                <MainLayout>
                  <Suspense>
                    <AlbumList />
                  </Suspense>
                </MainLayout>
              )
            }
          ]
        }
      ]
    },

    {
      path: '/forgot-password',
      element: (
        <Suspense>
          <ForgotPassword />
        </Suspense>
      ),
      children: [
        {
          path: '',
          element: <SendEmail />
        },
        {
          path: 'confirm-otp',
          element: <InputConfirm />
        },
        {
          path: 'change-password',
          element: <ChangePassForm />
        },
        {
          path: 'success',
          element: <ChangeSuccess />
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
