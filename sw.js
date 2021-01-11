//Colocando Cache
const CACHE_NAME = "v1_cache_contador_vue";
const urlsToCache = [
    "./",
    "./img/favicon.png",
    "./img/icon_32.png",
    "./img/icon_64.png",
    "./img/icon_128.png",
    "./img/icon_256.png",
    "./img/icon_512.png",
    "./img/icon_1024.png",
    "./js/main.js",
    "./js/mountApp.js",
    "https://unpkg.com/vue@next",
    "./css/style.css",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
];

// Escuchando evento install para agregar caches
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(
        cache => cache.addAll(urlsToCache)
        .then( () => self.skipWaiting() )
        .catch(err => console.log(err))
        )
    )
});

//Escuchando evento activate
self.addEventListener("activate", e => {
    const cacheWhiteList = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(
            cacheNames => {
                return Promise
                .all(cacheNames.map(
                   cacheName => {
                       if(cacheWhiteList.indexOf(cacheName) === -1) {
                           return caches.delete(cacheName)
                       }
                   } 
                ))
            }
        ).then(
            () => self.clients.claim()
        )
    )
});

//Escuchando fetch, actualizar cache
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(
            (res) => {
                if(res) {
                    return res;
                }
                return fetch(e.request);
            }
        )
    )
})