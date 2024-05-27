<template>
    <nav class="bg-gray-900 p-4">
      <div class="bg-gray-900 container mx-auto flex justify-between items-center">
        <span class="text-white text-3xl font-get-schwifty">Rick&Morty</span>
      </div>
      <!-- Navigation Links -->
      <div class="flex space-x-4 text-white mx-2  justify-end">
        <router-link :to="{ path: '/' }"><a class="hover:underline">Home</a></router-link>
        <router-link :to="{ path: '/episode/:id' }"><a class="hover:underline">Episodes</a></router-link>
        <router-link :to="{ path: '/character/:id' }"><a class="hover:underline">Characters</a></router-link>
        <router-link :to="{ path: '/location/:id' }"><a class="hover:underline">Locations</a></router-link>
      </div>
    </nav>
    <div class="container mx-auto p-10">
      <h1 class="text-4xl font-bold text-center text-cyan-800 p-10">Movie Locations</h1>
      <div v-if="loading" class="text-center text-green-600">Loading...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error.message }}</div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(loc, index) in result.locations.results" :key="index" class="bg-gray-700 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 w-full mb-6">
            <div class="p-6">
              <h2 class="text-2xl font-semibold text-green-600 mb-2">{{ loc.name }}</h2>
              <p class="text-white"><b>Type:</b> {{ loc.type }}</p>
              <p class="text-white"><b>Dimension:</b> {{ loc.dimension }}</p>
              <p class="text-white"><b>Created:</b> {{ loc.created }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg bg-gray-600">
              <div v-for="(resident, i) in (expandedResidents[index] ? loc.residents : loc.residents.slice(0, 2))" :key="i" class="bg-gray-800 shadow-md rounded-full p-2 m-2 flex items-center justify-center" style="width: 64%;"> <!-- Adjust width as needed -->
                <div class="flex items-center">
                  <img :src="resident.image" :alt="resident.name" class="w-8 h-8 rounded-full mr-2">
                  <div class="text-sm text-white">
                    <p class="mb-1"><b>Name:</b> {{ resident.name }}</p>
                    <p class="mb-1"><b>Status:</b> {{ resident.status }}</p>
                    <p class="mb-1"><b>Species:</b> {{ resident.species }}</p>
                    <p class="mb-1"><b>Gender:</b> {{ resident.gender }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="loc.residents.length > 2" class="flex justify-center md:col-span-2">
          <button @click="toggleExpanded(index)" class="text-blue-600 hover:underline px-4 py-2 rounded-lg mt-4">{{ expandedResidents[index] ? 'Less' : 'More' }}</button>
        </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center h-32">
    <ul class="list-none">
        <li class="inline-block mx-4 text-center">
            <span class="flex flex-col items-center">
                <img src="../assets/github.jpg" alt="githubIcon" class="w-12 h-auto">
                <a href="https://github.com/beimnetdemisew" class="text-black mt-2 transition duration-300 ease-in-out transform hover:text-blue-600">Github</a>
            </span>
        </li>
        <li class="inline-block mx-4 text-center">
            <span class="flex flex-col items-center">
                <img src="../assets/figma.jpg" alt="figmaIcon" class="w-12 h-auto">
                <a href="https://www.figma.com/design/hSEDToioF24VZ9D24R8KiZ/Rick-and-Morty?node-id=0-1&t=v3nvslPaYVsZokCh-0" class="text-black mt-2 transition duration-300 ease-in-out transform hover:text-blue-600">Figma</a>
            </span>
        </li>
    </ul>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import gql from 'graphql-tag'
  import { useQuery } from '@vue/apollo-composable'
  
  const LOCATION_QUERY = gql`
    query Location {
      locations {
        results {
          name
          type
          dimension
          created
          residents {
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
  
  const { result, loading, error } = useQuery(LOCATION_QUERY);
  const expandedResidents = ref([]);
  const displayedLocations = ref([]);
  const moreLocationsVisible = ref(false);
  
  const toggleExpanded = (index) => {
    expandedResidents.value[index] = !expandedResidents.value[index];
  }
  
  </script>
  
  <style scoped>
  /* Custom styles can go here if needed */
  .character-container {
    border-radius: 48%; /* Adjust the border-radius value as needed */
  }
  
  .character{
  width:50%
  }
  
  </style>