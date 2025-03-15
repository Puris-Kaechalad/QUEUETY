import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"; // นำเข้า signOut
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

import Navbar from '../../component/nav';

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        confirmPassword: "",
        role: "customer"
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const db = getFirestore();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    
        try {
            // สร้างบัญชีผู้ใช้ใน Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
    
            // บันทึกข้อมูลเพิ่มเติมลง Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                phone: formData.phone,
                dob: formData.dob,
                role: formData.role
            });

            // บันทึกลง Firebase Realtime Database
            const dbRealtime = getDatabase();
            await set(ref(dbRealtime, 'users/' + user.uid), {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                phone: formData.phone,
                dob: formData.dob,
                role: formData.role
            });

            // ออกจากระบบอัตโนมัติหลังจากสมัครเสร็จ
            await signOut(auth);

            setSuccess("Registered successfully! Please login.");
            setError(null);
    
            // Redirect ไปหน้า Login หลังจาก 2 วินาที
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError("This email is already in use. Please try with a different email.");
            } else {
                setError(err.message);
            }
            setSuccess(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold text-center text-black mb-6 tracking-wider">Register</h2>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}

                    <form onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Firstname</label>
                                <input name="firstname" type="text" placeholder="Enter your firstname..."
                                    value={formData.firstname} onChange={handleChange}
                                    className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Lastname</label>
                                <input name="lastname" type="text" placeholder="Enter your lastname..."
                                    value={formData.lastname} onChange={handleChange}
                                    className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input name="email" type="email" placeholder="Enter your email..."
                                value={formData.email} onChange={handleChange}
                                className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Phone number</label>
                                <input name="phone" type="tel" placeholder="Enter your phone number..."
                                    value={formData.phone} onChange={handleChange}
                                    className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Date of birth</label>
                                <input name="dob" type="text" placeholder="dd/mm/yyyy"
                                    value={formData.dob} onChange={handleChange}
                                    className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Create Password</label>
                                <input name="password" type="password" placeholder="Create password..."
                                    value={formData.password} onChange={handleChange}
                                    className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                                <input name="confirmPassword" type="password" placeholder="Confirm password..."
                                    value={formData.confirmPassword} onChange={handleChange}
                                    className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100" />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
                                REGISTER
                            </button>
                            <div className="text-center mt-4">
                                <Link to="/login" className="text-gray-500 text-md mt-3">Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
