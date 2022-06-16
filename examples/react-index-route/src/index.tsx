import { RouterView } from 'oh-router-react'
import ReactDOM from 'react-dom/client'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterView router={router} />
)
