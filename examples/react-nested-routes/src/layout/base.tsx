import { Link, Outlet } from 'oh-router-react'
import { FC } from 'react'

export const BaseLayout: FC = () => {
  return (
    <div className="index">
      <div style={{ padding: 8 }}>
        <Outlet />
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderTop: '1px solid #dfdfdf',
        }}
      >
        <Link to="/">Home</Link>|<Link to="/about">About</Link>
      </div>
    </div>
  )
}
