import React from 'react'
import Navbar from '../../component/nav';
import './admin.css';


function userInfo() {
    return (
        <>
            <Navbar />
            <div className="user px-auto py-16 flex justify-center items-center">
                <div className="user-box p-8 max-w-6xl m-auto shadow-black shadow-xl">
                    <h2 className="text-4xl font-bold text-yellow-500 font-mono tracking-widest">
                        User 
                    </h2>
                    <div className="overflow-x-auto mt-8">
                        <table className="table tracking-wider">
                            {/* head */}
                            <thead>
                                <tr className="text-xl text-center text-white font-semibold">
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Phone number</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Date of birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-lg text-end">
                                    <th>001</th>
                                    <td>qwerty@gmail.com</td>
                                    <td>0123456789</td>
                                    <td>Kuay</td>
                                    <td>RaiSus</td>
                                    <td>400 BCE</td>
                                </tr>
                                <tr className="text-lg text-end">
                                    <th>001</th>
                                    <td>qwerty@gmail.com</td>
                                    <td>0123456789</td>
                                    <td>Kuay</td>
                                    <td>RaiSus</td>
                                    <td>400 BCE</td>
                                </tr>
                                <tr className="text-lg text-end">
                                    <th>001</th>
                                    <td>qwerty@gmail.com</td>
                                    <td>0123456789</td>
                                    <td>Kuay</td>
                                    <td>RaiSus</td>
                                    <td>400 BCE</td>
                                </tr>
                                <tr className="text-lg text-end">
                                    <th>001</th>
                                    <td>qwerty@gmail.com</td>
                                    <td>0123456789</td>
                                    <td>Kuay</td>
                                    <td>RaiSus</td>
                                    <td>400 BCE</td>
                                </tr>
                                <tr className="text-lg text-end">
                                    <th>001</th>
                                    <td>qwerty@gmail.com</td>
                                    <td>0123456789</td>
                                    <td>Kuay</td>
                                    <td>RaiSus</td>
                                    <td>400 BCE</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default userInfo