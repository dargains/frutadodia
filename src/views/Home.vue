<template>
<main class="main">
  <article class="main__fruit" v-for="fruit in fruitOfTheDay" :style="{backgroundImage: `radial-gradient(circle at 50% 50%, ${fruit.colors[0]}, ${fruit.colors[1]})`, height: `${window.innerHeight}px`}" :key="fruit.name">
    <figure class="main__fruitImage">
      <img :src="fruit.image" :alt="fruit.name">
    </figure>
    <p class="main__fruitName">{{fruit.name}}</p>
  </article>
  <div class="main__admin">
    <router-link :to="{ name: 'admin', params: {} }">Fruta do dia</router-link>
  </div>
</main>
</template>

<script>
export default {
  components: {

  },
  computed: {
    allFetched() {
      return this.$store.state.allFetched;
    },
    fruitOfTheDay() {
      return this.$store.state.fruitOfTheDay;
    }
  },
  created() {
    const height = window.innerHeight;

  },
  methods: {

  }
}
</script>

<style lang="scss">
.main {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__fruit {
    width: 100%;
    padding: 40px;
  }
  &__fruitName {
    position: absolute;
    font-size: 80px;
    left: 60%;
    font-weight: 700;
    word-break: break-all;
    color: white;
    top: 50%;
    transform: translateY(-50%);
    text-align: left;
    padding-right: 20px;
  }
  &__fruitImage {
    max-width: 300px;
    width: 80%;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  &__admin {
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 30px;
    transform: rotate(90deg);
    transform-origin: left;
    a {
      color: white;
      text-decoration: none;
      font-size: 10px;
    }
  }
}
</style>
