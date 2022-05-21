# Navigation

## Router.navigate

This is the most recommended way. It can be called anywhere, but please note: Don't use the relative path

```tsx | pure
import { Router } from 'oh-router'

const router = new Router(...)

// Jump to the path the /about
router.navigate('/about')
// Jump and replace to path /about
router.navigate('/about', {replace: true})
```

## Link

`Link` is a component, which is eventually rendered as a `<a>` tag, which can accept a relative path, and then obtain the absolute path according to the current position

```tsx | pure
const router = new Router({
  routes: [
    {
      path: '/user',
      element: () => {
        return (
          <div>
            <div>
              <Link to="setting">setting</Link> // render as <a href="/user/setting">setting</a>
              <Link to="/user/posts">posts</Link> // render as <a href="/user/posts">posts</a>
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
                  <Link to="email">email</Link> // render as <a href="/user/setting/email">email</a>
                  <Link to="/user/setting/password">password</Link> // render as <a href="/user/setting/password">password</a>
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

`usenavigate` is a hook function that can get a navigation method based on the current position

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
              <Button onClick={() => navigate('setting')}>setting</Button> // the path is：user/setting
              <Button onClick={() => navigate('posts')}>posts</Button> // the path is：user/posts
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
                  <Button onClick={() => navigate('email')}>email</Button> // the path is：user/setting/email
                  <Button onClick={() => navigate('password')}>password</Button> // the path is：user/setting/email
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
