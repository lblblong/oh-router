<template>
  <div>
    <input placeholder="name" v-model="name" />
    <button @click="onLogin">login</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { router } from '../../router'

const name = ref('')

const onLogin = () => {
  if (!name.value) {
    alert('Name cannot be empty')
    return
  }
  localStorage.setItem('user', name.value)
  router.navigate('/')
}
</script>
