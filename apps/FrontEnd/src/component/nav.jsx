// import React from 'react'
// import { Link } from "react-router-dom";
// import Icon from '../assets/react.svg';

// function nav() {
//     return (
//         <div className="navbar absolute fixed z-20 justify-between py-2 px-8">
//             <div className="navbar-start">
//                 {/* ซ่อนเมื่อจอมีขนาดใหญ่ */}
//                 <div className="dropdown">
//                     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor">
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M4 6h16M4 12h8m-8 6h16" />
//                         </svg>
//                     </div>

//                     <ul
//                         tabIndex={0}
//                         className="menu menu-sm bg-white dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow tracking-widest text-black">
//                         <li><Link to="/" >Home</Link></li>
//                         <li><Link to="/" >Menu</Link></li>
//                         <li><Link to="/" >Reservation</Link></li>
//                         <li><Link to="/" >History</Link></li>
//                         <li><Link to="/" >Contact us</Link></li>
//                     </ul>
//                 </div>
//                 {/* logo */}
//                 <a className="text-xl"><img src="#" alt="logo" /></a>
//             </div>

//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1 gap-32 text-lg text-white font-semibold tracking-wider">
//                     <li>
//                         <Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Menu</Link>
//                     </li>
//                     <li>
//                         <Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Reservation</Link>
//                     </li>
//                     <li>
//                         <Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">History</Link>
//                     </li>
//                     <li>
//                         <Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Contact us</Link>
//                     </li>
//                 </ul>
//             </div>

//             <div className="navbar-end">
//                 <Link to="/login" className=" flex px-4 py-1 text-white font-bold border-1 border-white rounded-full tracking-widest hover:bg-white hover:text-warning hover:border-white
//                 hover:scale-110 duration-300 ease-in-out"> 
//                     Login
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default nav

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";  // ดึง Firebase Auth
import { getFirestore, doc, getDoc } from "firebase/firestore";

function Navbar() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const db = getFirestore();

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setRole(userDoc.data().role);
                }
            } else {
                setUser(null);
                setRole("");
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        setUser(null);
        setRole("");
        navigate("/login");
    };

    return (
        <div className="navbar fixed justify-between py-2 px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm bg-white dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow tracking-widest text-black">
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/" >Menu</Link></li>
                        <li><Link to="/" >Reservation</Link></li>
                        <li><Link to="/" >History</Link></li>
                        <li><Link to="/" >Contact us</Link></li>
                    </ul>
                </div>
                <a className="text-xl"><img src="#" alt="logo" /></a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4 text-lg text-white tracking-wider">
                    <li><Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Home</Link></li>
                    <li><Link to="/menu" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Menu</Link></li>
                    <li><Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Reservation</Link></li>
                    <li><Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">History</Link></li>
                    <li><Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Contact us</Link></li>
                </ul>
            </div>

            <div className="navbar-end flex gap-4">
                {/* ถ้าเป็น Admin ให้แสดงเมนู Admin */}
                {role === "admin" && <Link to="/admin" className="text-red-500">Admin Panel</Link>}
                {role === "staff" && <Link to="/staff" className="text-yellow-500">View Bookings</Link>}
                {role === "customer" && <Link to="/booking" className="text-blue-500">Book Now</Link>}

                {/* ถ้ายังไม่ได้ Login ให้แสดงปุ่ม Login */}
                {!user ? (
                    <Link to="/login" className="flex px-4 py-1 text-white font-bold border-1 border-white rounded-full tracking-widest hover:bg-white hover:text-warning hover:border-white
                    hover:scale-110 duration-300 ease-in-out"> 
                        Login
                    </Link>
                ) : (
                    // ถ้าล็อกอินแล้ว ให้แสดงปุ่ม Logout
                    <button onClick={handleLogout} className="text-red-500">Logout</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;