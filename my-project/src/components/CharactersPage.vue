<template>
    <nav class="bg-gray-900 p-4">
        <div class=" bg-gray-900  container mx-auto flex justify-between items-center">
          <!-- Logo or Branding -->
          <div class="text-white text-2x1 font-bold flex items-center">
            <span>Rick & Morty</span>
          </div>
          
          <!-- Navigation Links -->
          <div class="flex space-x-4 text-white">
            <router-link :to="{ path: '/' }"><a class="hover:underline">Home</a></router-link>
            <router-link :to="{path: '/episode/:id' }"><a class="hover:underline">Episodes</a></router-link>
            <router-link :to="{path: '/character/:id' }"><a class="hover:underline">Characters</a></router-link>
            <router-link :to="{path: '/location/id' }"><a class="hover:underline">Locations</a></router-link>
          </div>
        </div>
      </nav>
    
        <div class="container mx-auto mt-8">
        <h1 class="text-4xl font-bold text-center text-cyan-800 p-10 mb-8">The Movie Characters</h1></div>
    <div class="container mx-auto p-4">
        <p v-if="error" class="text-red-500 text-lg">Something went wrong...</p>
        <p v-if="loading" class="text-blue-500 text-lg">Loading...</p>
        <div v-else class="space-y-6">
          <div v-for="character in result.characters.results" :key="character.id" class="bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col md:flex-row mb-6">
            <div class="p-6 md:w-1/3 flex flex-row items-center">
              <img :src="character.image" alt="Character Image" class="w-32 h-32 object-cover rounded-full mr-6">
              <div>
                <h3 class="font-semibold text-xl text-white">{{ character.name }}</h3>
                <p class="text-white">{{ character.status }}</p>
                <p class="text-white">{{ character.species }}</p>
                <p class="text-white">{{ character.gender }}</p>
              </div>
            </div>
            <div class="p-6 md:w-2/3">
              <div class="mb-6">
                <h4 class="text-2xl font-semibold text-green-600 mb-2"> Last known Location:</h4>
                <div class="flex space-x-4 overflow-x-auto">
                  <div v-if="character.location" class="min-w-max bg-gray-700 p-4 rounded-lg text-sm text-white">
                    <span class="font-semibold">{{ character.location.name }}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-lg font-medium mb-2 text-white">Episodes participate in:</h4>
                <div class="flex space-x-4 overflow-x-auto">
                  <div v-for="ep in character.episode" :key="ep.id" class="min-w-max bg-gray-700 p-4 rounded-lg text-sm text-white">
                    <span class="font-semibold">{{ ep.name }}</span>
                    <br>
                    <span class="font-semibold">{{ ep.episode }}</span>
                    <br>
                    <span class="font-semibold">({{ ep.air_date }})</span>
                    <br>
                    <span class="font-semibold">({{ ep.created }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <script setup>
    import gql from 'graphql-tag'
    import { useQuery } from '@vue/apollo-composable'
    
    const CHARACTERS_QUERY = gql`
    query Characters {
        characters {
          results {
            id
            name
            image
            status
            gender
            species
            location {
              name
            }
            episode {
              name
              episode
              air_date
              created
            }
          }
        }
      }
    `
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);
    
    console.log(result.value)
    </script> 
    <style scoped>
    .character-box {
    border: 2px solid lightblue;
    }
    </style>