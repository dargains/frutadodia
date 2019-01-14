import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  config: {
    apiKey: "AIzaSyDxbnToX2rRUvhnTrReiiQ9nE7lAtYwwc8",
    authDomain: "fruta-do-dia.firebaseapp.com",
    databaseURL: "https://fruta-do-dia.firebaseio.com",
    projectId: "fruta-do-dia",
    storageBucket: "fruta-do-dia.appspot.com",
    messagingSenderId: "220283332867"
  },
  dataFetched: false,
  database: null,
  storage: null,
  fruitOfTheDay: [],
  fruits: [],
  days: []
}

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
