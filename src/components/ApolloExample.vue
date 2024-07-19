<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref, watch } from 'vue'

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

const networkError = ref<string | null>(null)
const graphqlError = ref<string | null>(null)
const unexpectedError = ref<string | null>(null)

watch(error, (newError) => {
  if (newError) {
    if (newError.networkError) {
      networkError.value = 'Network error: ' + newError.networkError.message
    } else if (newError.graphQLErrors && newError.graphQLErrors.length > 0) {
      graphqlError.value =
        'GraphQL error: ' + newError.graphQLErrors.map((e) => e.message).join(', ')
    } else {
      unexpectedError.value = 'Unexpected error: ' + newError.message
    }
  } else {
    networkError.value = null
    graphqlError.value = null
    unexpectedError.value = null
  }
})
</script>

<template>
  <div class="container">
    <h2>Apollo Client Example</h2>
    <button @click="fetchPosts">Fetch Posts</button>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="networkError" class="error">Error: {{ networkError }}</div>
    <div v-else-if="graphqlError" class="error">Error: {{ graphqlError }}</div>
    <div v-else-if="unexpectedError" class="error">Error: {{ unexpectedError }}</div>
    <ul v-else-if="result && result.posts">
      <li v-for="post in result.posts.slice(0, 4)" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <p>
          <strong>{{ post.user.name }}</strong>
        </p>
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
  margin-bottom: 20px;
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

.loading {
  color: #0066cc;
  font-size: 18px;
}

.error {
  color: #ff0000;
  font-size: 18px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

h3 {
  margin: 0 0 10px;
}

p {
  margin: 5px 0;
}

p strong {
  color: #555;
}
</style>
