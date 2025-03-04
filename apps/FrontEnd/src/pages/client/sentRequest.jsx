import React from 'react'
import { Link } from "react-router-dom";

export default function sentRequest() {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-black mb-4 tracking-wider">Sent Request</h2>
                    <p className="block text-sm text-center text-gray-500 tracking-wider">Please enter your email to sent an OTP request</p>
                    <div className="mt-8">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mt-8 w-full">
                        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
                            <Link to="/sentOTP">SENT REQUEST</Link>
                        </button>
                        <div className="flex justify-center mt-4">
                            <Link to="/login" className="text-gray-500 text-md">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
