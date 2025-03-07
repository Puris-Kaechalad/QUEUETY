import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";  // ตรวจสอบว่า path ถูกต้อง
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Firestore
import Navbar from '../../component/nav';

function Admin() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("customer");  // เพิ่ม state สำหรับเลือก role
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const db = getFirestore();

    const handleLogin = async () => {
        try {
            // ล็อกอินโดยไม่ใช้รหัสผ่าน (จะต้องตรวจสอบกับระบบที่มีหรือสามารถใช้งานได้จริง)
            // สมมติว่าอีเมลนี้จะถูกตรวจสอบจาก Firebase หรือระบบอื่น ๆ
            const user = auth.currentUser; // ตรวจสอบผู้ใช้ที่ล็อกอิน

            if (!user) {
                setError("Invalid email");
                return;
            }

            // เพิ่ม role ให้ผู้ใช้ใน Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: email,
                role: role
            }, { merge: true });  // ✅ ใช้ merge: true เพื่อไม่ให้ข้อมูลเก่าหายไป
            

            navigate("/admin-dashboard"); // ไปยังหน้า Admin Dashboard

        } catch (err) {
            setError("Invalid email or something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold text-center text-black mb-6 tracking-wider">Change Role</h2>
                    
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your registered email..."
                            className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600">Role</label>
                        <select
                            className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>
                    
                    <div className="mt-8">
                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-500 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
                        >
                            Submit
                        </button>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
