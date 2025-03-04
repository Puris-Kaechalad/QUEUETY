import React from 'react'
import { Link } from "react-router-dom";

function resetPass() {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen p-8 sm:p-0">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-black mb-4 tracking-wider">Create new password</h2>
                    <div className="grid grid-rows-2 gap-4 mt-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Create Password</label>
                            <input
                                type="password"
                                placeholder="Create password..."
                                className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm password..."
                                className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mt-8">
                            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
                                <Link to="/login">CONFIRM</Link>
                            </button>
                            <div className="flex justify-center mt-4">
                                <Link to="/login" className="text-gray-500 text-md">Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default resetPass