import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import HomeLanding from './pages/HomeLanding'

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      index: true,
      element: <HomeLanding />
    },
    {
      path: '/home',
      element: <Home />
    }
  ])
  return routeElement
}
