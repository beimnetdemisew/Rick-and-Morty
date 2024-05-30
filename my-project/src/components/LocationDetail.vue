<template>
    <div class="container mx-auto mt-8 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <div v-if="loading" class="text-blue-500 text-lg">Loading...</div>
      <div v-if="error" class="text-red-500 text-lg">Something went wrong...</div>
      <div v-if="location">
        <h1 class="text-4xl font-bold  text-cyan-200  mb-4">{{ location.name }}</h1>
        <p><b>Type:</b> {{ location.type }}</p>
        <p><b>Dimension:</b> {{ location.dimension }}</p>
        <p><b>Residents:</b></p>
        <ul>
          <li v-for="resident in location.residents" :key="resident.id">{{ resident.name }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import gql from 'graphql-tag'
  import { useQuery } from '@vue/apollo-composable'
  
  const route = useRoute()
  const locationId = route.params.id
  
  const LOCATION_QUERY = gql`
    query Location($id: ID!) {
      location(id: $id) {
        id
        name
        type
        dimension
        residents {
          id
          name
        }
      }
    }
  `
  
  const { result, loading, error } = useQuery(LOCATION_QUERY, { id: locationId })
  const location = ref(null)
  
  watchEffect(() => {
    if (result.value) {
      location.value = result.value.location
    }
  })
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>