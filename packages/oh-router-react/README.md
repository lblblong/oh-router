# oh-router-react

一个基于 [@tanstack/react-router](https://tanstack.com/router) 的轻量级 React 路由库，提供中间件支持和导航取消功能。

## 特性

- 🚀 基于 TanStack Router，性能优异
- 🛠️ 内置中间件系统，支持路由守卫和预处理
- ❌ 导航取消功能，灵活控制路由跳转
- 🔧 TypeScript 支持，类型安全

## 安装

```bash
npm install oh-router-react
# 或
yarn add oh-router-react
# 或
pnpm add oh-router-react
```

## 对等依赖

确保你的项目中已安装以下对等依赖：

- `react >= 16`
- `react-dom >= 16`

## 快速开始

```tsx
import { createRouter, createRootRoute, createRoute } from 'oh-router-react'

const rootRoute = createRootRoute({
  component: () => <div>Hello World!</div>,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Index</div>,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = createRouter({
  routeTree,
})

export default router
```

## 路由配置

使用自定义的 `createRouter` 函数配置路由：

```tsx
import { createRouter } from 'oh-router-react'

const router = createRouter({
  routes: [
    {
      path: '/',
      component: () => <div>Home</div>,
    },
    {
      path: '/about',
      component: () => <div>About</div>,
    },
    {
      path: '/user/$id',
      component: () => <div>User</div>,
    },
  ],
})
```

### 嵌套路由

```tsx
const router = createRouter({
  routes: [
    {
      path: '/',
      component: () => <div>Home</div>,
      children: [
        {
          path: 'dashboard',
          component: () => <div>Dashboard</div>,
        },
        {
          path: 'settings',
          component: () => <div>Settings</div>,
        },
      ],
    },
  ],
})
```

### 懒加载路由

```tsx
const router = createRouter({
  routes: [
    {
      path: '/lazy',
      lazy: () => import('./LazyComponent'),
    },
  ],
})
```

## 中间件

中间件允许你在路由加载前执行逻辑，如身份验证、权限检查等。

```tsx
import { Middleware } from 'oh-router-react'

class AuthMiddleware extends Middleware {
  register(ctx) {
    // 返回 true 表示此中间件适用于当前路由
    return ctx.to.pathname.startsWith('/protected')
  }

  async handle(ctx) {
    const isAuthenticated = checkAuth()
    if (!isAuthenticated) {
      throw redirect('/login')
    }
  }
}

const router = createRouter({
  routes: [...],
  middlewares: [new AuthMiddleware()],
})
```

## 导航取消

使用 `cancel` 函数取消当前导航：

```tsx
import { cancel } from 'oh-router-react'

class SomeMiddleware extends Middleware {
  async handle(ctx) {
    if (someCondition) {
      cancel() // 取消导航
    }
  }
}
```

## API 参考

### createRouter(options)

创建路由器实例。

**参数：**

- `routes`: `IRoute[]` - 路由配置数组
- `middlewares`: `Middleware[]` - 中间件数组
- 其他选项继承自 TanStack Router 的 `RouterOptions`

**返回值：** Router 实例

### IRoute

路由配置接口。

```tsx
type IRoute<T = any> = {
  meta?: T
  children?: IRoute<T>[]
} & ({ path: string } | { id: string }) &
  ({ component: () => ReactNode } | { lazy: () => Promise<ILazyRoute<T>> })
```

### Middleware

中间件抽象类。

```tsx
abstract class Middleware<M extends {}> {
  register(ctx: MiddlewareContext<M>): boolean
  abstract handle(ctx: MiddlewareContext<M>): Promise<void>
}
```

### cancel()

取消当前导航。

**返回值：** `CancelError` 实例

## 示例

查看 [`examples/react-*`](../examples/) 目录中的完整示例。

## 许可证

MIT
