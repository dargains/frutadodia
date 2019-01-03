<template>
  <v-layout class="admin" text-xs-center wrap align-center justify-center row fill-height>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>
        <v-card-text>Apenas a Marta pode aceder este ambiente. Se não és a Marta BAZA!</v-card-text>
        <v-card-text>Se és a Marta coloca aqui a tua pass</v-card-text>
        <v-form ref="entry" v-model="validP">
          <v-flex xs10 style="margin: 0 auto;">
            <v-text-field label="Password" required :rules="passRules"></v-text-field>
          </v-flex>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" flat  to="/">Sair</v-btn>
          <v-btn color="primary" flat :disabled="!validP" @click="submitPass">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
            fechar
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
        dialog: true,
        valid: true,
        validP: true,
        snackbar: false,
        timeout: 3000,
        select: '',
        items: [],
        selectRules: [
          v => !!v || 'Escolha obrigatória'
        ],
        passRules: [
          v => !!v || 'Password obrigatória',
          v => /^(dargainseomaior)$/g.test(v) || 'Password errada'
        ]
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
      },
      submitPass() {
        if (this.$refs.entry.validate()) this.dialog = false;
      }
    }
  }
</script>
