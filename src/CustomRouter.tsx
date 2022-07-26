import { createBrowserHistory } from 'history'
import { FC, PropsWithChildren } from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

const history = createBrowserHistory({ window })

const CustomRouter: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <HistoryRouter history={history} {...props}>
      {children}
    </HistoryRouter>
  )
}

export const rootNavigate = (to: string) => {
  history.push(to)
  window.scrollTo(0, 0)
}
export const rootReplace = (to: string) => {
  history.replace(to)
  window.scrollTo(0, 0)
}
export const backwardNavigate = () => {
  window.scrollTo(0, 0)
  history.back()
}

export default CustomRouter
