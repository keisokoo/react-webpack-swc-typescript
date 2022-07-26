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

export const isDefaultValue = (value: any): value is DefaultValue => {
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
  status: AuthStatus
}
export const isAuth = (value: any): value is AuthStateType => {
  return true
}
export const authState = atom<AuthStateType>({
  key: 'authState',
  default: {
    token: null,
    status: 'idle',
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
        status: newValue ? 'authorized' : 'unauthorized',
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
