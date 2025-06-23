// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwaT6BPcZw7j7pGV8hWmjEcfSbPNYb9Ag",
  authDomain: "single-plate-express.firebaseapp.com",
  projectId: "single-plate-express",
  storageBucket: "single-plate-express.firebasestorage.app",
  messagingSenderId: "777729741209",
  appId: "1:777729741209:web:e2985e931d3323e1560308",
  measurementId: "G-X3Z9BM8F04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
