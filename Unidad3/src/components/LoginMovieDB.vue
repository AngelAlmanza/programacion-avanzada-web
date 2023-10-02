<script setup>
import { onMounted, ref } from 'vue';
import { baseUrl, accessTokenAuth, apiKey } from '../api/movieDBApi';
import swal from 'sweetalert';

const username = ref('');
const password = ref('');
const authed = ref(false);

const saveSession = (requestTokem) => {
  sessionStorage.setItem('requestToken', JSON.stringify(requestTokem));
};

const getRequestToken = async () => {
  try {
    const response = await fetch(`${baseUrl}/authentication/token/new`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessTokenAuth}`,
      }
    });
    const data = await response.json();
    return data.request_token
  } catch (e) {
    console.error(e);
    return null;
  }
};

const signIn = async () => {
  try {
    const requestToken = await getRequestToken();
    const raw = JSON.stringify({
      "username": username.value,
      "password": password.value,
      "request_token": requestToken,
    });
    const response = await fetch(`${baseUrl}/authentication/token/validate_with_login?api_key=${apiKey}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: raw,
    });
    const data = await response.json();
    if (data.success) {
      saveSession(requestToken);
      swal('Has iniciado sesión');
      window.location.hash = `${window.location.hash}/movies`;
    } else {
      swal('Error, por favor revise su información');
    }
  } catch (e) {
    swal('Ha ocurrido un error')
  }
};

const isLoggued = () => {
  const user = sessionStorage.getItem('requestToken');
  if (user) {
    authed.value = true;
    swal('Has inciado sesión');
    window.location.hash = `${window.location.hash}/movies`;
  }
};

onMounted(isLoggued);

</script>

<template>
  <section class="container">
    <h1>Login</h1>
    <form>
      <div class="input-container">
        <label for="username">Nombre de usuario</label>
        <input v-model="username" type="text" name="username" id="username">
      </div>
      <div class="input-container">
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" name="password" id="password">
      </div>
      <button type="button" class="form-button" @click="signIn($event)">Iniciar Sesión</button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    margin: 0 auto;
    padding: 30px;
    border-radius: 16px;
    background-color: var(--vt-c-text-light-1);
    h1 {
      margin-bottom: 3.2rem;
      color: var(--vt-c-white-mute);
    }
    form {
      width: 100%;
      .input-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      input {
        width: 80%;
        height: 3.2rem;
        padding: 8px 16px;
        border-radius: 8px;
        border: none;
        outline: none;
      }
      .form-button {
        display: block;
        margin: 1.6rem auto;
      }
    }
  }
</style>