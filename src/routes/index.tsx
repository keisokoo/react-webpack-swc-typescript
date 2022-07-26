import AuthGuard from '@src/layout/AuthGuard'
import Layout from '@src/layout/Layout'
import Loading from '@src/layout/Loading'
import Dashboard from '@src/routes/Dashboard'
import Page404 from '@src/routes/Page404'
import Redirect from '@src/routes/Redirect'
import { Suspense } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'

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
