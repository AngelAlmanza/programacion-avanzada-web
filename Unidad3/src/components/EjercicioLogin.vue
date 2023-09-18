<template>
  <div>
    <h1>Login</h1>
  </div>
  <fieldset>
    <legend>Acceso al panel</legend>
    <form>
      <label for="email">Correo electronico</label>
      <input type="email" name="email" id="email" v-model="email">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="password">
      <button @click="signIn">Acceder</button>
    </form>
  </fieldset>
</template>

<script setup>
import { ref } from 'vue';
import swal from 'sweetalert';
  const email = ref('');
  const password = ref('');

  const getUsers = async (email, password) => {
    const response = await fetch('src/data/users.json');
    const data = await response.json();
    data.forEach((user) => {
      if (user.email === email && user.password === password) {
        swal("Usuario logueado");
        return;
      }
    });
  };

  const signIn = (e) => {
    e.preventDefault();
    getUsers(email.value, password.value);
  };

</script>

<style lang="scss" scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  button {
    width: 300px;
  }
</style>