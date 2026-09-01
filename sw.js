const CACHE = 'uro-logic-ftk-v35';
const CORE = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-180.png','./assets/LEFT.png','./assets/RIGHT.png','./assets/T1.jpg','./assets/T2.png','./assets/T3.png','./assets/T4.jpg','./assets/T5A.png','./assets/T5B.png','./assets/T5C.png','./assets/T6A.png','./assets/T6B.png','./assets/T6C.png','./assets/T6D.png','./assets/T7.png','./assets/T8A.png','./assets/T8B.png','./assets/T8C.png','./assets/T8D.png','./assets/T8E.png','./assets/T9.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => {
    if (cached) return cached;
    return fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(c => c.put(event.request, copy)).catch(() => {});
      return response;
    }).catch(() => caches.match('./index.html'));
  }));
});
