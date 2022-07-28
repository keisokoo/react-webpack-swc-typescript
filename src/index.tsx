import App from '@src/App'
import '@src/index.scss'
import 'modern-normalize/modern-normalize.css'
import ReactDOM from 'react-dom/client'

const rootEl = document.getElementById('root')
if (rootEl !== null) {
  ReactDOM.createRoot(rootEl).render(<App />)
}
