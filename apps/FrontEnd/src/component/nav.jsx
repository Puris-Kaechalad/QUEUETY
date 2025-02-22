import React from 'react'
import Icon from '../assets/react.svg';

function nav() {
    return (
        <div className="navbar bg-none shadow-lg">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Home</a></li>
                        <li><a>Menu</a></li>
                        <li><a>Reservation</a></li>
                        <li><a>History</a></li>
                        <li><a>Contact us</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-32 text-lg">
                    <li><a>Home</a></li>
                    <li><a>Menu</a></li>
                    <li><a>Reservation</a></li>
                    <li><a>History</a></li>
                    <li><a>Contact us</a></li>
                </ul>
            </div>

            <div className="navbar-end">
                <a className="btn p-6"><img src={Icon} alt="icon" className='h-6 mr-6'/>Puris
                </a>
            </div>
        </div>
    )
}

export default nav