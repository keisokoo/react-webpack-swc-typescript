import { RecoilRoot } from 'recoil'
import CustomRouter from './CustomRouter'
import RoutesComponent from './routes'

const App = () => {
  return (
    <RecoilRoot>
      <CustomRouter>
        <RoutesComponent />
      </CustomRouter>
    </RecoilRoot>
  )
}

export default App
