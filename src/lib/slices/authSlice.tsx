import create, { StateCreator } from 'zustand'
export type AuthStateType = 'authorized' | 'unauthorized' | 'idle'
export type TokenType = {
  accessToken: string
  accessTokenExpiresIn: string
  refreshToken: string
  refreshTokenExpiresIn: string
}
export type CheckTokenType = Exclude<AuthStateType, 'idle'>

export interface AuthSlice {
  token: TokenType | null
  authState: AuthStateType
  setToken: (token: TokenType) => void
  unauthorize: () => void
  clearToken: () => void
}

export const createAuthSlice: StateCreator<AuthSlice, [], []> = (set) => ({
  token: null,
  authState: 'idle',
  setToken: (token: TokenType) =>
    set(() => ({
      token: {
        accessToken: token.accessToken,
        accessTokenExpiresIn: token.accessTokenExpiresIn,
        refreshToken: token.refreshToken,
        refreshTokenExpiresIn: token.refreshTokenExpiresIn,
      },
      authState: 'authorized',
    })),
  unauthorize: () => {
    set(() => ({ token: null, authState: 'unauthorized' }))
  },
  clearToken: () => {
    set(() => ({ token: null, authState: 'idle' }))
  },
})

export const authStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}))

export const getToken = (state: AuthSlice) => state.token

export const authStates = (state: AuthSlice) => ({
  authState: state.authState,
})
export const getAverage = (data: number[]) => {
  return data.reduce((a, b) => a + b, 0) / data.length
}
export const authActions = (state: AuthSlice) => ({
  setToken: state.setToken,
  unauthorize: state.unauthorize,
})
