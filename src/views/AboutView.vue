<template>
  <div class="about">
    <h1>About GraphQL-Vue Integration</h1>
    <p>
      This project demonstrates various approaches to integrating GraphQL with Vue.js applications.
      It provides a comprehensive comparison of different GraphQL clients and methods, allowing
      developers to understand the pros and cons of each approach.
    </p>
    <h2>Features</h2>
    <ul>
      <li>Implementations of six different GraphQL integration methods</li>
      <li>A unified interface to compare all methods side-by-side</li>
      <li>Usage of Vue 3 Composition API</li>
      <li>Integration with a Tailcall backend (powered by JSONPlaceholder API)</li>
    </ul>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #41b883;
}

h2 {
  color: #34495e;
}

ul {
  list-style-type: disc;
  padding-left: 2rem;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
