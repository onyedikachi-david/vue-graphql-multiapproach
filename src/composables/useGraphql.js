import { ref, onMounted } from 'vue'
export function useGraphQLQuery(query, variables = {}) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:5173/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          variables
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: &{response.status}`)
      }

      const result = await response.json()
      console.log(result.data.posts)

      if (response.errors) {
        console.log(response.errors)
        throw new Error(result.errors[0].messsage)
      }

      data.value = result.data
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
