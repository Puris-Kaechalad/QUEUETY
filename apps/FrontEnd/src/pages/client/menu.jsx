import React from 'react'
import Navbar from '../../component/nav'
import './client.css'
import Steak from "../../assets/steak.jpg"
import Cupcake from "../../assets/cupcake.jpg"

function menu() {
    return (
        <>
            <Navbar />
            <div className="flex ">
                <aside className="sidebar w-1/5">
                    <div className="h-screen grid grid-rows-2 p-8 tracking-widest">
                        <h2 className="text-4xl text-yellow-500 font-bold self-center justify-self-center">Menu</h2>
                        <ul className="text-lg w-full space-y-2 self-start">
                            <li className="flex justify-between">
                                <img src="" alt="icon" className="" />
                                <p>All</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src="" alt="icon" className="" />
                                <p>Meat</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src="" alt="icon" className="" />
                                <p>Fries</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src="" alt="icon" className="" />
                                <p>Sea food</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src="" alt="icon" className="" />
                                <p>Fruit</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src="" alt="icon" className="" />
                                <p>Dessert</p>
                            </li>
                            <hr className="bg-red-500"></hr>
                            <li className="flex  justify-between">
                                <img src="" alt="icon" className="" />
                                <p>Drink</p>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="content w-full py-16">
                    <div className="card-box py-4 flex justify-center flex-wrap gap-8 text-white tracking-widest text-xl font-semibold">
                        <div className="w-64 card shadow-lg rounded-xl">
                            <div className="p-1">
                                <img
                                    src={Steak}
                                    alt="img" className="rounded-lg" />
                            </div>
                            <div className="py-4 w-full flex justify-center">
                                <h2>Beef steak</h2>
                            </div>
                        </div>

                        <div className="w-64 card shadow-lg rounded-xl">
                            <div className="p-1">
                                <img
                                    src={Cupcake}
                                    alt="img" className="rounded-lg" />
                            </div>
                            <div className="py-4 w-full flex justify-center">
                                <h2>Strawberry cupcake</h2>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default menu