<template lang="html">
  <header class="header">
    <router-link :to="{ name: 'admin', params: {} }" :class="{striked:isChocolate}">Fruta do dia</router-link>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isChocolate() {
      return this.$store.state.fruitOfTheDay.length === 1 && this.$store.state.fruitOfTheDay.find(fruit => fruit.name === 'Chocolates');
    }
  }
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
  .striked {
    text-decoration: line-through;
  }
  a {
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-family: 'Quicksand', sans-serif;
  }
}
</style>
