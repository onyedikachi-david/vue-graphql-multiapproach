import './assets/main.css'

import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import urql, { cacheExchange, createClient, fetchExchange } from '@urql/vue'
import { createClient as villusClient, fetch } from 'villus'

const apolloClient = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

const client = createClient({
  url: '/graphql',
  exchanges: [cacheExchange, fetchExchange]
})

const villus_client = villusClient({
  url: '/graphql',
  use: [fetch()]
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.use(urql, client)
app.use(villus_client)

app.mount('#app')
