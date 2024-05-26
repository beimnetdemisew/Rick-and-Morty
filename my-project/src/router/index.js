import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import EpisodePage from '../components/EpisodePage.vue';
import CharacterPage from '../components/CharactersPage.vue';
import LocationPage from '../components/LocationPage.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomePage, name: 'HomePage' },
  { path: '/episode/:id', component: EpisodePage, name: 'EpisodePage' },
  { path: '/character/:id', component: CharacterPage, name: 'CharacterPage' },
  { path: '/location/:id', component: LocationPage, name: 'LocationPage' },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;