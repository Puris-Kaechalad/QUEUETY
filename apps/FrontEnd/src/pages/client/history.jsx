import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../../component/nav'
import './client.css'

function history() {
    return (
        <>
            <Navbar />
            <div className="history h-screen px-auto py-16 flex justify-center items-center">
                <div className="history-box p-8 max-w-6xl m-auto">
                    <h2 className="text-4xl font-bold text-yellow-500 font-mono tracking-widest">
                        History
                    </h2>
                    <div className="overflow-x-auto mt-8">
                        <table className="table tracking-wider ">
                            {/* head */}
                            <thead>
                                <tr className="text-xl text-center text-white font-semibold font-mono">
                                    <th>Reserved date</th>
                                    <th>Seats</th>
                                    <th>Price</th>
                                    <th>Customer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className="text-lg text-end font-mono">
                                    <th>1</th>
                                    <td>8</td>
                                    <td>25600</td>
                                    <td>Apiwat Tassananutriyaporn</td>
                                    <td className="text-sm text-center align-middle hover:text-gray-400 transition-all duration-200">
                                        <Link to="/finished">more detail{" >>"}</Link>
                                    </td>
                                </tr>
                                <tr className="text-lg text-end font-mono">
                                    <th>2</th>
                                    <td>8</td>
                                    <td>25600</td>
                                    <td>Apiwat Tassananutriyaporn</td>
                                    <td className="text-sm text-center align-middle hover:text-gray-400 transition-all duration-200">
                                        <Link to="/finished">more detail{" >>"}</Link>
                                    </td>
                                </tr>
                                <tr className="text-lg text-end font-mono">
                                    <th>3</th>
                                    <td>8</td>
                                    <td>25600</td>
                                    <td>Apiwat Tassananutriyaporn</td>
                                    <td className="text-sm text-center align-middle hover:text-gray-400 transition-all duration-200">
                                        <Link to="/finished">more detail{" >>"}</Link>
                                    </td>
                                </tr>
                                <tr className="text-lg text-end font-mono">
                                    <th>4</th>
                                    <td>8</td>
                                    <td>25600</td>
                                    <td>Apiwat Tassananutriyaporn</td>
                                    <td className="text-sm text-center align-middle hover:text-gray-400 transition-all duration-200">
                                        <Link to="/finished">more detail{" >>"}</Link>
                                    </td>
                                </tr>
                                <tr className="text-lg text-end font-mono">
                                    <th>5</th>
                                    <td>8</td>
                                    <td>25600</td>
                                    <td>Apiwat Tassananutriyaporn</td>
                                    <td className="text-sm text-center align-middle hover:text-gray-400 transition-all duration-200">
                                        <Link to="/finished">more detail{" >>"}</Link>
                                    </td>
                                </tr>
                                <tr className="text-lg text-end font-mono">
                                    <th>6</th>
                                    <td>8</td>
                                    <td>25600</td>
                                    <td>Apiwat Tassananutriyaporn</td>
                                    <td className="text-sm text-center align-middle hover:text-gray-400 transition-all duration-200">
                                        <Link to="/finished">more detail{" >>"}</Link>
                                    </td>
                                </tr>
                                <tr className="text-lg text-end font-mono">
                                    <th>7</th>
                                    <td>8</td>
                                    <td>25600</td>
                                    <td>Apiwat Tassananutriyaporn</td>
                                    <td className="text-sm text-center align-middle hover:text-gray-400 transition-all duration-200">
                                        <Link to="/finished">more detail{" >>"}</Link>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default history