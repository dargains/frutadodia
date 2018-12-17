<template>
  <v-layout class="admin" text-xs-center wrap align-center justify-center row fill-height>
    <v-flex xs12 sm8 md4>
      <v-form ref="form" v-model="valid">
        <p class="subheading mb-1 mt-2">Escolha a Fruta do Dia</p>
        <v-combobox
          v-model="select"
          :items="fruits"
          label="Fruta do dia"
           required :rules="selectRules"
        ></v-combobox>

        <v-btn :disabled="!valid" @click="submit" color="primary">
          Enviar
        </v-btn>
        <v-btn to="/">
          Voltar
        </v-btn>
        <v-snackbar v-model="snackbar" :timeout="timeout" right>
          Publicado!
          <v-btn color="pink" flat @click="snackbar = false">
            voltar
          </v-btn>
        </v-snackbar>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Admin',
    data () {
      return {
        valid: true,
        snackbar: false,
        timeout: 3000,
        select: '',
        items: [],
        selectRules: [
          v => !!v || 'Escolha obrigatória'
        ],
      }
    },
    computed: {
      fruits() {
        return this.$store.getters.fruitNames;
      }
    },
    methods: {
      submit () {
        if (!!this.select && this.$refs.form.validate()) {
          this.$store.dispatch('submitFruit', this.select);
          this.snackbar = true;
          setTimeout(() => {
            this.$refs.form.reset()
          }, 3000)
        }
      }
    }
  }
</script>
