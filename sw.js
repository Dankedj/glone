const CACHE_NAME = "organisation-app-cache-v1";
const urlsToCache = [
  "offline.html",
];

// Installation du Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache ouvert");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation du Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Cache obsolète supprimé :", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Interception des requêtes (fetch)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Si la requête échoue, retourne la page hors ligne du cache
      return caches.match("offline.html");
    })
  );
});