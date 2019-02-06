<template>
  <div>
    <transition name="fade" v-if="!allFetched">
      <Loading/>
    </transition>
    <transition name="fade" v-else>
      <router-view />
    </transition>
    <div id="asd"></div>
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
				}).catch(() => {
					this.$store.commit('allFetched');
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
  --gray: #e5e5e5;
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
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
