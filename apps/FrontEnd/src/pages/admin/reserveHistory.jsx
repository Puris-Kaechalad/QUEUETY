import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { ref, get } from 'firebase/database';  // ใช้ firebase เพื่อดึงข้อมูลจาก Realtime Database
import { dbRealtime } from "../../firebaseConfig";  // เชื่อมกับ Firebase Realtime Database
import Navbar from '../../component/nav';
import './admin.css';
import moment from 'moment';  // ใช้ moment.js สำหรับการจัดการวันที่

function ReserveHistory() {
    const itemsPerPage = 7;  // จำนวนวันที่จะแสดงต่อหน้า (7 วัน)
    const [currentPage, setCurrentPage] = useState(1);
    const [reservations, setReservations] = useState([]); // เก็บข้อมูลการจอง
    const [userData, setUserData] = useState({}); // เก็บข้อมูลผู้ใช้ (First Name, Last Name, Phone)
    const [isLoading, setIsLoading] = useState(false);
    const [displayDate, setDisplayDate] = useState(null); // เก็บวันที่ที่จะแสดง
    const [dateButtons, setDateButtons] = useState([]); // เก็บวันที่ที่จะใช้ในปุ่ม
    const [selectedDate, setSelectedDate] = useState(moment().format("D MMM YYYY")); // เก็บวันที่ที่เลือกให้เป็นวันที่ปัจจุบัน
    const [minDate, setMinDate] = useState(null); // วันที่เริ่มต้น
    const [maxDate, setMaxDate] = useState(null); // วันที่สุดท้าย
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedDateFromURL = queryParams.get('selectedDate');

    // ฟังก์ชันดึงข้อมูลการจองจาก Firebase
    const fetchData = async (selectedDate) => {
        setIsLoading(true);
        const reservationRef = ref(dbRealtime, 'reservations'); // ดึงข้อมูลจาก 'reservations'

        // ดึงข้อมูลจาก Firebase
        const snapshot = await get(reservationRef);
        if (snapshot.exists()) {
            const data = snapshot.val(); // ดึงข้อมูลทั้งหมด
            let reservationsList = [];
            let queueCount = 1;  // เริ่มต้นคิวที่ 1 สำหรับวันนั้น

            // ฟอร์แมทข้อมูลจาก Firebase และเพิ่มวัน
            Object.keys(data).forEach((date) => {
                // ตรวจสอบว่า date ตรงกับ selectedDate หรือไม่
                if (date === selectedDate) {
                    const dateReservations = data[date];

                    Object.keys(dateReservations).forEach((reservationID) => {
                        const reservation = dateReservations[reservationID];

                        // ตรวจสอบว่ามีการจองจริงหรือไม่ โดยตรวจสอบ reservationID, customerID, seat และ totalPrice
                        if (reservation.reservationID && reservation.customerID && reservation.seat && reservation.totalPrice !== 'No price') {
                            reservationsList.push({
                                reservationDate: date,
                                reservationID: reservation.reservationID,
                                customerID: reservation.customerID,
                                seat: reservation.seat,
                                totalPrice: reservation.totalPrice,
                                phone: reservation.phone || 'No phone',  // กรณีไม่มีหมายเลขโทรศัพท์
                                queue: queueCount, // คำนวณหมายเลขคิวที่เพิ่มขึ้น
                            });
                            queueCount++; // เพิ่มคิวสำหรับการจองถัดไป
                        }
                    });
                }
            });

            // ตั้งจำนวนการจองทั้งหมดเพื่อใช้ในการคำนวณจำนวนหน้า
            setReservations(reservationsList); // เก็บข้อมูลลงใน state
        } else {
            console.log('No reservations found.');
        }
        setIsLoading(false);
    };

    // ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้จาก customerID
    const fetchUserData = async (customerID) => {
        const userRef = ref(dbRealtime, `users/${customerID}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            setUserData(snapshot.val());
        } else {
            console.log("User data not found for customerID:", customerID);
        }
    };

    // ฟังก์ชันเพื่อจัดการแสดงวันที่ปัจจุบันและ 7 วันถัดไป
    // ฟังก์ชันเพื่อจัดการแสดงวันที่ปัจจุบันและ 7 วันถัดไป
const getDateRange = () => {
    const today = moment();  // วันที่ปัจจุบัน
    const startDate = today.clone().subtract(7, 'days'); // 7 วันที่ผ่านมา
    const endDate = today.clone().add(7, 'days'); // 7 วันถัดไป

    // ตั้งค่า displayDate เป็น 14 วัน (7 วันก่อนหน้า + 7 วันหลัง)
    setDisplayDate(`${startDate.format("D MMM YYYY")} - ${endDate.format("D MMM YYYY")}`);  // แสดงช่วงวันที่

    // สร้างปุ่มวันที่
    let dateBtns = [];
    for (let i = -7; i <= 7; i++) {
        // แสดงเฉพาะวันที่และเดือนใน UI
        dateBtns.push(today.clone().add(i, 'days').format("D MMM"));
    }
    setDateButtons(dateBtns);

    // กำหนดวันที่เริ่มต้นและสุดท้าย
    setMinDate(startDate.format("D MMM YYYY"));
    setMaxDate(endDate.format("D MMM YYYY"));
};


    // ฟังก์ชันสำหรับการเลือกวันที่จากปุ่ม
    const handleDateSelect = (date) => {
        const formattedDate = `${date} ${moment().year()}`;  // เพิ่มปีเข้าไป
        setSelectedDate(formattedDate);  // ตั้งค่ารูปแบบวันที่ที่เลือก
        fetchData(formattedDate);  // เรียกใช้ฟังก์ชันดึงข้อมูลตามวันที่ที่เลือก
    };

    // ฟังก์ชันสำหรับการเปลี่ยนหน้า (Next/Previous)
    const handleNextPrevious = (direction) => {
        const today = moment(selectedDate, "D MMM YYYY");
        let newSelectedDate;

        if (direction === 'next' && today.isBefore(moment(maxDate, "D MMM YYYY"))) {
            newSelectedDate = today.clone().add(1, 'days').format("D MMM YYYY");
        } else if (direction === 'previous' && today.isAfter(moment(minDate, "D MMM YYYY"))) {
            newSelectedDate = today.clone().subtract(1, 'days').format("D MMM YYYY");
        }

        if (newSelectedDate) {
            setSelectedDate(newSelectedDate);
        }
    };
    useEffect(() => {
        if (selectedDateFromURL) {
            setSelectedDate(selectedDateFromURL);  // ตั้งค่าจาก URL
        } else {
            setSelectedDate(moment().format("D MMM YYYY"));  // ใช้วันที่ปัจจุบันถ้าไม่มีค่าจาก URL
        }
    }, [selectedDateFromURL]);

    useEffect(() => {
        fetchData(selectedDate);  // เรียกใช้ฟังก์ชันดึงข้อมูลตามวันที่ที่เลือก
        getDateRange();  // เรียกใช้เพื่อกำหนดช่วงวันที่ที่จะแสดง
    }, [selectedDate]);  // เมื่อเลือกวันที่จะทำการดึงข้อมูลใหม่

    return (
        <>
            <Navbar />
            <div className="reserveHistory px-auto py-16 flex justify-center items-center">
                <div className="reserveHistory-box p-8 max-w-6xl m-auto shadow-black shadow-xl">
                    <h2 className="text-4xl font-bold text-yellow-500 font-mono tracking-widest">
                        Reservation History
                    </h2>
                    <h3 className="text-2xl mt-4 text-white font-semibold">
                        {displayDate}  {/* แสดงช่วงวันที่ */}
                    </h3>

                    <div className="overflow-x-auto mt-8">
                        <table className="table tracking-wider">
                            {/* head */}
                            <thead>
                                <tr className="text-xl text-center text-white font-semibold">
                                    <th>Reservation Date</th>
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
                                        <td colSpan="6" className="text-center py-5">Loading...</td>
                                    </tr>
                                ) : (
                                    reservations.length > 0 ? (
                                        reservations.map((reservation, index) => {
                                            fetchUserData(reservation.customerID); // ดึงข้อมูลผู้ใช้
                                            return (
                                                <tr key={index} className="text-lg text-center">
                                                    <td>{moment(reservation.reservationDate).format("D MMM YYYY")}</td>
                                                    <td>{reservation.queue}</td> {/* แสดงหมายเลขคิว */}
                                                    <td>{userData.firstname} {userData.lastname}</td> {/* ชื่อผู้ใช้ */}
                                                    <td>{reservation.seat}</td>
                                                    <td>{reservation.totalPrice}฿</td>
                                                    <td>{userData.phone || "No phone"}</td> {/* หมายเลขโทรศัพท์ */}
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-5">No reservations available for this date</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-5 flex items-center justify-center">
                        <button
                            onClick={() => handleNextPrevious('previous')}
                            disabled={moment(selectedDate, "D MMM YYYY").isSameOrBefore(moment(minDate, "D MMM YYYY"))}
                            className="px-4 py-2 bg-blue-500 rounded text-white"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handleNextPrevious('next')}
                            disabled={moment(selectedDate, "D MMM YYYY").isSameOrAfter(moment(maxDate, "D MMM YYYY"))}
                            className="px-4 py-2 bg-blue-500 rounded text-white"
                        >
                            Next
                        </button>
                    </div>

                    {/* Page numbers as Date buttons */}
                    <div className="mt-4 flex justify-center gap-2">
                        {dateButtons.map((date, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleDateSelect(date)}  // เลือกวันที่จากปุ่ม
                                    className={`px-4 py-2 rounded ${selectedDate === `${date} ${moment().year()}` ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                >
                                    {date}
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
