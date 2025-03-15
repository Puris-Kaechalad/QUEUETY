import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // เพิ่มการเชื่อมต่อกับ Realtime Database
import { getFirestore } from "firebase/firestore"; // เพิ่มการเชื่อมต่อกับ Firestore


const firebaseConfig = {
    apiKey: "AIzaSyC_XuUaUoXS8xATQDri88ZqiF6KLc7eFsw",
    authDomain: "myapp-26a79.firebaseapp.com",
    databaseURL: "https://myapp-26a79-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "myapp-26a79",
    storageBucket: "myapp-26a79.firebasestorage.app",
    messagingSenderId: "122887159820",
    appId: "1:122887159820:web:51805b10653fa741a8ee29",
    measurementId: "G-2LTR9QPTFX"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

// Get instances of the services
const auth = getAuth(app);
const dbRealtime = getDatabase(app); // Realtime Database
const dbFirestore = getFirestore(app); // Firestore

export { auth, dbRealtime, dbFirestore }; // ส่งออก Realtime Database และ Firestore
export default app;
