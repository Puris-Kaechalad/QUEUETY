import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import '../pages/client/client.css'
import Menu from "../assets/menu-icon.png"
import All from "../assets/all.png"
import Meat from "../assets/meat.png"
import Fried from "../assets/fried.png"
import Shrimp from "../assets/shrimp.png"
import Apple from "../assets/apple.png"
import Dessert from "../assets/dessert.png"
import Drink from "../assets/drink.png"

function foodMenu() {
    const [activePage, setActivePage] = useState(null); // สถานะ active page

    const handleClick = (page) => {
        setActivePage(page); // เมื่อคลิกจะตั้งค่าหน้า active
    };

    return (
        <>
            <aside className="sidebar w-1/4">
                <div className="h-screen grid grid-rows-1 p-8 tracking-widest">
                    <div className="flex gap-2 items-center self-center justify-self-center">
                        <img src={Menu} alt="icon" className="h-12" />
                        <h2 className="text-4xl text-yellow-500 font-bold">Menu</h2>
                    </div>
                    <div className="text-lg w-full self-start">
                        <Link to="/menu" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={All} alt="icon" className="h-6" />
                            <p>All</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/Meat" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={Meat} alt="icon" className="h-6" />
                            <p>Meat</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/fries" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={Fried} alt="icon" className="h-6" />
                            <p>Fries</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/seaFood" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={Shrimp} alt="icon" className="h-6" />
                            <p>Sea food</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/fruit" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105">
                            <img src={Apple} alt="icon" className="h-6" />
                            <p>Fruit</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/dessert" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105" onClick={() => handleCategoryClick('Dessert')}>
                            <img src={Dessert} alt="icon" className="h-6" />
                            <p>Dessert</p>
                        </Link>
                        <hr className="my-1"></hr>

                        <Link to="/menu/drink" className="menu-select flex justify-between w-full p-2 transition-all duration-200 hover:scale-105" onClick={() => handleCategoryClick('Drink')}>
                            <img src={Drink} alt="icon" className="h-6" />
                            <p>Drink</p>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default foodMenu