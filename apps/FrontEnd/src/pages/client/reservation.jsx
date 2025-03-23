import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../component/nav';
import './client.css';
import DownArrow from "../../assets/down_arrow.png";
import Mark from "../../assets/mark.png";
import Book from "../../assets/booking.png";
import Edit from "../../assets/pencil.png";
import Music from "../../assets/music.png";
import Band1 from '../../assets/cocktail.jpg';
import { ref, get } from 'firebase/database';
import { dbRealtime } from "../../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import moment from 'moment';

const Reservation = () => {
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false); // state สำหรับ popup
    const [popupMessage, setPopupMessage] = useState(''); // ข้อความสำหรับ popup
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchReservations = async () => {
            const dateRef = ref(dbRealtime, 'reservations');
            const snapshot = await get(dateRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const reservationDates = [];
                const startDate = moment().add(1, 'days');
                const endDate = moment().add(7, 'days');  // ตั้งค่าให้แสดงวันที่ 7 วัน

                // ตรวจสอบการเพิ่มวันให้ครบ 7 วัน
                for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
                    const date = m.format("D MMM YYYY");
                    const queues = data[date] || {};
                    const remaining = 50 - Object.keys(queues).length;
                    reservationDates.push({ date, remaining });
                }

                // ถ้าไม่ครบ 7 วัน ให้ทำการเติมวันให้ครบ
                if (reservationDates.length < 7) {
                    const missingDatesCount = 7 - reservationDates.length;
                    for (let i = 0; i < missingDatesCount; i++) {
                        const missingDate = moment().add(i + 1, 'days').format("D MMM YYYY");
                        reservationDates.push({ date: missingDate, remaining: 50 });
                    }
                }

                setDates(reservationDates);
            } else {
                // ถ้าไม่มีข้อมูลใน Firebase ให้สร้างวันเอง
                const reservationDates = [];
                const startDate = moment().add(1, 'days');

                for (let m = moment(startDate); m.isBefore(moment().add(7, 'days')); m.add(1, 'days')) {
                    const date = m.format("D MMM YYYY");
                    reservationDates.push({ date, remaining: 50 });
                }

                setDates(reservationDates);
            }
            setLoading(false);
        };

        fetchReservations();
    }, []);


    const isBookingAvailable = (date) => {
        const now = moment();
        const targetDate = moment(date, "D MMM YYYY");
        if (targetDate.isSame(now, 'day')) {
            return now.hour() < 18;
        }
        return true;
    };

    const handleReserve = async (date) => {
        if (!user) {
            navigate("/login", { state: { from: `/confirm?date=${encodeURIComponent(date)}` } });
            return;
        }

        const reservationRef = ref(dbRealtime, 'reservations/' + date);
        const snapshot = await get(reservationRef);

        if (snapshot.exists()) {
            const reservations = snapshot.val();
            const userAlreadyBooked = Object.values(reservations).some(reservation => reservation.customerID === user.uid);

            if (userAlreadyBooked) {
                setPopupMessage("You have already reserved this day.");
                setIsPopupVisible(true); // แสดง popup
                return;
            }
        }

        navigate(`/confirm?date=${encodeURIComponent(date)}`);
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
                                <h2 className="text-4xl font-bold tracking-widest text-yellow-500">Reservation</h2>
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
                                            <div className="day tracking-wider py-4 px-8 rounded-lg space-y-2 relative overflow-visible">

                                                {/* admin only ----------------------- */}
                                                <div className="">
                                                    <details className="absolute -top-2 -right-0">
                                                        <summary className="btn p-1 border-none shadow-none bg-white rounded-full">
                                                            <img src={Edit} alt="edit" className="h-5 " />
                                                        </summary>
                                                        <div className="flex justify-end mt-2">
                                                            <ul className="dropdown-content bg-white text-black text-center z-10 p-4 rounded-lg w-64 absolute space-y-4">
                                                                <li>
                                                                    <button className="btn bg-transparent text-black cursor-pointer hover:bg-sky-500" onClick={() => document.getElementById('edit').showModal()}>Edit detail
                                                                    </button>
                                                                </li>
                                                                <hr />
                                                                <li>
                                                                    <button className="btn bg-transparent text-black cursor-pointer hover:bg-sky-500" onClick={() => document.getElementById('change').showModal()}>Change to live band
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </details>

                                                    <dialog id="edit" className="modal">
                                                        <div className="modal-box bg-white text-black">
                                                            <form method="dialog">
                                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                            </form>
                                                            <h3 className="font-bold text-lg">Edit detail</h3>
                                                            
                                                        </div>
                                                    </dialog>

                                                    <dialog id="change" className="modal">
                                                        <div className="modal-box bg-white text-black">
                                                            <form method="dialog">
                                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                            </form>
                                                            <h3 className="font-bold text-lg">Hello!</h3>
                                                            <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                                        </div>
                                                    </dialog>
                                                </div>
                                                {/* admin only ----------------------- */}

                                                <div key={index} className=" grid place-items-center space-y-4 ">
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

                                                    {day.remaining > 0 && isBookingAvailable(day.date) ? (
                                                        <div
                                                            className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full 
                                                            hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 
                                                            hover:border-dashed transition-all duration-250 hover:scale-110 transform"
                                                            onClick={() => handleReserve(day.date)}
                                                        >
                                                            <span className="text-sm cursor-pointer">RESERVE</span>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-gray-500 px-4 py-1 mt-6 border-1 border-gray-500 rounded-full opacity-50 cursor-not-allowed">
                                                            <span className="text-sm">{day.remaining > 0 ? "Full" : "Not available"}</span>
                                                        </div>
                                                    )}
                                                </div>
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
                            <img src={Music} alt="icon" className="h-12" />
                            <h2 className="text-4xl font-bold tracking-widest text-yellow-400">Upcoming live band</h2>
                            <img src={Music} alt="icon" className="h-12" />
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


                        </div>
                    </div>
                </section>
            </div>

            {/* Popup */}
            {isPopupVisible && (
                <div className="popup-overlay">
                    <div className="popup-content space-y-6">
                        <p className="text-lg">{popupMessage}</p>
                        <button onClick={() => setIsPopupVisible(false)} className="btn bg-red-600 border-transparent px-8 py-1 hover:bg-transparent hover:border-red-600 hover:text-black duration-200">Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Reservation;
