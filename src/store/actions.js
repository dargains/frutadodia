import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';
// import 'googleapis'
var request = require('google-oauth-jwt').requestWithJWT();

const toDateTime = secs => {
	var t = new Date(1970, 0, 1);
	t.setSeconds(secs);
	return t;
}

var SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];

// function getAccessToken() {
//   return new Promise(function(resolve, reject) {
//     var key = require('../account.json');
//     console.log(gapi);
//     var jwtClient = new google.auth.JWT(
//       key.client_email,
//       null,
//       key.private_key,
//       SCOPES,
//       null
//     );
//     jwtClient.authorize(function(err, tokens) {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(tokens.access_token);
//     });
//   });
// }

export default {
	connectToDatabase({state,commit,dispatch}) {
		return new Promise(resolve => {
			firebase.initializeApp(state.config);
			var settings = {
				timestampsInSnapshots: true
			};
      var database = firebase.firestore();
			database.settings(settings);
			commit('writeDatabase', database);
			// dispatch('requestPush');
      // getAccessToken()
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
	getFruits({state,commit}) {
		return new Promise(resolve => {
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
	getDays({state,commit}) {
		return new Promise((resolve, reject) => {
			state.database.collection('days').get().then(list => {
				const today = new Date();
				today.setHours(0, 0, 0, 0);
				let fruitOfTheDay = {};
				list.forEach(day => {
					const dayTime = toDateTime(day.data().day.seconds)
					if (today.getTime() === dayTime.getTime()) {
						state.dayId = day.id;
						fruitOfTheDay = day.data();
					}
				})
				if (!fruitOfTheDay.day) reject('nothing today');
				else {
					const days = [];
					list.forEach(item => {
						days.push(item.data());
					});
					commit('writeFruitOfTheDay', fruitOfTheDay.fruits);
					resolve();
				}
			})
		});
	},
	requestPush({state,dispatch}) {
		const messaging = firebase.messaging();
		messaging.usePublicVapidKey("BBhTY2Zuww6VIUPzL4Ta39M_QTUdUJyTAxpvoh2P1-Ah2daTfDRlJRYtU6dytVpCTfVh7rfSbCjqF2roVnd9LqA");
		messaging.requestPermission()
			.then(() => {
				console.log('have permission');
				return messaging.getToken();
			})
			.then(token => {
				state.token = token;
				messaging.onMessage(payload => {
					console.log(payload);
				});
			})
			.catch(() => {
				console.log('dont have permission');
			})
      messaging.onMessage(function(payload) {
        console.log("Message received. ", payload);
      });
	},
	submitFruit({state,dispatch}, fruits) {
		const day = new Date();
		day.setHours(0, 0, 0, 0);
		const data = {
			day,
			fruits
		}
		return new Promise((resolve, reject) => {
			if (state.fruitOfTheDay.length) {
				state.database.collection("days").doc(state.dayId).set(data)
					.then(() => {
						dispatch('sendMessage', fruits);
						resolve();
					});
			} else {
				state.database.collection("days").add(data).then(response => {
					if (response.id) {
						dispatch('sendMessage', fruits);
						resolve();
					} else reject();
				});
			}
		});
	},
	sendMessage({state}, fruits) {
		const body = fruits.length === 1 ? `A fruta do dia é ${fruits[0]}!` : `As frutas do dia são ${fruits[0]} e ${fruits[1]}!`
		fetch('https://fcm.googleapis.com/v1/projects/fruta-do-dia/messages:send', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer AIzaSyDxbnToX2rRUvhnTrReiiQ9nE7lAtYwwc8' //+ state.accessToken
			},
			body: JSON.stringify({
				"message": {
					// "token": state.token,
					"notification": {
						"body": body,
						"title": "Saiu a Fruta do dia!",
					}
				}
			})
		})
	}
}
