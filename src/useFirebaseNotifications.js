import React, { useEffect} from 'react';
import { generateToken,messaging } from './firebase';
import {onMessage} from "firebase/messaging"
import { requestFirebaseNotificationPermission } from './firebase';
let userEmail = null
export const useFirebaseNotifications = () => {
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      
    })
    .catch((err) => {
      console.error('❌ Service Worker registration failed:', err);
    });
}

  useEffect(() => {
    requestFirebaseNotificationPermission().then(async (token) => {
      if (token) {
        if(localStorage.getItem('userEmail')){
          userEmail = localStorage.getItem('userEmail')
        }
        // Send token to backend
        //console.log('Notification permission granted and token retrieved');
        await fetch("https://soc-net.info/backend/save_token.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:userEmail, token:token })
      });
      }
    });

    onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      // Show custom UI or toast here if you want
    });
  }, []);
  useEffect(() => {
  const checkViews = async () => {
    const res = await fetch('https://soc-net.info/backend/notification.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localStorage.getItem('userEmail') }),
    });
    //console.log(res)
    const data = await res.json();
    if (data.status === 'success' && data.notified) {
      console.log("Push notification sent!");
    }
  };

  const interval = setInterval(checkViews, 10000); // Every 10 seconds

  return () => clearInterval(interval);
}, []);

  useEffect(()=>{
      generateToken()
      onMessage(messaging,(payload)=>{
        console.log(payload)
      })
    },[])
};