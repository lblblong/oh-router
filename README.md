# oh-router

Use the same Router API in Vue and React

[![npm version](https://img.shields.io/npm/v/oh-router.svg)](https://www.npmjs.com/package/oh-router)
[![npm downloads](https://img.shields.io/npm/dm/oh-router.svg)](https://www.npmjs.com/package/oh-router)

[中文文档](./README.zh.md)

## Features

- 🚀 Lightweight router library
- 🔄 Support for React and Vue
- 🛠️ Based on history API
- 🔧 Middleware support
- 📦 Nested routes support
- 🎯 TypeScript support

## Installation

### Core package

```bash
npm install oh-router
```

### React support

```bash
npm install oh-router oh-router-react
```

### Vue support

```bash
npm install oh-router oh-router-vue
```

## Usage in React

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

## Usage in Vue

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

## Middleware

oh-router supports middleware for route guards, authentication checks, etc.

### Defining a Middleware

```typescript
import { Middleware } from 'oh-router'

class AuthMiddleware extends Middleware {
  register(ctx) {
    // Return true if this middleware applies to the current route
    return ctx.to.pathname.startsWith('/protected')
  }

  async handler(ctx, next) {
    // Check if user is logged in
    const isLoggedIn = checkUserLoggedIn()
    if (!isLoggedIn) {
      // Redirect to login page
      ctx.router.navigate('/login')
      throw new Error('Unauthorized')
    }
    await next()
  }
}
```

### Using Middleware

```typescript
const router = new Router({
  routes: [...],
  middlewares: [new AuthMiddleware()]
})
```

## Documentation

For detailed documentation, see: [https://lblblong.github.io/oh-router/](https://lblblong.github.io/oh-router/)

## Examples

Check out the complete examples in the `examples/` directory:

- `react-basic` - Basic React usage
- `vue-basic` - Basic Vue usage
- `react-nested-routes` - React nested routes
- `vue-nested-routes` - Vue nested routes
- `react-middlewares` - React middleware usage
- `vue-middlewares` - Vue middleware usage

## Development

```bash
# Install dependencies
pnpm install

# Start documentation dev server
pnpm dev

# Build all packages
pnpm build

# Clean build files
pnpm clean
```

## Contributing

Issues and Pull Requests are welcome!

## License

MIT
