import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";  // ตรวจสอบว่า path ถูกต้อง
import Navbar from '../../component/nav';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/"); // เปลี่ยน path ตามหน้า home หลังล็อกอินสำเร็จ
        } catch (err) {
            setError("Invalid email or password"); // แสดงข้อความผิดพลาด
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold text-center text-black mb-6 tracking-wider">Login</h2>
                    
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
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your registered password..."
                            className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="mt-8">
                        <Link to="/forgot-password" className="flex text-sky-500 text-sm justify-self-end">
                            Forgot password?
                        </Link>
                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-500 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
                        >
                            LOGIN
                        </button>
                        <div className="flex justify-start gap-2 mt-4">
                            <p className="text-gray-500 text-sm">Do not have an account yet?</p>
                            <Link to="/register" className="text-sky-600 text-sm">Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
