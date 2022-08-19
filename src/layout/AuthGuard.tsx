import useAuth, {
  handleTokenToLocalStorage,
  isToken,
  TokenType,
} from '@/lib/coils/auth'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import Loading from './Loading'

interface AuthGuardProps {
  children?: React.ReactNode
}
console.log('dayjs', dayjs().add(3, 'minute').toISOString())
const AuthGuard = ({ children }: AuthGuardProps) => {
  const { authStatus, setToken } = useAuth()
  useEffect(() => {
    const checkAuth = async (token: TokenType) => {
      if (isToken(token)) {
        setToken(token)
      } else {
        setToken(null)
        localStorage.clear()
      }
    }
    if (authStatus === 'idle') {
      const localToken: TokenType = {
        accessToken: localStorage.getItem('accessToken') ?? '',
        accessTokenExpiresIn:
          localStorage.getItem('accessTokenExpiresIn') ?? '',
        refreshToken: localStorage.getItem('refreshToken') ?? '',
        refreshTokenExpiresIn:
          localStorage.getItem('refreshTokenExpiresIn') ?? '',
      }
      checkAuth(localToken)
    }
  }, [authStatus, setToken])
  if (authStatus === 'authorized') {
    return <>{children}</>
  } else if (authStatus === 'unauthorized') {
    return (
      <>
        <div>
          <button
            onClick={async () => {
              const testToken = {
                accessToken: 'access',
                accessTokenExpiresIn: dayjs().add(3, 'minute').toISOString(),
                refreshToken: 'refreshToken',
                refreshTokenExpiresIn: dayjs().add(1, 'year').toISOString(),
              }
              setToken(await handleTokenToLocalStorage(testToken))
            }}
          >
            Login
          </button>
        </div>
      </>
    )
  } else {
    return <Loading className="fixed" _rgba={[236, 69, 69, 1]} />
  }
}
export default AuthGuard
