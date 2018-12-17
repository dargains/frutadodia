import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';

export default {
  connectToDatabase({state, commit}) {
    return new Promise((resolve, reject) => {
      var config = {
        apiKey: "AIzaSyDxbnToX2rRUvhnTrReiiQ9nE7lAtYwwc8",
        authDomain: "fruta-do-dia.firebaseapp.com",
        databaseURL: "https://fruta-do-dia.firebaseio.com",
        projectId: "fruta-do-dia",
        storageBucket: "fruta-do-dia.appspot.com",
        messagingSenderId: "220283332867"
      };
      firebase.initializeApp(config);
      var database = firebase.firestore();
      var settings = { timestampsInSnapshots: true };
      database.settings(settings);
      commit('writeDatabase', database);
      resolve();
    });
  },
  getFruits({state}) {
    state.database.collection('fruits').get().then(list => {
      const fruits = [];
      list.forEach(item => {
        fruits.push(item.data());
      });
      state.fruits.push(...fruits);
      state.dataFetched = true;
    });
  },
  getDays({state}) {
    state.database.collection('days').get().then(list => {
      const days = [];
      list.forEach(item => {
        days.push(item.data());
      });
      state.days.push(...days);
      state.dataFetched = true;
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
  likeDislike({state}, token) {
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
