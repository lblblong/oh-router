import { RouterView } from 'oh-router-react'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback="loading">
    <RouterView router={router} />
  </Suspense>
)
