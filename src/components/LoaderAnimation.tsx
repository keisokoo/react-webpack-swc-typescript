import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import { addCssProps } from '../themes/attachments'
import lottie, {
  AnimationConfig,
  AnimationConfigWithData,
  LottiePlayer,
} from 'lottie-web'
import { MutableRefObject, useEffect, useRef } from 'react'
import { v4 as uuidV4 } from 'uuid'
import loader from '../lib/sources/loader.json'

const LoaderAnimationWrap = styled.div`
  ${addCssProps}
`
interface LottiePlayerExtend extends LottiePlayer {
  inBrowser: () => boolean
}
interface LoaderAnimationProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  _css?: SerializedStyles
  _config?: AnimationConfig
  _delay?: number
}
const LoaderAnimation = ({
  _config,
  _css,
  _delay,
  ...props
}: LoaderAnimationProps) => {
  const lottieRef = useRef() as MutableRefObject<HTMLDivElement>
  const nameRef = useRef(uuidV4()) as MutableRefObject<string>
  useEffect(() => {
    if (!nameRef.current) return
    let lottieName = nameRef.current
    let config: AnimationConfigWithData = {
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      name: lottieName,
      autoplay: true,
      animationData: loader,
    }
    if (_config) {
      config = { ...config, ..._config }
    }
    let lottiePlayer = lottie as LottiePlayerExtend
    const lottieDOM = lottieRef.current
    if (lottieDOM) {
      setTimeout(() => {
        if (!lottieDOM.querySelector('svg')) {
          lottie.loadAnimation(config)
        }
      }, _delay ?? 200)
    }
    return () => {
      lottiePlayer.destroy(lottieName)
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <LoaderAnimationWrap ref={lottieRef} _css={_css} {...props} />
    </>
  )
}
export default LoaderAnimation
