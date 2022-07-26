import styled from '@emotion/styled'
import useAuth from '@src/lib/coils/auth'

const Wrap = styled.div``
const Dashboard = () => {
  const { reset } = useAuth()
  return (
    <Wrap>
      <div>Dashboard</div>
      <button onClick={reset}>sign out</button>
    </Wrap>
  )
}
export default Dashboard
