import styled from '@emotion/styled'
import useAuth from '@src/lib/coils/auth'
import { useEffect, useState } from 'react'

const Wrap = styled.div``
const Dashboard = () => {
  const { reset } = useAuth()
  const [testValue, set_testValue] = useState<string>('')
  useEffect(() => {
    console.log('testValue', testValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrap>
      <div>Dashboard</div>
      <button onClick={reset}>sign out</button>
      <button onClick={() => set_testValue('haha')}>test</button>
    </Wrap>
  )
}
export default Dashboard
