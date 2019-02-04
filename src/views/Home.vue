<template>
  <main ref="main">
    <section class="main" v-if="fruitOfTheDay.length">
      <Header />
      <article class="main__fruit" ref="fruit" v-for="fruit in fruitOfTheDay" :style="{backgroundImage: `linear-gradient(135deg, ${fruit.colors[0]}, ${fruit.colors[1]})`}" :key="fruit.name">
        <figure class="main__fruitImage">
          <img :src="`/img/images/${fruit.name}.png`" :alt="fruit.name">
        </figure>
        <p class="main__fruitName" v-html="fruit.display"></p>
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
    setTimeout(() => {
      this.$refs.fruit.forEach(fruit => {
        fruit.classList.add('show');
      });
    }, 800);
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
  overflow: hidden;
  &__fruit {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    &.show {
      .main__fruitImage {
        transform: scale(1);
        opacity: 1;
      }
      .main__fruitName span {
        transform: translateX(0);
      }
    }
  }
  &__fruitName {
    position: absolute;
    font-size: 90px;
    left: 50%;
    color: white;
    top: 50%;
    transform: translate(0, -50%);
    text-align: left;
    width: 50%;
    line-height: 83px;
    span {
      transform: translateX(300%);
      display: inline-block;
      @for $i from 1 through 4 {
        &:nth-of-type(#{$i}) {
          transition: all .8s cubic-bezier(0,.23,.18,1.08) #{($i*2)/10}s;
        }
      }
    }
    // span:not(:first-of-type):before {
    //   content: "\A";
    //   white-space: pre;
    // }
  }
  &__fruitImage {
    max-width: 500px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(.4);
    opacity: 0;
    transition: all .5s ease-out;
  }
}
</style>
