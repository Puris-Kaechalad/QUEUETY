import React, { useContext } from "react";
import Navbar from "../../../component/nav";
import Footer from '../../../component/footer'
import FoodMenu from "../../../component/foodMenu";
import "../client.css";
import { MenuContext } from "../../../context/menuContext";

function Meat() {
    const { menus } = useContext(MenuContext);

    return (
        <>
            <Navbar />
            <div className="flex">
                <FoodMenu />
                <div className="content w-full py-32">
                    <div className="card-box py-4 flex justify-center flex-wrap gap-8 tracking-widest text-lg font-semibold">
                        {/* ตรวจสอบว่า menus.Meat เป็น Object ที่มีข้อมูล */}
                        {menus.Meat && Object.keys(menus.Meat).length > 0 ? (
                            // ใช้ Object.values() เพื่อดึงข้อมูลเมนูในหมวดหมู่ Meat
                            Object.values(menus.Meat).map((item, index) => (
                                <div key={index} className="w-64 card">
                                    <div className="p-1">
                                        {/* ใช้ imageUrl แทนการใช้ blob URL */}
                                        <img src={item.imageUrl} alt={item.name} className="rounded-md" />
                                    </div>
                                    <div className="p-2 w-full text-center">
                                        <h2>{item.name}</h2>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No items available for Meat</p> // กรณีไม่มีเมนูในหมวดหมู่นี้
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Meat;
