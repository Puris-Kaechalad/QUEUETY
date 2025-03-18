import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { dbRealtime } from '../../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import moment from 'moment';
import Navbar from '../../component/nav'; // สมมุติว่ามี navbar สำหรับแสดง

const StaffPage = () => {
  const [dates, setDates] = useState([]);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(""); // เพิ่มตัวแปร role ของผู้ใช้
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [customerData, setCustomerData] = useState({}); // เพิ่มตัวแปรเก็บข้อมูลผู้ใช้
  const [loading, setLoading] = useState(true); // เพิ่มสถานะการโหลด
  const auth = getAuth();

  // ตรวจสอบสถานะผู้ใช้และบทบาท
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // ดึงข้อมูล role ของผู้ใช้จาก Realtime Database
        const userRef = ref(dbRealtime, `users/${currentUser.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserRole(userData.role); // อัพเดท role
            setUser(currentUser);
          } else {
            setUserRole(""); // ถ้าข้อมูลผู้ใช้ไม่มี
          }
          setLoading(false); // ตั้งสถานะว่าโหลดเสร็จแล้ว
        });
      } else {
        setUserRole(""); // หากผู้ใช้ไม่ได้ล็อกอิน
        setLoading(false); // ตั้งสถานะว่าโหลดเสร็จแล้ว
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchReservations = async () => {
      const dateRef = ref(dbRealtime, 'reservations');
      const snapshot = await get(dateRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const reservationDates = [];
        const startDate = moment().add(1, 'days');
        const endDate = moment().add(9, 'days');

        for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
          const date = m.format('D MMM YYYY');
          const queues = data[date] || {};
          const remaining = 50 - Object.keys(queues).length; // คำนวณจำนวนที่นั่งที่เหลือ
          reservationDates.push({ date, remaining });
        }

        setDates(reservationDates);
      } else {
        const reservationDates = [];
        const startDate = moment().add(1, 'days');

        for (let m = moment(startDate); m.isBefore(moment().add(7, 'days')); m.add(1, 'days')) {
          const date = m.format('D MMM YYYY');
          reservationDates.push({ date, remaining: 50 });
        }

        setDates(reservationDates);
      }
    };

    fetchReservations();
  }, []);

  const handleDateSelect = async (date) => {
    setSelectedDate(date);

    // ดึงข้อมูลการจองสำหรับวันที่เลือก
    const reservationRef = ref(dbRealtime, `reservations/${date}`);
    const snapshot = await get(reservationRef);

    if (snapshot.exists()) {
      const reservations = snapshot.val();
      // ดึงข้อมูลของลูกค้าแต่ละคนโดยใช้ customerID
      for (const queueID in reservations) {
        const customerID = reservations[queueID].customerID;
        const customerRef = ref(dbRealtime, `users/${customerID}`);
        const customerSnapshot = await get(customerRef);
        
        if (customerSnapshot.exists()) {
          setCustomerData(prevData => ({
            ...prevData,
            [customerID]: customerSnapshot.val()
          }));
        }
      }
      setReservations(reservations);
    } else {
      setReservations([]);
    }
  };

  // ตรวจสอบว่าผู้ใช้มี role เป็น 'staff' หรือ 'admin' เท่านั้นที่สามารถเข้าถึง
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>; // แสดงข้อความขณะโหลด
  }

  if (!user || (userRole !== 'staff' && userRole !== 'admin')) {
    return <p className="text-center text-red-500">Access Denied</p>; // แสดงข้อความถ้าผู้ใช้ไม่ใช่ staff หรือ admin
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-16">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Staff Reservation View</h2>

        {/* แสดงวันที่ให้เลือก */}
        <div className="mb-6">
          <h3 className="text-xl text-gray-700 mb-4">Select a date to view reservations</h3>
          <div className="grid grid-cols-3 gap-4">
            {dates.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(day.date)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              >
                {day.date} - {day.remaining} spots remaining
              </button>
            ))}
          </div>
        </div>

        {/* แสดงการจองสำหรับวันที่เลือก */}
        {selectedDate && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reservations for {selectedDate}</h3>
            {reservations.length === 0 ? (
              <p className="text-gray-500">No reservations for this day.</p>
            ) : (
              <ul className="space-y-4">
                {Object.keys(reservations).map((queueID) => {
                  const customerID = reservations[queueID].customerID;
                  const customer = customerData[customerID] || {}; // ดึงข้อมูลลูกค้าจาก state
                  return (
                    <li key={queueID} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <p className="text-lg font-medium text-gray-800">
                        Customer: {customer.firstname} {customer.lastname}
                      </p>
                      <p className="text-gray-600">Seats: {reservations[queueID].seat}</p>
                      <p className="text-gray-600">Total Price: {reservations[queueID].totalPrice}฿</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffPage;
