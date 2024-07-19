<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue'

interface Post {
  id: number
  title: string
  body: string
  user: {
    name: string
  }
}

const GET_POSTS_QUERY = gql`
  query GetPosts {
    posts(limit: 10) {
      id
      title
      body
      user {
        name
      }
    }
  }
`

const { result, loading, error, refetch } = useQuery<{ posts: Post[] }>(GET_POSTS_QUERY)

const fetchPosts = () => {
  refetch()
}
</script>

<template>
  <div class="container">
    <h2>Apollo Client Example</h2>
    <button @click="fetchPosts">Fetch Posts</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else-if="result && result.posts">
      <li v-for="post in result.posts.slice(0, 4)" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <p>{{ post.user.name }}</p>
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
