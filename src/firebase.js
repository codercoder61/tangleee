// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging ,getToken} from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
let userEmail = null
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2fsBCHQnv45uxgYLF3xlooU4iWHxMoKc",
  authDomain: "pushnotification-9e11d.firebaseapp.com",
  projectId: "pushnotification-9e11d",
  storageBucket: "pushnotification-9e11d.firebasestorage.app",
  messagingSenderId: "528922930690",
  appId: "1:528922930690:web:408666e50d79ac913b411b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    //console.log(permission)
    if(permission==="granted"){
      const token = await getToken(messaging,{
        vapidKey:"BCSoicnhKeNKKX8z8uWmxTrx1KQmoiadJecYerLVqCdaW6GB645z3I1PfZIR4jAWSmTLnSwD5jyBAvm6HguT4K8"
      })
      //console.log(token)
      if(localStorage.getItem('userEmail')){
        userEmail = localStorage.getItem('userEmail')
      }
      if (token) {
      // Send token to your backend
      await fetch("https://soc-net.info/backend/save_token.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:userEmail, token:token })
      });
    }
    }
}

export const requestFirebaseNotificationPermission = async () => {
  try {
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

    const token = await getToken(messaging, {
      vapidKey: "BCSoicnhKeNKKX8z8uWmxTrx1KQmoiadJecYerLVqCdaW6GB645z3I1PfZIR4jAWSmTLnSwD5jyBAvm6HguT4K8",
      serviceWorkerRegistration: registration,
    });

    //console.log("FCM token:", token);
    return token;
  } catch (error) {
    console.error("FCM error:", error);
    return null;
  }
};

