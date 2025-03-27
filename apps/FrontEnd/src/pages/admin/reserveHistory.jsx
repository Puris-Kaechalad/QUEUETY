// import React from 'react'
// import Navbar from '../../component/nav';
// import './admin.css';

// function reserveHistory() {
//     return (
//         <>
//             <Navbar />
//             <div className="reserveHistory px-auto py-16 flex justify-center items-center">
//                 <div className="reserveHistory-box p-8 max-w-6xl m-auto shadow-black shadow-xl">
//                     <h2 className="text-4xl font-bold text-yellow-500 font-mono tracking-widest">
//                         dd/mm/yyyy
//                     </h2>
//                     <div className="overflow-x-auto mt-8">
//                         <table className="table tracking-wider">
//                             {/* head */}
//                             <thead>
//                                 <tr className="text-xl text-center text-white font-semibold">
//                                     <th>Queue</th>
//                                     <th>Customer</th>
//                                     <th>Seat</th>
//                                     <th>Price</th>
//                                     <th>Phone number</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr className="text-lg text-end">
//                                     <th>20</th>
//                                     <td>qwerty@gmail.com</td>
//                                     <td>10</td>
//                                     <td>100000</td>
//                                     <td>0123456789</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default reserveHistory

import React, { useState, useEffect } from 'react';
import Navbar from '../../component/nav';
import './admin.css';

function ReserveHistory() {
    const itemsPerPage = 5;  // จำนวนรายการที่จะแสดงต่อหน้า
    const [currentPage, setCurrentPage] = useState(1);
    const [properties, setProperties] = useState([]);
    const [lastVisible, setLastVisible] = useState(null); // ตัวแปรใช้เก็บค่าเอกสารสุดท้ายเพื่อทำ pagination
    const [isLoading, setIsLoading] = useState(false);

    // ฟังก์ชันดึงข้อมูล
    const fetchData = async (pageNumber = 1) => {
        setIsLoading(true);
        const reserveCollection = collection(db, 'properties');
        
        let q = query(
            reserveCollection,
            orderBy('queue'),
            limit(itemsPerPage)
        );
        
        if (pageNumber > 1) {
            q = query(
                reserveCollection,
                orderBy('queue'),
                startAfter(lastVisible),
                limit(itemsPerPage)
            );
        }

        const querySnapshot = await getDocs(q);
        const propertiesList = [];
        querySnapshot.forEach((doc) => {
            propertiesList.push(doc.data());
        });

        setProperties(propertiesList);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData(currentPage);  // เรียกใช้ fetchData ตอนที่หน้าจอถูกแสดงขึ้น
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);  // เปลี่ยนหมายเลขหน้า
    };

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
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">Loading...</td>
                                    </tr>
                                ) : (
                                    properties.map((item, index) => (
                                        <tr key={index} className="text-lg text-end">
                                            <th>{item.queue}</th>
                                            <td>{item.customer}</td>
                                            <td>{item.seat}</td>
                                            <td>{item.price}</td>
                                            <td>{item.phone}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-5 flex items-center justify-center">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={properties.length < itemsPerPage}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Next
                        </button>
                    </div>

                    {/* Page numbers */}
                    <div className="mt-4 flex justify-center gap-2">
                        {[...Array(5).keys()].map((i) => {
                            const pageNumber = i + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`px-4 py-2 rounded ${
                                        currentPage === pageNumber ? 'bg-primary text-white' : 'bg-gray-300'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReserveHistory;
