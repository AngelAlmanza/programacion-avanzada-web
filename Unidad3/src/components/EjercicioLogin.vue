<template>
  <h1>Login</h1>
  <fieldset>
    <legend>Acceso al panel</legend>
    <form>
      <label for="email">Correo electronico</label>
      <input type="email" name="email" id="email" v-model="email">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="password">
      <div>
        <button @click="signIn($event)">Acceder</button>
        <button @click="signOut($event)" v-if="authed">Cerrar Sesión</button>
      </div>
    </form>
  </fieldset>
  <table>
    <caption>Información de usuarios</caption>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Correo</th>
      <th>Contraseña</th>
    </tr>
    <UserRow
      v-for="user in users"
      :key="user.roleID"
      :id="user.roleID"
      :name="user.name"
      :lastname="user.lastname"
      :email="user.email"
      :password="user.password"
    />
  </table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import swal from 'sweetalert';
import UserRow from './UserRow.vue';

  const email = ref('');
  const password = ref('');
  const authed = ref(false);
  const users = ref([]);

  const getUsers = async () => {
    const response = await fetch('src/data/users.json');
    const data = await response.json();
    users.value = data.map(user => user);
  };

  const clearInputs = () => {
    email.value = '';
    password.value = '';
  };

  const signIn = (e) => {
    e.preventDefault();
    if (users.value.some(user => user.email === email.value && user.password === password.value)) {
      saveSession(email.value, password.value);
      clearInputs();
      authed.value = true;
      swal('Has inciado sesión')
    } else {
      swal('Datos incorrectos');
    }
  };

  const saveSession = (email, password) => {
    const indexUser = users.value.findIndex(user => user.email === email && user.password === password);
    const user = users.value[indexUser];
    sessionStorage.setItem('user', JSON.stringify(user));
  };

  const isLoggued = () => {
    getUsers();
    const user = sessionStorage.getItem('user');
    if (user) {
      authed.value = true;
      swal('Has inciado sesión');
    }
  };

  const signOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('user');
    authed.value = false;
  };

  onMounted(isLoggued);

</script>

<style lang="scss" scoped>
  legend {
    font-size: 2.8rem;
  }
  form {
    display: flex;
    flex-direction: column;
    label {
      font-size: 2rem;
    }
    input {
      height: 2.8rem;
      border-radius: 8px;
      padding: 0 8px;
      border: none;
      outline: none;
    }
  }
  button {
    width: 150px;
    margin: 12px;
  }
  table {
    margin: 12px 0;
    caption {
      font-size: 2.4rem;
    }
    th {
      min-width: 100px;
      padding: 8px;
      background-color: var(--vt-c-indigo);
    }
  }
</style>