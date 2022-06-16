# 获取路由参数

oh-router 提供了 `useParams` 方法获取参数

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

可以通过泛型获得更好的类型提示

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

## 在 Vue 中使用

在 Vue 中可以通过组合式 API `useParams` 访问路由参数，在无法使用组合式 API 时可以通过组件实例属性 `$location.params` 访问路由参数，详情查看：[在 Vue 中获取路由参数](/zh/guide/use-in-vue#%E8%8E%B7%E5%8F%96%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0)
