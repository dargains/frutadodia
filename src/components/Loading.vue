<template lang="html">
  <section class="loading" ref="loading">
    <h1>Fruta do dia</h1>
    <figure class="loading__loading">
      <img src="../assets/loading.gif" alt="Fruta do Dia">
    </figure>
    <figure class="loading__logo">
      <img src="../assets/logo.jpg" alt="Fruta do Dia">
    </figure>
  </section>
</template>

<script>
export default {
  name: 'loading',
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
  h1 {
    transform: rotate(90deg);
    top: 60px;
    font-size: 12px;
    display: inline-block;
  }
  &__loading {
    width: 100px;
    margin: 0 auto;
    top: 100px;
  }
  &__logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
  }
}
</style>
