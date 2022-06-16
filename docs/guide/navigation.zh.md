# 路由导航

## Router.navigate

这是最推荐的一种路由导航方式，它可以在任何地方调用，但是请注意，它只能接收绝对路径

```tsx | pure
import { Router } from 'oh-router'

// 你应该导出它，方便在任何地方导入调用
export const router = new Router(...)

// 跳转到 /about
router.navigate('/about')
// 跳转并替换到 /about 路径
router.navigate('/about', { replace: true })
```

## Link

`Link` 是一个组件，它最终被渲染为一个 `<a>` 标签，它可以接受一个相对路径，然后根据当前位置得到绝对路径

```tsx | pure
const router = new Router({
  routes: [
    {
      path: '/user',
      element: () => {
        return (
          <div>
            <div>
              <Link to="setting">setting</Link> // 渲染为 <a href="/user/setting">setting</a>
              <Link to="/user/posts">posts</Link> // 渲染为 <a href="/user/posts">posts</a>
            </div>
            <Outlet />
          </div>
        )
      },
      children: [
        {
          path: 'setting',
          element: () => {
            return (
              <div>
                <div>
                  <Link to="email">email</Link> // 渲染为 <a href="/user/setting/email">email</a>
                  <Link to="/user/setting/password">password</Link> // 渲染为 <a href="/user/setting/password">password</a>
                </div>
                <Outlet />
              </div>
            )
          },
          chidlren: [...]
        },
      ],
    },
  ]
})
```

## useNavigate

`useNavigate` 是一个 hook 函数，它可以获得一个基于当前位置的导航方法

```tsx | pure
const router = new Router({
  rotues: [
    {
      path: '/user',
      element: () => {
        const navigate = useNavigate()

        return (
          <div>
            <div>
              <Button onClick={() => navigate('setting')}>setting</Button> // 这里的路径为：user/setting
              <Button onClick={() => navigate('posts')}>posts</Button> // 这里的路径为：user/posts
            </div>
            <Outlet />
          </div>
        )
      },
      children: [
        {
          path: 'setting',
          element: () => {
            const navigate = useNavigate()

            return (
              <div>
                <div>
                  <Button onClick={() => navigate('email')}>email</Button> // 这里的路径为：user/setting/email
                  <Button onClick={() => navigate('password')}>password</Button> // 这里的路径为：user/setting/email
                </div>
                <Outlet />
              </div>
            )
          },
          chidlren: [...]
        },
      ],
    },
  ]
})
```
