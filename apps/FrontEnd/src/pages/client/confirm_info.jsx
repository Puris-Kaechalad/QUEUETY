import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ref, get, set, push } from 'firebase/database';  // นำเข้า push เพื่อเพิ่มข้อมูลแบบอัตโนมัติ
import { auth, dbRealtime } from "../../firebaseConfig"; 
import Navbar from '../../component/nav';
import './client.css';
import Band1 from '../../assets/cocktail.jpg';
import Phone from '../../assets/phone.png';
import Mail from '../../assets/email.png';
import { v4 as uuidv4 } from 'uuid'; // ใช้ uuid สร้าง reservationID

function ConfirmInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date'); // รับค่าจาก URL สำหรับวัน

    const [userData, setUserData] = useState(null);
    const [seats, setSeats] = useState(1);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const userRef = ref(dbRealtime, `users/${auth.currentUser.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setUserData(snapshot.val());
                }
            }
        };
        fetchUserData();
    }, []);

    const handleConfirm = async () => {
        if (!auth.currentUser || !userData) return alert("User not logged in!");
    
        const totalPrice = seats * 3200;
    
        // ใช้ push() เพื่อเพิ่มข้อมูลการจองลงในแต่ละวันและแต่ละ queue
        const reservationsRef = ref(dbRealtime, `reservations/${date}`);
        const newReservationRef = push(reservationsRef); // เพิ่มข้อมูลใหม่ในแต่ละวันที่เลือก
    
        // ใช้ newReservationRef.key เป็น reservationID
        await set(newReservationRef, {
            customerID: auth.currentUser.uid,
            reservationID: newReservationRef.key,  // ใช้ key ที่ Firebase สร้างขึ้น
            seat: seats,
            totalPrice,
        });
    
        // ไปหน้า Finished พร้อมแนบ reservationID
        navigate(`/finished?reservationID=${newReservationRef.key}`);
    };

    return (
        <>
            <Navbar />
            <div className="confirm flex justify-center items-center px-auto py-32">
                <div className="confirm-box max-w-6xl m-auto p-8 space-y-8 shadow-black shadow-xl">
                    <h2 className="text-center text-4xl text-yellow-500 font-bold tracking-widest">Reservation</h2>
                    
                    <div className="flex justify-center gap-8">
                        <div className="flex items-center gap-4">
                            <img src={Mail} alt="icon" className="h-6" />
                            <a href="mailto:queuety@gmail.com">queuety@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <img src={Phone} alt="icon" className="h-6" />
                            <p>02-123-4567</p>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <img src={Band1} alt="img" className="max-w-lg rounded-lg shadow-black shadow-md" />
                    </div>

                    <div className="text-md tracking-wider space-y-4">
                        <div className="flex justify-between">
                            <p>Day/Month/Year</p>
                            <p>{date || "No date selected"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Name</p>
                            <p>{userData ? `${userData.firstname} ${userData.lastname}` : "Loading..."}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Phone</p>
                            <p>{userData ? userData.phone : "Loading..."}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <p className="text-lg font-bold tracking-wider">Specify seats</p>
                        <input 
                            type="number" 
                            className="input validator w-1/7 h-8 bg-white text-black" 
                            min="1" max="10" 
                            value={seats}
                            onChange={(e) => setSeats(parseInt(e.target.value))}
                        />
                    </div>

                    <div className="text-center space-y-4">
                        <button 
                            onClick={handleConfirm} 
                            className="bg-yellow-600 py-2 px-4 rounded-lg border-yellow-600 border-1 hover:bg-transparent hover:border-yellow-500 hover:border-dashed transition-all duration-250 hover:scale-110"
                        >
                            CONFIRM
                        </button>
                        <a href="/reservation" className="hover:text-red-700 transition-all duration-250 hover:scale-110">back</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmInfo;
