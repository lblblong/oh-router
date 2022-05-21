import { router } from '../../router'

export const HomePage = () => {
  const user = localStorage.getItem('user')

  const onLogout = () => {
    localStorage.removeItem('user')
    router.navigate('/login')
  }

  return (
    <div>
      <div>
        Hi {user}! <button onClick={onLogout}>logout</button>
      </div>
    </div>
  )
}
