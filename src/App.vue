<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('connectToDatabase')
    .then(() => {
      Promise.all([
        this.$store.dispatch('connectToStorage'),
        this.$store.dispatch('getFruits'),
        this.$store.dispatch('getDays')
      ]).then(values => {
        this.$store.dispatch('getFruitOfTheDay');
      });
    })
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
  font-weight: 600;
}
</style>
