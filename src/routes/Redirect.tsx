import { Location } from 'history'
import { Navigate, useLocation } from 'react-router-dom'

interface RedirectLocationProps extends Location {
  state: { redirect: string }
}
const Redirect = () => {
  const location = useLocation() as RedirectLocationProps
  const redirect = location.state?.redirect || '/'
  return (
    <>
      <Navigate to={redirect} replace />
    </>
  )
}
export default Redirect
