import loader from '@/lib/sources/loader.json'
import { addCssProps } from '@/themes/attachments'
import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import lottie, {
  AnimationConfig,
  AnimationConfigWithData,
  LottiePlayer,
} from 'lottie-web/build/player/lottie_light'
import { MutableRefObject, useEffect, useRef } from 'react'
import { v4 as uuidV4 } from 'uuid'

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
  _rgba?: [number, number, number, number]
  _css?: SerializedStyles
  _config?: AnimationConfig
  _delay?: number
}
const replaceTo255 = (num: number) => {
  return num / 255
}
const rgbaReplace = (r: number, g: number, b: number, a: number) => {
  const loaderString = JSON.stringify(loader)
  const parsed = loaderString.replaceAll(
    '0.247,0.247,0.247,1',
    `${replaceTo255(r)},${replaceTo255(g)},${replaceTo255(b)},${a}`
  )
  return JSON.parse(parsed)
}
const LoaderAnimation = ({
  _rgba,
  _config,
  _css,
  _delay,
  ...props
}: LoaderAnimationProps) => {
  const lottieRef = useRef() as MutableRefObject<HTMLDivElement>
  const nameRef = useRef(uuidV4()) as MutableRefObject<string>
  useEffect(() => {
    if (!nameRef.current) return
    let replaced = loader
    if (_rgba) {
      replaced = rgbaReplace(_rgba[0], _rgba[1], _rgba[2], _rgba[3])
    }
    const lottieName = nameRef.current
    let config: AnimationConfigWithData = {
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      name: lottieName,
      autoplay: true,
      animationData: replaced,
    }
    if (_config) {
      config = { ...config, ..._config }
    }
    const lottiePlayer = lottie as LottiePlayerExtend
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
