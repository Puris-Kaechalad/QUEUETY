import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ref, get, update } from 'firebase/database'; // ใช้ update แทน set
import { dbRealtime } from '../../firebaseConfig'; // Import จาก Firebase config
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // นำเข้า onAuthStateChanged
import Navbar from '../../component/nav';

function Admin() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("customer");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [userRole, setUserRole] = useState(""); // สถานะ role ของผู้ใช้
    const [loading, setLoading] = useState(true); // เพิ่มสถานะการโหลด
    const navigate = useNavigate();
    const auth = getAuth(); // ใช้ Firebase Auth เพื่อดึงข้อมูลผู้ใช้

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // ดึงข้อมูล role ของผู้ใช้จาก Realtime Database
                const userRef = ref(dbRealtime, `users/${currentUser.uid}`);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        if (userData.role !== "admin") {
                            // ถ้าไม่ใช่ admin ให้ redirect ไปหน้าอื่น
                            navigate("/unauthorized"); // หน้า Unauthorized หรือหน้าอื่น ๆ
                        } else {
                            setUserRole(userData.role); // ถ้าเป็น admin ให้เซ็ต role
                        }
                    } else {
                        navigate("/unauthorized");
                    }
                    setLoading(false); // ตั้งสถานะว่าโหลดเสร็จแล้ว
                });
            } else {
                setLoading(false); // หากไม่มีผู้ใช้
            }
        });

        return () => unsubscribe(); // Unsubscribe เมื่อใช้เสร็จ
    }, [auth, navigate]); // เพิ่ม `auth` และ `navigate` ใน array dependencies

    const handleRoleUpdate = async () => {
        setError("");
        setSuccess("");

        try {
            // ค้นหาผู้ใช้ที่มี email ตรงกับที่กรอก
            const usersRef = ref(dbRealtime, "users");
            const snapshot = await get(usersRef);
            const usersData = snapshot.val();
            let userId = null;

            // ค้นหาผู้ใช้ที่มี email ตรงกับที่กรอก
            for (let id in usersData) {
                if (usersData[id].email === email) {
                    userId = id;
                    break;
                }
            }

            if (!userId) {
                setError("Invalid email: User not found");
                return;
            }

            // อัปเดต role โดยไม่ลบข้อมูลเก่า
            await update(ref(dbRealtime, `users/${userId}`), { role: role }); // ใช้ update แทน set

            setSuccess("Role updated successfully!");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading...</p>; // แสดงข้อความขณะโหลด
    }

    if (userRole !== "admin") {
        return <p>You are not authorized to view this page.</p>; // หากไม่ใช่ admin แสดงข้อความนี้
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold text-center text-black mb-6 tracking-wider">Change Role</h2>
                    
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                    
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter user's email..."
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
                            onClick={handleRoleUpdate}
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
