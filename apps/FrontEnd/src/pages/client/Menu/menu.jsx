import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { MenuContext } from "../../../context/menuContext";
import Navbar from '../../../component/nav'
import FoodMenu from '../../../component/foodMenu'
import '../client.css'

function menu() {
    const { menus } = useContext(MenuContext);

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
                                        <img src={item.image} alt={item.name} className="rounded-md" />
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