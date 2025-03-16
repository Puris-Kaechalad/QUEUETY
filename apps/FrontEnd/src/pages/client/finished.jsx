import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { ref, get } from 'firebase/database'; // นำเข้า Realtime Database
import { dbRealtime } from "../../firebaseConfig";  // ใช้ dbRealtime แทน dbFirestore
import Navbar from '../../component/nav';
import './client.css';
import Band1 from '../../assets/cocktail.jpg';

function Finished() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const reservationID = queryParams.get('reservationID'); // รับค่า reservationID

    const [reservationData, setReservationData] = useState(null);
    const [userData, setUserData] = useState(null);  // เพิ่ม state สำหรับข้อมูลผู้ใช้

    useEffect(() => {
        const fetchReservationData = async () => {
            if (!reservationID) return;

            // ดึงข้อมูลการจองจาก Firebase
            const reservationsRef = ref(dbRealtime, 'reservations'); // ดึงทั้งหมดของ reservations
            const reservationsSnap = await get(reservationsRef);

            if (reservationsSnap.exists()) {
                // ค้นหาจากวันที่ที่เหมาะสม
                const reservations = reservationsSnap.val();
                for (let dateKey in reservations) {
                    const queues = reservations[dateKey];
                    for (let queueID in queues) {
                        if (queues[queueID].reservationID === reservationID) {
                            setReservationData(queues[queueID]);  // เก็บข้อมูลการจอง
                            fetchUserData(queues[queueID].customerID);  // ดึงข้อมูลผู้ใช้
                            return;
                        }
                    }
                }
            } else {
                console.log("No reservation found with this ID");
            }
        };

        const fetchUserData = async (customerID) => {
            // ดึงข้อมูลผู้ใช้จาก Firebase
            const userRef = ref(dbRealtime, `users/${customerID}`);
            const userSnap = await get(userRef);
            if (userSnap.exists()) {
                setUserData(userSnap.val());  // เก็บข้อมูลผู้ใช้
            } else {
                console.log("User data not found");
            }
        };

        fetchReservationData();
    }, [reservationID]);

    return (
        <>
            <Navbar />
            <div className="finished flex justify-center items-center px-auto py-32 ">
                <div className="finished-box max-w-6xl m-auto p-8 space-y-8 shadow-black shadow-xl">
                    <h2 className="text-center text-4xl text-yellow-500 font-bold tracking-widest">Reservation</h2>

                    <div className="flex justify-center">
                        <img src={Band1} alt="img" className="max-w-lg rounded-lg shadow-black shadow-md" />
                    </div>

                    <div className="text-md tracking-wider space-y-4">
                        <div className="flex justify-between">
                            <p>Day/Month/Year</p>
                            <p>{reservationData ? reservationData.date : "Loading..."}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Name</p>
                            <p>{userData ? `${userData.firstname} ${userData.lastname}` : "Loading..."}</p>  {/* แสดงชื่อจาก userData */}
                        </div>
                        <div className="flex justify-between">
                            <p>Number of seats</p>
                            <p>{reservationData ? reservationData.seat : "Loading..."}</p>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <p>Net price</p>
                            <p>{reservationData ? `${reservationData.totalPrice}฿` : "Loading..."}</p>
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <Link to="/" className="text-2xl font-bold">Back to home</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Finished;
