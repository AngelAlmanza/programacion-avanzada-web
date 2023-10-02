<script setup>
import { baseUrl, accessTokenAuth, imagesBaseUrl, apiKey } from '../api/movieDBApi';
import { onMounted, ref } from 'vue';
import swal from 'sweetalert';

const movieID = localStorage.getItem('movieID');
const sessionToken = sessionStorage.getItem('requestToken');
const movie = ref({});
const valoracion = ref(1);

const getMovieDetails = async () => {
  try {
    const response = await fetch(`${baseUrl}/movie/${movieID}?language=es-MX`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessTokenAuth}`,
      }
    });
    const data = await response.json();
    movie.value = data;
  } catch (e) {
    console.error(e);
  }
  return;
};

const updateRating = (event) => {
  valoracion.value = event.target.valueAsNumber;
};

const getGuestToken = async () => {
  try {
    const response = await fetch(`${baseUrl}/authentication/guest_session/new?api_key=${apiKey}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    return data.guest_session_id;
  } catch (e) {
    console.error(e);
  }
  return;
}

const rate = async () => {
  const guestToken = await getGuestToken();
  const raw = JSON.stringify({ "value": valoracion.value });
  try {
    const response = await fetch(`${baseUrl}/movie/${movieID}/rating?api_key=${apiKey}&guest_session_id=${guestToken}&session_id=${sessionToken}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: raw,
    });
    const data = await response.json();
    if (data.success) {
      swal('Gracias por tu calificación');
    } else {
      swal('Algo ha salido mal...');
    }
  } catch (e) {
    console.error(e);
  }
  return;
};

const deleteRate = async () => {
  const guestToken = await getGuestToken();
  try {
    const response = await fetch(`${baseUrl}/movie/${movieID}/rating?api_key=${apiKey}&guest_session_id=${guestToken}&session_id=${sessionToken}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    if (data.success) {
      swal('Calificacion eliminada correctamente');
    }
  } catch (e) {
    console.error(e);
  }
  return;
};

onMounted(() => {
  getMovieDetails();
});
</script>

<template>
  <div class="movie">
    <h2 class="movie__title">{{ movie.title }}</h2>
    <section class="movie__info-container">
      <div class="movie__img">
        <img :src="`${imagesBaseUrl}${movie.poster_path}`" :alt="`Banner de la pelicula ${movie.title}`">
      </div>
      <div>
        <p class="movie__info-container--overview">{{ movie.overview }}</p>
        <p class="movie__info-container--rate">Puntuación: {{ movie.vote_average }}</p>
        <div class="movie__rate">
          <label for="rate">Puntua la pelicula!</label>
          <div class="movie__rate--input-container">
            <input
              type="range"
              name="rate"
              id="rate"
              step="1"
              min="1"
              max="10"
              v-model="valoracion"
              @input="updateRating"
            >
            <p class="rate-indicator">{{ valoracion }}</p>
          </div>
          <div class="movie__rate--buttons">
            <button @click="rate">¡Puntuar!</button>
            <button @click="deleteRate">Borrar puntuación</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
  .movie {
    width: 100%;
    &__title {
      margin-bottom: 20px;
      font-size: 3.6rem;
      font-weight: bold;
      color: var(--vt-c-white-soft);
    }
    &__info-container {
      display: flex;
      p {
        padding-left: 24px;
      }
      &--overview {
        font-size: 2rem;
        font-weight: 300;
        line-height: 3.6rem;
        color: var(--vt-c-white-mute);
      }
      &--rate {
        margin-top: 8px;
        font-size: 1.6rem;
        font-weight: bold;
      }
    }
    &__rate {
      position: relative;
      &--input-container {
        display: flex;
        align-items: center;
      }
      &--buttons {
        button {
          margin: 4px 8px;
        }
      }
    }
  }
</style>