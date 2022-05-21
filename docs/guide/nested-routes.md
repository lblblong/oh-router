# Nested Routes

Like react-router, you need to use `<Outlet />`

```tsx | pure
import { Router } from 'oh-router'
import { Outlet } from 'oh-router-react'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* 
        If path is "/messages"，show <DashboardMessages />
        If path is "/tasks"，show <DashboardTasks />
        If path is "/"，show <DashboardIndex />
      */}
      <Outlet />
    </div>
  )
}

const router = new Router([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: 'messages',
        element: <DashboardMessages />,
      },
      {
        path: 'tasks',
        element: <DashboardTasks />,
      },
    ],
  },
])
```
