<template>
  <!-- Navigation bar -->
  <div class="bg-gray-900 ">
  <nav class="bg-black bg-opacity-75 p-4 fixed w-full top-0">
    <div class="container  ">

      <!-- Navigation Links -->
      <div class="flex space-x-4 text-white justify-end ">
        <router-link to="/"><a class="hover:underline ">Home</a></router-link>
        <router-link to="/episode/:id"><a class="hover:underline">Episodes</a></router-link>
        <router-link to="/character/:id"><a class="hover:underline ">Characters</a></router-link>
        <router-link to="/location/:id"><a class="hover:underline ">Locations</a></router-link>
      </div>
    </div>
  </nav>


  <!-- Main Content -->
  <div class="bg-gray-900 container mx-auto mt-8 flex flex-col items-center">
    <h1 class="text-4xl font-bold text-center text-blue-50 mt-10 mb-8 font-get-schwifty">Welcome to the Rick and Morty TV Show Website</h1>

 <!-- Image Section -->
<div>
  <Mycarousal />

</div>      
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="flex justify-center">
        <img src="../assets/image.png" alt="Image 1" class="rounded-lg shadow-lg object-cover w-full h-82">
      </div>
      <div class="flex justify-center">
        <img src="../assets/image2.jpg" alt="Image 2" class="rounded-lg shadow-lg object-cover w-full h-82"> 
      </div>
    </div>
  </div>       
    <div class=" bg-cyan-800 p-8 text-xl font-semibold mt-8" > 
      <!-- Genre, creators, stars, rating -->
      <div class="w-full md:w-2/3 rounded-lg shadow-lg mb-8 mx-auto">
        <div class="text-lg text-left text-white space-y-4">
          <p class="text-lg text-justify leading-relaxed mb-4">
          <b class="text-orange-200 text-2xl">Description:</b> <br>
          "Rick and Morty" is an animated sci-fi sitcom following the adventures of Rick Sanchez, a mad scientist, and his grandson Morty Smith. Together, they explore the multiverse, encountering bizarre creatures, alternate realities, and existential crises.
        </p>
          <p class="mb-4x"><b class="text-orange-200 text-xl"><h2>Genre:</h2></b> The genre of "Rick and Morty" is primarily animated science fiction comedy.</p>
          <p class="mb-4"><b class="text-orange-200 text-xl"><h2>Creators:</h2></b> The creators of "Rick and Morty" are Justin Roiland and Dan Harmon.</p>
          <p class="mb-4"><b class="text-orange-200 text-xl"><h2>Stars:</h2></b> The main characters in "Rick and Morty" are voiced by Justin Roiland (Rick Sanchez and Morty Smith), Chris Parnell (Jerry Smith), Spencer Grammer (Summer Smith), and Sarah Chalke (Beth Smith), among others.</p>
          <p class="mb-4"><b class="text-orange-200 text-xl"><h2>Rating:</h2></b> The TV show "Rick and Morty" has received critical acclaim and has a high rating on various platforms such as IMDb, Rotten Tomatoes, and Metacritic. <br>The specific rating may vary depending on the source and the season of the show.</p>
        </div>
      </div>

  <!-- List of characters, episodes, and locations -->
  <div class="bg-gray-900 container mx-auto p-4">
      <p v-if="error" class="text-red-500 text-lg">Something went wrong...</p>
      <p v-if="loading" class="text-blue-500 text-lg">Loading...</p>
  <div v-else class="space-y-6">

