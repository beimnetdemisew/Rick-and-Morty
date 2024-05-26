<template>
    <nav class="bg-gray-900 p-4">
      <div class=" bg-gray-900 container mx-auto flex justify-between items-center">
          <span class="text-white text-3xl font-get-schwifty">Rick&Morty</span>
        </div>
        <!-- Navigation Links -->
        <div class=" flex space-x-4  text-white mx-2 justify-end">
          <router-link :to="{ path: '/' }"><a class="hover:underline">Home</a></router-link>
          <router-link :to="{path: '/episode/:id' }"><a class="hover:underline,">Episodes</a></router-link>
          <router-link :to="{path: '/character/:id' }"><a class="hover:underline">Characters</a></router-link>
          <router-link :to="{path: '/location/:id' }"><a class="hover:underline">Locations</a></router-link>
        </div>
        </nav>
      <div class="container  text-cyan-800 text-xl  mx-auto p-8">
        <h1 class="text-4xl font-bold text-center text-cyan-800 my-8">Episodes</h1>
        <ul>
          <p v-if="error" class="text-red-500 text-lg">Something went wrong...</p>
          <p v-if="loading" class="text-blue-500 text-lg">Loading...</p>
          <div v-else class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="(ep, index) in result.episodes.results" :key="ep.id" class="bg-gray-600 shadow-md rounded-lg p-4">
                <h2 class="text-xl font-bold text-green-600 mb-2">{{ ep.name }}</h2>
                <p class="text-white mb-2"><strong>Episode Code:</strong> {{ ep.episode }}</p>
                <p class="text-white mb-2"><strong>Air Date:</strong> {{ ep.air_date }}</p>
                <p class="text-white mb-2"><strong>Created:</strong> {{ ep.created }}</p>
                <!-- Display up to 2 characters -->
                <div class="flex justify-between">
                  <div v-for="(character, i) in ep.characters.slice(0, 2)" :key="i" class="bg-gray-800 shadow-md rounded-full p-2 m-2 flex items-center justify-center" style="width: 48%;">
                    <img :src="character.image" :alt="character.name" class="w-8 h-8 rounded-full mr-2">
                    <div class="text-white text-center">
                      <p class="font-semibold ">{{ character.name }}</p>
                      <p>{{ character.status }}</p>
                      <p>{{ character.species }}</p>
                      <p>{{ character.gender }}</p>
                    </div>
                  </div>
                </div>
                <!-- Additional characters displayed when See More button is clicked -->
                <div v-if="expandedIndex === index" class="grid grid-cols-1 md:grid-cols-2 gap-4 bg bg-gray-600">
                  <div v-for="(character, i) in ep.characters.slice(2)" :key="i" class="character-container">
                    <div class="character bg-gray-800 flex items-center">
                      <img :src="character.image" :alt="character.name" class="w-8 h-8 rounded-full mr-2">
                      <div class="text-white text-center">
                        <p class="font-semibold">{{ character.name }}</p>
                        <p>{{ character.status }}</p>
                        <p>{{ character.species }}</p>
                        <p>{{ character.gender }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- See More Button -->
                <button @click="showMore(index)" class="mt-4 ml-auto mr-auto flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                  <span v-if="expandedIndex !== index">+</span>
                  <span v-else>-</span>
                </button>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </template>
    <script setup>
    import { ref } from 'vue'
    import gql from 'graphql-tag'
    import { useQuery } from '@vue/apollo-composable'
    
    const expandedIndex = ref(null)
    
    const Episode_QUERY = gql`
      query Episode {
        episodes {
          results {
            id
            name
            episode
            air_date
            created
            characters {
              name
              status
              species
              gender
              image
            }
          }
        }
      }
    `
const { result, loading, error } = useQuery(Episode_QUERY);
function showMore(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
</script>



<style scoped>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
.character-container {
  width: 48%;
}
.character {
  width: 100%;
}
/* Add custom styles here */
</style>

