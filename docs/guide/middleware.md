# Middleware

Middleware is the best feature in oh-router, it is similar to the navigation guard in vue-router, but a little bit different.

It is very useful when you are writing an application with a complex page permission system.

For example, when you are writing a admin system, you may have the following requirements:

- Except for the `/login` path, all other pages need to be logged in before they can be accessed
- Only super administrators can access the `/userManager` path

This is very simple for oh-router, you only need to define two middlewares, one to determine the login status and one to determine the user's identity, then let's implement it together.

#### 1. Configuring routes

First we need to create a Router instance and configure routes.

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
          // Define some additional data
          meta: {
            // Use an array to store the permission list that allows entering the current path
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

#### 2. Create middleware for login check

If path is not `/login` then login is required

```ts
import { Middleware } from 'oh-router'
import { router } from './router'
import store from 'src/store' // We assume that user information is here

export class MustLoginMiddleware extends Middleware {
  handler = async (ctx, next) => {
    if (store.user.hasLogin()) {
      // If the user has logged in, then do the next step
      await next()
    } else {
      // else redirect to '/login'
      router.navigate('/login')
    }
  }

  register = ({ to }) => {
    // If the path is not '/login', then register the middleware
    return to.pathname !== '/login'
  }
}
```

#### 3. Create role check middleware

We can use the previously defined `meta.role` to determine whether the user has permission to access the current page.

```ts
import { Middleware } from 'oh-router'
import { router } from './router'
import store from 'src/store' // We assume that user information is here

export class RoleCheckMiddleware extends Middleware {
  handler = async ({ to }, next) => {
    if (to.meta.role!.indexOf(store.user.role) !== -1) {
      // If the user permissions exist in meta.role, then do the next step
      await next()
    } else {
      // else redirect to '/'
      alert('permission denied！')
      router.navigate('/')
    }
  }

  register = ({ to }) => {
    // If meta.role exists, then register the middleware
    return !!to.meta.role
  }
}
```

#### 4. Register middleware in Router

Now let's modify the code in the first step to register the middleware in the Router.

```ts
import { MustLoginMiddleware } from './middleware/mustLogin'
import { RoleCheckMiddleware } from './middleware/roleCheck'

export const router = new Router({
  routes: [...],
  // Array order is also the order of execution
  middlewares: [
    new MustLoginMiddleware(),
    new RoleCheckMiddleware()
  ]
})
```

Now, we're all done! These middleware will keep our information safe as we navigate the page.
