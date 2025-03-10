import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../../component/nav'
import './client.css'
// import './fullscreen.css'
import DownArrow from "../../assets/down_arrow.png"
import Mark from "../../assets/mark.png"
import Book from "../../assets/booking.png"
import Music from "../../assets/music.png"
import Band1 from '../../assets/cocktail.jpg'
import Band2 from '../../assets/limp_bizkit.jpg'

function reservation() {
    return (
        <>
            <Navbar />
            <div className="reservation">
                <section className="reserve-top h-screen p-16 relative">
                    <div className="mt-16">
                        <div>
                            <div className="flex gap-4 items-center">
                                <img src={Book} alt="icon" className="h-8" />
                                <h2 className="text-4xl font-bold tracking-widest text-yellow-500">
                                    Reservation
                                </h2>
                            </div>
                            <p className="text-lg tracking-wider mt-4 text-white">
                                Please check queue remaining and choose any day you want :)
                            </p>
                        </div>

                        <div class="mt-8 w-full p-4">
                            <div className="overflow-x-scroll">
                                <div class="flex flex-nowrap space-x-4 min-w-max">
                                    {/* <img src="https://via.placeholder.com/200" class="w-48 h-48 object-cover rounded-lg" /> */}
                                    <div className="day grid place-items-center space-y-4 tracking-wider py-4 px-8 rounded-lg">
                                        <h3 className="text-2xl font-bold">9 Mar 2025</h3>
                                        <div className="flex justify-center gap-2 tracking-wider">
                                            <img src={Mark} alt="icon" className="h-6" />
                                            <p className="text-green-500">Available</p>
                                        </div>
                                        <div className="text-center tracking-wider">
                                            <p className="text-sm">remaining</p>
                                            <h2 className="text-4xl font-semibold">32</h2>
                                        </div>
                                        <div className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 hover:border-dashed transition-all duration-250 hover:scale-110 transform">
                                            <Link to="#" className="text-sm">RESERVE</Link>
                                        </div>
                                    </div>

                                    <div className="day grid place-items-center space-y-4 tracking-wider py-4 px-8 rounded-lg">
                                        <h3 className="text-2xl font-bold">10 Mar 2025</h3>
                                        <div className="flex justify-center gap-2 tracking-wider">
                                            <img src={Mark} alt="icon" className="h-6" />
                                            <p className="text-green-500">Available</p>
                                        </div>
                                        <div className="text-center tracking-wider">
                                            <p className="text-sm">remaining</p>
                                            <h2 className="text-4xl font-semibold">32</h2>
                                        </div>
                                        <div className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 hover:border-dashed transition-all duration-250 hover:scale-110 transform">
                                            <Link to="#" className="text-sm">RESERVE</Link>
                                        </div>
                                    </div>

                                    <div className="day grid place-items-center space-y-4 tracking-wider py-4 px-8 rounded-lg">
                                        <h3 className="text-2xl font-bold">11 Mar 2025</h3>
                                        <div className="flex justify-center gap-2 tracking-wider">
                                            <img src={Mark} alt="icon" className="h-6" />
                                            <p className="text-green-500">Available</p>
                                        </div>
                                        <div className="text-center tracking-wider">
                                            <p className="text-sm">remaining</p>
                                            <h2 className="text-4xl font-semibold">32</h2>
                                        </div>
                                        <div className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 hover:border-dashed transition-all duration-250 hover:scale-110 transform">
                                            <Link to="#" className="text-sm">RESERVE</Link>
                                        </div>
                                    </div>

                                    <div className="day grid place-items-center space-y-4 tracking-wider py-4 px-8 rounded-lg">
                                        <h3 className="text-2xl font-bold">12 Mar 2025</h3>
                                        <div className="flex justify-center gap-2 tracking-wider">
                                            <img src={Mark} alt="icon" className="h-6" />
                                            <p className="text-green-500">Available</p>
                                        </div>
                                        <div className="text-center tracking-wider">
                                            <p className="text-sm">remaining</p>
                                            <h2 className="text-4xl font-semibold">32</h2>
                                        </div>
                                        <div className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 hover:border-dashed transition-all duration-250 hover:scale-110 transform">
                                            <Link to="#" className="text-sm">RESERVE</Link>
                                        </div>
                                    </div>

                                    <div className="day grid place-items-center space-y-4 tracking-wider py-4 px-8 rounded-lg">
                                        <h3 className="text-2xl font-bold">13 Mar 2025</h3>
                                        <div className="flex justify-center gap-2 tracking-wider">
                                            <img src={Mark} alt="icon" className="h-6" />
                                            <p className="text-green-500">Available</p>
                                        </div>
                                        <div className="text-center tracking-wider">
                                            <p className="text-sm">remaining</p>
                                            <h2 className="text-4xl font-semibold">32</h2>
                                        </div>
                                        <div className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 hover:border-dashed transition-all duration-250 hover:scale-110 transform">
                                            <Link to="#" className="text-sm">RESERVE</Link>
                                        </div>
                                    </div>

                                    <div className="day grid place-items-center space-y-4 tracking-wider py-4 px-8 rounded-lg">
                                        <h3 className="text-2xl font-bold">14 Mar 2025</h3>
                                        <div className="flex justify-center gap-2 tracking-wider">
                                            <img src={Mark} alt="icon" className="h-6" />
                                            <p className="text-green-500">Available</p>
                                        </div>
                                        <div className="text-center tracking-wider">
                                            <p className="text-sm">remaining</p>
                                            <h2 className="text-4xl font-semibold">32</h2>
                                        </div>
                                        <div className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 hover:border-dashed transition-all duration-250 hover:scale-110 transform">
                                            <Link to="#" className="text-sm">RESERVE</Link>
                                        </div>
                                    </div>

                                    <div className="day grid place-items-center space-y-4 tracking-wider py-4 px-8 rounded-lg">
                                        <h3 className="text-2xl font-bold">15 Mar 2025</h3>
                                        <div className="flex justify-center gap-2 tracking-wider">
                                            <img src={Mark} alt="icon" className="h-6" />
                                            <p className="text-green-500">Available</p>
                                        </div>
                                        <div className="text-center tracking-wider">
                                            <p className="text-sm">remaining</p>
                                            <h2 className="text-4xl font-semibold">32</h2>
                                        </div>
                                        <div className="bg-yellow-600 px-4 py-1 mt-6 border-1 border-yellow-600 rounded-full hover:font-semibold hover:bg-transparent hover:border-1 hover:border-yellow-600 hover:border-dashed transition-all duration-250 hover:scale-110 transform">
                                            <Link to="#" className="text-sm">RESERVE</Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-200 hover:scale-120">
                        <a href="#liveband"><img src={DownArrow} alt="icon" className="h-16" /></a>
                    </div>
                    </div>
                </section>
                
                {/* ---------live band */}
                <section id="liveband" className="live-band max-w-7xl mx-auto">
                    <div className="p-16">
                        <div className="flex justify-center items-center gap-4 ">
                            <img src={Music} alt="icon" className="h-12"/>
                            <h2 className="text-4xl font-bold tracking-widest text-yellow-400">Upcoming live band</h2>
                            <img src={Music} alt="icon" className="h-12"/>
                        </div>
                        <div>
                            <div className="mt-16">
                                <div className="flex justify-start items-center gap-4">
                                    <h3 className="text-2xl font-bold tracking-wider">14 April 2025</h3>
                                    <p className="text-xl tracking-wider">(3200฿ / 1 customer)</p>
                                </div>
                                <div className="mt-4">
                                    <img src={Band1} alt="img" className="w-full rounded-lg shadow-black shadow-md" />
                                </div>
                            </div>
                            <div className="mt-16">
                                <div className="flex justify-start items-center gap-4">
                                    <h3 className="text-2xl font-bold tracking-wider">14 April 2025</h3>
                                    <p className="text-xl tracking-wider">(3200฿ / 1 customer)</p>
                                </div>
                                <div className="mt-4">
                                    <img src={Band2} alt="img" className="w-full rounded-lg shadow-black shadow-md" />
                                </div>
                            </div>
                            <div className="mt-16">
                                <div className="flex justify-start items-center gap-4">
                                    <h3 className="text-2xl font-bold tracking-wider">14 April 2025</h3>
                                    <p className="text-xl tracking-wider">(3200฿ / 1 customer)</p>
                                </div>
                                <div className="mt-4">
                                    <img src={Band1} alt="img" className="w-full rounded-lg shadow-black shadow-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default reservation