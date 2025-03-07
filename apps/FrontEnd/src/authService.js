import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

// ฟังก์ชันสมัคร User และบันทึกข้อมูลใน Firestore
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // บันทึก User ใน Firestore พร้อม Role
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: "user"
        });

        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};
