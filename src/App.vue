<template>
  <main ref="main">
    <transition name="fade">
      <Loading v-if="!allFetched"/>
    </transition>
    <transition name="fade">
      <router-view />
    </transition>
  </main>
</template>

<script>
import Loading from './components/Loading';
export default {
  name: 'App',
  components: {
    Loading
  },
  computed: {
    allFetched() {
      return this.$store.state.allFetched;
    }
  },
  created() {
    this.$store.dispatch('connectToDatabase')
    .then(() => {
      Promise.all([
        this.$store.dispatch('connectToStorage'),
        this.$store.dispatch('getFruits'),
        this.$store.dispatch('getDays')
      ]).then(values => {
        this.$store.dispatch('getFruitOfTheDay');
      }).catch(error => {
        this.$store.commit('showNoFruitToday')
        this.$store.dispatch('getFruitOfTheDay');
      })
    })
  },
  mounted() {
    this.$refs.main.style.height = window.innerHeight + 'px';
  }
}
</script>
<style>
:root {
  --green: #4cd964;
  --red: #dd2222;
}
body {
  font-family: 'Josefin Slab';
  font-weight: 700;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  //transform: scale(.9);
}
</style>
