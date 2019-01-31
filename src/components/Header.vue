<template lang="html">
  <header class="header">
    <router-link :to="{ name: 'admin', params: {} }">Fruta do dia</router-link>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
.header {
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 30px;
  transform: rotate(90deg);
  transform-origin: left;
  a {
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-family: 'Quicksand', sans-serif;
  }
}
</style>
