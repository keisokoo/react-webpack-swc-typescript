import styled from '@emotion/styled'
import useAuth, { authState } from '@src/lib/coils/auth'
import { currentUserState } from '@src/lib/coils/test'
import { useRecoilCallback, useRecoilState } from 'recoil'

const Wrap = styled.div``
const Dashboard = () => {
  const { reset } = useAuth()
  const [aa, set_aa] = useRecoilState(currentUserState)
  // https://recoiljs.org/docs/api-reference/core/useRecoilCallback/
  const currentAuth = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const authContents = await snapshot.getPromise(authState)
        console.log('current auth is: ', authContents)
      },
    []
  )
  return (
    <Wrap>
      <div>Dashboard</div>
      <div>{aa}</div>

      <button onClick={() => set_aa((curr) => curr + 1)}>recoil sync</button>
      <button onClick={reset}>sign out</button>
      <button onClick={currentAuth}>check</button>
    </Wrap>
  )
}
export default Dashboard
