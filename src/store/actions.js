import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const toDateTime = secs => {
  var t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t;
}

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
    return new Promise(function(resolve, reject) {
      state.database.collection('fruits').get().then(list => {
        const fruits = [];
        list.forEach(item => {
          fruits.push(item.data());
        });
        commit('writeFruits', fruits)
        resolve();
      });
    });
  },
  getDays({state, commit}) {
    return new Promise(function(resolve, reject) {
      console.log('days begin');
      const now = new Date();
      const today = now.getDate();
      state.database.collection('days').where('day', '==', today).get().then(list => {
        if (list.empty) reject();
        else {
          const days = [];
          console.log('gotDays');
          list.forEach(item => {
            days.push(item.data());
          });
          commit('writeDays', days);
          console.log('days');
          resolve();
        }
      })
    });
  },
  getFruitOfTheDay({state,commit}) {
    var fruits = [];
    const newDate = new Date();
    const today = state.days.find(day => day.day === newDate.getDate());
    if (today) {
      today.name.forEach(element => {
        fruits.push(state.fruits.find(fruit => fruit.name === element))
      });
    } else fruits.push({name: 'Nenhuma',image: ''});
    new Promise(function(resolve, reject) {
      const images = [];
      fruits.forEach(element => {
        images.push(state.storage.ref(`fruits/${element.name}.png`).getDownloadURL())
      });
      Promise.all(images).then(imageResults => {
        imageResults.forEach((image, i) => {
          fruits[i].image = image
        });
        resolve();
      });
    }).then(() => {
      commit('writeFruitOfTheDay', fruits);
      commit('allFetched');
    });
  },
  submitFruit({state}, token) {
    const day = new Date();
    const data = {
      day: day.getDate(),
      name: token
    }
    return new Promise(function(resolve, reject) {
      state.database.collection("days").add(data).then(response => {
        if (response.id) resolve();
        else reject();
      })
    });
  }
}
