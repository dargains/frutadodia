<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('connectToDatabase')
    .then(() => {
      this.$store.dispatch('connectToStorage');
      this.$store.dispatch('getFruits');
      this.$store.dispatch('getDays');
    })
  }
}
</script>
