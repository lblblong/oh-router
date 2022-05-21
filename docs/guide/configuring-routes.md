# Configuring Routes

Configure routes in the following ways.

```tsx | pure
import { Router } from 'oh-router'

const router = new Router({
  routes: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/about',
      element: <About />,
    },
  ],
})
```

- When the path is `/`, render `<Home>`
- When the path is `/about`, render `<About>`

## Dynamic Routes

Sometimes we need to dynamically match the route, for example, we want to show the book corresponding to the ID:

```tsx | pure
import { useParams } from 'oh-router-react'
import { Router } from 'oh-router'

function Book() {
  const { id } = useParams()
  const { title, content } = fetchNews(id)
  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
    </div>
  )
}

const router = new Router({
  routes: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/books/:id',
      element: <Book />,
    },
  ],
})
```

## Index Routes

The index routes concept here is exactly the same as in react-router: [index-routes](https://reactrouter.com/docs/en/v6/getting-started/tutorial#index-routes)

The index routes can be understood as the default subroute

For example, the following code, when the path is /books, render `<div>Please select a book</div>`

```tsx | pure
import { Router } from 'oh-router'

const router = new Router({
  routes: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/books',
      children: [
        {
          index: true,
          element: () => <div>Please select a book</div>,
        },
        {
          path: ':id',
          element: <BookDetail />,
        },
      ],
    },
  ],
})
```

## Redirect

We can use the redirect attribute for redirection:

```tsx | pure
import { Router } from 'oh-router'

const router = new Router([
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    element: () => <div>Home</div>,
  },
])
```

## Accurate Matching

Thanks to React-Router V6, when the path is `/teams/new`, the following code will render `<NewTeamForm>`

```tsx | pure
import { Router } from 'oh-router'

const router = new Router({
  routes: [
    {
      path: '/teams',
      element: <Teams />,
      children: [
        {
          path: ':id',
          element: <Team />,
        },
        {
          path: 'new',
          element: <NewTeamForm />,
        },
      ],
    },
  ],
})
```

## 404 - Not Found

```tsx | pure
import { Router } from 'oh-router'

const router = new Router({
  routes: [
    ...,
    {
      path: '*',
      element: <NotFound />
    },
  ]
})
```
