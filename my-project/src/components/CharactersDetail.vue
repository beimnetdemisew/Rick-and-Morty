<template>
  
    <div class="container mx-auto mt-8 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <div v-if="loading" class="text-blue-500 text-lg">Loading...</div>
      <div v-if="error" class="text-red-500 text-lg">Something went wrong...</div>
      <div v-if="character">
        <h1 class="text-4xl font-bold text-cyan-200 mb-4">{{ character.name }}</h1>
        <img :src="character.image" alt="Character Image" class="w-48 h-48 object-cover rounded-full mb-4">
        <p><b>Status:</b> {{ character.status }}</p>
        <p><b>Species:</b> {{ character.species }}</p>
        <p><b>Gender:</b> {{ character.gender }}</p>
        <p><b>Location:</b> {{ character.location.name }}</p>
        <p><b>Episodes:</b></p>
        <ul>
          <li v-for="ep in character.episode" :key="ep.id">{{ ep.name }} ({{ ep.episode }})</li>
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
  const characterId = route.params.id
  
  const CHARACTER_QUERY = gql`
    query Character($id: ID!) {
      character(id: $id) {
        id
        name
        image
        status
        gender
        species
        location {
          id
          name
        }
        episode {
          id
          name
          episode
        }
      }
    }
  `
  
  const { result, loading, error } = useQuery(CHARACTER_QUERY, { id: characterId })
  const character = ref(null)
  
  watchEffect(() => {
    if (result.value) {
      character.value = result.value.character
    }
  })
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>