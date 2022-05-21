import { useState } from 'react'
import { router } from '../../router'

export const LoginPage = () => {
  const [name, setName] = useState('')

  const onLogin = () => {
    if (!name) {
      alert('Name cannot be empty')
      return
    }
    localStorage.setItem('user', name)
    router.navigate('/')
  }

  return (
    <div>
      <input placeholder="name" onChange={(e) => setName(e.target.value)} />
      <button onClick={onLogin}>login</button>
    </div>
  )
}
