<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
  user: {
    name: string
  }
}

const posts = ref<Post[]>([])
const loading = ref(false)
const networkError = ref<string | null>(null)
const graphqlError = ref<string | null>(null)
const unexpectedError = ref<string | null>(null)

const fetchPosts = async () => {
  loading.value = true
  networkError.value = null
  graphqlError.value = null
  unexpectedError.value = null

  try {
    const response = await axios.post('/graphql', {
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
      `
    })
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = response.data
    if (result.errors && result.errors.length > 0) {
      graphqlError.value = result.errors.map((e: any) => e.message).join(', ')
    } else {
      posts.value = result.data.posts.slice(0, 4)
    }
  } catch (err: any) {
    if (err.response) {
      networkError.value = `HTTP error! status: ${err.response.status}`
    } else {
      unexpectedError.value = err.message
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="axios-example">
    <h2>Axios API Example</h2>
    <button @click="fetchPosts" :disabled="loading">Fetch Posts</button>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="networkError" class="error">Error: {{ networkError }}</div>
    <div v-else-if="graphqlError" class="error">Error: {{ graphqlError }}</div>
    <div v-else-if="unexpectedError" class="error">Error: {{ unexpectedError }}</div>
    <ul v-else class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>Post title: {{ post.title }}</h3>
        <p>Content: {{ post.body }}</p>
        <p>Author: {{ post.user.name }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.axios-example {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: #0056b3;
}

.loading {
  font-size: 18px;
  color: #007bff;
}

.error {
  font-size: 18px;
  color: red;
}

.post-list {
  margin-top: 20px;
  list-style: none;
  padding: 0;
}

.post-item {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;
}

.post-item h3 {
  margin: 0 0 10px 0;
}

.post-item p {
  margin: 0 0 5px 0;
}

.post-item strong {
  color: #333;
}
</style>
