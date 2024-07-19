<script setup lang="ts">
import { ref } from 'vue'
import ApolloExample from '@/components/ApolloExample.vue'
import URQLExample from '@/components/URQLExample.vue'
import FetchExample from '@/components/FetchExample.vue'
import AxiosExample from '@/components/AxiosExample.vue'
import VillusExample from '@/components/VillusExample.vue'

const currentExample = ref('apollo')

const examples = {
  apollo: ApolloExample,
  urql: URQLExample,
  fetch: FetchExample,
  axios: AxiosExample,
  villus: VillusExample
}
</script>

<template>
  <div class="graphql-view">
    <h1>GraphQL Integration Examples</h1>
    <nav>
      <button
        v-for="(_, key) in examples"
        :key="key"
        @click="currentExample = key"
        :class="{ active: currentExample === key }"
      >
        {{ key }}
      </button>
    </nav>
    <component :is="examples[currentExample as keyof typeof examples]" />
  </div>
</template>

<style scoped>
.graphql-view {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

nav {
  margin-bottom: 2rem;
}

button {
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  border-radius: 4px;
}

button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
