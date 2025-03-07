import React from 'react'
import Navbar from '../../component/nav'
import './client.css'
import { Link } from "react-router-dom";
import steakImage from "../../assets/home_background.png";
import HomeCenter from "../../assets/home_center.jpg";
import DownArrow from "../../assets/down_arrow.png"
import Location from "../../assets/location.png"

function home() {

  return (
    <>
      <Navbar />
      <section className="lg:flex home-top h-screen justify-between items-center p-16 z-10">
        <div className="grid-rows-2">
          <div className="space-y-16">
            <div className="tracking-wider">
              <h1 className="text-5xl font-bold">Got plans for tonight's party?</h1>
              <p className="mt-8 text-4xl">Let me help you find a seat!</p>
            </div>
            <div className="flex space-x-8 ">
              {/* <Link to="about-us" smooth={true} duration={500} className="text-white px-4 py-2 border-1 border-dashed rounded-full tracking-wider hover:bg-white hover:text-black transition-all duration-200 hover:scale-110 ">About us</Link> */}
              <a href="#about-us" className="text-white px-4 py-2 border-1 border-dashed rounded-full tracking-wider hover:bg-white hover:text-black transition-all duration-200 hover:scale-110 ">About us</a>
              <a className="flex items-center bg-yellow-600 shadow-lg px-4 py-2 rounded-full leading-none font-bold text-lg tracking-wider hover:bg-transparent hover:border-1 hover:border-yellow-500 transition-all duration-200 hover:scale-110">Reserve now</a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-200 hover:scale-120">
          <a href="#about-us"><img src={DownArrow} alt="icon" className="h-16" /></a>
        </div>

        <div>
          <img src={steakImage} alt="Steak" className="w-120" />
        </div>
      </section>

      <section id="about-us" class="home-center flex justify-between items-center lg:flex">
        <div className="w-1/2 ml-10 space-y-12  tracking-wider">
          <h1 className="text-4xl font-bold">
            Why QUEUETY?
          </h1>
          <p className="text-md">
            Skip the long lines! QUEUETY helps you book your restaurant queue in advance, ensuring a smooth and stress-free dining experience, while listening to live music every night.
          </p>
          <p className="text-md">
            See you at KMUTNB 1518 Pracharat 1 Road,Wongsawang, Bangsue, Bangkok 10800
          </p>
          <div className="flex items-end gap-2">
            <img src={Location} alt="icon" className="h-6 " />
            <a href="https://maps.app.goo.gl/UrdZfEiY5ynGgCbbA" target="_blank" rel="noopener noreferrer" className="text-gray-300 underline underline-offset-4 hover:text-white transition-all duration-200">view on map</a>
          </div>
        </div>

        <div className="">
          <img src={HomeCenter} alt="img" className="h-90" />
        </div>
      </section>

      <section class="home-bottom flex justify-center p-16 mb-0">
        <div className="w-1/2">
          <h2 className="text-4xl font-bold tracking-wider">
            Contact us
          </h2>
          <p className="tracking-wider mt-4">
            Need assistance or have a question? Let me help you.
          </p>
          <div className="mt-8">
            <input
              type="email"
              placeholder="Enter your registered email..."
              className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6">
            <textarea id="message" rows="4" class="block p-2 w-full text-sm text-black bg-white rounded-lg border focus:ring-2 focus:ring-blue-500" placeholder="Write your thoughts here..."></textarea>
          </div>

          <div className="flex justify-end mt-4">
            <button className="bg-yellow-600 shadow-yellow-500 shadow-md px-4 py-2 rounded-full leading-none font-bold text-lg tracking-wider hover:bg-transparent hover:border-1 hover:border-yellow-500 transition-all duration-200 hover:scale-110">
              SUBMIT
            </button>
          </div>
        </div>
      </section >
    </>
  )
}

export default home