# 在 Vue 中使用

文档的示例均是基于 React 的，本篇将帮助你在 Vue 中使用 oh-router。

我们推荐你通过一个在线示例来学习：[在 StackBlitz 中打开](https://stackblitz.com/edit/oh-router-vue-basic)

## 安装和使用

首先安装依赖

```shell
$ npm install --save oh-router oh-router-vue
```

然后创建 Router 实例定义路由，将其在 Vue 中安装

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

// 注意此处需要调用 installForVue 方法
Vue.use(installForVue(router))

new Vue({
  el: '#app',
  render: (h) => h(App),
})
```

然后在根组件中使用 `<router-view>`

- src/app.vue

```html
<template>
  <router-view></router-view>
</template>
```

## 路由懒加载

路由懒加载可以得到更好的首屏渲染速度

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

## 获取路由参数

使用[组合式API](https://vuejs.org/guide/extras/composition-api-faq.html) `useParams` 来获取参数

```html
<script setup lang="ts">
  import { useParams } from 'oh-router-vue'
  const params = useParams()
</script>
```

可以通过 `watch` 监听参数变化

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

在无法使用组合式 API 的时候，可以通过当前组件实例上的 `$location.params` 属性获取参数

```html
<script lang="ts">
  export default {
    created() {
      this.$lcoation.params
    },
  }
</script>
```

通过 `watch` 监听参数变化

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

## 全局组件

### `<router-view>`

`<router-view>` 是定义在最外层的组件，它会开启路由监听，为所有路由子组件提供响应式的 location 上下文，并且渲染顶层路由匹配的组件

```html
<template>
  <div>
    <router-view />
  </div>
</template>
```

当你第一次进入页面时，路由匹配或中间件执行过程中页面会出现短暂的白屏，这时你可以通过插槽 `splash` 提供一个占位展示，以此为用户提供更好的体验

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

定义嵌套路由使用 `<router-outlet>`，这区别于 vue-router

![](https://cdn.jsdelivr.net/gh/lblblong/image-bed@main/1652246795661Untitled-2022-05-11-1247.png)

```html
<template>
  <div>
    <div>BaseLayout</div>
    <div>
      <!-- 这里的 router-outlet 会显示子路由的组件 -->
      <router-outlet />
    </div>
  </div>
</template>
```

### `<router-link>`

`<router-link>` 会渲染成一个 `<a>` 标签，但它被阻止了默认事件，让它可以在不重新加载页面的情况下更新 URL

```html
<template>
  <div>
    <router-link to="/">to home</router-link>
    <router-link to="/about">to about</router-link>
  </div>
</template>
```

## Hooks

能在 vue 中使用的 hooks

### useNavigate

获取一个导航方法

```html
<script lang="ts" setup>
  import { useNavigate } from 'oh-router-vue'
  const navigate = useNavigate()

  // 跳转到一个相对路径
  navigate('setting')
  // 跳转到一个绝对路径
  navigate('/user/setting')
  // 跳转并替换到一个相对路径
  navigate('settting', { replace: true })
</script>
```

### useLocation

获取当前 location

```html
<script lang="ts" setup>
  import { useLocation } from 'oh-router-vue'
  const location = useLocation()
</script>
```

### useParams

获取当前路径的所有路由参数

```html
<script lang="ts" setup>
  import { useParams } from 'oh-router-vue'
  const params = useParams()
</script>
```
