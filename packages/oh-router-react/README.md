# tanstack-router-middleware

[![npm version](https://img.shields.io/npm/v/tanstack-router-middleware)](https://www.npmjs.com/package/tanstack-router-middleware)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**为 TanStack Router 打造的基于类的中间件系统与类型安全守卫。**

`tanstack-router-middleware` 是 `@tanstack/react-router` 的一个轻量级增强库。它引入了类似 Koa/NestJS 的**中间件 (Middleware)** 机制，自动处理路由元数据（Meta/Context）合并，并提供优雅的取消与重定向逻辑，同时完美保留了原生的类型安全特性。

## ✨ 核心特性

*   🛡️ **基于类的中间件**：通过继承 `Middleware` 类，以管道模式组织鉴权、日志、埋点等逻辑。
*   🧬 **自动 Meta 合并**：在 `beforeLoad` 阶段自动合并父子路由的 `context`，无需手动遍历。
*   ⚡️ **灵活的 Root Context**：Root Route 的 Context 支持**静态对象**或**动态函数**。
*   🚦 **智能取消与重定向**：提供 `cancel()` 机制，自动记录被拦截前的页面位置（包含 Search Params），实现登录后无缝跳回。
*   💪 **TypeScript 优先**：完全保留 `@tanstack/react-router` 的类型推导，无 `any` 污染。

## 📦 安装

你需要同时安装本库和 `@tanstack/react-router`。

```bash
npm install tanstack-router-middleware @tanstack/react-router
# 或者
pnpm add tanstack-router-middleware @tanstack/react-router
# 或者
yarn add tanstack-router-middleware @tanstack/react-router
```

## 🚀 快速开始

### 1. 定义全局 Context 类型

首先定义应用中通用的路由上下文（Meta 数据）接口。

```typescript
// types.ts
export interface AppRouterContext {
  title?: string;
  auth?: boolean;   // 是否需要登录
  roles?: string[]; // 角色权限
}
```

### 2. 编写中间件

继承 `Middleware` 类来实现你的业务逻辑。

```typescript
// middlewares/AuthMiddleware.ts
import { Middleware, type MiddlewareContext, cancel } from 'tanstack-router-middleware';
import { AppRouterContext } from '../types';

export class AuthMiddleware extends Middleware<AppRouterContext> {
  // 1. register: 决定当前中间件是否需要运行
  register(ctx: MiddlewareContext<AppRouterContext>) {
    // 只有当路由配置了 auth: true 时才执行 handle
    // ctx.meta 已经包含了当前路由链上合并后的 context
    return !!ctx.meta.auth;
  }

  // 2. handle: 执行具体的业务逻辑
  async handle(ctx: MiddlewareContext<AppRouterContext>) {
    const isLogged = checkUserLoginStatus(); // 你的检查逻辑

    if (!isLogged) {
      // 抛出 cancel()，库会自动处理重定向并记录当前页面（含查询参数）
      throw cancel();
      
      // 或者你也可以手动重定向
      // throw redirect({ to: '/login' })
    }
  }
}
```

### 3. 创建 Root Route

使用 `createRootRouteWithMiddleware` 替代原生的 `createRootRouteWithContext`。

```tsx
// routes/__root.tsx
import { createRootRouteWithMiddleware } from 'tanstack-router-middleware';
import { Outlet } from '@tanstack/react-router';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { AppRouterContext } from '../types';

export const rootRoute = createRootRouteWithMiddleware<AppRouterContext>({
  // 注入中间件数组，按顺序执行
  middlewares: [new AuthMiddleware()],
  
  // 当中间件抛出 cancel() 时的默认跳转路径（通常是登录页）
  defaultCancelPath: '/login',
  
  // 初始 Context (支持对象或函数)
  // 方式一：静态对象
  context: { auth: false }, 
  
  // 方式二：动态函数 (支持异步)
  // context: async (ctx) => ({
  //   auth: false,
  //   serverTime: await fetchTime()
  // }),
  
  component: () => <Outlet />,
});
```

### 4. 定义子路由

像平时一样定义子路由。
**⚠️ 重要：为了让中间件生效，子路由的 `context` 建议定义为静态对象。**

```tsx
// routes/index.tsx
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';

// 🔒 需要登录的页面
export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  // ✅ 静态对象：中间件可以读取到 auth: true
  context: { auth: true, title: '控制台' }, 
  component: () => <div>Admin Page</div>,
});

// 🔓 公开页面
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  // ✅ 明确标记不需要鉴权
  context: { auth: false }, 
  component: () => <div>Login Page</div>,
});
```

### 5. 创建 Router 实例

这步与原生 TanStack Router 完全一致。

```tsx
// router.ts
import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './routes/__root';
import { adminRoute, loginRoute } from './routes/index';

const routeTree = rootRoute.addChildren([loginRoute, adminRoute]);

export const router = createRouter({
  routeTree,
  // 这里的 context 是运行时的初始状态
  context: { auth: false },
});

// 注册类型安全
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
```

---

## 📖 API 参考

### `createRootRouteWithMiddleware(options)`

创建带有中间件能力的 Root Route。

| 参数 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| `middlewares` | `Middleware[]` | 中间件实例数组，按顺序执行 | `[]` |
| `defaultCancelPath` | `string` | 捕获 `CancelError` 后的重定向目标路径 | `'/'` |
| `context` | `T \| (ctx) => T` | 根路由的 Context/Meta。支持静态对象或函数。 | - |
| `...others` | - | 其他 TanStack Router 原生配置 (loader, component等) | - |

### `class Middleware<Context>`

抽象基类，用于定义中间件。

*   **`register(ctx: MiddlewareContext): boolean`**
    *   用于过滤。返回 `true` 时，`handle` 方法会被调用；返回 `false` 则跳过。
*   **`abstract handle(ctx: MiddlewareContext): Promise<void> | void`**
    *   执行核心逻辑。如果验证失败，应抛出错误或重定向。

### `MiddlewareContext` 对象

传递给中间件的上下文对象，包含以下核心属性：

*   `meta`: `Context` - **核心属性**。已自动合并了：
    1.  Root Route 的 context (默认值)
    2.  当前匹配链上所有子路由的 context (覆盖值)
*   `to`: `ParsedLocation` - 即将前往的目标位置。
*   `from`: `ParsedLocation | undefined` - 来源位置。
*   `...others`: 包含 `router`, `params`, `search` 等原生属性。

### `cancel()`

一个辅助函数，用于中断导航。

*   当你在中间件中 `throw cancel()` 时：
    1.  库会检查是否存在 `lastLocation`（你从哪里被拦截的）。
    2.  如果有，它会自动携带这个位置信息（包括 `search` 参数）重定向到 `defaultCancelPath`。
    3.  如果当前已经在 `defaultCancelPath`，则停止重定向以防止死循环。

---

## ⚠️ 最佳实践与注意事项

### 关于 Context 的定义方式

1.  **Root Route (跟路由)**：
    *   ✅ 支持 **静态对象** 或 **动态函数**。
    *   函数在每次路由跳转前都会执行，适合放置全局动态数据。

2.  **Child Routes (子路由)**：
    *   ✅ 推荐使用 **静态对象** (`{ auth: true }`)。
    *   ❌ 不推荐使用函数。
    *   **原因**：中间件在 Root 层级运行，通过 `matchRoutes` 策略预先读取子路由配置。此时子路由的函数式 Context 尚未具备执行条件（参数可能未解析），因此中间件无法读取子路由的函数式 Context 返回值。

## 📄 License

MIT