<template>
  <div>The name of the book is《{{ params.name }}》</div>
</template>

<script setup lang="ts">
import { useParams } from 'oh-router-vue'
const params = useParams()
</script>
