/* Minimal SW for a static GitHub Pages site */
const VERSION = "v1";
const CACHE_NAME = `portfolio-${VERSION}`;

const PRECACHE = [
  "./",
  "./index.html",
  "./css/tailwind.css",
  "./css/styles.css",
  "./js/scripts.js",
  "./assets/favicon.svg",
  "./assets/favicon-16.png",
  "./assets/favicon-32.png",
  "./assets/profile.jpg",
  "./assets/og-image.png",
  "./assets/pwa-192.png",
  "./assets/pwa-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k.startsWith("portfolio-") && k !== CACHE_NAME ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Network-first for navigations (avoid stale HTML after deploy)
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Cache-first for same-origin static assets
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      }))
    );
  }
});
