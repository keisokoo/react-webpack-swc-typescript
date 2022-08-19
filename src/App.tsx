import CustomRouter from '@/CustomRouter'
import RoutesComponent from '@/routes'
import Test from '@/Test'
import { RecoilRoot } from 'recoil'

const App = () => {
  return (
    <RecoilRoot>
      <CustomRouter>
        <RoutesComponent />
        <Test />
      </CustomRouter>
    </RecoilRoot>
  )
}

export default App
