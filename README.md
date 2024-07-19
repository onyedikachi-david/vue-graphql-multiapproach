# GraphQL-Vue Integration Examples

## Overview

This project demonstrates various approaches to integrating GraphQL with Vue.js applications. It provides a comprehensive comparison of different GraphQL clients and methods, allowing developers to understand the pros and cons of each approach.

## Features

- Implementations of six different GraphQL integration methods:
  1. Apollo Client
  2. URQL
  3. Vue Apollo
  4. Fetch API
  5. Axios
  6. Villus
- A unified interface to compare all methods side-by-side
- Usage of Vue 3 Composition API
- Integration with a Tailcall backend (powered by JSONPlaceholder API)

## Project Structure

```bash
graphql-vue-integration/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ApolloExample.vue
│   │   ├── URQLExample.vue
│   │   ├── VueApolloExample.vue
│   │   ├── FetchExample.vue
│   │   ├── AxiosExample.vue
│   │   └── VillusExample.vue
│   ├── composables/
│   │   └── useGraphQLQuery.js
│   ├── App.vue
│   ├── main.js
│   └── HomePage.vue
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## Setup and Installation

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Tailcall CLI

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/onyedikachi-david/vue-graphql-multiapproach.git
   cd graphql-vue-integration
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Tailcall backend:

   - Create a file named `jsonplaceholder.graphql` with the following content:

     ```graphql
     schema
       @server(port: 8000, hostname: "0.0.0.0")
       @upstream(baseURL: "http://jsonplaceholder.typicode.com", httpCache: 42) {
       query: Query
     }

     type Query {
       posts: [Post] @http(path: "/posts")
       user(id: Int!): User @http(path: "/users/{{.args.id}}")
     }

     type User {
       id: Int!
       name: String!
       username: String!
       email: String!
       phone: String
       website: String
     }

     type Post {
       id: Int!
       userId: Int!
       title: String!
       body: String!
       user: User @http(path: "/users/{{.value.userId}}")
     }
     ```

   - Start the Tailcall server:

     ```bash
     tailcall start ./jsonplaceholder.graphql
     ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

## Usage

The home page of the application provides buttons to switch between different GraphQL integration examples. Each example demonstrates how to fetch and display a list of posts using a specific GraphQL client or method.

To explore a particular integration:

1. Click on the corresponding button (e.g., "Apollo", "URQL", etc.).
2. Observe how the data is fetched and displayed.
3. Check the network tab in your browser's developer tools to see the GraphQL requests being made.

## Implementation Details

### 1. Apollo Client

- Located in `src/components/ApolloExample.vue`
- Uses `@apollo/client` and `@vue/apollo-composable`
- Demonstrates query composition and reactive data updates

### 2. URQL

- Located in `src/components/URQLExample.vue`
- Uses `@urql/vue`
- Shows a lightweight approach to GraphQL queries

### 3. Vue Apollo

- Located in `src/components/VueApolloExample.vue`
- Uses `@vue/apollo-composable`
- Illustrates Vue-specific Apollo integration

### 4. Fetch API

- Located in `src/components/FetchExample.vue`
- Uses native `fetch` API
- Demonstrates a no-dependency approach to GraphQL queries

### 5. Axios

- Located in `src/components/AxiosExample.vue`
- Uses `axios` for HTTP requests
- Shows how to use a popular HTTP client for GraphQL

### 6. Villus

- Located in `src/components/VillusExample.vue`
- Uses `villus`
- Demonstrates a Vue-specific, lightweight GraphQL client

## Customization

To modify the GraphQL schema or add new queries:

1. Update the `jsonplaceholder.graphql` file
2. Restart the Tailcall server
3. Modify the respective component files to use the new queries

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or concerns, please open an issue on the GitHub repository.

<!-- ## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
``` -->
