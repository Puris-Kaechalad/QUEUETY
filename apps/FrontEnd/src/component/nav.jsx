import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";  // ดึง Firebase Auth
import { getFirestore, doc, getDoc } from "firebase/firestore";

function Navbar() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");
    const [firstName, setFirstName] = useState("");  // เปลี่ยนเป็น firstname แทน firstName
    const navigate = useNavigate();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setRole(userDoc.data().role);
                    setFirstName(userDoc.data().firstname);  // ใช้ firstname แทน firstName
                }
            } else {
                setUser(null);
                setRole("");
                setFirstName("");  // รีเซ็ต firstName เมื่อไม่มีผู้ใช้งาน
            }
        });

        // Cleanup function to unsubscribe from the auth listener when the component is unmounted
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        setUser(null);
        setRole("");
        setFirstName("");  // รีเซ็ต firstName เมื่อออกจากระบบ
        navigate("/login");
    };

    return (
        <div className="navbar fixed z-20 justify-between py-2 px-8">
            <div className="navbar-start">
                <Link to="/" className="text-xl"><img src="#" alt="logo" /></Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg text-white font-semibold tracking-wider">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Menu</Link></li>
                    <li><Link to="/">Reservation</Link></li>
                    <li><Link to="/">History</Link></li>
                    <li><Link to="/">Contact us</Link></li>
                </ul>
            </div>

            <div className="navbar-end flex gap-4">
                {role === "admin" && <span className="text-red-500">Admin</span>}
                {role === "staff" && <span className="text-yellow-500">Staff</span>}
                {role === "customer" && <span className="text-blue-500">{firstName}</span>}

                {!user ? (
                    <Link to="/login" className="px-4 py-1 text-white font-bold border border-white rounded-full hover:bg-white hover:text-warning hover:scale-110 transition duration-300">
                        Login
                    </Link>
                ) : (
                    <button onClick={handleLogout} className="text-red-500">Logout</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
