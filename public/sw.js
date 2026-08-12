const CACHE_NAME = "avph-public-v1";

const PUBLIC_PAGES = [
  "/",
  "/about",
  "/academics",
  "/admissions",
  "/facilities",
  "/contact",
  "/offline",
];

const STATIC_ASSETS = [
  "/manifest.webmanifest",
  "/pwa-icon-192.png",
  "/pwa-icon-512.png",
  "/school-logo.png",
];

const PRIVATE_PREFIXES = [
  "/admin",
  "/teacher",
  "/parent",
  "/api",
];

const PRIVATE_KEYWORDS = [
  "/students",
  "/attendance",
  "/homework",
  "/results",
  "/parents",
  "/teachers",
];

function isPrivatePath(pathname) {
  return (
    PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)) ||
    PRIVATE_KEYWORDS.some((keyword) => pathname.includes(keyword))
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([...PUBLIC_PAGES, ...STATIC_ASSETS]))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isPrivatePath(url.pathname)) {
    event.respondWith(
      fetch(request).catch(
        () =>
          new Response(
            "School ERP features require an internet connection. Please reconnect and try again.",
            {
              status: 503,
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            }
          )
      )
    );
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && PUBLIC_PAGES.includes(url.pathname)) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match("/offline");
        })
    );
    return;
  }

  if (["style", "script", "image", "font", "manifest"].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
          })
      )
    );
  }
});
