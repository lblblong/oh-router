import { Link } from 'oh-router-react'

export const HomePage = () => {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
      
      <div
        style={{
          width: 100,
          height: 100,
          background: 'red',
          color: 'white',
        }}
      >
        Home
      </div>
    </div>
  )
}
