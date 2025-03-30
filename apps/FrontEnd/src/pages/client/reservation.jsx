import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../component/nav';
import './client.css';
import DownArrow from "../../assets/down_arrow.png";
import Mark from "../../assets/mark.png";
import Book from "../../assets/booking.png";
import Edit from "../../assets/pencil.png";
import Del from "../../assets/bin.png";
import Music from "../../assets/music.png";
import Band1 from '../../assets/cocktail.jpg';
import { ref, get, set, remove } from 'firebase/database';
import { dbRealtime } from "../../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';
import moment from 'moment';

const Reservation = () => {
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(""); // เก็บบทบาทของผู้ใช้
    const [isPopupVisible, setIsPopupVisible] = useState(false); // state สำหรับ popup
    const [popupMessage, setPopupMessage] = useState(''); // ข้อความสำหรับ popup
    const [selectedDate, setSelectedDate] = useState(""); // เพิ่ม state สำหรับวันที่ที่เลือก
    const navigate = useNavigate();
    const auth = getAuth();
    const [price, setPrice] = useState(499); // กำหนดราคาตั้งต้นที่ 499
    const [imageUrl, setImageUrl] = useState("");
    const [isConcertDay, setIsConcertDay] = useState(false);
    const [concertData, setConcertData] = useState([]);
    const [selectedConcert, setSelectedConcert] = useState(null); // ใช้สำหรับเก็บคอนเสิร์ตที่เลือก
    const [bandDate, setBandDate] = useState("");  // เก็บวันที่
    const [bandPrice, setBandPrice] = useState("");  // เก็บราคา
   
    
    useEffect(() => {
        const fetchData = async () => {
            if (!selectedDate) return;  // ถ้าไม่มี selectedDate เลย ให้ไม่ทำอะไร
    
            const imageRef = ref(dbRealtime, `reservations/${selectedDate}/imageUrl`);
            const concertRef = ref(dbRealtime, `reservations/${selectedDate}/isConcertDay`);
            
            const imageSnapshot = await get(imageRef);
            const concertSnapshot = await get(concertRef);
    
            if (imageSnapshot.exists()) {
                setImageUrl(imageSnapshot.val());  // อัปเดต URL ของรูปภาพ
            }
    
            if (concertSnapshot.exists()) {
                setIsConcertDay(concertSnapshot.val());  // อัปเดตสถานะคอนเสิร์ต
            }
        };
    
        fetchData();
    }, [selectedDate]); // เมื่อ selectedDate เปลี่ยนแปลง จะทำการดึงข้อมูลใหม่
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // ดึงข้อมูล role ของผู้ใช้จาก Firebase Realtime Database
                const userRef = ref(dbRealtime, 'users/' + currentUser.uid);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setUserRole(snapshot.val().role); // เก็บ role ใน state
                }
            }
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
                const startDate = moment().add(1, 'days').startOf('day'); // ใช้ startOf('day') เพื่อให้เวลาเป็นเวลาเริ่มต้นของวัน
                const endDate = moment().add(7, 'days').endOf('day'); // ใช้ endOf('day') เพื่อให้เวลาเป็นเวลา 23:59:59 ของวัน
        
                // ตรวจสอบการเพิ่มวันให้ครบ 7 วัน
                for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
                    const date = m.format("D MMM YYYY");
                    const queues = data[date] || {};
        
                    // กรองคีย์ที่เป็นการจองจริงๆ โดยไม่ให้นับคีย์ที่ไม่เกี่ยวข้อง (เช่น isConcertDay, price, imageUrl)
                    const validReservations = Object.keys(queues).filter(key => {
                        return queues[key].customerID; // กรองเฉพาะที่มี customerID ซึ่งเป็นการจอง
                    });
        
                    const remaining = 50 - validReservations.length; // คำนวณคิวที่เหลือ
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

    useEffect(() => {
        const fetchConcertData = async () => {
            const dateRef = ref(dbRealtime, 'reservations'); // ดึงข้อมูลการจองจาก Firebase
            const snapshot = await get(dateRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const concertDays = [];

                // ดึงข้อมูลสำหรับวันคอนเสิร์ต
                Object.keys(data).forEach((date) => {
                    const { imageUrl, price, isConcertDay } = data[date];

                    // ตรวจสอบว่าเป็นวันคอนเสิร์ตหรือไม่ (ถ้าไม่มี key isConcertDay ให้ถือว่าเป็น false)
                    const isConcert = isConcertDay === false; // ถ้า isConcertDay เป็น false หรือไม่มี, ถือว่าเป็นวันคอนเสิร์ต

                    // ถ้า isConcertDay เป็น false หรือไม่มีเลย, ถือว่าเป็นวันคอนเสิร์ต
                    if (isConcert) {
                        concertDays.push({
                            date,
                            imageUrl: imageUrl || "default-image-url", // ใช้ค่า default หากไม่มี URL
                            price: price || "Unknown",
                        });
                    }
                });

                setConcertData(concertDays);
            }
        };

        fetchConcertData();
    }, []);


    const isBookingAvailable = (date) => {
        const now = moment();
        const targetDate = moment(date, "D MMM YYYY");
        if (targetDate.isSame(now, 'day')) {
            return now.hour() < 18;
        }
        return true;
    };
    
    const openEditDialog = (date) => {
        setSelectedDate(date); // ตั้งค่าวันที่ที่เลือก
        document.getElementById('edit').showModal(); // แสดง dialog สำหรับการแก้ไข
    };
    const openEditBandDialog = (concert) => {
        setSelectedConcert(concert); // ตั้งค่าสำหรับ concert ที่เลือก
        document.getElementById('editBand').showModal(); // เปิด dialog
    };
    
    const openChangeDialog = (date) => {
        setSelectedDate(date); // ตั้งค่าวันที่ที่เลือกให้ตรง
        document.getElementById('change').showModal(); // แสดง dialog สำหรับการเปลี่ยนเป็น live band
    };
    
    // Confirm action ใน Edit Dialog
    const handleEditConfirm = async () => {
        const formattedDate = moment(selectedConcert.date, "D MMM YYYY").format("D MMM YYYY");
        setSelectedDate(formattedDate);  // ตั้งค่าหรือจัดเก็บวันที่ใหม่

        const priceRef = ref(dbRealtime, `reservations/${selectedDate}/price`);
        const concertRef = ref(dbRealtime, `reservations/${selectedDate}/isConcertDay`);
        
        
        // บันทึกราคา, รูปภาพ และสถานะคอนเสิร์ตลงใน Firebase
        await set(priceRef, price);  
        await set(concertRef, isConcertDay);  

        document.getElementById('edit').close(); // ปิด dialog หลังบันทึก
    };

    // ฟังก์ชันอัปโหลดภาพไปยัง Cloudinary และบันทึก URL ลงใน Firebase
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);  // เพิ่มไฟล์ที่เลือก
    
            try {
                // ส่ง POST request ไปยัง ImgBB API
                const response = await axios.post('https://api.imgbb.com/1/upload?key=d11593c766f5add0af53144a89c145fa', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'  // ส่งเป็นแบบ multipart/form-data
                    }
                });
    
                // ดึง URL ของรูปภาพที่อัพโหลด
                const uploadedImageUrl = response.data.data.url;
                setImageUrl(uploadedImageUrl);  // เก็บ URL ของภาพที่ได้จาก ImgBB
    
                // บันทึก URL ลงใน Firebase Realtime Database
                const imageRef = ref(dbRealtime, `reservations/${selectedDate}/imageUrl`);
                await set(imageRef, uploadedImageUrl);
                
                console.log("Uploaded Image URL:", uploadedImageUrl);  // ตรวจสอบ URL ที่ได้จาก ImgBB
    
                // ปิด Dialog หลังจากการอัพโหลดเสร็จสิ้น
                document.getElementById('change').close();  // ปิด Dialog "Change to live band"
                alert("Image uploaded successfully!");
    
            } catch (error) {
                console.error("Error uploading image:", error);  // ตรวจสอบ error
                alert("Error uploading image. Please check the console for details.");
            }
        } else {
            alert("No file selected");
        }
    };

     // ฟังก์ชันลบคอนเสิร์ตจาก Firebase
     const handleDeleteConcert = async () => {
        if (!selectedConcert) return; // ตรวจสอบก่อนว่า selectedConcert ถูกตั้งค่าไว้หรือไม่
    
        const concertRef = ref(dbRealtime, `reservations/${selectedConcert.date}`);
    
        try {
            await remove(concertRef); // ลบข้อมูลจาก Firebase
    
            // ลบคอนเสิร์ตออกจาก state
            setConcertData(concertData.filter(concert => concert.date !== selectedConcert.date));
            alert("Concert data deleted successfully!");
    
            // ปิด Dialog หลังจากลบเสร็จ
            document.getElementById('delBand').close();
        } catch (error) {
            console.error("Error deleting concert: ", error);
            alert("Failed to delete concert.");
        }
    };
    

    const openDeleteDialog = (concert) => {
        setSelectedConcert(concert); // ตั้งค่าคอนเสิร์ตที่เลือกเพื่อใช้งานใน handleDeleteConcert
        document.getElementById('delBand').showModal(); // เปิด dialog สำหรับการลบ
    };

    // ฟังก์ชันที่ใช้แปลงวันที่
    const convertDate = (dateString) => {
        const formattedDate = moment(dateString, "DD/MM/YYYY").format("D MMM YYYY");
        return formattedDate;
    };

    // ใช้ในกรณีที่ต้องการแปลงวันที่ที่กรอกจาก input
