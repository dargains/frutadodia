importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyDxbnToX2rRUvhnTrReiiQ9nE7lAtYwwc8",
  authDomain: "fruta-do-dia.firebaseapp.com",
  databaseURL: "https://fruta-do-dia.firebaseio.com",
  projectId: "fruta-do-dia",
  storageBucket: "fruta-do-dia.appspot.com",
  messagingSenderId: "220283332867"
}

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '../assets/logo.jpg'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
