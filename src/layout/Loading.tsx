import { css, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import LoaderAnimation from '../components/LoaderAnimation'
import { addCssProps } from '../themes/attachments'

const LoaderWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &.fixed {
    height: auto;
    width: auto;
    position: fixed;
    z-index: 1001;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  ${addCssProps}
`
interface LoadingProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  _css?: SerializedStyles
  _delay?: number
}
const Loading = ({ _css, _delay, ...props }: LoadingProps) => {
  return (
    <LoaderWrap _css={_css} {...props}>
      <LoaderAnimation
        _css={css`
          width: 150px;
          height: 150px;
        `}
        _delay={_delay}
      />
    </LoaderWrap>
  )
}
export default Loading
