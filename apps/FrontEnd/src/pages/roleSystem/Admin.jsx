import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import Navbar from '../../component/nav';

function Admin() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("customer");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const db = getFirestore();

    const handleRoleUpdate = async () => {
        setError("");
        setSuccess("");

        try {
            // ค้นหาผู้ใช้ที่มี email ตรงกับที่กรอก
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError("Invalid email: User not found");
                return;
            }

            // ดึง UID ของผู้ใช้
            const userDoc = querySnapshot.docs[0];
            const userId = userDoc.id;

            // อัปเดต role โดยไม่ลบข้อมูลเก่า
            await setDoc(doc(db, "users", userId), { role: role }, { merge: true });

            setSuccess("Role updated successfully!");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

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
