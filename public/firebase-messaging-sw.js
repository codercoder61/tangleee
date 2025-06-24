// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
console.log('[🔥 Mohamed] My custom service worker is running!');

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyD2fsBCHQnv45uxgYLF3xlooU4iWHxMoKc",
  authDomain: "pushnotification-9e11d.firebaseapp.com",
  projectId: "pushnotification-9e11d",
  storageBucket: "pushnotification-9e11d.firebasestorage.app",
  messagingSenderId: "528922930690",
  appId: "1:528922930690:web:408666e50d79ac913b411b"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    console.log('[🔥 Mohamed] Push received in custom SW:', data);

    const title = data.data.title || 'Default';
    const options = {
      body: data.data.body || '',
      icon: data.data.icon || 'https://connectamour.vercel.app/logo.png',
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  } else {
    console.log('[🔥 Mohamed] Push received with no data');
  }
});


self.addEventListener('notificationclick', function(event) {
  const click_action = event.notification?.data?.click_action || '/';
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) {
        return clients.openWindow(click_action); // e.g. "/notifications/123"
      }
    })
  );
});


//528922930690-bbqv5umaeclikvp1ga6cu16otu6da7rs.apps.googleusercontent.com
