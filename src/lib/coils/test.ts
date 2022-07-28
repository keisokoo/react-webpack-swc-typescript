import { number } from '@recoiljs/refine'
import { atom } from 'recoil'
import { syncEffect } from 'recoil-sync'

export const currentUserState = atom<number>({
  key: 'CurrentUser',
  default: 0,
  effects: [syncEffect({ refine: number() })],
})
