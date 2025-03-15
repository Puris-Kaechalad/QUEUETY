import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../../component/nav'
import './client.css'
import Band1 from '../../assets/cocktail.jpg'

function finished() {
    return (
        <>
            <Navbar />
            <div className="finished flex justify-center items-center px-auto py-32 ">
                <div className="finished-box max-w-6xl m-auto p-8 space-y-8 shadow-black shadow-xl">
                    <h2 className="text-center text-4xl text-yellow-500 font-bold tracking-widest">Finished</h2>
                
                        <div className="flex justify-center">
                            <img src={Band1} alt="img" className="max-w-lg rounded-lg shadow-black shadow-md" />
                        </div>
                
                    <div className="flex gap-2 items-center text-2xl font-bold tracking-wider">
                        <p>Your queue:</p><p>48</p>
                    </div>
                    <hr />
                    <div className="space-y-12">
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
                                <p>Number of seats</p>
                                <p>8</p>
                            </div>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <p>Net price</p>
                            <p>25600฿</p>
                        </div>
                    </div> 
                    <hr />

                    <div className="text-md tracking-wider">
                        <p>- Your reservation allow to cancel.</p>
                        <p>- Please be on time to maintain your rights :)</p>
                    </div>

                    <div className="text-center space-y-4 ">
                        <div>
                            <button className="bg-yellow-600 py-2 px-4 rounded-lg border-yellow-600 border-1 hover:bg-transparent hover:border-yellow-500 hover:border-dashed transition-all duration-250 hover:scale-110">
                                <Link to="/" className="text-2xl font-bold">Back to home</Link>
                            </button>
                        </div>
                        <a href="/reservation" className="text-white hover:text-gray-400 transition-all duration-250 hover:scale-110">Cancel queue</a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default finished