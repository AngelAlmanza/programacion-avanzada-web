<script setup>
import { ref, computed } from 'vue';
import Login from './pages/Login.vue';
import Movies from './pages/Movies.vue';
import MovieDetails from './pages/MovieDetails.vue';

const routes = {
  '/': Login,
  '/movies': Movies,
  '/movies/movie-details': MovieDetails,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'];
});

</script>

<template>
  <component :is="currentView" />
</template>

<style scoped>

</style>
