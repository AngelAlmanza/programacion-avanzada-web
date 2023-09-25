<template>
  <h1 v-if="!authed">Login</h1>
  <fieldset>
    <legend>Acceso al panel</legend>
    <form v-if="!authed">
      <label for="email">Correo electronico</label>
      <input type="email" name="email" id="email" v-model="email">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="password">
      <button @click="signIn($event)">Acceder</button>
    </form>
    <button @click="signOut($event)" v-if="authed">Cerrar Sesión</button>
  </fieldset>
  <section v-if="authed">
    <table>
      <caption>Información de usuarios</caption>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Correo</th>
        <th>Contraseña</th>
        <th>Acciones</th>
      </tr>
      <UserRow
        v-for="user in users"
        :key="user.roleID"
        :name="user.name"
        :lastname="user.lastname"
        :email="user.email"
        :password="user.password"
        :id="user.roleID"
        @remove="removeUser"
        @editUser="editUserF"
      />
    </table>
    <button @click="addUser($event)">Añadir Usuario</button>
    <div class="formulario" v-if="showForm">
      <h2>Añadir nuevo usuario</h2>
      <form>
        <label for="nombre">Nombre:</label>
        <input v-model="newUser.name" type="text" id="nombre" name="nombre" required>
        <label for="apellido">Apellido:</label>
        <input v-model="newUser.lastname" type="text" id="apellido" name="apellido" required>
        <label for="correo">Correo:</label>
        <input v-model="newUser.email" type="email" id="correo" name="correo" required>
        <label for="contrasena">Contraseña:</label>
        <input v-model="newUser.password" type="password" id="contrasena" name="contrasena" required>
        <input type="number" v-model="newUser.roleID">
        <button type="button" @click="save($event)">Guardar</button>
      </form>
    </div>
    <div class="formulario" v-if="showFormEdit">
      <h2>Editar usuario</h2>
      <form>
        <label for="nombre">Nombre:</label>
        <input v-model="editUser.name" type="text" id="nombre" name="nombre" required>
        <label for="apellido">Apellido:</label>
        <input v-model="editUser.lastname" type="text" id="apellido" name="apellido" required>
        <label for="correo">Correo:</label>
        <input v-model="editUser.email" type="email" id="correo" name="correo" required>
        <label for="contrasena">Contraseña:</label>
        <input v-model="editUser.password" type="password" id="contrasena" name="contrasena" required>
        <input type="number" v-model="editUser.roleID">
        <button type="button" @click="updateUser">Actualizar</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';
import UserRow from './UserRow.vue';

const email = ref('');
const password = ref('');
const authed = ref(false);
const users = ref([]);

const newUser = ref({});
const editUser = ref({});
const showForm = ref(false);
const showFormEdit = ref(false);

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
  swal('Has cerrado sesión');
};

const save = (e) => {
  e.preventDefault();
  newUser.value.roleID = uuidv4();
  users.value.push(newUser.value);
  newUser.value = {};
  showForm.value = !showForm.value;
  swal('Usuario Añadido');
};

const addUser = (e) => {
  e.preventDefault();
  showForm.value = !showForm.value;
};

const removeUser = (userId) => {
  const index = users.value.findIndex(user => user.roleID === userId);
  if (index !== -1) {
    users.value.splice(index, 1);
    swal('Usuario eliminado');
  }
};

const editUserF = (userId) => {
  const index = users.value.findIndex(user => user.roleID === userId);
  if (index !== -1) {
    editUser.value = {...users.value[index]};
    showFormEdit.value = !showFormEdit.value;
  }
};

const updateUser = () => {
  const index = users.value.findIndex(user => user.roleID === editUser.value.roleID);
  if (index !== -1) {
    users.value[index] = {...editUser.value};
    editUser.value = {};
    showFormEdit.value = false;
  }
}

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
.formulario {
  width: 300px;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  input[type="number"] {
    display: none;
  }
}
</style>