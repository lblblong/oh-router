# Use In Vue

The examples in the documentation are all based on React, this article will help you use oh-router in Vue.

We recommend that you learn through an online example：[Open in StackBlitz](https://stackblitz.com/edit/oh-router-vue-basic)

## Install / Use

Install the dependencies first

```shell
$ npm install --save oh-router oh-router-vue
```

Then create a Router instance to define the route and install it in Vue

- src/index.ts

```ts
import Vue from 'vue'
import { Router } from 'oh-router'
import { installForVue } from 'oh-router-vue'
import Home from 'src/pages/home.vue'
import About from 'src/pages/about.vue'
import App from './app.vue'

const router = new Router({
  routes: [
    {
      path: '/',
      element: Home,
    },
    {
      path: '/about',
      element: About,
    },
  ],
})

// Note: You need to call the installForVue function here
Vue.use(installForVue(router))

new Vue({
  el: '#app',
  render: (h) => h(App),
})
```

Then use `<router-view>` in the root component

- src/app.vue

```html
<template>
  <router-view></router-view>
</template>
```

## Lazy Loading Routes

Lazy loading routes can get better rendering speed of the first screen

```ts
const router = new Router({
  routes: [
    {
      path: '/',
      element: import('src/pages/home.vue'),
    },
    {
      path: '/about',
      element: import('src/pages/about.vue'),
    },
  ],
})
```

## Reading URL Parameters

You can use `useParams` to read parameters in [setup]()

```html
<script setup lang="ts">
  import { useParams } from 'oh-router-vue'
  const params = useParams()
</script>
```

Use `watch` to listen for parameter changes

```html
<script setup lang="ts">
  import { watch } from 'vue'
  import { useParams } from 'oh-router-vue'
  const params = useParams()
  watch(params, (newParams) => {
    // do something
  })
</script>
```

When you cannot use the `setup`, the parameters can be read from `$location` on the current component instance

```html
<script lang="ts">
  export default {
    created() {
      this.$lcoation.params
    },
  }
</script>
```

Use `watch` to listen for parameter changes

```html
<script lang="ts">
  export default {
    created() {
      this.$watch(
        () => this.$location.params,
        () => {
          // do something
        }
      )
    },
  }
</script>
```

## Global Components

### `<router-view>`

`<router-view>` is a component defined at the outermost layer that listens for route changes, provides a `location` context for all route child components, and renders the components that match the top-level route

```html
<template>
  <div>
    <router-view />
  </div>
</template>
```

When entering the page for the first time, if there is a brief white screen during route matching or middleware execution, you can provide a placeholder display through slot `splash` to provide a better user experience

```html
<template>
  <div>
    <router-view>
      <template v-slot:splash><div>loading...</div></template>
    </router-view>
  </div>
</template>
```

### `<router-outlet>`

Nested routines are defined by using `<router-outlet>`, which is different from vue-router

![](https://cdn.jsdelivr.net/gh/lblblong/image-bed@main/1652246795661Untitled-2022-05-11-1247.png)

```html
<template>
  <div>
    <div>BaseLayout</div>
    <div>
      <!-- Render the matched child route component here -->
      <router-outlet />
    </div>
  </div>
</template>
```

### `<router-link>`

`<router-link>` renders as a `<a>` tag, but it blocks the default event, allowing it to update the URL without reloading the page</a></router-link>

```html
<template>
  <div>
    <router-link to="/">to home</router-link>
    <router-link to="/about">to about</router-link>
  </div>
</template>
```

## Hooks

Hooks that can be used in Vue

### useNavigate

Gets a navigation function

```html
<script lang="ts" setup>
  import { useNavigate } from 'oh-router-vue'
  const navigate = useNavigate()

  // Jump to a relative path
  navigate('setting')
  // Jump to an absolute path
  navigate('/user/setting')
  // Jump and replace to a relative path
  navigate('settting', { replace: true })
</script>
```

### useLocation

Get the current location

```html
<script lang="ts" setup>
  import { useLocation } from 'oh-router-vue'
  const location = useLocation()
</script>
```

### useParams

Get the parameters

```html
<script lang="ts" setup>
  import { useParams } from 'oh-router-vue'
  const params = useParams()
</script>
```
