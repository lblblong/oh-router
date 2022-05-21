# 路由中间件

路由中间件是 oh-router 中最棒的功能，它和 vue-router 中的导航守卫类似，但又有些不同。

当你在写一个页面权限系统复杂的应用时，它非常有用。

比如当你在写一个后台管理系统，你可能有这样的需求：

- 除了 `/login` 路径之外，其他所有页面都需要登陆后才能访问
- `/userManager` 路径只有超级管理员可以访问

这个对于 oh-router 来说非常简单，你只需要定义两个中间件，一个判断登陆状态，一个判断用户身份，接下来让我们一起实现它。

#### 1. 定义路由

首先我们需要创建 Router 实例，配置路由

```ts
export const router = new Router({
  routes: [
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <AdminLayout />,
      children: [
        {
          path: '/userManager',
          element: <UserManager />,
          // 这里的 meta 等会会在中间件中用到
          meta: {
            // 我们通过一个数组来标识当前路径允许的身份列表
            role: ['super'],
          },
        },
        {
          path: '/articleManager',
          element: <ArticleManager />,
        },
      ],
    },
  ],
})
```

#### 2. 定义登陆检查的中间件

我们可以通过判断路径是否是 `/login` 来判断是否需要登陆

```ts
import { Middleware } from 'oh-router'
import { router } from './router'
import store from 'src/store' // 我们假设用户信息在 store 中

export class MustLoginMiddleware extends Middleware {
  handler = async (ctx, next) => {
    if (store.user.hasLogin()) {
      // 已登录则放行
      await next()
    } else {
      // 没登陆前往登陆
      router.navigate('/login')
    }
  }

  register = ({ to }) => {
    // 如果 path 不是 '/login' 则为当前路由注册该中间件
    return to.pathname !== '/login'
  }
}
```

#### 3. 定义身份检查中间件

我们可以通过前面定义的 `meta.role` 来判断用户是否够权限访问当前页面

```ts
import { Middleware } from 'oh-router'
import { router } from './router'
import store from 'src/store' // 我们假设用户信息在 store 中

export class RoleCheckMiddleware extends Middleware {
  handler = async ({ to }, next) => {
    if (to.meta.role!.indexOf(store.user.role) !== -1) {
      // 用户权限在当前页面允许的权限内则放行
      await next()
    } else {
      // 用户无权访问则弹窗警告并重定向到首页
      alert('无权访问！')
      router.navigate('/')
    }
  }

  register = ({ to }) => {
    // 如果 meta.role 存在的话则为当前路由注册该中间件
    return !!to.meta.role
  }
}
```

#### 4. 将中间件注册到 Router 中

现在让我们修改第一步的代码，将中间件注册到 Router 中

```ts
import { MustLoginMiddleware } from './middleware/mustLogin'
import { RoleCheckMiddleware } from './middleware/roleCheck'

export const router = new Router({
  routes: [...],
  // 注册顺序也是中间件执行顺序
  middlewares: [
    new MustLoginMiddleware(),
    new RoleCheckMiddleware()
  ]
})
```

现在，我们已经大功告成！当我们进行路由跳转时，这些中间件会为我们的系统安全保驾护航。
