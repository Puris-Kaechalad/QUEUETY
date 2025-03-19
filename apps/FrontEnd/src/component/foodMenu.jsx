import React from 'react'
import { Link } from "react-router-dom";
import Menu from "../assets/menu-icon.png"
import All from "../assets/all.png"
import Meat from "../assets/meat.png"
import Fried from "../assets/fried.png"
import Shrimp from "../assets/shrimp.png"
import Apple from "../assets/apple.png"
import Dessert from "../assets/dessert.png"
import Drink from "../assets/drink.png"

function foodMenu() {
    return (
        <>
            <aside className="sidebar w-1/4">
                <div className="h-screen grid grid-rows-1 p-8 tracking-widest">
                    <div className="flex gap-2 items-center self-center justify-self-center">
                        <img src={Menu} alt="icon" className="h-12" />
                        <h2 className="text-4xl text-yellow-500 font-bold">Menu</h2>
                    </div>
                    <div className="text-lg w-full space-y-3 self-start">
                        <button id="all" className="flex justify-between w-full" onClick={() => handleCategoryClick('All')}>
                            <img src={All} alt="icon" className="h-6" />
                            <p>All</p>
                        </button>
                        <hr></hr>

                        <Link to="/menu/Meat" id="meat" className="flex justify-between w-full" onClick={() => handleCategoryClick('Meat')}>
                            <img src={Meat} alt="icon" className="h-6" />
                            <p>Meat</p>
                        </Link>
                        <hr></hr>

                        <Link to="/menu/fries" id="fries" className="flex justify-between w-full" onClick={() => handleCategoryClick('Fries')}>
                            <img src={Fried} alt="icon" className="h-6" />
                            <p>Fries</p>
                        </Link>
                        <hr></hr>

                        <Link to="/menu/seaFood" id="sea" className="flex justify-between w-full" onClick={() => handleCategoryClick('Sea')}>
                            <img src={Shrimp} alt="icon" className="h-6" />
                            <p>Sea food</p>
                        </Link>
                        <hr></hr>

                        <Link to="/menu/fruit" id="fruit" className="flex justify-between w-full" onClick={() => handleCategoryClick('Fruit')}>
                            <img src={Apple} alt="icon" className="h-6" />
                            <p>Fruit</p>
                        </Link>
                        <hr></hr>

                        <Link to="/menu/dessert" id="dessert" className="flex justify-between w-full" onClick={() => handleCategoryClick('Dessert')}>
                            <img src={Dessert} alt="icon" className="h-6" />
                            <p>Dessert</p>
                        </Link>
                        <hr></hr>

                        <Link to="/menu/drink" id="drink" className="flex justify-between w-full" onClick={() => handleCategoryClick('Drink')}>
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