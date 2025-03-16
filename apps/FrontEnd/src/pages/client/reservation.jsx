import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../../component/nav';
import './client.css';
import DownArrow from "../../assets/down_arrow.png";
import Mark from "../../assets/mark.png";
import Book from "../../assets/booking.png";
import Music from "../../assets/music.png";
import Band1 from '../../assets/cocktail.jpg';
import { ref, get } from 'firebase/database';
import { dbRealtime } from "../../firebaseConfig"; // นำเข้า Realtime Database
import moment from 'moment'; // ใช้ moment.js เพื่อจัดการวันที่

const Reservation = () => {
    const [dates, setDates] = useState([]); // สถานะของแต่ละวัน
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ฟังก์ชันเพื่อดึงข้อมูลคิวจาก Realtime Database
        const fetchReservations = async () => {
            const dateRef = ref(dbRealtime, 'reservations');
            const snapshot = await get(dateRef);
            
            if (snapshot.exists()) {
                const data = snapshot.val();
                const reservationDates = [];
                const today = moment(); // วันที่ปัจจุบัน
                const endDate = moment().add(7, 'days'); // วันที่สุดท้าย (7 วัน)

                // กรองเฉพาะวันที่ตั้งแต่วันนี้ถึง 7 วันข้างหน้า
                for (let m = moment(today); m.isBefore(endDate); m.add(1, 'days')) {
                    const date = m.format("D MMM YYYY");
                    const queues = data[date] || {}; // ถ้าไม่มีข้อมูลสำหรับวันนั้นให้ใช้ข้อมูลว่าง
                    const remaining = 50 - Object.keys(queues).length; // คำนวณคิวที่เหลือ
                    reservationDates.push({ date, remaining });
                }

                setDates(reservationDates);
                setLoading(false);
            } else {
                console.log("No data available");
                setLoading(false);
                // กรณีที่ไม่มีข้อมูล
                // สร้างข้อมูลให้สามารถแสดงวันจองได้
                const today = moment();
                const reservationDates = [];
                for (let m = moment(today); m.isBefore(moment().add(7, 'days')); m.add(1, 'days')) {
                    const date = m.format("D MMM YYYY");
                    reservationDates.push({ date, remaining: 32 }); // สมมติว่า 32 คิวเหลือ
                }
                setDates(reservationDates);
            }
        };

        fetchReservations();
    }, []);

    // ฟังก์ชันตรวจสอบเวลาปัจจุบันเพื่อป้องกันการจองหลัง 18:00
    const isBookingAvailable = (date) => {
        const now = moment();
        const targetDate = moment(date, "D MMM YYYY");
        if (targetDate.isSame(now, 'day')) {
            return now.hour() < 18; // ตรวจสอบว่าเวลาตอนนี้น้อยกว่า 18:00 หรือไม่
        }
        return true; // ถ้าไม่ใช่วันนี้ สามารถจองได้
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar />
            <div className="reservation">
                <section className="reserve-top h-screen p-16 relative">
                    <div className="mt-16">
                        <div>
                            <div className="flex gap-4 items-center">
                                <img src={Book} alt="icon" className="h-8" />
                                <h2 className="text-4xl font-bold tracking-widest text-yellow-500">
                                    Reservation
                                </h2>
                            </div>
                            <p className="text-lg tracking-wider mt-4 text-white">
                                Please check queue remaining and choose any day you want :)
                            </p>
                        </div>

                        <div className="mt-8 w-full p-4">
                            <div className="overflow-x-scroll">
                                <div className="flex flex-nowrap space-x-4 min-w-max">
                                    {dates.length === 0 ? (
                                        <div className="text-center text-xl text-red-500 w-full py-16">
                                            No reservation data available for the next 7 days.
                                        </div>
                                    ) : (
                                        dates.map((day, index) => (
                                            <div key={index} className="day grid place-items-center space-y-4 tracking-wider py-4 px-8 rounded-lg">
                                                <h3 className="text-2xl font-bold">{day.date}</h3>
                                                <div className="flex justify-center gap-2 tracking-wider">
                                                    <img src={Mark} alt="icon" className="h-6" />
                                                    <p className={day.remaining > 0 ? "text-green-500" : "text-red-500"}>
                                                        {day.remaining > 0 ? "Available" : "Full"}
                                                    </p>
                                                </div>
                                                <div className="text-center tracking-wider">
                                                    <p className="text-sm">remaining</p>
                                                    <h2 className="text-4xl font-semibold">{day.remaining}</h2>
                                                </div>

                                                {/* ถ้าที่เหลือมากกว่า 0 ให้กดจองได้ */}
                                                {day.remaining > 0 && isBookingAvailable(day.date) ? (
                                                    <div className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 hover:border-dashed transition-all duration-250 hover:scale-110 transform">
                                                        <Link to={`/confirm?date=${encodeURIComponent(day.date)}`} className="text-sm">
                                                            RESERVE
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <div className="bg-gray-500 px-4 py-1 mt-6 border-1 border-gray-500 rounded-full opacity-50 cursor-not-allowed">
                                                        <span className="text-sm">{day.remaining > 0 ? "Full" : "Not available"}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-200 hover:scale-120">
                            <a href="#liveband"><img src={DownArrow} alt="icon" className="h-16" /></a>
                        </div>
                    </div>
                </section>

                {/* ---------live band */}
                <section id="liveband" className="live-band mx-auto">
                    <div className="p-16">
                        <div className="flex justify-center items-center gap-4 ">
                            <img src={Music} alt="icon" className="h-12"/>
                            <h2 className="text-4xl font-bold tracking-widest text-yellow-400">Upcoming live band</h2>
                            <img src={Music} alt="icon" className="h-12"/>
                        </div>

                        <div className="lg:flex flex-wrap">
                            <div className="mt-16 lg:w-1/2 p-4">
                                <div className="flex justify-start items-center gap-4 w-full">
                                    <h3 className="text-xl font-bold tracking-wider">14 April 2025</h3>
                                    <p className="text-lg tracking-wider">(3200฿ / 1 customer)</p>
                                </div>
                                <div className="mt-4">
                                    <img src={Band1} alt="img" className="w-full rounded-xl shadow-black shadow-md" />
                                </div>
                            </div>
                            <div className="mt-16 lg:w-1/2 p-4">
                                <div className="flex justify-start items-center gap-4 w-full">
                                    <h3 className="text-xl font-bold tracking-wider">14 April 2025</h3>
                                    <p className="text-lg tracking-wider">(3200฿ / 1 customer)</p>
                                </div>
                                <div className="mt-4">
                                    <img src={Band1} alt="img" className="w-full rounded-xl shadow-black shadow-md" />
                                </div>
                            </div>
                            <div className="mt-16 lg:w-1/2 p-4">
                                <div className="flex justify-start items-center gap-4 w-full">
                                    <h3 className="text-xl font-bold tracking-wider">14 April 2025</h3>
                                    <p className="text-lg tracking-wider">(3200฿ / 1 customer)</p>
                                </div>
                                <div className="mt-4">
                                    <img src={Band1} alt="img" className="w-full rounded-xl shadow-black shadow-md" />
                                </div>
                            </div>
                            <div className="mt-16 lg:w-1/2 p-4">
                                <div className="flex justify-start items-center gap-4 w-full">
                                    <h3 className="text-xl font-bold tracking-wider">14 April 2025</h3>
                                    <p className="text-lg tracking-wider">(3200฿ / 1 customer)</p>
                                </div>
                                <div className="mt-4">
                                    <img src={Band1} alt="img" className="w-full rounded-xl shadow-black shadow-md" />
                                </div>
                            </div>
                            <div className="mt-16 lg:w-1/2 p-4">
                                <div className="flex justify-start items-center gap-4 w-full">
                                    <h3 className="text-xl font-bold tracking-wider">14 April 2025</h3>
                                    <p className="text-lg tracking-wider">(3200฿ / 1 customer)</p>
                                </div>
                                <div className="mt-4">
                                    <img src={Band1} alt="img" className="w-full rounded-xl shadow-black shadow-md" />
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Reservation;
