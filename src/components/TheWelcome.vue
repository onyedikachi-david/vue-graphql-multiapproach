<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import { h, ref } from 'vue'

const ApolloIcon = () => h('div', { class: 'icon apollo' }, 'A')
const URQLIcon = () => h('div', { class: 'icon urql' }, 'U')
const VueApolloIcon = () => h('div', { class: 'icon vue-apollo' }, 'VA')
const FetchIcon = () => h('div', { class: 'icon fetch' }, 'F')
const AxiosIcon = () => h('div', { class: 'icon axios' }, 'AX')
const VillusIcon = () => h('div', { class: 'icon villus' }, 'V')

const selectedMethod = ref('')
</script>

<template>
  <div class="welcome-container">
    <h1>Welcome to GraphQL-Vue Integration</h1>
    <p>
      Explore different methods to integrate GraphQL with Vue applications (click on the buttons for
      more details):
    </p>

    <div class="method-selector">
      <button @click="selectedMethod = 'apollo'" :class="{ active: selectedMethod === 'apollo' }">
        Apollo
      </button>
      <button @click="selectedMethod = 'urql'" :class="{ active: selectedMethod === 'urql' }">
        URQL
      </button>
      <button
        @click="selectedMethod = 'vue-apollo'"
        :class="{ active: selectedMethod === 'vue-apollo' }"
      >
        Vue Apollo
      </button>
      <button @click="selectedMethod = 'fetch'" :class="{ active: selectedMethod === 'fetch' }">
        Fetch API
      </button>
      <button @click="selectedMethod = 'axios'" :class="{ active: selectedMethod === 'axios' }">
        Axios
      </button>
      <button @click="selectedMethod = 'villus'" :class="{ active: selectedMethod === 'villus' }">
        Villus
      </button>
    </div>

    <div class="method-details" v-if="selectedMethod">
      <WelcomeItem v-if="selectedMethod === 'apollo'">
        <template #icon><ApolloIcon /></template>
        <template #heading>Apollo Client</template>
        Apollo Client is a comprehensive state management library for GraphQL. It enables you to
        easily build UI components that fetch data via GraphQL.
      </WelcomeItem>

      <WelcomeItem v-if="selectedMethod === 'urql'">
        <template #icon><URQLIcon /></template>
        <template #heading>URQL</template>
        URQL is a highly customizable and versatile GraphQL client with a focus on simplicity and
        extensibility.
      </WelcomeItem>

      <WelcomeItem v-if="selectedMethod === 'vue-apollo'">
        <template #icon><VueApolloIcon /></template>
        <template #heading>Vue Apollo</template>
        Vue Apollo is an Apollo integration for Vue.js. It allows you to declaratively embed GraphQL
        queries in your Vue components.
      </WelcomeItem>

      <WelcomeItem v-if="selectedMethod === 'fetch'">
        <template #icon><FetchIcon /></template>
        <template #heading>Fetch API</template>
        The Fetch API provides a simple interface for fetching resources. It can be used to send
        GraphQL queries without any additional libraries.
      </WelcomeItem>

      <WelcomeItem v-if="selectedMethod === 'axios'">
        <template #icon><AxiosIcon /></template>
        <template #heading>Axios</template>
        Axios is a popular HTTP client that can be used to send GraphQL queries. It provides an
        easy-to-use interface for making HTTP requests.
      </WelcomeItem>

      <WelcomeItem v-if="selectedMethod === 'villus'">
        <template #icon><VillusIcon /></template>
        <template #heading>Villus</template>
        Villus is a tiny and fast GraphQL client for Vue.js. It's designed to be lightweight and
        easy to use with Vue's Composition API.
      </WelcomeItem>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: #41b883;
  margin-bottom: 1rem;
}

.method-selector {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.method-selector button {
  padding: 0.5rem 1rem;
  border: 1px solid #41b883;
  background-color: rgb(17, 9, 9);
  color: #41b883;
  cursor: pointer;
  transition: all 0.3s ease;
}

.method-selector button.active {
  background-color: #41b883;
  color: white;
}

.method-details {
  border: 1px solid #07bb4c;
  border-radius: 4px;
  padding: 1rem;
}

.icon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  /* background-color: #f0f0f0; */
  font-weight: bold;
}
</style>
