import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Logo from "../assets/logo.png";
import { HashLink } from 'react-router-hash-link';

function Nav() {
    const [firstname, setFirstname] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const db = getDatabase();
                const userRef = ref(db, 'users/' + userId);

                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        setFirstname(snapshot.val().firstname);
                        setUserRole(snapshot.val().role);
                        setIsLoggedIn(true);
                    }
                    setLoading(false);
                }).catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
            } else {
                setIsLoggedIn(false);
                setLoading(false);
            }
        });
    }, []);

    const handleLogout = () => {
        setLoading(true);
        const auth = getAuth();
        signOut(auth).then(() => {
            setIsLoggedIn(false);
            setFirstname(null);
            setUserRole("");
            setLoading(false);
            navigate('/login');
        }).catch((error) => {
            console.error("Logout error:", error);
            setLoading(false);
        });
    };

    return (
        <div className="navbar absolute fixed z-20 justify-between py-2 px-8">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm bg-white dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow tracking-widest text-black">
                    {userRole === "staff" && (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/reserveHistory">History</Link></li>
                    </>
                    )}

                    {userRole !== "staff" && (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/reservation">Reservation</Link></li>
                        <li><a href="#contact-us">Contact us</a></li>
                        {userRole === "admin" && (
                        <>
                            <li><Link to="/reserveHistory">History</Link></li>
                            <li><Link to="/userInfo">User</Link></li>
                        </>
                        )}
                    </>
                    )}
                </ul>
                </div>
                <Link className="text-xl" to="/"><img src={Logo} alt="logo" className="h-18" /></Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-8 text-lg text-white tracking-wider">
                {userRole === "staff" && (
                    <>
                    <li><Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Home</Link></li>
                    <li><Link to="/reserveHistory" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">History</Link></li>
                    </>
                )}

                {userRole !== "staff" && (
                    <>
                    <li><Link to="/" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Home</Link></li>
                    <li><Link to="/menu" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Menu</Link></li>
                    <li><Link to="/reservation" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">Reservation</Link></li>

                    {userRole === "customer" && (
                        <li><Link to="/history" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">History</Link></li>
                    )}
                    {userRole === "admin" && (
                        <>
                        <li><Link to="/reserveHistory" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">History</Link></li>
                        <li><Link to="/userInfo" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">User</Link></li>
                        </>
                    )}
                    {userRole !== "admin" && (
                        <li>
                        <HashLink smooth to="/#contact-us" className="hover:scale-110 hover:bg-transparent rounded-full hover:text-warning transition-all duration-200">
                            Contact us
                        </HashLink>
                        </li>
                    )}
                    </>
                )}
                </ul>
            </div>

            <div className="navbar-end">
                {loading ? null : isLoggedIn ? (
                <div className="flex items-center">
                    <Link to="/profile" className="text-white mr-4 px-4 py-1 border-1 border-white rounded-full tracking-widest hover:bg-white hover:text-warning hover:border-white hover:scale-110 duration-300 ease-in-out">{firstname}</Link>
                    <button onClick={handleLogout} className="text-white font-bold cursor-pointer hover:text-gray-400 duration-300 ease-in-out">Logout</button>
                </div>
                ) : (
                <Link to="/login" className="px-4 py-1 text-white font-bold border-1 border-white rounded-full tracking-widest hover:bg-white hover:text-warning hover:border-white hover:scale-110 duration-300 ease-in-out">Login</Link>
                )}
            </div>
            </div>

    );
}

export default Nav;
