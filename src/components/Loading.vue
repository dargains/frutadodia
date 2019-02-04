<template lang="html">
  <section class="loading" ref="loading">
    <time class="loading__date">{{today()}}</time>
    <h1 class="loading__title"><span>Fruta</span><span>do</span><span>dia</span></h1>
    <div class="loading__container">
      <div class="loading__loadingBox">
        <figure class="loading__box--banana">
          <img src="/img/icons/Banana.svg" alt="">
        </figure>
        <figure class="loading__box--kiwi">
          <img src="/img/icons/Kiwi.svg" alt="">
        </figure>
        <figure class="loading__box--orange">
          <img src="/img/icons/Laranja.svg" alt="">
        </figure>
        <figure class="loading__box--pear">
          <img src="/img/icons/Pêra.svg" alt="">
        </figure>
      </div>
    </div>
    <div class="loading__container">
      <div class="loading__loadingBox">
        <figure class="loading__box--strawberry">
          <img src="/img/icons/Morangos.svg" alt="">
        </figure>
        <figure class="loading__box--plum">
          <img src="/img/icons/Ameixa.svg" alt="">
        </figure>
        <figure class="loading__box--apple">
          <img src="/img/icons/Maçã.svg" alt="">
        </figure>
        <figure class="loading__box--cherry">
          <img src="/img/icons/Cerejas.svg" alt="">
        </figure>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'loading',
  methods: {
    today() {
      const date = new Date();
      const day = date.getDate();
      const monthN = date.getMonth();
      const year = date.getFullYear();
      const weekN = date.getDay();
      let month = ''
      switch (monthN) {
        case (0):
          month = 'jan';
          break;
        case (1):
          month = 'fev';
          break;
        case (2):
          month = 'mar';
          break;
        case (3):
          month = 'abr';
          break;
        case (4):
          month = 'mai';
          break;
        case (5):
          month = 'jun';
          break;
        case (6):
          month = 'jul';
          break;
        case (7):
          month = 'ago';
          break;
        case (8):
          month = 'set';
          break;
        case (9):
          month = 'out';
          break;
        case (10):
          month = 'nov';
          break;
        case (11):
          month = 'dez';
          break;
      }
      let week = '';
      switch (weekN) {
        case (0):
          week = 'Segunda-feira';
          break;
        case (1):
          week = 'Terça-feira';
          break;
        case (2):
          week = 'Quarta-feira';
          break;
        case (3):
          week = 'Quinta-feira';
          break;
        case (4):
          week = 'Sexta-feira';
          break;
        case (5):
          week = 'Sábado';
          break;
        case (6):
          week = 'Domingo';
          break;
      }
      return `${week} ${day} ${month}, ${year}`;
    }
  },
  mounted() {
    this.$refs.loading.style.height = window.innerHeight + 'px';
  }
}
</script>

<style lang="scss">
.loading {
  background-color: var(--white);
  color: var(--black);
  width: 100%;
  text-align: center;
  z-index: 2;
  &__date {
    font-family: 'Quicksand', sans-serif;
    display: inline-block;
    margin: 40px auto;
    font-size: 14px;
  }
  &__title {
    font-size: 90px;
    display: inline-block;
    width: 100%;
    z-index: 1;
    span {
      position: absolute;

      &:nth-of-type(1) {
        left: 10%;
        top: 0;
      }
      &:nth-of-type(2) {
        right: 8%;
        top: 200px;
        font-size: 80px;
      }
      &:nth-of-type(3) {
        left: 15%;
        top: 400px;
      }
    }
  }
  &__container {
    margin: 0 auto;
    width: 150px;
    height: 150px;
    top: 100px;
    overflow: hidden;
    // white-space:nowrap;
    &:nth-of-type(1) .loading__loadingBox {
      animation: rotateT 1.5s infinite linear;
    }
    &:nth-of-type(2) .loading__loadingBox {
      top: -150px;
      animation: rotateB 2s infinite linear;
    }
  }
  &__loadingBox {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    overflow: visible;
    font-size: 0;
  }
  &__box {
    width: 150px;
    height: 150px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
    &--banana,
    &--pear {
      @extend .loading__box;
      background-image: linear-gradient(135deg, #f2e680, #f1c53b);
    }
    &--kiwi,
    &--grape {
      @extend .loading__box;
      background-image: linear-gradient(135deg, #d8e07a, #9bb337);
    }
    &--strawberry,
    &--cherry {
      @extend .loading__box;
      background-image: linear-gradient(135deg, #ff6966, #db3d3a);
    }
    &--orange,
    &--apple,
    &--peach {
      @extend .loading__box;
      background-image: linear-gradient(135deg, #ffab63, #f46336);
    }
    &--plum {
      @extend .loading__box;
      background-image: linear-gradient(135deg, #c576ad, #6b366b);
    }
    &--surprise {
      @extend .loading__box;
      background-image: linear-gradient(135deg, #ff95c5, #cc397b);
    }
    &--chocolate {
      @extend .loading__box;
      background-image: linear-gradient(135deg, #b67c5b, #613a23);
    }
  }
}
@keyframes rotateT {
  0% {
    transform: translate(0,0);
  }
  25% {
    transform: translate(-150px,0);
  }
  50% {
    transform: translate(-150px,-150px);
  }
  75% {
    transform: translate(0,-150px);
  }
  100% {
    transform: translate(0,0);
  }
}
@keyframes rotateB {
  0% {
    transform: translate(0,0);
  }
  25% {
    transform: translate(0,150px);
  }
  50% {
    transform: translate(-150px,150px);
  }
  75% {
    transform: translate(-150px, 0);
  }
  100% {
    transform: translate(0,0);
  }
}
</style>
