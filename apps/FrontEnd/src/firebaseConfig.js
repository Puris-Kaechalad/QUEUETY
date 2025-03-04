import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_XuUaUoXS8xATQDri88ZqiF6KLc7eFsw",
    authDomain: "myapp-26a79.firebaseapp.com",
    projectId: "myapp-26a79",
    storageBucket: "myapp-26a79.firebasestorage.app",
    messagingSenderId: "122887159820",
    appId: "1:122887159820:web:51805b10653fa741a8ee29",
    measurementId: "G-2LTR9QPTFX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;