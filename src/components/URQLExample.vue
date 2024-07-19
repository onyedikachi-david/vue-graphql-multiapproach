<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { ref } from 'vue'

const { executeQuery, fetching, error, data } = useQuery({
  query: `
    query GetPosts {
      posts {
        id
        title
        body
        user {
          name
        }
      }
    }
  `,
  pause: true
})

const fetchPosts = () => {
  executeQuery()
}
</script>

<template>
  <div class="container">
    <h2>URQL Example</h2>
    <button @click="fetchPosts">Fetch Posts</button>
    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else-if="data">
      <li v-for="post in data.posts.slice(0, 4)" :key="post.id">
        <h3>Post title: {{ post.title }}</h3>
        <p>Content: {{ post.body }}</p>
        <p>Author: {{ post.user.name }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

h3 {
  margin: 0 0 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
