<script setup lang="ts">
import { useQuery } from 'villus'
import { ref } from 'vue'

interface Post {
  id: number
  title: string
  body: string
  user: {
    name: string
  }
}

interface QueryResult {
  posts: Post[]
}

const posts = ref<Post[]>([])
const loading = ref(false)
const networkError = ref<string | null>(null)
const graphqlError = ref<string | null>(null)
const unexpectedError = ref<string | null>(null)

const query = useQuery<QueryResult>({
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
  paused: true
})

const fetchPosts = async () => {
  loading.value = true
  networkError.value = null
  graphqlError.value = null
  unexpectedError.value = null
  try {
    const result = await query.execute()
    if (result.error) {
      throw result.error
    }
    if (result.data && result.data.posts) {
      posts.value = result.data.posts.slice(0, 4)
    } else {
      throw new Error('Posts not found in query result')
    }
  } catch (e: any) {
    if (e.message.startsWith('Network Error')) {
      networkError.value = e.message
    } else if (e.graphQLErrors) {
      graphqlError.value = e.graphQLErrors.map((err: any) => err.message).join(', ')
    } else {
      unexpectedError.value = e.message
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h2>Villus Example</h2>
    <button @click="fetchPosts" :disabled="loading">Fetch Posts</button>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="networkError" class="error">Network Error: {{ networkError }}</div>
    <div v-else-if="graphqlError" class="error">GraphQL Error: {{ graphqlError }}</div>
    <div v-else-if="unexpectedError" class="error">Error: {{ unexpectedError }}</div>
    <ul v-else-if="posts.length > 0" class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <p>Author: {{ post.user.name }}</p>
      </li>
    </ul>
    <div v-else>No posts found.</div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}

h2 {
  color: #333;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
}

h3 {
  margin: 0 0 10px;
}

p {
  margin: 0 0 5px;
}
</style>
