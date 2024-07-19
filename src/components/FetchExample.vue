<template>
  <div class="fetch-example">
    <h2>Fetch API Example</h2>
    <button @click="fetchPosts" :disabled="loading">Fetch Posts</button>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">Error: {{ error.message }}</div>
    <ul v-else class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>Post title: {{ post.title }}</h3>
        <p>Content: {{ post.body }}</p>
        <p>Author: {{ post.user.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
const error = ref<Error | null>(null)

const fetchPosts = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    posts.value = result.data.posts.slice(0, 4)
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fetch-example {
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
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  margin-bottom: 20px;
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
