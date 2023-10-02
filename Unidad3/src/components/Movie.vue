<script setup>
import { computed } from 'vue';
import { imagesBaseUrl } from '../api/movieDBApi';

const { description, id } = defineProps(['title', 'pathImage', 'description', 'rate', 'id']);

const MAX_DESCRIPTION_LENGTH = 200;

const limitedDescription = computed(() => {
  if (description.length <= MAX_DESCRIPTION_LENGTH) {
    return description;
  } else {
    return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
  }
});

const navigateToDetails = () => {
  localStorage.setItem('movieID', id);
  window.location.hash = `${window.location.hash}/movie-details`;
};
</script>

<template>
  <div class="movie" @click="navigateToDetails">
    <div class="movie__image--container">
      <img class="movie__image--img" :src="`${imagesBaseUrl}${pathImage}`" :alt="`Banner de la pelicula ${title}`">
    </div>
    <div class="movie__info">
      <h4 class="movie__title">{{ title }}</h4>
      <p class="movie__description" v-text="limitedDescription"></p>
    </div>
    <span class="movie__rate">{{ rate }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .movie {
    width: 100%;
    max-width: 320px;
    height: 40rem;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    transition: 0.5s;
    background-color: var(--vt-c-text-light-1);
    box-shadow: -2px 4px 9px 2px rgba(0,0,0,0.75);
    &__image {
      &--container {
        width: 100%;
      }
      &--img {
        width: 100%;
      }
    }
    &__info {
      padding: 8px 16px;
    }
    &__title {
      font-size: 2.4rem;
      font-weight: bold;
      color: var(--vt-c-white-soft);
    }
    &__description {
      font-size: 1.6rem;
      font-weight: 300;
      line-height: 2rem;
      color: var(--vt-c-white-mute);
    }
    &__rate {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-content: center;
      border-radius: 50%;
      position: absolute;
      top: 1.6rem;
      right: 1.6rem;
      color: var(--vt-c-black);
      background-color: var(--vt-c-white);
    }
    &:hover {
      transform: scale(1.05);
    }
  }
</style>