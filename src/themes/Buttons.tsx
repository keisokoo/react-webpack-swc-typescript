import { css } from '@emotion/react'
import styled from '@emotion/styled'
export const TestStyle = css`
  border: 2px solid #ccc;
`
export const ButtonDefault = styled.button`
  background-color: red;
`

export const PrimaryButton = styled(ButtonDefault)`
  color: cyan;
  ${TestStyle}
`
