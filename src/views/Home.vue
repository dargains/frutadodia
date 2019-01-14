<template>
<main class="main" text-xs-center wrap v-if="allFetched">
  <h1 class="main__title display-3 mb-4">Fruta do Dia</h1>
  <div v-for="fruit in fruitOfTheDay">
    <p class="main__fruit display-2">{{fruit.name}}</p>
    <figure class="main__image">
      <img :src="fruit.image" :alt="fruit.name">
    </figure>
  </div>
  <router-link :to="{ name: 'admin', params: {} }">Admin</router-link>
</main>
</template>

<script>
export default {
  components: {

  },
  computed: {
    allFetched() {
      return this.$store.state.dataFetched;
    },
    fruitOfTheDay() {
      return this.$store.state.fruitOfTheDay;
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.main {
  text-align: center;
  &__image {
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    img {
      width: 100%;
    }
    &--small {
      @extend .main__image;
      max-width: 200px;
      margin: 20px auto;
    }
  }
}
</style>
