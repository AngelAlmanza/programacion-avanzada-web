<template>
  <div class="container">
    <div class="name">
      <h2 class="name__title">Hola {{ name }}</h2>
      <label class="name__label" for="name">Escribe tu nombre</label>
      <input type="text" id="name" v-model="name" />
    </div>
    <div>
      <button @click="contador++">Contador: {{ contador }}</button>
    </div>
    <div class="sum">
      <h3 class="sum__title">Introduzca dos números</h3>
      <form>
        <div>
          <input type="number" id="num1" v-model="num1" />
          <input type="number" id="num2" v-model="num2" />
        </div>
        <button @click="sumar">Sumar</button>
      </form>
      <p class="sum__result">El resultado de la suma es: {{ resultado }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let name = ref('');
let contador = ref(0);
let num1 = ref(undefined);
let num2 = ref(undefined);
let resultado = ref(undefined);

const sumar = (e) => {
  e.preventDefault();
  if (!num1.value || !num2.value) return;
  resultado.value = num1.value + num2.value;
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  .name {
    display: flex;
    flex-direction: column;
    &__title {
      font-size: 4.8rem;
      font-weight: bold;
    }
    &__label {
      font-size: 2.4rem;
    }
  }
  .sum {
    &__title {
      font-size: 2.4rem;
    }
    &__result {
      font-size: 1.6rem;
    }
  }
  input {
    display: block;
    margin: 12px 0;
    width: 200px;
  }
  button {
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 8px 16px;
    margin: 12px 0;
    background-color: var(--vt-c-text-dark-2);
  }
}
</style>
