import CustomRouter from '@src/CustomRouter'
import RoutesComponent from '@src/routes'
import { RecoilRoot } from 'recoil'

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
