import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../../component/nav'

function login() {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold text-center text-black mb-6 tracking-wider">Login</h2>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your registered email..."
                            className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your registered password..."
                            className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="mt-8">
                        <Link to="/sentRequest" className="flex text-sky-500 text-sm justify-self-end">Forgot password?</Link>
                        <button className="w-full bg-blue-500 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-blue-600 transition-all duration-200">
                            LOGIN
                        </button>
                        <div className="flex justify-start gap-2 mt-4">
                            <p className="text-gray-500 text-sm">Do not have an account yet?</p>
                            <Link to="/register" className="text-sky-600 text-sm">Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default login