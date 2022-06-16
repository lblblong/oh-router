import { RouterView } from 'oh-router-react'
import ReactDOM from 'react-dom/client'
import { router } from './router'

function App() {
  return <RouterView router={router} splash={<div>加载中...</div>} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
