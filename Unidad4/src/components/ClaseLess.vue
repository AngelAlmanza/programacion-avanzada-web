<template>
  <div class="container">
    <form>
      <fieldset>
        <legend>
          <h2>Formulario de acceso</h2>
        </legend>
        <fieldset>
          <legend>Correo electronico</legend>
          <input type="text">
        </fieldset>
        <fieldset>
          <legend>Contraseña</legend>
          <input type="text">
        </fieldset>
        <button>Acceder</button>
      </fieldset>
    </form>
    <a href="#">Olvido su contraseña</a>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.container {
  width: 70%;
  margin: 0 auto;
  form {
    border-radius: 8px;
    padding: 20px;
    background-color: @maincolor;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  }
}
</style>