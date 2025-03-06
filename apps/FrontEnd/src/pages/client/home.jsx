import React from 'react'
import Navbar from '../../component/nav'
import { Link } from "react-router-dom";
import steakImage from "../../assets/home_background.png";

function home() {
  return (
    <>
      <Navbar />
      <div className="flex justify-between item-center h-screen bg-gray-400 p-16 z-10">
        <div>
          <div >
            <h1 className="text-5xl font-bold">Got plans for tonight's party?</h1>
            <p className="mt-2 text-4xl">Let me help you find a seat!</p>
            <div className="mt-8 flex space-x-4">
              <button className="text-white px-4 py-2 border-1 black rounded-full font-bold">About us</button>
              <button className="bg-yellow-500 px-4 py-2 rounded-full font-bold">Reserve now</button>
            </div>
          </div>
        </div>

        <div>
          <img src={steakImage} alt="Steak" className="w-120" />
        </div>
      </div>

      <div class="space-y-8">
        <section class="p-10 mb-0">

        </section>

        <section class="p-10 mb-0">

        </section>

        <section class="p-10">

        </section>
      </div>


      {/*     
      <div className="text-center mt-32">
        <h2 className="text-center mb-32 text-7xl tracking-widest">
          QUEUETY
        </h2>
        <div className="max-w-lg">
          <p className="text-center tracking-widest">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, in? Aliquam eligendi minus consequuntur enim officia perspiciatis dolore at dicta ipsa recusandae dolor necessitatibus voluptatibus eaque sequi exercitationem, nulla, voluptas quibusdam eos! Dolorum facere beatae, ipsum atque ratione totam sed blanditiis odio. Atque vel fuga reprehenderit voluptate rerum corporis nulla. Repellat maxime pariatur similique quibusdam. Sed blanditiis esse, dolorem eaque maiores omnis in ullam rerum sunt excepturi libero consequatur nam rem illo perferendis distinctio illum dicta. Quia fuga hic dolorum, eaque voluptate, odio culpa asperiores magnam accusantium sit ad, quis nobis. Aspernatur quae ipsa dolorem nostrum deleniti, delectus commodi a?
          </p>
        </div>
      </div> */}
    </>
  )
}

export default home