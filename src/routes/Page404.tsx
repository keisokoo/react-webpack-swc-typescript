import { rootNavigate } from '@/CustomRouter'
import styled from '@emotion/styled'
import { useEffect } from 'react'

const Page404Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Page404 = () => {
  useEffect(() => {
    setTimeout(() => {
      rootNavigate('/')
    }, 2000)
  }, [])
  return (
    <>
      <Page404Wrap>Page 404 . . .</Page404Wrap>
    </>
  )
}
export default Page404
