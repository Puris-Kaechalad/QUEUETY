import React from 'react'
import Navbar from '../../../component/nav'
import FoodMenu from '../../../component/foodMenu'
import '../client.css'
import Steak from "../../../assets/steak.jpg"
import Cupcake from "../../../assets/cupcake.jpg"

function fries() {
    return (
        <>
            <Navbar />
            <div className="flex ">
                <FoodMenu />
                <div className="content w-full py-32">
                    <div className="card-box py-4 flex justify-center flex-wrap gap-8 tracking-widest text-lg font-semibold">

                        <div className="w-64 card">
                            <div className="p-1">
                                <img
                                    src={Steak}
                                    alt="img" className="rounded-md" />
                            </div>
                            <div className="p-2 w-full text-center">
                                <h2>Fries</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default fries