import { useEffect } from 'react'
import useAuth, {
  handleTokenToLocalStorage,
  isToken,
  TokenType,
} from '../lib/coils/auth'

interface AuthGuardProps {
  children?: React.ReactNode
}
const AuthGuard = ({ children, ...props }: AuthGuardProps) => {
  const { status, setToken } = useAuth()
  useEffect(() => {
    const checkAuth = async (token: TokenType) => {
      if (isToken(token)) {
        setToken(token)
      } else {
        setToken(null)
        localStorage.clear()
      }
    }
    if (status === 'idle') {
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
  }, [status])
  if (status === 'authorized') {
    return <>{children}</>
  } else {
    return (
      <>
        <div>
          <button
            onClick={async () => {
              let testToken = {
                accessToken:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJsIjowLCJpYXQiOjE2NTg3OTY4NjcsImV4cCI6MTY1ODc5NzQ2N30.n0J56HnDAZfhIZgQA8NnqL9psMDaVgjh-F2f5P8Loro',
                accessTokenExpiresIn: '2022-07-26 10:04:27.12400 GMT+9',
                refreshToken:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJsIjowLCJoIjoiJDJiJDEwJHJEOWRlV2cubTAud1ZUOWZ5eERQdi5BcFV5TDZDTFgzS0t1b1dJdVdNQlFNUGs3THpIdVZTIiwiaWF0IjoxNjU4Nzk2ODY3LCJleHAiOjE2NjEzODg4Njd9.1dTmZx6CHhX2yD-YECX7pZKk7wwnl5DT5GKcSIcgYtM',
                refreshTokenExpiresIn: '2022-08-25 09:54:27.12400 GMT+9',
              }
              setToken(await handleTokenToLocalStorage(testToken))
            }}
          >
            Login
          </button>
        </div>
      </>
    )
  }
}
export default AuthGuard
