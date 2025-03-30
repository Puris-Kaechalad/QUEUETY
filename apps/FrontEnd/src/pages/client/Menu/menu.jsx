import React, { useState, useEffect, useContext } from "react";  // แก้ไขเป็นการ import React ครั้งเดียว
import { MenuContext } from "../../../context/menuContext";  // นำเข้า MenuContext
import { ref, onValue } from "firebase/database";
import { dbRealtime } from "../../../firebaseConfig"; // ใช้ Firebase config ที่โหลดมา
import Navbar from '../../../component/nav';
import FoodMenu from '../../../component/foodMenu';
import '../client.css';

function menu() {
    const { menus } = useContext(MenuContext);

    useEffect(() => {
        // ดึงข้อมูลจาก Firebase เมื่อหน้าโหลด
        const menuRef = ref(dbRealtime, 'menus');
        onValue(menuRef, (snapshot) => {
            const data = snapshot.val();
            setMenus(data || {}); // เก็บข้อมูลเมนูใน state
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex ">
                <FoodMenu />
                <div className="content w-full py-32">
                    <div className="card-box py-4 flex justify-center flex-wrap gap-8 tracking-widest text-lg font-semibold">
                        {Object.keys(menus).map((category) =>
                            menus[category].map((item, index) => (
                                <div key={index} className="w-64 card m-2">
                                    <div className="p-1">
                                        <img src={item.imageUrl} alt={item.name} className="rounded-md" />
                                    </div>
                                    <div className="p-2 w-full text-center">
                                        <h2>{item.name}</h2>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default menu