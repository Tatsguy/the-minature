import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAAexIRkNFnwH_8gorwhxjWgwjnSjjtyUE",
  authDomain: "notifs-b6e3c.firebaseapp.com",
  projectId: "notifs-b6e3c",
  storageBucket: "notifs-b6e3c.firebasestorage.app",
  messagingSenderId: "115081420919",
  appId: "1:115081420919:web:0377fc09445a970f096672"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
