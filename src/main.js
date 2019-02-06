import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import firebase from 'firebase/app';
import 'firebase/app';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#FDD')


const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const applicationServerPublicKey = 'BFEUjMFPhU-ALuhtgjSz2q7RNS-LyIFRDrgAuwkzQzB3BnJUW3LC6dcb8VrJ-QsVmOIii8tBCXUqXDtxD1Pg1NA';
let isSubscribed = false;
let swRegistration = null;

const updateSBS = () => {
  if (Notification.permission === 'denied') {
    updateSubscriptionOnServer(null);
    return;
  }
}

const init = () => {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      console.log('User is subscribed.');

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      updateSBS();
    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      updateSBS();
    });
}

const updateSubscriptionOnServer = subscription => {
  if (subscription) {
    // document.querySelector('#asd').textContent = JSON.stringify(subscription);
    store.dispatch('registerUser', JSON.stringify(subscription));
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then(function(swReg) {
      console.log('Fruta do Dia Service Worker v1.5 Registered');
      // firebase.messaging().useServiceWorker(swReg);
      swRegistration = swReg;
      swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
          isSubscribed = !(subscription === null);
          // updateSubscriptionOnServer(subscription);

          if (isSubscribed) {
            console.log('User IS subscribed.');
          } else {
            console.log('User is NOT subscribed.');
            init();
          }

        });
    });
}
