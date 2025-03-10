import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../../component/nav'
import './client.css'
import Band1 from '../../assets/cocktail.jpg'
import Phone from '../../assets/phone.png'
import Mail from '../../assets/email.png'

function confirm_info() {
    return (
        <>
            <Navbar />
            <div className="confirm flex justify-center items-center px-auto py-32 ">
                <div className="confirm-box max-w-6xl m-auto p-8 space-y-8 shadow-black shadow-xl">
                    <h2 className="text-center text-4xl text-yellow-500 font-bold tracking-widest">Reservation</h2>
                    <div className="space-y-4">
                        <div className="flex justify-center gap-8">
                            <div className="flex items-center gap-4">
                                <img src={Mail} alt="icon" className="h-6" />
                                <a href="">queuety@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <img src={Phone} alt="icon" className="h-6" />
                                <p>02-123-4567</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <img src={Band1} alt="img" className="max-w-lg rounded-lg shadow-black shadow-md" />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center text-2xl font-bold tracking-wider">
                        <p>Remaining queue:</p><p>2</p>
                    </div>
                    <hr />
                    <div className="text-md tracking-wider space-y-4">
                        <div className="flex justify-between">
                            <p >Day/Month/Year</p>
                            <p>15 April 2025</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Name</p>
                            <p>Apiwat Tassananutriyaporn</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Phone</p>
                            <p>082-345-6789</p>
                        </div>
                    </div>
                    <hr />

                    <div className="flex gap-4 items-center">
                        <p className="text-lg font-bold tracking-wider">Specify seats</p>
                        <input type="number" className="input validator w-1/7 h-8 bg-white text-black" min="1" max="10" />
                    </div>

                    <div className="text-md tracking-wider">
                        <p>- If you are more than 1 hour late (after 19.00), your reservation will be canceled.</p>    
                        <div className="hidden">
                            <p>- Please specify the number of seats before confirming.</p>
                            <p>- Reservations accepted for 1 to 10 seats.</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center tracking-wider">
                        <input type="checkbox" className="checkbox checkbox-sm border-2 border-white" />
                        <p>I have read and agree to the <span className="font-bold text-yellow-500 underline underline-offset-4">reservation policy</span></p>
                    </div>

                    <div className="text-center space-y-4 ">
                        <div>
                            <button className="bg-yellow-600 py-2 px-4 rounded-lg border-yellow-600 border-1 hover:bg-transparent hover:border-yellow-500 hover:border-dashed transition-all duration-250 hover:scale-110">
                                <Link to="/finished" className="text-2xl font-bold">CONFIRM</Link>
                            </button>
                        </div>
                        <a href="/reservation" className="hover:text-red-700 transition-all duration-250 hover:scale-110">Cancel</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default confirm_info