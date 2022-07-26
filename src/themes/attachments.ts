import { css, SerializedStyles } from '@emotion/react'

export const addCssProps = ({ _css }: { _css?: SerializedStyles | string }) =>
  typeof _css === 'string' ? css(_css) : _css ? _css : css``
