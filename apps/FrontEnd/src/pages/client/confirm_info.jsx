import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ref, get, set, push } from 'firebase/database'; // เพิ่ม push
import { auth, dbRealtime } from "../../firebaseConfig";
import Navbar from '../../component/nav';
import './client.css';
import Phone from '../../assets/phone.png';
import Mail from '../../assets/email.png';

function ConfirmInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date'); // รับค่าจาก URL สำหรับวัน
    const price = queryParams.get('price'); // รับราคาจาก URL

    const [userData, setUserData] = useState(null);
    const [seats, setSeats] = useState(0);
    const [isChecked, setIsChecked] = useState(false); // เช็คว่าได้ติ๊กช่องหรือยัง
    const [remainingQueue, setRemainingQueue] = useState(50); // จำนวนที่นั่งที่เหลือ
    const [imageUrl, setImageUrl] = useState(null); // เก็บ URL ของภาพจาก Firebase

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

        const fetchRemainingQueue = async () => {
            // ดึงข้อมูลการจองในวันที่เลือกจาก Firebase
            const reservationsRef = ref(dbRealtime, `reservations/${date}`);
            const snapshot = await get(reservationsRef);
        
            if (snapshot.exists()) {
                const data = snapshot.val();
        
                // กรองเฉพาะการจองที่มี customerID เท่านั้น
                const validReservations = Object.keys(data).filter(key => data[key].customerID);
        
                // จำนวนการจองที่มีอยู่
                const bookedSeats = validReservations.length;
        
                // คำนวณจำนวนที่นั่งที่เหลือ
                setRemainingQueue(50 - bookedSeats);
            } else {
                // ถ้าไม่มีข้อมูลการจองในวันที่เลือก
                setRemainingQueue(50); // หมายความว่าทุกที่นั่งยังว่าง
            }
        };
        

        const fetchImageUrl = async () => {
            // ดึง URL รูปจาก Firebase (ในกรณีที่มีการอัปโหลดรูปไว้ใน Firebase)
            const imageRef = ref(dbRealtime, `reservations/${date}/imageUrl`);
            const snapshot = await get(imageRef);
            if (snapshot.exists()) {
                setImageUrl(snapshot.val()); // ถ้ามี URL ให้เก็บใน state
            }
        };

        fetchUserData();
        fetchRemainingQueue();
        fetchImageUrl();
    }, [date]); // เมื่อเปลี่ยนวันที่ให้ดึงข้อมูลใหม่

    const handleConfirm = async () => {
        if (!auth.currentUser || !userData) {
            alert("User not logged in!");
            return;
        }
    
        if (seats <= 0) {
            alert("Please specify a valid number of seats!");
            return;
        }
    
        if (!isChecked) {
            alert("Please agree to the reservation policy!");
            return;
        }
    
        if (seats > remainingQueue) {
            alert("Not enough seats available!");
            return;
        }
    
        const totalPrice = seats * price; // ใช้ราคาที่ส่งมาจาก URL
    
        try {
            const reservationsRef = ref(dbRealtime, `reservations/${date}`); // ดึงข้อมูลจาก Firebase ตามวันที่ที่เลือก
            
            // ดึงข้อมูลการจองในวันนั้น ๆ
            const snapshot = await get(reservationsRef);
            let queueNumber = 1; // ตั้งค่าเริ่มต้นของคิวเป็น 1
    
            if (snapshot.exists()) {
                const data = snapshot.val();
                const reservationsOnDate = Object.keys(data).filter((key) => data[key].reservationID); // กรองเฉพาะรายการที่มี reservationID
    
                queueNumber = reservationsOnDate.length + 1; // คำนวณหมายเลขคิวใหม่
            }
    
            // ใช้ push เพื่อสร้างการจองใหม่ใน Firebase
            const newReservationRef = push(reservationsRef);
    
            // บันทึกการจองใหม่พร้อมหมายเลขคิว
            await set(newReservationRef, {
                customerID: auth.currentUser.uid,
                reservationID: newReservationRef.key,
                seat: seats,
                totalPrice,
                queue: queueNumber,  // บันทึกหมายเลขคิว
            });
    
            // หลังจากบันทึกข้อมูลแล้วเปลี่ยนเส้นทางไปหน้า finished พร้อมกับ reservationID
            navigate(`/finished?reservationID=${newReservationRef.key}`);
        } catch (error) {
            console.error("Error confirming reservation: ", error);
            alert("An error occurred while confirming your reservation.");
        }
    };
    
    return (
        <>
            <Navbar />
            <div className="confirm flex justify-center items-center px-auto py-32">
                <div className="confirm-box max-w-2xl m-auto p-8 space-y-8 shadow-black shadow-xl">
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

                    {/* แสดงรูปภาพจาก Firebase ถ้ามี imageUrl */}
                    {imageUrl && (
                        <div className="flex justify-center">
                            <img src={imageUrl} alt="img" className="max-w-lg rounded-lg shadow-black shadow-md" />
                        </div>
                    )}

                    <div className="text-md tracking-wider space-y-4">
                        <h3 className="text-3xl font-bold">Remaining queue: {remainingQueue}</h3>
                        <hr />
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
                        <hr />
                        <div>
                            <p>- Up to 10 bookings available</p>
                            <p>- Your queue allows cancel.</p>
                            <p>- You can check in between 6:00 PM - 7:00 PM.</p>
                            <p>- If you arrive after 7:00 PM, your reservation will be canceled no exceptions:)</p>
                        </div>
                    </div>

                    {/* ช่องกรอกจำนวนที่นั่ง */}
                    <div className="flex gap-4 items-center">
                        <p className="text-lg font-bold tracking-wider">Specify seats</p>
                        <input
                            type="number"
                            className="input validator w-1/8 h-12 bg-transparent text-white text-lg border-2"
                            min="1" max="10"
                            value={seats}
                            onChange={(e) => setSeats(parseInt(e.target.value))}
                        />
                        <p>499฿ / 1 Customer</p>
                    </div>

                    {/* ช่องติ๊ก */}
                    <div className="flex gap-4 items-center">
                        <input
                            type="checkbox"
                            className="checkbox h-6 border-2"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <p>
                            I have read and agree the above reservation policy.
                        </p>
                    </div>

                    <div className="text-center tracking-wider space-y-6">
                        <div>
                            <button
                                onClick={handleConfirm}
                                className="bg-yellow-600 text-2xl font-bold py-1 px-4 rounded-lg border-transparent border-1 cursor-pointer hover:bg-transparent hover:border-yellow-500 hover:border-dashed transition-all duration-200"
                            >
                                CONFIRM
                            </button>
                        </div>
                        <a href="/reservation" className="text-lg hover:text-gray-400 transition-all duration-250 hover:scale-110">back</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmInfo;
