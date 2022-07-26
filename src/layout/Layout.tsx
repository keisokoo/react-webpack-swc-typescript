import { Outlet } from 'react-router-dom'

interface LayoutProps {}
const Layout = ({ ...props }: LayoutProps) => {
  return (
    <>
      <Outlet />
    </>
  )
}
export default Layout
