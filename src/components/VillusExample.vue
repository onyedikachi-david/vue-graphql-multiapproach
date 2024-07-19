<script setup lang="ts">
import { useQuery } from 'villus'
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(false)
const error = ref(null)

const query = useQuery({
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
  error.value = null
  try {
    const result = await query.execute()
    if (result.data && result.data.posts) {
      posts.value = result.data.posts.slice(0, 4)
      console.log(posts.value)
    } else {
      throw new Error('Posts not found in query result')
    }
  } catch (e) {
    error.value = e
    console.error(e)
  } finally {
    loading.value = false
  }
}

// onMounted(() => {
//   fetchPosts()
// })
</script>

<template>
  <div class="container">
    <h2>Villus Example</h2>
    <button @click="fetchPosts">Fetch Posts</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else-if="posts.length">
      <li v-for="post in posts" :key="post.id">
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
}

h2 {
  color: #333;
}

ul {
  margin-top: 20px;
  list-style: none;
  padding: 0;
}

li {
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
