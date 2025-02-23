import React from 'react'
import Icon from '../assets/react.svg';

function nav() {
    return (
        <div className="navbar absolute z-20 text-white p-4">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow tracking-widest">
                        <li><a>Home</a></li>
                        <li><a>Menu</a></li>
                        <li><a>Reservation</a></li>
                        <li><a>History</a></li>
                        <li><a>Contact us</a></li>
                    </ul>
                </div>
                {/* logo */}
                <a className="text-xl"><img src="#" alt="logo" /></a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-32 text-lg font-semibold tracking-widest">
                    <li>
                        <a className="hover:text-xl transition-all duration-200">Home</a>
                    </li>
                    <li>
                        <a className="hover:text-xl transition-all duration-200">Menu</a>
                    </li>
                    <li>
                        <a className="hover:text-xl transition-all duration-200">Reservation</a>
                    </li>
                    <li>
                        <a className="hover:text-xl transition-all duration-200">History</a>
                    </li>
                    <li>
                        <a className="hover:text-xl transition-all duration-200">Contact us</a>
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
                <a className=" flex px-4 py-2 gap-6 border-1 border-white rounded-md tracking-widest hover:bg-white hover:text-black hover:border-white
                duration-300 ease-in-out">
                    <img src={Icon} alt="icon" className='h-6' />
                    Puris
                </a>
            </div>
        </div>
    )
}

export default nav