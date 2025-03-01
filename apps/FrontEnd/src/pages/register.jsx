import React from 'react'
import Navbar from '../component/nav'

export default function register() {
    return (
        <>
            <Navbar />

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Firstname</label>
                            <input
                                type="text"
                                placeholder="Enter your firstname..."
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Lastname</label>
                            <input
                                type="text"
                                placeholder="Enter your lastname..."
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            className="w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Phone number</label>
                            <input
                                type="text"
                                placeholder="Enter your phone number..."
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Date of birth</label>
                            <input
                                type="date"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Create Password</label>
                            <input
                                type="password"
                                placeholder="Create password..."
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm password..."
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600">
                        REGISTER
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-3">Login</p>
                </div>
            </div>
        </>
    )
}
