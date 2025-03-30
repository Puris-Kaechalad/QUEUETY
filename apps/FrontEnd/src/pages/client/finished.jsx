import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { ref, get, remove } from 'firebase/database'; // นำเข้า Realtime Database
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
    const [showPopup, setShowPopup] = useState(false); // state สำหรับแสดง popup
    const [queueNumber, setQueueNumber] = useState(null); // state สำหรับหมายเลขคิว

    // ฟังก์ชันแปลงวันที่
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    useEffect(() => {
        const fetchReservationData = async () => {
            if (!reservationID) return;
    
            const reservationsRef = ref(dbRealtime, 'reservations'); // ดึงข้อมูลจาก Firebase
            const reservationsSnap = await get(reservationsRef);
    
            if (reservationsSnap.exists()) {
                const reservations = reservationsSnap.val();
    
                // ค้นหาการจองที่ตรงกับ reservationID
                for (let dateKey in reservations) {
                    const queues = reservations[dateKey];
                    for (let queueID in queues) {
                        if (queues[queueID].reservationID === reservationID) {
                            // ถ้าเจอการจองที่ตรงกับ reservationID
                            setReservationData({
                                ...queues[queueID],
                                reservationDate: dateKey
                            });
                            fetchUserData(queues[queueID].customerID);  // ดึงข้อมูลผู้ใช้
                            
                            // คำนวณหมายเลขคิว
                            const queueCount = Object.keys(queues).length; // คำนวณจำนวนการจองในวันนั้น
                            setQueueNumber(queueCount); // หมายเลขคิวที่ถูกต้องจะเท่ากับจำนวนการจองที่มีในวันนั้น
                            return;
                        }
                    }
                }
            } else {
                console.log("No reservation found with this ID");
            }
        };
    
        const fetchUserData = async (customerID) => {
            const userRef = ref(dbRealtime, `users/${customerID}`);
            const userSnap = await get(userRef);
            if (userSnap.exists()) {
                setUserData(userSnap.val());
            } else {
                console.log("User data not found");
            }
        };
    
        fetchReservationData();
    }, [reservationID]);
    

    const handleCancel = async () => {
        if (!reservationData) return;

        // กำหนด path ที่จะลบข้อมูล
        const reservationRef = ref(dbRealtime, `reservations/${reservationData.reservationDate}/${reservationID}`);

        try {
            // ลบข้อมูลจาก path ที่กำหนด
            await remove(reservationRef);
            console.log(`Reservation with ID ${reservationID} has been cancelled.`);
            setShowPopup(true);  // แสดง popup เมื่อการยกเลิกสำเร็จ

            // รีเฟรชข้อมูลหรือเปลี่ยนหน้า
            setTimeout(() => {
                window.location.href = '/';  // Redirect ไปที่หน้าอื่น (หน้า Home)
            }, 2000);  // รอ 2 วินาทีแล้วไปหน้า Home
        } catch (error) {
            console.error("Error cancelling reservation:", error);
            alert("Failed to cancel reservation.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="finished flex justify-center items-center px-auto py-32 ">
                <div className="finished-box max-w-6xl m-auto p-8 space-y-12 shadow-black shadow-xl">
                    <h2 className="text-center text-4xl text-yellow-500 font-bold tracking-widest">Reservation</h2>

                    <div className="flex justify-center">
                        {reservationData && reservationData.imageUrl ? (
                            <img src={reservationData.imageUrl} alt="img" className="max-w-lg rounded-lg shadow-black shadow-md" />
                        ) : null} {/* ถ้าไม่มี imageUrl จะไม่แสดงอะไรเลย */}
                    </div>

                    <div className="text-md tracking-wider space-y-4">
                        <h3 className="text-3xl font-bold">Queue: {queueNumber ? queueNumber : "Loading..."}</h3> {/* แสดงหมายเลขคิว */}
                        <hr />
                        <div className="flex justify-between">
                            <p>Day/Month/Year</p>
                            <p>{reservationData ? formatDate(reservationData.reservationDate) : "Loading..."}</p>
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
                        <hr />
                        <div>
                            <p>- You can check in between 6:00 PM - 7:00 PM.</p>
                            <p>- Please don’t forget to secure your spot.</p>
                        </div>
                    </div>

                    <div className="text-center space-y-6">
                        <div>
                            <Link to="/" className="bg-yellow-600 text-2xl font-bold py-2 px-4 rounded-lg border-transparent border-1 cursor-pointer hover:bg-transparent hover:border-yellow-500 hover:border-dashed transition-all duration-200">
                                Back to home
                            </Link>
                        </div>
                        <button
                            className="text-white p-2 text-lg cursor-pointer hover:text-gray-400 duration-200"
                            onClick={handleCancel}
                        >
                            Cancel Queue
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content space-y-4 max-w-1-4">
                        <h3 className="text-3xl font-bold">Your queue was cancelled</h3>
                        <p>Returning to home page..</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Finished;
