import React from 'react'
import Navbar from '../../component/nav'
import './client.css'

function profile() {
    return (
        <>
            <Navbar />
            <div className="profile h-screen flex justify-center items-center">
                <div className="profile-box w-1/3 space-y-10 p-8 rounded-lg shadow-black shadow-sm">
                    <h2 className="text-3xl text-yellow-400 font-bold tracking-widest">Your Information</h2>
                    <div className="space-y-6">
                        <div className="flex justify-center gap-4 text-black text-md tracking-wider">
                            <p className="w-1/2 bg-white px-4 py-2 rounded-md">Puris</p>
                            <p className="w-1/2 bg-white px-4 py-2 rounded-md">Kaechalad</p>
                        </div>
                        <p className="w-full bg-white px-4 py-2 text-black text-md tracking-wider rounded-md">google@email.com</p>
                        <div className="flex justify-center gap-4 text-black text-md tracking-wider">
                            <p className="w-1/2 bg-white px-4 py-2 rounded-md">0823456789</p>
                            <p className="w-1/2 bg-white px-4 py-2 rounded-md">16/06/2005</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default profile