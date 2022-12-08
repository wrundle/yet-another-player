import { createRouter, createWebHashHistory } from 'vue-router';
import TheaterView from '../views/TheaterView.vue';
import LyricsView from '../views/LyricsView.vue';
import SearchView from '../views/SearchView.vue';
import MainView from '../views/MainView.vue';


const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/theater',
    name: 'theater',
    component: TheaterView
  },
  {
    path: '/lyrics',
    name: 'lyrics',
    component: LyricsView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
