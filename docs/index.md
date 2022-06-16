---
title: oh-router
hero:
  title: oh-router
  desc: Use the same Router API in Vue and React
  actions:
    - text: Quick Started
      link: /guide
---

### Use in React

Installation from NPM

```shell
$ npm install --save oh-router oh-router-react
```

Below is the most basic use case that combines React：[Open in StackBlitz](https://stackblitz.com/edit/oh-router-react-basic)

```tsx | pure
import { Router } from 'oh-router'
import { RouterView, Link } from 'oh-router-react'
import ReactDOM from 'react-dom/client'

const router = new Router({
  routes: [
    {
      path: '/',
      element: () => (
        <div>
          <div>Home</div>
          <Link to="/about">to About</Link>
        </div>
      ),
    },
    {
      path: '/about',
      element: () => (
        <div>
          <div>About</div>
          <Link to="/">to Home</Link>
        </div>
      ),
    },
  ],
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterView router={router} />
)
```

### Use in Vue

Installation from NPM

```shell
$ npm install --save oh-router oh-router-vue
```

Below is the most basic use case that combines Vue：[Open in StackBlitz](https://stackblitz.com/edit/oh-router-vue-basic)

```html
<div id="app">
  <router-view />
</div>

<script>
  import { Router } from 'oh-router'
  import { installForVue } from 'oh-router-vue'
  import { createApp } from 'vue'

  const router = new Router({
    routes: [
      {
        path: '/',
        element: {
          template: `<div>
          <div>Home</div>
          <router-link to="/about">to About</router-link>
        </div`,
        },
      },
      {
        path: '/about',
        element: {
          template: `<div>
          <div>About</div>
          <router-link to="/">to Home</router-link>
        </div`,
        },
      },
    ],
  })

  const app = createApp({})
  app.use(installForVue(router))
  app.mount('#app')
</script>
```

### Use in Vanilla

[Open in StackBlitz](https://stackblitz.com/edit/oh-router-vanilla-basic)

```ts | pure
import Router from 'oh-router'

const app = document.querySelector<HTMLDivElement>('#app')!

const routes = [
  {
    path: '/',
    element: `<div>Home</div>
    <div>
      <button onclick="to('/libs')">libs</button>
      <button onclick="to('/languages')">languages</button>
    </div>`,
    children: [
      {
        path: '/libs',
        element: `<ul>
          <li onclick="to('/libs/react')"><button>React</button></li>
          <li onclick="to('/libs/vue')"><button>Vue</button></li>
        <ul/>`,
      },
      {
        path: '/libs/:name',
        element: `Lib: `,
        name: 'lib-detail',
      },
      {
        path: '/languages',
        element: `<ul><li>Java</li><li>Go</li><ul/>`,
      },
    ],
  },
  {
    path: '*',
    element: '404',
  },
]

const router = new Router({ routes })
  .addLocationListener((location) => {
    let content = location.matched.map(({ route }) => route.element).join('\n')
    const lastRoute = location.matched[location.matched.length - 1]

    if (lastRoute.route.name === 'lib-detail') {
      content += lastRoute.params.name
    }

    app.innerHTML = content
  })
  .start()

window.to = function to(path: string) {
  router.navigate(path)
}
```
