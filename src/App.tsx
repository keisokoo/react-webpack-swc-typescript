import CustomRouter from '@src/CustomRouter'
import RoutesComponent from '@src/routes'
import { RecoilRoot } from 'recoil'
import { RecoilURLSyncJSON } from 'recoil-sync'

const App = () => {
  return (
    <RecoilRoot>
      <RecoilURLSyncJSON location={{ part: 'queryParams' }}>
        <CustomRouter>
          <RoutesComponent />
        </CustomRouter>
      </RecoilURLSyncJSON>
    </RecoilRoot>
  )
}

export default App
