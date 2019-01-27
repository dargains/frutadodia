<template>
  <div>
    <transition name="fade">
      <Loading v-if="!allFetched"/>
    </transition>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
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
      ]).then(() => {
        this.$store.commit('allFetched');
      }).catch(error => {
        console.log(error);
      })
    })
  }
}
</script>
<style>
:root {
  --green: #36d174;
  --red: #ef5350;
  --white: #ffffff;
  --black: #363d46;
}
body {
  font-family: 'Josefin Slab', serif;
  font-weight: 700;
  overflow-x: hidden;
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