<!-- Episodes Section -->
      <div>
          <h2 class="text-3xl font-bold text-cyan-100 mb-6">Episodes</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(ep, index) in displayedEpisodes" :key="ep.id" class="episode-item bg-gray-800 shadow-md rounded-lg p-4 flex flex-col items-center">
              <h3 class="font-semibold text-xl text-white">{{ ep.name }}</h3>
              <p class="text-white">{{ ep.episode }}</p>
              <p class="text-white">{{ ep.air_date }}</p>
            </div>
          </div>
          <button @click="toggleEpisodes" class="text-blue-400  font-semibold hover:underline mt-4">{{ showAllEpisodes ? 'Show Less' : 'Show More' }}</button>
        </div>

            <!-- Characters Section -->
      <div>
        <h2 class="text-3xl font-bold text-cyan-100 mb-6">Characters</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="character in displayedCharacters" :key="character.id" class="bg-gray-800 shadow-md rounded-lg p-4">
            <div class="flex flex-col items-center">
              <img :src="character.image" alt="Character Image" class="w-32 h-32 object-cover rounded-full mb-4">
              <h3 class="font-semibold text-xl text-white">{{ character.name }}</h3>
              <p class="text-white">{{ character.status }}</p>
              <p class="text-white">{{ character.species }}</p>
              <p class="text-white">{{ character.gender }}</p>
            </div>
          </div>
        </div>
        <button @click="toggleCharacters" class="text-blue-400  font-semibold hover:underline mt-4">{{ showAllCharacters ? 'Show Less' : 'Show More' }}</button>
  </div>
      <!-- Locations Section -->
      <div>
        <h2 class="text-3xl font-bold text-cyan-200 mb-6">Locations</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="location in displayedLocations" :key="location.id" class="bg-gray-800 shadow-md rounded-lg p-4">
            <h3 class="font-semibold text-xl text-white">{{ location.name }}</h3>
          </div>
        </div>
        <button @click="toggleLocations" class="text-blue-400  font-semibold hover:underline mt-4">{{ showAllLocations ? 'Show Less' : 'Show More' }}</button>
      </div>
  </div>
  <div class="flex items-center justify-center h-32">
    <ul class="list-none">
        <li class="inline-block mx-4 text-center">
            <span class="flex flex-col items-center">
                <img src="../assets/github.jpg" alt="githubIcon" class="w-12 h-auto">
                <a href="https://github.com/beimnetdemisew" class="text-white mt-2 transition duration-300 ease-in-out transform hover:text-blue-600">Github</a>
            </span>
        </li>
        <li class="inline-block mx-4 text-center">
            <span class="flex flex-col items-center">
                <img src="../assets/figma.jpg" alt="figmaIcon" class="w-12 h-auto">
                <a href="https://www.figma.com/design/hSEDToioF24VZ9D24R8KiZ/Rick-and-Morty?node-id=0-1&t=v3nvslPaYVsZokCh-0" class="text-white mt-2 transition duration-300 ease-in-out transform hover:text-blue-600">Figma</a>
            </span>
        </li>
    </ul>
  </div>
   </div>
  </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { RouterLink } from 'vue-router';

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
          id
          name
        }
        episode {
          id
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

// Utility function to get unique items
const getUniqueItems = (items, key) => {
  const uniqueKeys = new Set();
  return items.filter(item => {
    if (!uniqueKeys.has(item[key])) {
      uniqueKeys.add(item[key]);
      return true;
    }
    return false;
  });
}

// Compute unique episodes, characters, and locations
const uniqueEpisodes = computed(() => {
  if (!result.value) return [];
  const episodes = result.value.characters.results.flatMap(character => character.episode);
  const firstSeasonEpisodes = episodes.filter(ep => /^S01E/.test(ep.episode));
  return getUniqueItems(firstSeasonEpisodes, 'id');
});


const uniqueCharacters = computed(() => result.value ? getUniqueItems(result.value.characters.results, 'id') : []);

const uniqueLocations = computed(() => {
  const locations = result.value ? result.value.characters.results.map(character => character.location).filter(location => location !== null) : [];
  return getUniqueItems(locations, 'id');
});

// Store all episodes, characters, and locations, and subsets of displayed items
const allEpisodes = ref([]);
const allCharacters = ref([]);
const allLocations = ref([]);
const displayedEpisodes = ref([]);
const displayedCharacters = ref([]);
const displayedLocations = ref([]);
const showAllEpisodes = ref(false);
const showAllCharacters = ref(false);
const showAllLocations = ref(false);

// Watch for data and update the lists


watchEffect(() => {
  if (result.value && result.value.characters) {
    const episodes = result.value.characters.results.flatMap(character => character.episode);
    allEpisodes.value = episodes.slice(0, 20); // Limit to the first 20 episodes
    displayedEpisodes.value = allEpisodes.value.slice(0, 6); // Display first 6 episodes initially
  }
  if (uniqueCharacters.value.length) {
    allCharacters.value = uniqueCharacters.value;
    displayedCharacters.value = allCharacters.value.slice(0, 6); // Display first 6 characters initially
  }
  if (uniqueLocations.value.length) {
    allLocations.value = uniqueLocations.value;
    displayedLocations.value = allLocations.value.slice(0, 6); // Display first 6 locations initially
  }
});
// Functions to show more episodes, characters, and locations
const showMoreEpisodes = () => {
  const startIndex = displayedEpisodes.value.length;
  const endIndex = Math.min(startIndex + 6, allEpisodes.value.length);
  displayedEpisodes.value = [...displayedEpisodes.value, ...allEpisodes.value.slice(startIndex, endIndex)];
}

const showMoreCharacters = () => {
  const startIndex = displayedCharacters.value.length;
  const endIndex = Math.min(startIndex + 6, allCharacters.value.length);
  displayedCharacters.value = [...displayedCharacters.value, ...allCharacters.value.slice(startIndex, endIndex)];
}

const showMoreLocations = () => {
  const startIndex = displayedLocations.value.length;
  const endIndex = Math.min(startIndex + 6, allLocations.value.length);
  displayedLocations.value = [...displayedLocations.value, ...allLocations.value.slice(startIndex, endIndex)];
}
const toggleEpisodes = () => {
  showAllEpisodes.value = !showAllEpisodes.value;
  if (showAllEpisodes.value) {
    displayedEpisodes.value = allEpisodes.value;
  } else {
    displayedEpisodes.value = allEpisodes.value.slice(0, 6); // Display first 6 episodes when "Show Less" is clicked
  }
}
const toggleCharacters = () => {
  showAllCharacters.value = !showAllCharacters.value;
  if (showAllCharacters.value) {
    displayedCharacters.value = allCharacters.value;
  } else {
    displayedCharacters.value = allCharacters.value.slice(0, 6); // Display first 6 episodes when "Show Less" is clicked
  }}

const toggleLocations = () => {
  showAllLocations.value = !showAllLocations.value;
  if (showAllLocations.value) {
    displayedLocations.value = allLocations.value;
  } else {
    displayedLocations.value = allLocations.value.slice(0, 6); // Display first 6 episodes when "Show Less" is clicked
  }

};
</script>

