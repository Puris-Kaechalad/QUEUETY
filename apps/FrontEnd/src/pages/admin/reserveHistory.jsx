import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { ref, get } from 'firebase/database';
import { dbRealtime } from "../../firebaseConfig";
import Navbar from '../../component/nav';
import './admin.css';
import moment from 'moment';

function ReserveHistory() {
    const itemsPerPage = 7;
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

    const fetchData = async (selectedDate) => {
        setIsLoading(true);
        const reservationRef = ref(dbRealtime, 'reservations');
        const snapshot = await get(reservationRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            let reservationsList = [];
            let userFetchPromises = [];
            let queueCount = 1;

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
                                queue: queueCount,
                            });
                            queueCount++;

                            const userRef = ref(dbRealtime, `users/${reservation.customerID}`);
                            userFetchPromises.push(get(userRef));
                        }
                    });
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
        const startDate = today.clone().subtract(7, 'days');
        const endDate = today.clone().add(7, 'days');
        setDisplayDate(`${startDate.format("D MMM YYYY")} - ${endDate.format("D MMM YYYY")}`);

        let dateBtns = [];
        for (let i = -7; i <= 7; i++) {
            dateBtns.push(today.clone().add(i, 'days').format("D MMM"));
        }
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

    useEffect(() => {
        if (selectedDateFromURL) {
            setSelectedDate(selectedDateFromURL);
        } else {
            setSelectedDate(moment().format("D MMM YYYY"));
        }
    }, [selectedDateFromURL]);

    useEffect(() => {
        fetchData(selectedDate);
        getDateRange();
    }, [selectedDate]);

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

                    <div className="overflow-x-auto mt-8">
                        <table className="table tracking-wider">
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
                                        reservations.map((reservation, index) => (
                                            <tr key={index} className="text-lg text-center">
                                                <td>{moment(reservation.reservationDate).format("D MMM YYYY")}</td>
                                                <td>{reservation.queue}</td>
                                                <td>{reservation.user.firstname} {reservation.user.lastname}</td>
                                                <td>{reservation.seat}</td>
                                                <td>{reservation.totalPrice}฿</td>
                                                <td>{reservation.user.phone}</td>
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

                    <div className="mt-4 flex justify-center gap-2">
                        {dateButtons.map((date, index) => (
                            <button
                                key={index}
                                onClick={() => handleDateSelect(date)}
                                className={`px-4 py-2 rounded ${selectedDate === `${date} ${moment().year()}` ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                {date}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReserveHistory;
