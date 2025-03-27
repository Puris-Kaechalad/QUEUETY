import React from 'react'
import Navbar from '../../component/nav';
import './admin.css';

function reserveHistory() {
    return (
        <>
            <Navbar />
            <div className="reserveHistory px-auto py-16 flex justify-center items-center">
                <div className="reserveHistory-box p-8 max-w-6xl m-auto shadow-black shadow-xl">
                    <h2 className="text-4xl font-bold text-yellow-500 font-mono tracking-widest">
                        dd/mm/yyyy
                    </h2>
                    <div className="overflow-x-auto mt-8">
                        <table className="table tracking-wider">
                            {/* head */}
                            <thead>
                                <tr className="text-xl text-center text-white font-semibold">
                                    <th>Queue</th>
                                    <th>Customer</th>
                                    <th>Seat</th>
                                    <th>Price</th>
                                    <th>Phone number</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-lg text-end">
                                    <th>20</th>
                                    <td>qwerty@gmail.com</td>
                                    <td>10</td>
                                    <td>100000</td>
                                    <td>0123456789</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default reserveHistory