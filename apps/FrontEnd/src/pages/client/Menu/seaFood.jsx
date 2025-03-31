import React, { useContext } from "react";
import Navbar from "../../../component/nav";
import FoodMenu from "../../../component/foodMenu";
import "../client.css";
import { MenuContext } from "../../../context/menuContext";

function SeaFood() {
    const { menus } = useContext(MenuContext);

    return (
        <>
            <Navbar />
            <div className="flex">
                <FoodMenu />
                <div className="content w-full py-32">
                    <div className="card-box py-4 flex justify-center flex-wrap gap-8 tracking-widest text-lg font-semibold">
                        {/* ตรวจสอบว่า menus.SeaFood เป็น Object และมีข้อมูล */}
                        {menus.SeaFood && Object.keys(menus.SeaFood).length > 0 ? (
                            // ใช้ Object.values() เพื่อดึงข้อมูลเมนูจาก Object
                            Object.values(menus.SeaFood).map((item, index) => (
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
                            <p>No items available for SeaFood</p> 
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SeaFood;
