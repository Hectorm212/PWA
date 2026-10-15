// 1. Definimos el nombre y la versión de la caché estática
const CACHE_NAME = 'shopexpress-shell-v1';

// 2. Listado de todos los recursos estáticos esenciales que forman el App Shell
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './images/icon-192x192.svg',
    './images/icon-512x512.svg',
    '../src/js/app.js'
];

// INSTALACIÓN: Guardando recursos estáticos
self.addEventListener('install', event => {
    console.log('SW: Guardando recursos estáticos en la caché...');
    
    // Esperamos a que la promesa de guardado se complete antes de finalizar la instalación
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// ACTIVACIÓN
self.addEventListener('activate', event => {
    console.log('SW: Activado y listo.');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => cache.match(event.request))
            .then(response => response || fetch(event.request))
    );
});