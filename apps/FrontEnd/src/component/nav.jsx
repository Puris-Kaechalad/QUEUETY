import React from 'react'
import { Link } from "react-router-dom";
import Icon from '../assets/react.svg';

function nav() {
    return (
        <div className="navbar absolute fixed z-20 justify-between py-2 px-8 bg-gray-300 opacity-90">
            <div className="navbar-start">
                {/* ซ่อนเมื่อจอมีขนาดใหญ่ */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow tracking-widest text-black">
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/" >Menu</Link></li>
                        <li><Link to="/" >Reservation</Link></li>
                        <li><Link to="/" >History</Link></li>
                        <li><Link to="/" >Contact us</Link></li>
                    </ul>
                </div>
                {/* logo */}
                <a className="text-xl"><img src="#" alt="logo" /></a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-32 text-lg text-black font-semibold tracking-widest">
                    <li>
                        <Link to="/" className="hover:text-xl hover:text-warning transition-all duration-200">Home</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-xl hover:text-warning transition-all duration-200">Menu</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-xl hover:text-warning transition-all duration-200">Reservation</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-xl hover:text-warning transition-all duration-200">History</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-xl hover:text-warning transition-all duration-200">Contact us</Link>
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
                <Link to="register" className=" flex px-4 py-1 gap-6 text-black border-1 border-white rounded-full tracking-widest hover:bg-white hover:text-warning hover:border-white
                duration-300 ease-in-out"> 
                    <img src={Icon} alt="icon" className='h-6'/>
                    123456
                </Link>
            </div>
        </div>
    )
}

export default nav