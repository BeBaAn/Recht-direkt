const CACHE_NAME = 'recht-direkt-v2';
const ASSETS = [
  '/Recht-direkt/',
  '/Recht-direkt/index.html',
  '/Recht-direkt/styles.css',
  '/Recht-direkt/data/templates.js',
  '/Recht-direkt/data/tree.js',
  '/Recht-direkt/js/app.js',
  '/Recht-direkt/js/logo.js',
  '/Recht-direkt/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
