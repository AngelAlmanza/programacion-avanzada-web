<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl, accessTokenAuth } from '../api/movieDBApi'
import Movie from '../components/Movie.vue';

const movies = ref([]);

const getMovies = async () => {
  const response = await fetch(`${baseUrl}/movie/popular?language=es-MX&page=1`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessTokenAuth}`,
    }
  });
  const data = await response.json();
  data.results.forEach(movie => movies.value.push(movie));
};

onMounted(() => {
  getMovies();
  console.log(movies.value);
});

</script>

<template>
  <div>
    <h1>Movies</h1>
    <section class="movies__container">
      <Movie
        v-for="(movie, index) in movies"
        :key="index"
        :title="movie.title"
        :description="movie.overview"
        :path-image="movie.backdrop_path"
        :rate="movie.vote_average"
        :id="movie.id"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .movies__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    // grid-template-rows: repeat(4, 1fr);
    place-items: center;
    gap: 1.6rem;
  }
</style>