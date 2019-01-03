import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export default {
  connectToDatabase({state, commit}) {
    return new Promise(resolve => {
      firebase.initializeApp(state.config);
      var database = firebase.firestore();
      var settings = { timestampsInSnapshots: true };
      database.settings(settings);
      commit('writeDatabase', database);
      resolve();
    });
  },
  connectToStorage({commit}) {
    return new Promise(resolve => {
      var storage = firebase.storage();
      commit('writeStorage', storage);
      resolve();
    });
  },
  getFruits({state, commit}) {
    state.database.collection('fruits').get().then(list => {
      const fruits = [];
      list.forEach(item => {
        fruits.push(item.data());
      });
      commit('writeFruits', fruits);
      commit('dataFetched');
    });
  },
  getDays({state, commit}) {
    state.database.collection('days').get().then(list => {
      const days = [];
      list.forEach(item => {
        days.push(item.data());
      });
      commit('writeDays', days);
      commit('dataFetched');
    });
  },
  submitFruit({state}, token) {
    const day = new Date();
    const data = {
      day,
      name: token
    }
    state.database.collection("days").add(data);
  },
  rateFruit({state}, token) {
    let doc = {};
    let id = "";
    state.database.collection('fruits').where('name', '==', token.name).get().then(list => {
      list.forEach(item => {
        id = item.id;
        doc = item.data();
      });
      doc[token.type]++;
      return state.database.collection('fruits').doc(id).set(doc)
    });
  },
}
