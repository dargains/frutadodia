<template>
  <v-layout class="main" text-xs-center wrap v-if="allFetched">
    <v-flex xs12>
      <h1 class="main__title display-3 mb-4">Fruta do Dia</h1>
      <p class="main__fruit display-2">{{fruitToday.name}}</p>
      <figure class="main__image">
        <img :src="fruitToday.image" :alt="fruitToday.name">
      </figure>
      <template v-if="fruitToday.name !== 'nenhuma'">
        <v-btn flat icon color="primary" @click="like">
          <v-icon dark>thumb_up</v-icon>
        </v-btn>
        <v-btn flat icon color="error" @click="dislike">
          <v-icon dark>thumb_down</v-icon>
        </v-btn>
      </template>
    </v-flex>
    <v-flex xs12>
      <p class="main__subtitle headline">A fruta de ontem foi...</p>
      <p class="main__image title">{{fruitYesterday.name}}</p>
      <figure class="main__image--small">
        <img :src="fruitYesterday.image" :alt="fruitYesterday.name">
      </figure>
    </v-flex>
    <router-link :to="{ name: 'admin', params: {} }">Admin</router-link>
  </v-layout>
</template>

<script>
import Cookies from 'js-cookie';
  export default {
    components: {

    },
    computed: {
      allFetched() {
        return this.$store.state.dataFetched && this.$store.state.fruitsFetched && this.$store.state.daysFetched;
      },
      fruitToday() {
        return this.allFetched && this.$store.getters.fruitToday;
      },
      fruitYesterday() {
        return this.allFetched && this.$store.getters.fruitYesterday;
      },
      today() {
        return this.$store.getters.fruitToday;
      }
    },
    methods: {
      like() {
        if (Cookies.get('FrutaLike', true)) return;
        this.$store.dispatch('likeDislike', {name:this.fruitToday.name, type: 'likes'})
        .then(()=> {
          Cookies.set('FrutaLike', true);
        })
      },
      dislike() {
        if (Cookies.get('FrutaDislike', true)) return;
        this.$store.dispatch('likeDislike', {name:this.fruitToday.name, type: 'dislikes'})
        .then(()=> {
          Cookies.set('FrutaDislike', true);
        })
      }
    }
  }
</script>

<style lang="scss">
.main {
  &__image {
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    img {
      width: 100%;
    }
    &--small {
      @extend .main__image;
      max-width: 200px;
    }
  }
}
</style>
