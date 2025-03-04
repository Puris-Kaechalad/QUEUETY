import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../../component/nav'

export default function register() {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold text-center text-black mb-6">Register</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Firstname</label>
                            <input
                                type="text"
                                placeholder="Enter your firstname..."
                                className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Lastname</label>
                            <input
                                type="text"
                                placeholder="Enter your lastname..."
                                className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Phone number</label>
                            {/* <input type="tel" className="input validator text-black" /> */}
                            <input
                                type="tel"
                                required placeholder="Enter your phone number..."
                                title="Must be 10 digits"
                                className="input validator text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                                pattern="[0-9]*" minlength="10" maxlength="10"
                            />
                            <p class="validator-hint">Must be 10 digits</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Date of birth</label>
                            <input
                                required placeholder="dd/mm/yyyy"
                                type="string"
                                className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />

                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Create Password</label>
                            <input
                                type="password"
                                placeholder="Create password..."
                                className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm password..."
                                className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600">
                            REGISTER
                        </button>
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-gray-500 text-sm mt-3">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
