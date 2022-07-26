interface AuthGuardProps {
  children?: React.ReactNode
}
const AuthGuard = ({ children, ...props }: AuthGuardProps) => {
  return <>{children}</>
}
export default AuthGuard
