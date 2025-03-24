import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";  // ตรวจสอบว่า path ถูกต้อง
import Navbar from '../../component/nav';
import '../client/client.css';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";  // นำเข้าไอคอนเพื่อแสดง/ซ่อนรหัสผ่าน

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // เพิ่มสถานะการแสดงรหัสผ่าน
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
            <div className="regis flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="regis-box p-8 rounded-lg shadow-lg w-full max-w-lg shadow-black shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6 tracking-widest">Login</h2>
                    
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    
                    <div className="mt-4 tracking-wider">
                        <label className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your registered email..."
                            className="input text-white w-full mt-1 p-2 border-1 border-white rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 tracking-wider relative">
                        <label className="block text-sm font-medium text-white">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}  // ใช้ type ขึ้นอยู่กับสถานะของ showPassword
                            placeholder="Enter your registered password..."
                            className="input text-white w-full mt-1 p-2 border-1 border-white rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // สลับการแสดงรหัสผ่าน
                            className="absolute right-2 top-8 text-white"
                        >
                            {showPassword ? <AiFillEye size={22} /> : <AiFillEyeInvisible size={22} />} {/* ใช้ไอคอน */}
                        </button>
                    </div>
                    
                    <div className="mt-8 tracking-wider">
                        <Link to="/sentRequest" className="flex text-sky-500 text-sm justify-self-end">
                            Forgot password?
                        </Link>
                        <button
                            onClick={handleLogin}
                            className="w-full bg-yellow-600 text-white text-xl font-semibold py-2 mt-4 border-1 border-transparent rounded-lg cursor-pointer hover:bg-transparent hover:border-yellow-600 transition-all duration-200"
                        >
                            LOGIN
                        </button>
                        <div className="flex justify-start gap-2 mt-4">
                            <p className="text-white text-sm">Do not have an account yet?</p>
                            <Link to="/register" className="text-sky-500 text-sm">Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
