# oh-router

使用相同的路由器 API 在 Vue 和 React 中

[![npm version](https://img.shields.io/npm/v/oh-router.svg)](https://www.npmjs.com/package/oh-router)
[![npm downloads](https://img.shields.io/npm/dm/oh-router.svg)](https://www.npmjs.com/package/oh-router)

## 特性

- 🚀 轻量级路由库
- 🔄 支持 React 和 Vue
- 🛠️ 基于 history API
- 🔧 支持中间件
- 📦 支持嵌套路由
- 🎯 TypeScript 支持

## 安装

### 核心包

```bash
npm install oh-router
```

### React 支持

```bash
npm install oh-router oh-router-react
```

### Vue 支持

```bash
npm install oh-router oh-router-vue
```

## 在 React 中使用

```tsx
import { Router } from 'oh-router'
import { RouterView, Link } from 'oh-router-react'

const router = new Router({
  routes: [
    {
      path: '/',
      element: () => <div>Home</div>,
    },
    {
      path: '/about',
      element: () => <div>About</div>,
    },
  ],
})

function App() {
  return <RouterView router={router} />
}
```

## 在 Vue 中使用

```typescript
import { createApp } from 'vue'
import { Router } from 'oh-router'
import { installForVue } from 'oh-router-vue'

const router = new Router({
  routes: [
    {
      path: '/',
      element: HomeComponent,
    },
    {
      path: '/about',
      element: AboutComponent,
    },
  ],
})

const app = createApp(App)
app.use(installForVue(router))
```

## 中间件

oh-router 支持中间件，用于路由守卫、权限检查等。

### 定义中间件

```typescript
import { Middleware } from 'oh-router'

class AuthMiddleware extends Middleware {
  register(ctx) {
    // 返回 true 表示此中间件适用于当前路由
    return ctx.to.pathname.startsWith('/protected')
  }

  async handler(ctx, next) {
    // 检查用户是否已登录
    const isLoggedIn = checkUserLoggedIn()
    if (!isLoggedIn) {
      // 重定向到登录页
      ctx.router.navigate('/login')
      throw new Error('Unauthorized')
    }
    await next()
  }
}
```

### 使用中间件

```typescript
const router = new Router({
  routes: [...],
  middlewares: [new AuthMiddleware()]
})
```

## 文档

详细文档请查看：[https://lblblong.github.io/oh-router/](https://lblblong.github.io/oh-router/)

## 例子

查看 `examples/` 目录中的完整示例：

- `react-basic` - React 基础使用
- `vue-basic` - Vue 基础使用
- `react-nested-routes` - React 嵌套路由
- `vue-nested-routes` - Vue 嵌套路由
- `react-middlewares` - React 中间件使用
- `vue-middlewares` - Vue 中间件使用

## 开发

```bash
# 安装依赖
pnpm install

# 启动文档开发服务器
pnpm dev

# 构建所有包
pnpm build

# 清理构建文件
pnpm clean
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
