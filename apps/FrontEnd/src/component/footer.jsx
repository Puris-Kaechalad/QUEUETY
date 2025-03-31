import React from 'react'
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import Fb from '../assets/facebook.png'
import Ig from '../assets/instagram.png'

function footer() {
    return (
        <>
            <footer className="footer sm:footer-horizontal bg-gray-300 text-black p-10 tracking-widest">
                <nav>
                    <h6 className="footer-title text-lg">Services</h6>
                    <Link to="/reservation" className="link link-hover">Reservation</Link>
                    <Link to="/menu" className="link link-hover">Menu</Link>
                </nav>
                <nav>
                    <h6 className="footer-title text-lg">Company</h6>
                    <a href="#about-us" className="link link-hover">About us</a>
                    <HashLink smooth to="/#contact-us" className="link link-hover">Contact</HashLink>
                </nav>
                <nav>
                    <h6 className="footer-title text-lg">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <img src={Fb} alt="fb-icon" className="h-8" />
                        </a>
                        <a>
                           <img src={Ig} alt="ig-icon" className="h-8" />
                        </a>
                        
                    </div>
                </nav>
            </footer>
        </>
    )
}

export default footer