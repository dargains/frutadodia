<template lang="html">
  <section class="empty">
    <h2>Está mesmo quase</h2>
    <p>Todos os dias das 9h as 11h sai a fruta do dia, excepto sábados e domingos</p>
  </section>
</template>

<script>
export default {
  name: 'Empty'
}
</script>

<style lang="scss">
.empty {
  height: 100vh;
  background-color: var(--red);
  color: var(--white);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    font-size: 90px;
    line-height: 0.63;
    padding: 0 0 60px;
    letter-spacing: 4.5px;
  }
  p {
    font-size: 16px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    margin-left: 50px;
    letter-spacing: 1px;
    line-height: 1.2;
  }
}
</style>
