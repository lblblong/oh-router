English | [简体中文](./README.zh.md)
#### ☁ Try in the Cloud 
[![Open in VS Code](https://img.shields.io/badge/Open%20in-VS%20Code-blue?logo=visualstudiocode)](https://vscode.dev/github/lblblong/oh-router)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/lblblong/oh-router)
[![Open in CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/embed/react-markdown-preview-co1mj?fontsize=14&hidenavigation=1&theme=dark)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/lblblong/oh-router)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/lblblong/oh-router?template=node&title=ngx-vcard%20Example)
[![Open in Repl.it](https://replit.com/badge/github/withastro/astro)](https://replit.com/github/lblblong/oh-router)
[![Open in Glitch](https://img.shields.io/badge/Open%20in-Glitch-blue?logo=glitch)](https://glitch.com/edit/#!/import/github/lblblong/oh-router)
[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/lblblong/oh-router)

# oh-router

Router is an important part of front-end development. The mainstream framework has official or community provided router support, such as [vue-router](https://router.vuejs.org/index.html) and [react-router](https://reactrouter.com/), but they are deeply bound to the framework. oh-router wants to decouple the core capability of routing from the framework so that a consistent API can be used across different frameworks

Feature:

- Middleware out of the box
- `route match` and `hooks` consistent with the react-router usage experience
  - `route matching` and `hooks` are based directly on react-router v6
- Support Vue and React

## Install & Use

### Use in React

Installation from NPM

```shell
$ npm install --save oh-router oh-router-react
```

Below is the most basic use case that combines React：[Open in StackBlitz](https://stackblitz.com/edit/oh-router-react-base)

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

Below is the most basic use case that combines Vue：[Open in StackBlitz](https://stackblitz.com/edit/oh-router-vue-base)

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