const handleAddBand = async () => {
    const dateInput = document.getElementById('dateInput').value; // ตัวอย่างการดึงข้อมูลจาก input field
    const formattedDate = convertDate(dateInput); // แปลงวันที่ที่กรอก
    
    // จากนั้นคุณสามารถใช้ formattedDate ในการบันทึกข้อมูลใน Firebase
    const concertRef = ref(dbRealtime, `reservations/${formattedDate}`);
    await set(concertRef, {
        price: price,
        imageUrl: imageUrl,
        isConcertDay: isConcertDay,
    });

    console.log("Saved concert on:", formattedDate); // ตรวจสอบวันที่ที่บันทึกใน Firebase
    document.getElementById('add').close(); // ปิด Dialog
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
    
        // ดึงราคาของวันที่เลือกจาก Firebase
        const priceRef = ref(dbRealtime, `reservations/${date}/price`);
        const priceSnapshot = await get(priceRef);
        const selectedPrice = priceSnapshot.exists() ? priceSnapshot.val() : 499; // ใช้ราคา 499 ถ้าไม่มีการตั้งราคาใหม่
    
        navigate(`/confirm?date=${encodeURIComponent(date)}&price=${selectedPrice}`);
    };
    // ฟังก์ชันสำหรับการดูข้อมูลการจองในวันนั้น
    const handleViewReservation = (date) => {
        navigate(`/reserveHistory?selectedDate=${encodeURIComponent(date)}`);  // ส่ง selectedDate ไปที่ ReserveHistory
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
                                            <div
                                                className="day tracking-wider py-4 px-8 rounded-lg space-y-2 relative overflow-visible"
                                                style={{
                                                    backgroundImage: isConcertDay
                                                        ? `url(${imageUrl})` // ใช้รูปที่อัปโหลดในกรณีที่เป็นวันคอนเสิร์ต
                                                        : `url('default-background.jpg')` // ถ้าไม่ใช่ จะใช้ภาพพื้นหลังปกติ
                                                }}
                                            >

                                                {/* admin only ----------------------- */}
                                                {userRole === "admin" && (
                                                <div className="">
                                                    <details className="absolute -top-2 -right-0">
                                                        <summary className="btn p-1 border-none shadow-none bg-white rounded-full">
                                                            <img src={Edit} alt="edit" className="h-5 " />
                                                        </summary>
                                                        <div className="flex justify-end mt-2">
                                                            <ul className="dropdown-content bg-white text-black text-center z-10 p-4 rounded-lg w-50 absolute space-y-4">
                                                                <li>
                                                                    <button className="btn bg-transparent text-black cursor-pointer hover:bg-sky-500" onClick={() => openEditDialog(day.date)}>
                                                                        Edit detail
                                                                    </button>
                                                                </li>
                                                                <hr />
                                                                <li>
                                                                    <button className="btn bg-transparent text-black cursor-pointer hover:bg-sky-500" onClick={() => openChangeDialog(day.date)}>
                                                                        Change to live band
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </details>

                                                    {/* Dialog สำหรับ Edit */}
                                                    <dialog id="edit" className="modal">
                                                        <div className="modal-box bg-white text-black">
                                                            <form method="dialog">
                                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                            </form>
                                                            <h3 className="font-bold text-2xl">Edit detail</h3>
                                                            <p>{selectedDate}</p>
                                                            <div className="mt-8 text-center">
                                                                <label className="text-lg">Price</label>
                                                                <div className="flex gap-2 justify-center mt-2">
                                                                    <input
                                                                        type="text"
                                                                        value={price}
                                                                        onChange={(e) => setPrice(e.target.value)} // อัปเดตราคา
                                                                        className="w-1/4"
                                                                    />
                                                                    <p>฿</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center mt-8">
                                                                <button
                                                                    onClick={() => {
                                                                        // อัปเดตราคาใน Firebase
                                                                        const priceRef = ref(dbRealtime, `reservations/${selectedDate}/price`);
                                                                        set(priceRef, price); // บันทึกราคาใหม่
                                                                        document.getElementById('edit').close();
                                                                    }}
                                                                    className="bg-sky-500 px-4 py-1 rounded-full hover:scale-110 duration-200 cursor-pointer"
                                                                >
                                                                    Confirm
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </dialog>


                                                    {/* Dialog สำหรับ Change to live band */}
                                                    <dialog id="change" className="modal">
                                                    <div className="modal-box bg-white text-black">
                                                        <form method="dialog">
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                        <h3 className="font-bold text-2xl">Change to live band</h3>
                                                        <p>{selectedDate}</p> {/* แสดงวันที่ที่เลือก */}
                                                        <div className="mt-8 text-center space-y-6">
                                                            <label className="text-lg">Price</label>
                                                            <div className="flex gap-2 justify-center mt-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="499"
                                                                    value={price}
                                                                    onChange={(e) => setPrice(e.target.value)} // อัปเดตราคาที่กรอก
                                                                    className="w-1/4"
                                                                />
                                                                <p>฿</p>
                                                            </div>

                                                            <label className="text-lg">Picture</label>
                                                            <div className="flex justify-center mt-2">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="w-1/3"
                                                                    onChange={handleImageChange} // ตรวจจับการเปลี่ยนรูป
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center mt-8">
                                                            <button onClick={handleEditConfirm} className="bg-sky-500 px-4 py-1 rounded-full hover:scale-110 duration-200 cursor-pointer">
                                                                Confirm
                                                            </button>
                                                        </div>
                                                    </div>
                                                </dialog>
                                                </div>
                                            )}
                                                {/* admin only ----------------------- */}

                                                <div key={index} className="grid place-items-center space-y-4">
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

                                                    {/* ถ้ามีที่นั่งว่าง */}
                                                    {day.remaining > 0 && isBookingAvailable(day.date) ? (
                                                        <div
                                                            className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full 
                                                            hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 
                                                            hover:border-dashed transition-all duration-250 hover:scale-110 transform"
                                                            // เรียกฟังก์ชันที่เหมาะสมตามบทบาทของผู้ใช้
                                                            onClick={() => userRole === "admin" ? handleViewReservation(day.date) : handleReserve(day.date)}
                                                        >
                                                            {/* สำหรับผู้ใช้ทั่วไปจะแสดงปุ่ม RESERVE */}
                                                            {userRole !== "admin" && (
                                                                <span className="text-sm cursor-pointer">RESERVE</span>
                                                            )}
                                                            {/* สำหรับ admin จะเปลี่ยนเป็นปุ่ม VIEW */}
                                                            {userRole === "admin" && (
                                                                <span className="text-sm cursor-pointer">VIEW</span>
                                                            )}
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
        <div className="flex justify-center items-center gap-4">
          <img src={Music} alt="icon" className="h-12" />
          <h2 className="text-4xl font-bold tracking-widest text-yellow-400">Upcoming live band</h2>
          <img src={Music} alt="icon" className="h-12" />
        </div>

        {/* admin add band ------------------------ */}
        {userRole === "admin" && (
          <div className="mt-8">
            <details className="text-center">
              <summary className="btn bg-transparent border-none shadow-none">
                <button className="btn bg-white text-lg text-sky-500 cursor-pointer" onClick={() => document.getElementById('add').showModal()}>
                  Add band
                </button>
              </summary>
            </details>

            <dialog id="add" className="modal">
                <div className="modal-box bg-white text-black">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl">Add band</h3>
                    <div className="mt-8 text-center space-y-6">
                    <label className="text-lg">Date</label>
                    <div className="flex gap-2 justify-center mt-2">
                        <input id="dateInput" type="text" placeholder="dd/mm/yyyy" className="w-1/4" />
                    </div>

                    <label className="text-lg">Price</label>
                    <div className="flex gap-2 justify-center mt-2">
                        <input type="text" placeholder="499" className="w-1/4" />
                        <p>฿</p>
                    </div>

                    <label className="text-lg">Picture</label>
                    <div className="flex justify-center mt-2">
                        <input type="file" accept="image" className="w-1/3" onChange={handleImageChange} />
                    </div>
                    </div>
                    <div className="flex justify-center mt-8">
                    <button onClick={handleAddBand} className="bg-sky-500 px-4 py-1 rounded-full hover:scale-110 duration-200 cursor-pointer">
                        Confirm
                    </button>
                    </div>
                </div>
                </dialog>


          </div>
        )}
        {/* admin add band ------------------------ */}

        <div className="lg:flex flex-wrap">
          {concertData.length === 0 ? (
            <div className="text-center text-lg font-bold text-red-500">No concert available</div>
          ) : (
            concertData.map((concert, index) => (
              <div key={index} className="mt-16 lg:w-1/2 p-4">
                <div className="flex justify-start items-center gap-4 w-full">
                  <h3 className="text-xl font-bold tracking-wider">{concert.date}</h3>
                  <p className="text-lg tracking-wider">{concert.price}฿ / 1 customer</p>
                </div>
                <div className="mt-4 relative overflow-visible">
                  {/* admin edit, del button --------- */}
                  {userRole === "admin" && (
                    <div className="absolute -top-0 -right-1">
                      <div className="flex">
                        <details className="">
                          <summary className="btn p-1 shadow-none border-none bg-transparent rounded-full">
                            <button 
                                    className="btn bg-white shadow-none border-none rounded-full cursor-pointer hover:scale-110 duration-200 transition-all" 
                                    onClick={() => openEditBandDialog(concert)}  // เรียกใช้ฟังก์ชันที่ถูกต้อง
                                >
                                    <img src={Edit} alt="edit icon" className="h-6 bg-white" />
                                </button>

                          </summary>
                        </details>
                        <details className="">
                          <summary className="btn p-1 shadow-none border-none bg-transparent rounded-full">
                          <button className="btn bg-white shadow-none border-none rounded-full cursor-pointer hover:scale-110 duration-200 transition-all" onClick={() => openDeleteDialog(concert)}>
                                <img src={Del} alt="del icon" className="h-6" />
                        </button>

                          </summary>
                        </details>
                      </div>
                    </div>
                  )}
                  {/* admin edit, del button --------- */}
                  <img src={concert.imageUrl} alt="concert" className="w-full rounded-xl shadow-black shadow-md" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* admin edit, del popup--------- */}
      <div className="">
            <dialog id="editBand" className="modal">
            <div className="modal-box bg-white text-black">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-2xl">Edit band</h3>
                
                {/* ใช้ moment แปลงวันที่ที่ได้จาก selectedConcert */}
                <p>{selectedConcert ? moment(selectedConcert.date).format("D MMM YYYY") : "Loading..."}</p>

                <div className="mt-8 text-center space-y-6">
                    <label className="text-lg">Price</label>
                    <div className="flex gap-2 justify-center mt-2">
                        <input
                            type="text"
                            placeholder="499"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} // อัปเดตราคาที่กรอก
                            className="w-1/4"
                        />
                        <p>฿</p>
                    </div>

                    <label className="text-lg">Picture</label>
                    <div className="flex justify-center mt-2">
                        <input
                            type="file"
                            accept="image/*"
                            className="w-1/3"
                            onChange={handleImageChange} // ตรวจจับการเปลี่ยนรูป
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button onClick={handleEditConfirm} className="bg-sky-500 px-4 py-1 rounded-full hover:scale-110 duration-200 cursor-pointer">
                        Confirm
                    </button>
                </div>
            </div>
        </dialog>


                                <dialog id="delBand" className="modal">
                                    <div className="modal-box bg-white text-black">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold text-2xl">Remove band</h3>
                                        <p>{selectedConcert ? selectedConcert.date : "Loading..."}</p>  {/* แสดงวันที่คอนเสิร์ตที่เลือก */}
                                        <div className="mt-8 text-center">
                                            <p className="text-lg font-semibold">Are you sure you want to remove this band?</p>
                                        </div>
                                        <div className="flex justify-center mt-12">
                                            <button 
                                                className="bg-red-500 text-white px-4 py-1 rounded-full hover:scale-110 duration-200 cursor-pointer" 
                                                onClick={() => handleDeleteConcert(selectedConcert.date)} 
                                            >
                                                Confirm
                                            </button>
                                        </div>

                                    </div>
                                </dialog>
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
