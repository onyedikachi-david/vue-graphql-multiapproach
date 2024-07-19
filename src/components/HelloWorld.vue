<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Explore different approaches to integrate GraphQL with Vue:</h3>
    <ul>
      <li>Apollo Client</li>
      <li>URQL</li>
      <li>Vue Apollo</li>
      <li>Fetch API</li>
      <li>Axios</li>
      <li>Villus</li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
  color: #41b883;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

li {
  margin: 0.5rem 0;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3,
  ul {
    text-align: left;
  }
}
</style>
