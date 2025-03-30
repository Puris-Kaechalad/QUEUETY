import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { ref, get, remove } from 'firebase/database';
import { dbRealtime } from "../../firebaseConfig";
import Navbar from '../../component/nav';
import './client.css';

function Finished() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const reservationID = queryParams.get('reservationID');

    const [reservationData, setReservationData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [queueNumber, setQueueNumber] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // ✅ เพิ่ม state

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

            const reservationsRef = ref(dbRealtime, 'reservations');
            const reservationsSnap = await get(reservationsRef);

            if (reservationsSnap.exists()) {
                const reservations = reservationsSnap.val();

                for (let dateKey in reservations) {
                    const queues = reservations[dateKey];
                    for (let queueID in queues) {
                        if (queues[queueID].reservationID === reservationID) {
                            setReservationData({
                                ...queues[queueID],
                                reservationDate: dateKey
                            });
                            fetchUserData(queues[queueID].customerID);
                            setQueueNumber(queues[queueID].queue);

                            // ✅ ดึง image ของวันนั้น
                            const imageRef = ref(dbRealtime, `reservations/${dateKey}/imageUrl`);
                            const imageSnap = await get(imageRef);
                            if (imageSnap.exists()) {
                                setImageUrl(imageSnap.val());
                            }

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

        const reservationRef = ref(dbRealtime, `reservations/${reservationData.reservationDate}/${reservationID}`);

        try {
            await remove(reservationRef);
            console.log(`Reservation with ID ${reservationID} has been cancelled.`);
            setShowPopup(true);

            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
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
                        {imageUrl && (
                            <img src={imageUrl} alt="img" className="max-w-lg rounded-lg shadow-black shadow-md" />
                        )}
                    </div>

                    <div className="text-md tracking-wider space-y-4">
                        <h3 className="text-3xl font-bold">Queue: {queueNumber ? queueNumber : "Loading..."}</h3>
                        <hr />
                        <div className="flex justify-between">
                            <p>Day/Month/Year</p>
                            <p>{reservationData ? formatDate(reservationData.reservationDate) : "Loading..."}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Name</p>
                            <p>{userData ? `${userData.firstname} ${userData.lastname}` : "Loading..."}</p>
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
