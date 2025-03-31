import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../../component/nav';
import Footer from '../../component/footer'
import './client.css';
import { ref, get } from 'firebase/database'; 
import { dbRealtime } from "../../firebaseConfig"; 
import { getAuth } from "firebase/auth";

function History() {
    const [reservations, setReservations] = useState([]); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        // ตรวจสอบว่าใครล็อกอินอยู่
        const auth = getAuth();
        const currentUser = auth.currentUser;
        setUser(currentUser);

        const fetchReservations = async () => {
            // ดึงข้อมูลการจองจาก Firebase
            const reservationsRef = ref(dbRealtime, 'reservations');
            const reservationsSnap = await get(reservationsRef);

            if (reservationsSnap.exists()) {
                const data = reservationsSnap.val();
                let allReservations = [];

                // แปลงข้อมูลใน Firebase ให้เป็น array
                for (let dateKey in data) {
                    const queues = data[dateKey];
                    for (let queueID in queues) {
                        allReservations.push({
                            ...queues[queueID],
                            reservationDate: dateKey // เพิ่มวันที่ลงไป
                        });
                    }
                }

                // กรองเฉพาะการจองของผู้ใช้ที่ล็อกอินอยู่
                const userReservations = allReservations.filter(reservation => reservation.customerID === currentUser.uid);

                // อัพเดทข้อมูลผู้ใช้พร้อมกันกับการจอง
                const updatedReservations = await updateReservationsWithUserData(userReservations);
                setReservations(updatedReservations); // ตั้งค่าข้อมูลการจอง
            } else {
                console.log("No reservations found");
            }
        };

        const fetchUserData = async (customerID) => {
            const userRef = ref(dbRealtime, `users/${customerID}`);
            const userSnap = await get(userRef);

            if (userSnap.exists()) {
                return userSnap.val(); // ส่งคืนข้อมูลผู้ใช้
            } else {
                console.log("User data not found");
                return null;
            }
        };

        // ปรับปรุงฟังก์ชันนี้ให้โหลดข้อมูลผู้ใช้พร้อมกับการจอง
        const updateReservationsWithUserData = async (reservationsList) => {
            const updatedReservations = await Promise.all(
                reservationsList.map(async (reservation) => {
                    const user = await fetchUserData(reservation.customerID);
                    return {
                        ...reservation,
                        customerFirstName: user ? user.firstname : "Unknown"
                    };
                })
            );
            return updatedReservations;
        };

        if (currentUser) {
            fetchReservations(); // เรียกใช้ฟังก์ชันดึงข้อมูลการจองเฉพาะของผู้ใช้ที่ล็อกอิน
        } else {
            console.log("User is not logged in.");
        }

    }, []); // ใช้ [] เพื่อให้ useEffect รันแค่ครั้งเดียวเมื่อหน้าโหลด

    // ฟังก์ชันแปลงวันที่
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <>
            <Navbar />
            <div className="history h-screen px-auto py-16 flex justify-center items-center">
                <div className="history-box p-8 max-w-6xl m-auto shadow-black shadow-xl">
                    <h2 className="text-4xl font-bold text-yellow-500 font-mono tracking-widest">
                        History
                    </h2>
                    <div className="overflow-x-auto mt-8">
                        <table className="table tracking-wider">
                            {/* head */}
                            <thead>
                                <tr className="text-xl text-center text-white font-semibold font-mono">
                                    <th>Reserved date</th>
                                    <th>Seats</th>
                                    <th>Price</th>
                                    <th>Customer</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, index) => (
                                    <tr key={index} className="text-lg text-end font-mono">
                                        {/* แสดงวันที่จองในรูปแบบ "21 Mar 2025" */}
                                        <th>{formatDate(reservation.reservationDate)}</th>  
                                        <td>{reservation.seat}</td>
                                        <td>{reservation.totalPrice}</td>
                                        <td>{reservation.customerFirstName}</td> {/* แสดง firstname ของลูกค้า */}
                                        <td className="text-sm text-center align-middle hover:text-gray-400 transition-all duration-200">
                                            {/* ส่งค่า reservationID ผ่าน URL */}
                                            <Link to={`/finished?reservationID=${reservation.reservationID}`}>more detail{" >>"}</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default History;
