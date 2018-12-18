import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  dataFetched: false,
  fruitsFetched: false,
  daysFetched: false,
  database: null,
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
