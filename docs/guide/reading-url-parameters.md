# Reading URL Parameters

Use `useParams` function get params 

```tsx | pure
import { Router } from 'oh-router-react'
import { useParams } from 'oh-router-react'

const router = new Router({
  routes: [
    {
      path: '/books/:type/:id',
      element: () => {
        const { type, id } = useParams()
      },
    },
  ],
})
```

Use generics to get better code prompts

```tsx | pure
import { Router } from 'oh-router-react'
import { useParams } from 'oh-router-react'

const router = new Router({
  routes: [
    {
      path: '/books/:type/:id',
      element: () => {
        const { type, id } = useParams<'type' | 'id'>()
      },
    },
  ],
})
```

## Use in Vue

Ordinary components can use the `$location.params` to get the parameters. And in `setup`, you can use the `useParams` function to obtain the parameters. Learn more：[Get params in Vue](/zh/guide/use-in-vue#%E8%8E%B7%E5%8F%96%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0)
