var cacheName = 'Fruta do Dia v1.5';
var filesToCache = [
  '/',
  'index.html',
  'favicon.png',
  'service-worker.js',
  'manifest.json',
  'Share.jpg',
  'css/app.css',
  'css/chunk.css',
  'js/app.js',
  'js/app.js.map',
  'js/chunk.js',
  'js/chunk.js.map',
  'js/chunk-vendors.js',
  'js/chunk-vendors.js.map',
  'img/pen.svg',
  'icons/16x16.png',
  'icons/32x32.png',
  'icons/48x48.png',
  'icons/64x64.png',
  'icons/128x128.png',
  'icons/167x167.png',
  'icons/180x180.png',
  'icons/192x192.png',
  'icons/256x256.png',
  'icons/512x512.png',
  '/img/negative.svg',
  '/img/positive.svg',
  'img/icons/Ameixa.svg',
  'img/icons/Banana.svg',
  'img/icons/Cerejas.svg',
  'img/icons/Chocolates.svg',
  'img/icons/Clementina.svg',
  'img/icons/Kiwi.svg',
  'img/icons/Laranja.svg',
  'img/icons/Maçã.svg',
  'img/icons/Morangos.svg',
  'img/icons/Nenhuma.svg',
  'img/icons/Pêra.svg',
  'img/icons/Pessego.svg',
  'img/icons/Surpresa.svg',
  'img/icons/Uvas.svg',
  'img/images/Ameixa.png',
  'img/images/Banana.png',
  'img/images/Cerejas.png',
  'img/images/Chocolates.png',
  'img/images/Clementina.png',
  'img/images/Kiwi.png',
  'img/images/Laranja.png',
  'img/images/Maçã.png',
  'img/images/Morangos.png',
  'img/images/Pêra.png',
  'img/images/Pessego.png',
  'img/images/Surpresa.png',
  'img/images/Uvas.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
self.addEventListener('push', function(event) {
  const title = 'Fruta do dia';
  const options = {
    body: event.data.text(),
    icon: '/icons/128x128.png',
    badge: '/icons/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://frutadodia.azurewebsites.net')
  );
});
