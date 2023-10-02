<template>
  <tr>
    <td>{{ name }}</td>
    <td>{{ lastname }}</td>
    <td>{{ email }}</td>
    <td>{{ password }}</td>
    <td>
      <button @click="editUser(id)">Editar</button>
      <button @click="removeUser(id)">Eliminar</button>
    </td>
  </tr>
</template>

<script setup>
  defineProps(['name', 'lastname', 'email', 'password', 'id']);

  const emits = defineEmits(['remove', 'editUser']);

  const removeUser = (id) => {
    emits('remove', id);
  };

  const editUser = (id) => {
    emits('editUser', id);
  };

</script>

<style lang="scss" scoped>
  td {
    padding: 8px 4px;
    text-align: center;
    background-color: var(--vt-c-black-soft);
    button {
      margin-right: 8px;
    }
  }
</style>