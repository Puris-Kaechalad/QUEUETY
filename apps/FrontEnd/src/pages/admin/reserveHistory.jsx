import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { ref, get } from 'firebase/database';
import { dbRealtime } from "../../firebaseConfig";
import Navbar from '../../component/nav';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './admin.css';
import moment from 'moment';
import { FaCheck, FaTimes } from 'react-icons/fa'; // สำหรับใช้ไอคอนติ๊กถูกและกากบาท

function ReserveHistory() {
    const [currentPage, setCurrentPage] = useState(1);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayDate, setDisplayDate] = useState(null);
    const [dateButtons, setDateButtons] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().format("D MMM YYYY"));
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedDateFromURL = queryParams.get('selectedDate');
    const [userRole, setUserRole] = useState("");
    const [confirmedReservations, setConfirmedReservations] = useState([]); // เก็บรายการที่ติ๊กถูก

    const fetchData = async (selectedDate) => {
        setIsLoading(true);
        const reservationRef = ref(dbRealtime, 'reservations');
        const snapshot = await get(reservationRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            let reservationsList = [];
            let userFetchPromises = [];

            Object.keys(data).forEach((date) => {
                if (date === selectedDate) {
                    const dateReservations = data[date];
                    Object.keys(dateReservations).forEach((reservationID) => {
                        const reservation = dateReservations[reservationID];
                        if (reservation.reservationID && reservation.customerID && reservation.seat && reservation.totalPrice !== 'No price') {
                            reservationsList.push({
                                reservationDate: date,
                                reservationID: reservation.reservationID,
                                customerID: reservation.customerID,
                                seat: reservation.seat,
                                totalPrice: reservation.totalPrice,
                                queue: reservation.queue, // ✅ ดึง queue จาก database จริง
                            });
                            const userRef = ref(dbRealtime, `users/${reservation.customerID}`);
                            userFetchPromises.push(get(userRef));
                        }
                    });
                    reservationsList.sort((a, b) => Number(a.queue) - Number(b.queue));

                    setReservations(reservationsList);
                }
            });

            const userSnapshots = await Promise.all(userFetchPromises);
            const userDataMap = {};
            userSnapshots.forEach((snap, index) => {
                if (snap.exists()) {
                    userDataMap[reservationsList[index].customerID] = snap.val();
                }
            });

            reservationsList = reservationsList.map((res) => ({
                ...res,
                user: userDataMap[res.customerID] || { firstname: "Unknown", lastname: "", phone: "No phone" }
            }));

            setReservations(reservationsList);
        } else {
            console.log('No reservations found.');
        }
        setIsLoading(false);
    };

    const getDateRange = () => {
        const today = moment();
        let startDate, endDate;
        let dateBtns = [];

        if (userRole === "admin") {
            startDate = today.clone().subtract(7, 'days');
            endDate = today.clone().add(7, 'days');
            for (let i = -7; i <= 7; i++) {
                dateBtns.push(today.clone().add(i, 'days').format("D MMM"));
            }
        } else if (userRole === "staff") {
            startDate = today.clone();
            endDate = today.clone().add(7, 'days');
            for (let i = 0; i <= 7; i++) {
                dateBtns.push(today.clone().add(i, 'days').format("D MMM"));
            }
        }

        setDisplayDate(`${startDate.format("D MMM YYYY")} - ${endDate.format("D MMM YYYY")}`);
        setDateButtons(dateBtns);
        setMinDate(startDate.format("D MMM YYYY"));
        setMaxDate(endDate.format("D MMM YYYY"));
    };

    const handleDateSelect = (date) => {
        const formattedDate = `${date} ${moment().year()}`;
        setSelectedDate(formattedDate);
        fetchData(formattedDate);
    };

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

    const handleConfirm = (reservationID) => {
        // Toggle the confirmed reservation by checking if it already exists
        if (confirmedReservations.includes(reservationID)) {
            // If it's already confirmed, remove it (set as not confirmed)
            setConfirmedReservations(prevState => prevState.filter(id => id !== reservationID));
        } else {
            // If it's not confirmed, add it to the confirmed reservations list
            setConfirmedReservations(prevState => [...prevState, reservationID]);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userRef = ref(dbRealtime, `users/${currentUser.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setUserRole(snapshot.val().role);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (selectedDateFromURL) {
            setSelectedDate(selectedDateFromURL);
        } else {
            setSelectedDate(moment().format("D MMM YYYY"));
        }
    }, [selectedDateFromURL]);

    useEffect(() => {
        if (userRole) {
            getDateRange();
            fetchData(selectedDate);
        }
    }, [selectedDate, userRole]);

    return (
        <>
            <Navbar />
            <div className="reserveHistory px-auto py-16 flex justify-center items-center">
                <div className="reserveHistory-box p-8 max-w-6xl m-auto shadow-black shadow-xl">
                    <h2 className="text-4xl font-bold text-yellow-500 font-mono tracking-widest">
                        Reservation History
                    </h2>
                    <h3 className="text-2xl mt-4 text-white font-semibold">
                        {displayDate}
                    </h3>

                    <div className="mt-8 flex justify-center gap-2">
                        {dateButtons.map((date, index) => (
                            <button
                                key={index}
                                onClick={() => handleDateSelect(date)}
                                className={`px-2 py-1 rounded-xl cursor-pointer ${selectedDate === `${date} ${moment().year()}` ? 'bg-blue-500 text-white text-md' : 'bg-gray-300 text-gray-400 text-sm'}`}
                            >
                                {date}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-x-auto mt-8">
                        <table className="table tracking-wider">
                            <thead>
                                <tr className="text-xl text-center text-white font-semibold">
                                    <th>Reservation Date</th>
                                    <th>Queue</th>
                                    <th>Customer</th>
                                    <th>Seat</th>
                                    <th>Phone number</th>
                                    {userRole === "admin" && <th>Price</th>} {/* เพิ่ม Price เฉพาะ admin */}
                                    {userRole === "staff" && <th>Confirmed</th>} {/* เพิ่ม column เฉพาะ staff */}
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5">Loading...</td>
                                    </tr>
                                ) : (
                                    reservations.length > 0 ? (
                                        reservations.map((reservation, index) => (
                                            <tr key={index} className="text-lg text-center">
                                                <td>{moment(reservation.reservationDate).format("D MMM YYYY")}</td>
                                                <td>{reservation.queue}</td>
                                                <td>{reservation.user.firstname} {reservation.user.lastname}</td>
                                                <td>{reservation.seat}</td>
                                                <td>{reservation.user.phone}</td>
                                                {userRole === "admin" && (
                                                    <td>{reservation.totalPrice}฿</td> // ปรับให้ admin เห็น
                                                )}
                                                {userRole === "staff" && (
                                                    <td>
                                                        <button
                                                            className={`rounded-full p-2 hover:scale-110 transition-all duration-200 
                                                            ${confirmedReservations.includes(reservation.reservationID) ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                                                            onClick={() => handleConfirm(reservation.reservationID)}  // เพิ่มฟังก์ชันติ๊กถูก
                                                        >
                                                            {confirmedReservations.includes(reservation.reservationID) ? <FaTimes /> : <FaCheck />} {/* ไอคอนติ๊กถูกและกากบาท */}
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-5">No reservations available for this date</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ReserveHistory;
