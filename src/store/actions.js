import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';

const toDateTime = secs => {
	var t = new Date(1970, 0, 1);
	t.setSeconds(secs);
	return t;
}
const addZero = i => i < 10 ? "0" + i : i;
const getToday = () => {
	let today = new Date();
	return today.getFullYear() + addZero(today.getMonth()+1) + addZero(today.getDate())
}

const publicKey = 'BFEUjMFPhU-ALuhtgjSz2q7RNS-LyIFRDrgAuwkzQzB3BnJUW3LC6dcb8VrJ-QsVmOIii8tBCXUqXDtxD1Pg1NA';
const privateKey = 'Qj7hJh0Kz0Sxs1_rVf-yVwbEjAC03FBiJmuAijHsC0Y';

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
			state.database.collection('days').doc(getToday()).get().then(doc => {
				if(doc.exists) {
					commit('writeFruitOfTheDay', doc.data().fruits);
					resolve();
				} else {
					reject('nothing today');
				}
			})
			.catch(() => {

			})
		});
	},
	registerUser({state}, token) {
		state.database.collection("subscriptions").add({token}).then(response => {
			if (response.id) {
				alert('subscribed')
			}
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
			state.database.collection('days').doc(getToday()).set(data)
			.then(() => {
					dispatch('sendMessage', fruits);
					resolve();
			});
		});
	},
	sendMessage({state}, fruits) {
		const payload = fruits.length === 1 ? `A fruta do dia é ${fruits[0]}!` : `As frutas do dia são ${fruits[0]} e ${fruits[1]}!`

		state.database.collection('subscriptions').get().then(list => {
			list.forEach(item => {
				const pushSubscription = JSON.parse(item.data().token);

				fetch('https://cors-anywhere.herokuapp.com/https://web-push-codelab.glitch.me/api/send-push-msg', {
					method: 'post',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify({
						applicationKeys: {
							public: publicKey,
							private: privateKey
						},
						data: payload,
						subscription: pushSubscription
					})
				}).then(response => {
						// console.log(response);
					})
			});
		});

	}
}
