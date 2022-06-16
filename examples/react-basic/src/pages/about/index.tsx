import { Link } from 'oh-router-react'

export const AboutPage = () => {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>

      <div
        style={{
          width: 100,
          height: 100,
          background: 'blue',
          color: 'white',
        }}
      >
        About
      </div>
    </div>
  )
}
