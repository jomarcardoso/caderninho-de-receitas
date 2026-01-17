const CACHE_NAME = 'cadertinho-de-receitas-v1';
const URLS_TO_CACHE = ['/', '/index.html'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_TO_CACHE);
    }),
  );
});
