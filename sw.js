const CACHE_NAME = "love-story-v4";
const ASSETS = [
  "./", 
  "./index.html", 
  "./style.css", 
  "./script.js", 
  "./manifest.json",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});

self.addEventListener("push", (e) => {
  const data = e.data ? e.data.json() : { title: "Hey 💕", body: "Thinking of you!" };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./assets/icon-192.png",
      badge: "./assets/icon-192.png",
      data: { url: self.location.origin }
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url));
});