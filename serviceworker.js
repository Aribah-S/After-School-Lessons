var cacheName = "afterschool-v1";
var cacheFiles = [
  "index.html",
  "lessons.js",
  "afterschool.webmanifest",
  "images/art.jpg",
  "images/culinary.webp",
  "images/dance.avif",
  "images/diy.webp",
  "images/film.jpg",
  "images/game.webp",
  "images/IT.avif",
  "images/martialarts.jpg",
  "images/music.jpg",
  "images/P.E.jpg",
  "images/photography.jpg",
  "images/yoga.jpg",
  "images/social.jpg",
  "images/school-icon-512.png",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all the files");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      // Download the file if it is not in the cache,
      return (
        r ||
        fetch(e.request).then(function (response) {
          // add the new file to cache
          return caches.open(cacheName).then(function (cache) {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
