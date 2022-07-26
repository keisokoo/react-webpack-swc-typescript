import { Suspense } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import AuthGuard from '../layout/AuthGuard'
import Layout from '../layout/Layout'
import Loading from '../layout/Loading'
import Dashboard from './Dashboard'
import Page404 from './Page404'
import Redirect from './Redirect'

export const mainRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
]
export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: mainRoutes,
  },
  {
    path: '/redirect',
    element: (
      <Suspense fallback={<Loading />}>
        <Redirect />
      </Suspense>
    ),
  },
  { path: '*', element: <Page404 /> },
]
const RoutesComponent = () => {
  let element = useRoutes(routes)
  return <>{element}</>
}
export default RoutesComponent
