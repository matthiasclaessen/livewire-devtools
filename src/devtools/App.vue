<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Livewire DevTools')
</script>

<template>
  <div class="app-container">
    <h1>{{ title }}</h1>
    <p>Welcome to Livewire DevTools UI built with Vue 3!</p>
  </div>
</template>

<style scoped>
.app-container {
  padding: 2rem;
  text-align: center;
  background-color: #f9f9f9;

  h1 {
    color: #42b983;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
}
</style>
