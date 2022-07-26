import styled from '@emotion/styled'
import { useEffect } from 'react'
import { rootNavigate } from '../CustomRouter'

const Page404Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface Page404Props {}
const Page404 = ({ ...props }: Page404Props) => {
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
