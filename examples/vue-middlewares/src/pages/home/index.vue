<template>
  <div>
    <div>Hi {{ user }}! <button @click="onLogout">logout</button></div>
  </div>
</template>

<script lang="ts" setup>
import { router } from '../../router'

const user = localStorage.getItem('user')

const onLogout = () => {
  localStorage.removeItem('user')
  router.navigate('/login')
}
</script>
