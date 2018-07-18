let staticCacheName = 'neighborhood-map-app-page-cache-v1';

// Files that should be stored
var filesToCache = [
  '',
 '/index.html',
 '/favicon.ico',
 'https://fonts.googleapis.com/css?family=Fredoka+One',
 'https://fonts.googleapis.com/css?family=Quicksand',
 '/static/css/main.2d5eb5be.css',
 '/static/js/main.1bde2ff0.js',
 '/static/js/bundle.js',
 '/icons/pin-blue.png',
 '/icons/pin-blue.png'
];

// When service worker is installing,
// store the filesToCache in the cache
self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      console.log('Opened cache - public');
      return cache.addAll(filesToCache);
    })
    .catch(function(err) {
         console.log('Error: ' + err);
     })
  );
});

/*
 * Serve files from the cache
 * When request to server is sent,
 * bypass the request if the url matches the one in the cache.
 * Then serve the files from the cache for that url.
 */
self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    // Check the caches for url (event.request),
    // and then return response from cache
    caches.match(event.request).then(function(response) {

      // if there is any response (data) in the cache for that url
      // return that data (response)
      if (response) {
        console.log('Found ', event.request.url, ' in cache');

        return response;
      }

      // if there is no response in the cache,
      // make a request over the network to the server
      console.log('Network request for ', event.request.url);
      return fetch(event.request);
    })
  );
});
