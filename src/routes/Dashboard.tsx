import useAuth, { authState } from '@/lib/coils/auth'
import { PrimaryButton } from '@/themes/Buttons'
import styled from '@emotion/styled'
import { useRecoilCallback } from 'recoil'

const Wrap = styled.div``
const Dashboard = () => {
  const { reset } = useAuth()
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
      <PrimaryButton onClick={reset}>sign out</PrimaryButton>
      <button onClick={currentAuth}>check</button>
    </Wrap>
  )
}
export default Dashboard
