import { handleObjectToLocalStorage } from '@src/lib/utils'
import { useCallback } from 'react'
import {
  atom,
  DefaultValue,
  selector,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'

// ! 기본 타입 체크
export const isDefaultValue = (value: unknown): value is DefaultValue => {
  if (value instanceof DefaultValue) return true
  return false
}

export type AuthStatus = 'authorized' | 'unauthorized' | 'idle'

const tokenTitleList = [
  'accessToken',
  'accessTokenExpiresIn',
  'refreshToken',
  'refreshTokenExpiresIn',
] as const
export type TokenType = { [key in typeof tokenTitleList[number]]: string }
export const isToken = (token: any): token is TokenType => {
  return !tokenTitleList.some((keyName) => !token[keyName])
}
interface AuthStateType {
  token: TokenType | null
  authStatus: AuthStatus
}
export const isAuth = (value: any): value is AuthStateType => {
  return true
}
export const authState = atom<AuthStateType>({
  key: 'authState',
  default: {
    token: null,
    authStatus: 'idle',
  },
})
export const tokenControl = selector<TokenType | null>({
  key: 'tokenControl',
  get: ({ get }) => get(authState).token,
  set: ({ get, set }, newValue) => {
    let curr = get(authState)
    if (!isDefaultValue(newValue)) {
      curr = {
        ...curr,
        token: newValue,
        authStatus: newValue ? 'authorized' : 'unauthorized',
      }
    }
    return set(authState, curr)
  },
})
export const handleTokenToLocalStorage = async (token: TokenType) => {
  return await handleObjectToLocalStorage(token)
}
const useAuth = () => {
  const auth = useRecoilValue(authState)
  const setToken = useSetRecoilState(tokenControl)
  const resetToken = useResetRecoilState(authState)
  const reset = useCallback(() => {
    localStorage.clear()
    resetToken()
  }, [])
  return { ...auth, setToken, reset }
}
export default useAuth
