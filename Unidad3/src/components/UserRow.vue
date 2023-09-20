<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ name }}</td>
    <td>{{ lastname }}</td>
    <td>{{ email }}</td>
    <td>{{ password }}</td>
  </tr>
</template>

<script setup>
  defineProps(['id', 'name', 'lastname', 'email', 'password']);
</script>

<style lang="scss" scoped>
  td {
    padding: 8px 4px;
    text-align: center;
    background-color: var(--vt-c-black-soft);
  }
</style>