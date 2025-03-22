import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"; // นำเข้า signOut
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import '../client/client.css';

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
            <div className="regis flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="regis-box p-8 rounded-lg shadow-lg w-full max-w-lg shadow-black shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6 tracking-wider">Register</h2>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}

                    <form onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white">Firstname</label>
                                <input name="firstname" type="text" placeholder="Enter your firstname..."
                                    value={formData.firstname} onChange={handleChange}
                                    className="input text-white w-full mt-1 p-2  border-1 border-white rounded-lg bg-transparent" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Lastname</label>
                                <input name="lastname" type="text" placeholder="Enter your lastname..."
                                    value={formData.lastname} onChange={handleChange}
                                    className="input text-white w-full mt-1 p-2  border-1 border-white rounded-lg bg-transparent" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-white">Email</label>
                            <input name="email" type="email" placeholder="Enter your email..."
                                value={formData.email} onChange={handleChange}
                                className="input text-white w-full mt-1 p-2  border-1 border-white rounded-lg bg-transparent" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-white">Phone number</label>
                                <input name="phone" type="tel" placeholder="Enter your phone number..."
                                    value={formData.phone} onChange={handleChange}
                                    className="input text-white w-full mt-1 p-2  border-1 border-white rounded-lg bg-transparent" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Date of birth</label>
                                <input name="dob" type="text" placeholder="dd/mm/yyyy"
                                    value={formData.dob} onChange={handleChange}
                                    className="input text-white w-full mt-1 p-2  border-1 border-white rounded-lg bg-transparent" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-white">Create Password</label>
                                <input name="password" type="password" placeholder="Create password..."
                                    value={formData.password} onChange={handleChange}
                                    className="input text-white w-full mt-1 p-2  border-1 border-white rounded-lg bg-transparent" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Confirm Password</label>
                                <input name="confirmPassword" type="password" placeholder="Confirm password..."
                                    value={formData.confirmPassword} onChange={handleChange}
                                    className="input text-white w-full mt-1 p-2 border-1 border-white rounded-lg bg-transparent" />
                            </div>
                        </div>

                        <div className="mt-8 tracking-wider">
                            <button type="submit" className="w-full bg-yellow-600 text-white text-xl font-semibold py-2 border-1 border-transparent rounded-lg cursor-pointer hover:bg-transparent hover:border-yellow-600 transition-all duration-200">
                                REGISTER
                            </button>
                            <div className="text-center mt-4">
                                <Link to="/login" className="text-white text-lg mt-3 hover:text-gray-400 duration-200">Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
