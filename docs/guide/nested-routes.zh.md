# 嵌套路由

和 react-router 中一样，只需要在父组件中使用 `<Outlet />`

```tsx | pure
import { Router } from 'oh-router'
import { Outlet } from 'oh-router-react'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* 
        当访问 "/messages" 时，这个元素将渲染 <DashboardMessages />
        当访问 "/tasks" 这个元素将渲染 <DashboardTasks />
        当访问 "/" 这个元素将渲染 <DashboardIndex />
      */}
      <Outlet />
    </div>
  )
}

const router = new Router({
  routes: [
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
  ],
})
```
