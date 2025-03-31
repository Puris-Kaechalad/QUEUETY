import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from "../../../context/menuContext";
import Navbar from '../../../component/nav';
import Footer from '../../../component/footer'
import FoodMenu from '../../../component/foodMenu';
import '../client.css';

function Menu() {
    const { menus } = useContext(MenuContext);

    const [isLoaded, setIsLoaded] = useState(false);

    // ตรวจสอบว่า menus ถูกโหลดแล้วหรือไม่
    useEffect(() => {
        if (menus) {
            setIsLoaded(true);  // เมื่อ menus มีการเปลี่ยนแปลง ให้รีเฟรชการแสดงผล
        }
    }, [menus]);

    return (
        <>
            <Navbar />
            <div className="flex">
                <FoodMenu />
                <div className="content w-full py-32">
                    <div className="card-box py-4 flex justify-center flex-wrap gap-8 tracking-widest text-lg font-semibold">
                        {isLoaded && Object.keys(menus).map((category) => {
                            const menuItems = menus[category];  // ดึงข้อมูลเมนูจากหมวดหมู่

                            return menuItems ? (
                                // ถ้า menuItems มีข้อมูล ก็จะใช้ Object.values() เพื่อดึงรายการเมนูออกมา
                                Object.values(menuItems).map((item, index) => (
                                    <div key={index} className="w-64 card m-2">
                                        <div className="p-1">
                                            {/* ใช้ imageUrl ที่เก็บจาก ImgBB */}
                                            <img src={item.imageUrl} alt={item.name} className="rounded-md" />
                                        </div>
                                        <div className="p-2 w-full text-center">
                                            <h2>{item.name}</h2>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p key={category}>No items available for {category}</p>  // กรณีที่ไม่มีเมนูในหมวดหมู่
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Menu;
