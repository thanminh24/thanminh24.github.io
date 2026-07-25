const CACHE_NAME = "rel301m-study-0f926db6-cef7396b";
const BASE_PATH = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const CORE_ROUTES = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/library/`,
  `${BASE_PATH}/flashcards/`,
  `${BASE_PATH}/match/`,
  `${BASE_PATH}/learn/`,
  `${BASE_PATH}/test/`,
  `${BASE_PATH}/progress/`,
  `${BASE_PATH}/manifest.webmanifest`,
  `${BASE_PATH}/icons/icon-192.svg`,
  `${BASE_PATH}/icons/icon-512.svg`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const assets = new Set();
      for (const route of CORE_ROUTES) {
        const response = await fetch(route, { cache: "reload" });
        if (!response.ok) throw new Error(`Could not precache ${route}`);
        await cache.put(route, response.clone());
        if (response.headers.get("content-type")?.includes("text/html")) {
          const html = await response.text();
          for (const match of html.matchAll(
            /(?:src|href)=["']([^"']+)["']/g,
          )) {
            const url = new URL(match[1], self.location.origin);
            if (
              url.origin === self.location.origin &&
              url.pathname.startsWith(`${BASE_PATH}/_next/`)
            ) {
              assets.add(url.href);
            }
          }
        }
      }
      await cache.addAll([...assets]);
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("rel301m-study-") && key !== CACHE_NAME,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    (async () => {
      const requestUrl = new URL(event.request.url);
      const cached =
        (await caches.match(event.request)) ||
        (event.request.mode === "navigate" &&
        requestUrl.origin === self.location.origin
          ? await caches.match(requestUrl.pathname)
          : null);
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok && requestUrl.origin === self.location.origin) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached || caches.match(`${BASE_PATH}/`));
      return cached || network;
    })(),
  );
});
