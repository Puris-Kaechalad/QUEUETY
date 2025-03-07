import React from 'react'
import Navbar from '../../component/nav'
import './client.css'
import Menu from "../../assets/menu-icon.png"
import All from "../../assets/all.png"
import Meat from "../../assets/meat.png"
import Fried from "../../assets/fried.png"
import Shrimp from "../../assets/shrimp.png"
import Apple from "../../assets/apple.png"
import Dessert from "../../assets/dessert.png"
import Drink from "../../assets/drink.png"
import Steak from "../../assets/steak.jpg"
import Cupcake from "../../assets/cupcake.jpg"

function menu() {
    return (
        <>
            <Navbar />
            <div className="flex ">
                <aside className="sidebar w-1/5">
                    <div className="h-screen grid grid-rows-1 p-8 tracking-widest">
                        <div className="flex gap-2 items-center self-center justify-self-center">
                            <img src={Menu} alt="icon"  className="h-12"/>
                            <h2 className="text-4xl text-yellow-500 font-bold">Menu</h2>
                        </div>
                        <ul className="text-lg w-full space-y-3 self-start">
                            <li className="flex justify-between">
                                <img src={All} alt="icon" className="h-6" />
                                <p>All</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src={Meat} alt="icon" className="h-6" />
                                <p>Meat</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src={Fried} alt="icon" className="h-6" />
                                <p>Fries</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src={Shrimp} alt="icon" className="h-6" />
                                <p>Sea food</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src={Apple} alt="icon" className="h-6" />
                                <p>Fruit</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src={Dessert} alt="icon" className="h-6" />
                                <p>Dessert</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src={Drink} alt="icon" className="h-6" />
                                <p>Drink</p>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="content w-full py-32">
                    <div className="card-box py-4 flex justify-center flex-wrap gap-8 tracking-widest text-lg font-semibold">
                        <div className="w-64 card shadow-lg">
                            <div className="p-1">
                                <img
                                    src={Steak}
                                    alt="img" className="rounded-md" />
                            </div>
                            <div className="p-2 w-full text-center">
                                <h2>Beef steak</h2>
                            </div>
                        </div>

                        <div className="w-64 card shadow-lg">
                            <div className="p-1">
                                <img
                                    src={Cupcake}
                                    alt="img" className="rounded-md" />
                            </div>
                            <div className="p-2 w-full text-center">
                                <h2>Strawberry cupcake with pasta sauce</h2>
                            </div>
                        </div>

                        <div className="w-64 card shadow-lg">
                            <div className="p-1">
                                <img
                                    src={Cupcake}
                                    alt="img" className="rounded-md" />
                            </div>
                            <div className="p-2 w-full text-center">
                                <h2>Strawberry cupcake </h2>
                            </div>
                        </div>

                        <div className="w-64 card shadow-lg">
                            <div className="p-1">
                                <img
                                    src={Cupcake}
                                    alt="img" className="rounded-md" />
                            </div>
                            <div className="p-2 w-full text-center">
                                <h2>Strawberry cupcake </h2>
                            </div>
                        </div>

                        <div className="w-64 card shadow-lg">
                            <div className="p-1">
                                <img
                                    src={Cupcake}
                                    alt="img" className="rounded-md" />
                            </div>
                            <div className="p-2 w-full text-center">
                                <h2>Strawberry cupcake </h2>
                            </div>
                        </div>

                        <div className="w-64 card shadow-lg">
                            <div className="p-1">
                                <img
                                    src={Cupcake}
                                    alt="img" className="rounded-md" />
                            </div>
                            <div className="p-2 w-full text-center">
                                <h2>Strawberry cupcake </h2>
                            </div>
                        </div>

                        <div className="w-64 card shadow-lg">
                            <div className="p-1">
                                <img
                                    src={Cupcake}
                                    alt="img" className="rounded-md" />
                            </div>
                            <div className="p-2 w-full text-center">
                                <h2>Strawberry cupcake </h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default menu