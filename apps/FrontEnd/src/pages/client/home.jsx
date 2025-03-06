import React from 'react'
import Navbar from '../../component/nav'
import './home.css'
import { Link } from "react-router-dom";
import steakImage from "../../assets/home_background.png";
import HomeCenter from "../../assets/home_center.jpg";
import DownArrow from "../../assets/down_arrow.png"
import Location from "../../assets/location.png"

function home() {
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Email:", email);
  //   console.log("Message:", message);
  // };

  return (
    <>
      <Navbar />
      <section className="lg:flex home-top h-screen justify-between items-center p-16 z-10">
        <div className="grid-rows-2 ">
          <div className="space-y-16">
            <div>
              <h1 className="text-5xl font-bold">Got plans for tonight's party?</h1>
              <p className="mt-8 text-4xl">Let me help you find a seat!</p>
            </div>
            <div className="flex space-x-8">
              <button className="text-white px-4 py-2 border-1 border-dashed rounded-full font-bold hover:bg-white hover:text-black transition-all duration-200 hover:scale-110 ">About us</button>
              <button className="bg-yellow-600 shadow-lg px-4 py-2 rounded-full leading-none font-bold text-lg hover:bg-transparent hover:border-1 hover:border-yellow-500 transition-all duration-200 hover:scale-110">Reserve now</button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-200 hover:scale-120">
          <img src={DownArrow} alt="icon" className="h-16" />
        </div>

        <div>
          <img src={steakImage} alt="Steak" className="w-120" />
        </div>
      </section>

      <section class="home-center flex justify-between items-center lg:flex">
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
            <a href="https://maps.app.goo.gl/c7EKUggoUhsD6UvE8" target="_blank" rel="noopener noreferrer" className="text-gray-300 underline underline-offset-4 hover:text-white transition-all duration-200">view on map</a>
          </div>
        </div>

        <div className="">
          <img src={HomeCenter} alt="img" className="h-90" />
        </div>
      </section>

      <section class="p-10 mb-0">
        {/* <h2 className="text-xl font-semibold text-white mb-4">Contact us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your Email..."
            className="w-full p-2 mb-3 border rounded bg-white text-black focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Ask a question here..."
            className="w-full p-2 mb-3 border rounded bg-white text-black focus:outline-none"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#c79a2e] text-white py-2 rounded hover:bg-[#a58023] transition"
          >
            Submit
          </button>
        </form> */}
      </section >
    </>
  )
}

export default home