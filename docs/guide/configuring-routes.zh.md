# 配置路由

我们可以通过 Router 构造函数的 `routes` 参数配置路由：

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

- 当我们访问 `/` 时，页面上展示 `<Home>` 组件
- 当我们访问 `/about` 时，页面上展示 `<About>` 组件

## 动态路由匹配

有时我们需要动态匹配路由，比如我们想要根据不同的 ID 来展示对应的图书：

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

## Index 路由

这里的 index 路由概念完全与 react-router 中的一致：[index-routes](https://reactrouter.com/docs/en/v6/getting-started/tutorial#index-routes)

index 路由可以理解为默认子路由

比如以下路由定义，我们访问 `/books` 而不带 id 时，则以 index 路由组件来做一个占位展示

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

## 重定向路由

我们可以通过 redirect 属性来进行路由重定向：

```tsx | pure
import { Router } from 'oh-router'

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/about',
    },
    {
      path: '/about',
      element: <About />,
    },
  ],
})
```

## 精准匹配

得益于 react-router v6，当我们访问 `/teams/new` 时，如下代码将匹配到 `<NewTeamForm>`

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

## 404 路由

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
