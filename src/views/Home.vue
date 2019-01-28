<template>
  <main ref="main">
    <section class="main" v-if="fruitOfTheDay.length">
      <Header />
      <article class="main__fruit" v-for="fruit in fruitOfTheDay" :style="{backgroundImage: `radial-gradient(circle at 50% 50%, ${fruit.colors[0]}, ${fruit.colors[1]})`}" :key="fruit.name">
        <figure class="main__fruitImage">
          <img :src="`/img/fruits/images/${fruit.name}.png`" :alt="fruit.name">
        </figure>
        <p class="main__fruitName">{{fruit.name}}</p>
      </article>
    </section>
    <Empty v-else/>
  </main>
</template>

<script>
import Empty from './Empty';
import Header from '../components/Header';

export default {
  components: {
    Empty,
    Header
  },
  computed: {
    fruitOfTheDay() {
      return this.$store.state.fruitOfTheDay;
    }
  },
  mounted() {
    this.$refs.main.style.height = window.innerHeight + 'px';
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
  height: 100%;
  &__fruit {
    width: 100%;
    padding: 40px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__fruitName {
    position: absolute;
    font-size: 80px;
    left: 60%;
    word-break: break-all;
    color: white;
    top: 50%;
    transform: translateY(-50%);
    text-align: left;
    width: 106px;
    line-height: 64px;
  }
  &__fruitImage {
    max-width: 300px;
    width: 80%;
    margin: 0 auto;
  }
}
</style>
