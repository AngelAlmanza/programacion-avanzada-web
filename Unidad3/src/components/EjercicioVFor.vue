<template>
  <fieldset>
    <legend>Nombre</legend>
    <input type="text" v-model="name">
  </fieldset>
  <fieldset>
    <legend>Apellido</legend>
    <input type="text" v-model="lastName">
  </fieldset>
  <ul id="users">
    <li v-for="user in users" :key="user.id">
      {{ user.name }} {{ user.lastName }}
    </li>
  </ul>
  <button @click="addPerson" id="save">Guardar información</button>
</template>

<script setup>
import { ref } from 'vue';
  const name = ref('');
  const lastName = ref('');
  const users = ref([]);
  const addPerson = () => {
    if (name.value.length === 0 || lastName.value.length === 0) return
    users.value.push({id: Symbol(), name: name.value, lastName: lastName.value});
    name.value = '';
    lastName.value = '';
  };
</script>

<style lang="scss" scoped>
  button {
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 8px 16px;
    margin: 12px 0;
    background-color: var(--vt-c-text-dark-2);
  }
</style>